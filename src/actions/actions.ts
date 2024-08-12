'use server';

import prisma from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';

export async function getCurrentUserData() {
  const userId: string | null = auth().userId;
  if (!userId) return null;
  const userData = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });
  return userData;
}

// Function for testing loading states
export async function getCurrentUserDataWithDelay(delay: number) {
  const userId: string | null = auth().userId;
  if (!userId) return null;

  // Add a delay of 3 seconds
  await new Promise((resolve) => setTimeout(resolve, delay));

  const userData = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });

  return userData;
}
export async function updateBalance(newBalance: number) {
  try {
    if (
      isNaN(newBalance) ||
      !isFinite(newBalance) ||
      newBalance > 1000000000 ||
      newBalance < -1000000000
    ) {
      throw new Error('Invalid balance amount');
    }
    const { userId } = auth();
    if (!userId) throw new Error('User not authenticated');
    const update = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        balance: newBalance,
      },
    });
    if (!update) throw new Error('User not found');
    return { message: 'Successfully updated balance.', ok: true };
  } catch (err) {
    console.error(err);
    return {
      message: err instanceof Error ? err.message : 'Internal Server Error',
      ok: false,
    };
  } finally {
    revalidatePath('/dashboard');
  }
}

export async function transferSavings(
  transferAmount: number,
  currentSavings: number
) {
  try {
    if (
      isNaN(transferAmount) ||
      !isFinite(transferAmount) ||
      transferAmount > currentSavings ||
      transferAmount <= 0
    ) {
      throw new Error('Invalid transfer amount');
    }
    const { userId } = auth();
    if (!userId) throw new Error('User not authenticated');
    const update = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        balance: {
          increment: transferAmount,
        },
        savings: {
          decrement: transferAmount,
        },
      },
    });
    if (!update) throw new Error('User not found');
    return {
      message: 'Successfully transferred amount.',
      ok: true,
    };
  } catch (err) {
    console.error(err);
    return {
      message: err instanceof Error ? err.message : 'Internal Server Error',
      ok: false,
    };
  } finally {
    revalidatePath('/dashboard');
  }
}

export async function transferBalance(
  transferAmount: number,
  currentBalance: number
) {
  try {
    if (
      isNaN(transferAmount) ||
      !isFinite(transferAmount) ||
      transferAmount > currentBalance ||
      transferAmount <= 0
    ) {
      throw new Error('Invalid transfer amount');
    }
    const { userId } = auth();
    if (!userId) throw new Error('User not authenticated');
    const update = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        balance: {
          decrement: transferAmount,
        },
        savings: {
          increment: transferAmount,
        },
      },
    });
    if (!update) throw new Error('User not found');
    return {
      message: 'Successfully transferred amount.',
      ok: true,
    };
  } catch (err) {
    console.error(err);
    return {
      message: err instanceof Error ? err.message : 'Internal Server Error',
      ok: false,
    };
  } finally {
    revalidatePath('/dashboard');
  }
}

export async function addCategory(categoryName: string, emoji: string) {
  const { userId } = auth();
  if (!userId) throw new Error('User not authenticated');
  if (!categoryName || categoryName.trim().length === 0) {
    throw new Error('Category name is required');
  }
  if (!emoji || emoji.trim().length === 0) {
    throw new Error('Emoji is required');
  }
  if (categoryName.length > 50) {
    throw new Error('Category name is too long (maximum 50 characters)');
  }
  try {
    let user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        categories: true,
      },
    });
    if (!user) {
      throw new Error('User not found');
    }
    let categories = user.categories.map((category) =>
      category.name.toLowerCase().trim()
    );
    if (categories.includes(categoryName.toLowerCase().trim())) {
      throw new Error('Category name taken');
    }
    let category = await prisma.category.create({
      data: {
        name: categoryName,
        userId: userId,
        emoji: emoji,
      },
    });
    if (category) {
      return 'success';
    }
  } catch (error) {
    console.error('Failed to add category', error);
    throw new Error('Failed to add category');
  }
}
