'use server';

import prisma from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';

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
      return {
        message: 'Successfully created category.',
        ok: true,
      };
    } else {
      return {
        message: 'Failed to create category',
        ok: false,
      };
    }
  } catch (err) {
    console.error('Failed to add category', err);
    return {
      message: err instanceof Error ? err.message : 'Internal Server Error',
      ok: false,
    };
  } finally {
    revalidatePath('/dashboard');
  }
}

export async function getCategories() {
  const { userId } = auth();
  try {
    if (!userId) throw new Error('User not authenticated');
    let userData = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      include: {
        categories: true,
      },
    });
    let categories = userData?.categories;
    if (categories) {
      return {
        data: categories,
        ok: true,
      };
    } else {
      return {
        message: 'No categories found',
        ok: false,
      };
    }
  } catch (err) {
    console.error('Failed to get categories', err);
    return {
      message: err instanceof Error ? err.message : 'Internal Server Error',
      ok: false,
    };
  } finally {
    revalidatePath('/dashboard');
  }
}
