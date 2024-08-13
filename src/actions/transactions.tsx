'use server';

import prisma from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';

//TODO: Make transaction for increasing balance with record
//TODO: Create type for earning records
type EarningRecordData = any;

export async function addEarningsRecord(data: EarningRecordData) {
  try {
    const { userId } = auth();
    if (!userId) throw new Error('User not authenticated');
    if (!data) throw new Error('Missing record data');
    let categoryId = null;
    if (data.pickedCategory) {
      let category = await prisma.category.findFirst({
        where: {
          userId: userId,
          name: data.pickedCategory,
        },
      });
      if (category) categoryId = category.id;
    }
    const earningRecord = await prisma.transaction.create({
      data: {
        userId: userId,
        amount: data.amount,
        type: 'EARNING',
        description: data.description ?? '',
        categoryId: categoryId ?? null,
      },
    });
    if (earningRecord) {
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
