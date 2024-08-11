'use server';

import prisma from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { error } from 'console';
import { NextApiRequest, NextApiResponse } from 'next';
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
  let success = false;
  let error = false;
  let errorMessage = '';
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
    let update = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        balance: newBalance,
      },
    });
    if (!update) throw new Error('User not found');
    success = true;
    error = false;
  } catch (err) {
    error = true;
    errorMessage = err instanceof Error ? err.message : 'Internal Server Error';
    console.log(err);
  } finally {
    revalidatePath('/dashboard');
    if (error) {
      return { message: errorMessage, ok: false };
    }
    if (success)
      return {
        message: 'Successfully updated balance.',
        ok: true,
      };
  }
}

export async function transferSavings(
  transferAmount: number,
  currentSavings: number
) {
  let success = false;
  let error = false;
  let errorMessage = '';
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
    let update = await prisma.user.update({
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
    success = true;
    error = false;
  } catch (err) {
    error = true;
    errorMessage = err instanceof Error ? err.message : 'Internal Server Error';
    console.log(err);
  } finally {
    revalidatePath('/dashboard');
    if (error) {
      return { message: errorMessage, ok: false };
    }
    if (success)
      return {
        message: 'Successfully transferred amount.',
        ok: true,
      };
  }
}
