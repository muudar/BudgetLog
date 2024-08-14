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
