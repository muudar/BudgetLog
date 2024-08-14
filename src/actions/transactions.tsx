'use server';

import prisma from '@/lib/db';
import { EarningFormData } from '@/lib/types';
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';

export async function addEarningsRecord(data: EarningFormData) {
  try {
    const { userId } = auth();
    if (!userId) throw new Error('User not authenticated');
    if (!data) throw new Error('Missing record data');
    let categoryId = null;
    if (data.category) {
      let category = await prisma.category.findFirst({
        where: {
          userId: userId,
          name: data.category,
        },
      });
      if (category) categoryId = category.id;
    }
    const [earningRecord, increaseBalance] = await prisma.$transaction([
      prisma.transaction.create({
        data: {
          userId: userId,
          amount: data.amount,
          type: 'EARNING',
          description: data.description ?? '',
          categoryId: categoryId ?? null,
        },
      }),
      prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          balance: {
            increment: data.amount,
          },
          earnings: {
            increment: data.amount,
          },
        },
      }),
    ]);
    if (earningRecord && increaseBalance) {
      return {
        message: 'Earnings record created successfully',
        ok: true,
      };
    } else {
      return {
        message: 'Failed to create earnings record',
        ok: false,
      };
    }
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

export async function addSpendingsRecord(data: EarningFormData) {
  try {
    const { userId } = auth();
    if (!userId) throw new Error('User not authenticated');
    if (!data) throw new Error('Missing record data');
    let categoryId = null;
    if (data.category) {
      let category = await prisma.category.findFirst({
        where: {
          userId: userId,
          name: data.category,
        },
      });
      if (category) categoryId = category.id;
    }
    const [earningRecord, increaseBalance] = await prisma.$transaction([
      prisma.transaction.create({
        data: {
          userId: userId,
          amount: data.amount,
          type: 'SPENDING',
          description: data.description ?? '',
          categoryId: categoryId ?? null,
        },
      }),
      prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          balance: {
            decrement: data.amount,
          },
          spendings: {
            increment: data.amount,
          },
        },
      }),
    ]);
    if (earningRecord && increaseBalance) {
      return {
        message: 'Spendings record created successfully',
        ok: true,
      };
    } else {
      return {
        message: 'Failed to create spendings record',
        ok: false,
      };
    }
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
    const [transferRecord, update] = await prisma.$transaction([
      prisma.transaction.create({
        data: {
          userId: userId,
          amount: transferAmount,
          to: 'BALANCE',
          from: 'SAVINGS',
          type: 'TRANSFER',
        },
      }),
      prisma.user.update({
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
      }),
    ]);
    if (!update || !transferRecord) throw new Error('Internal server error');
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
    const [transferRecord, update] = await prisma.$transaction([
      prisma.transaction.create({
        data: {
          userId: userId,
          amount: transferAmount,
          from: 'BALANCE',
          to: 'SAVINGS',
          type: 'TRANSFER',
        },
      }),
      prisma.user.update({
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
      }),
    ]);
    if (!update || !transferRecord) throw new Error('Internal server error');
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
