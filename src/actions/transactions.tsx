'use server';

import prisma from '@/lib/db';
import { EarningFormData } from '@/lib/types';
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { subDays, startOfDay, format, eachDayOfInterval } from 'date-fns';

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

export async function deleteTransaction(id: string) {
  try {
    const { userId } = auth();
    if (!userId) throw new Error('User not authenticated');
    if (!id) throw new Error('Missing record id');

    const transaction = await prisma.transaction.findFirst({
      where: { id },
    });
    if (!transaction) throw new Error('Transaction not found');

    const operations = [];
    if (transaction.type === 'SPENDING') {
      operations.push(
        prisma.user.update({
          where: { id: userId },
          data: {
            balance: {
              increment: transaction.amount,
            },
            spendings: {
              decrement: transaction.amount,
            },
          },
        })
      );
    } else if (transaction.type === 'EARNING') {
      operations.push(
        prisma.user.update({
          where: { id: userId },
          data: {
            balance: {
              decrement: transaction.amount,
            },
            earnings: {
              decrement: transaction.amount,
            },
          },
        })
      );
    }

    const [deleteRecord, changeBalance] = await prisma.$transaction([
      prisma.transaction.delete({ where: { id } }),
      ...operations,
    ]);

    if (deleteRecord && changeBalance) {
      return {
        message: 'Transaction deleted and balance updated successfully',
        ok: true,
      };
    } else {
      return {
        message: 'Failed to delete transaction or update balance',
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
    revalidatePath('/dashboard/transactions');
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

export async function getRecentTransactions() {
  try {
    const { userId } = auth();
    if (!userId) throw new Error('User not authenticated');
    const recentTransactions = await prisma.transaction.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: 'desc', // Sorts by 'createdAt' in descending order
      },
      take: 6,
    });
    if (recentTransactions) {
      return {
        data: recentTransactions,
        ok: true,
      };
    }
    return {
      message: 'Could not get recent transactions',
      ok: false,
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

export async function getTopSpendingCategories() {
  const { userId } = auth();

  try {
    if (!userId) throw new Error('User not authenticated');

    let transactions = await prisma.transaction.findMany({
      where: {
        userId,
        type: 'SPENDING', // Filter by spending transactions
      },
      include: {
        category: true, // Include the category details
      },
    });

    // Group by category and sum the amounts
    let categorySpendingMap: {
      [key: string]: { name: string; emoji: string; totalAmount: number };
    } = {};

    transactions.forEach((transaction) => {
      const categoryId = transaction.categoryId;
      if (categoryId && transaction.category) {
        const { name, emoji } = transaction.category;
        if (!categorySpendingMap[categoryId]) {
          categorySpendingMap[categoryId] = { name, emoji, totalAmount: 0 };
        }
        categorySpendingMap[categoryId].totalAmount += transaction.amount;
      }
    });

    // Convert the map to an array and sort by totalAmount in descending order
    let sortedCategories = Object.values(categorySpendingMap)
      .sort((a, b) => b.totalAmount - a.totalAmount)
      .slice(0, 6); // Limit to 6 categories

    return {
      data: sortedCategories,
      ok: true,
    };
  } catch (err) {
    console.error('Failed to get top spending categories', err);
    return {
      message: err instanceof Error ? err.message : 'Internal Server Error',
      ok: false,
    };
  } finally {
    revalidatePath('/dashboard');
  }
}

export async function getTopEarningsCategories() {
  const { userId } = auth();

  try {
    if (!userId) throw new Error('User not authenticated');

    let transactions = await prisma.transaction.findMany({
      where: {
        userId,
        type: 'EARNING', // Filter by earning transactions
      },
      include: {
        category: true, // Include the category details
      },
    });

    // Group by category and sum the amounts
    let categoryEarningMap: {
      [key: string]: { name: string; emoji: string; totalAmount: number };
    } = {};

    transactions.forEach((transaction) => {
      const categoryId = transaction.categoryId;
      if (categoryId && transaction.category) {
        const { name, emoji } = transaction.category;
        if (!categoryEarningMap[categoryId]) {
          categoryEarningMap[categoryId] = { name, emoji, totalAmount: 0 };
        }
        categoryEarningMap[categoryId].totalAmount += transaction.amount;
      }
    });

    // Convert the map to an array and sort by totalAmount in descending order
    let sortedCategories = Object.values(categoryEarningMap)
      .sort((a, b) => b.totalAmount - a.totalAmount)
      .slice(0, 6); // Limit to 6 categories

    return {
      data: sortedCategories,
      ok: true,
    };
  } catch (err) {
    console.error('Failed to get top spending categories', err);
    return {
      message: err instanceof Error ? err.message : 'Internal Server Error',
      ok: false,
    };
  } finally {
    revalidatePath('/dashboard');
  }
}

export async function getLast7DaysTransactions() {
  const { userId } = auth();

  try {
    if (!userId) throw new Error('User not authenticated');

    const today = new Date();
    const sevenDaysAgo = subDays(today, 7);

    const transactions = await prisma.transaction.findMany({
      where: {
        userId,
        createdAt: {
          gte: startOfDay(sevenDaysAgo), // Starting from 7 days ago
        },
      },
      include: {
        category: true,
      },
    });

    // Initialize an array to store the last 7 days with day of the week
    const last7Days = eachDayOfInterval({
      start: sevenDaysAgo,
      end: subDays(today, 1),
    }).map((date) => ({
      day: format(date, 'EEEE'),
      spending: 0,
      earning: 0,
    }));

    last7Days.push(last7Days.shift()!);

    // Initialize a map to store earnings and spendings by day of the week
    const dailyData: { [day: string]: { spending: number; earning: number } } =
      {};

    transactions.forEach((transaction) => {
      const dayOfWeek = format(transaction.createdAt, 'EEEE');

      // If the day doesn't exist in the dailyData map, initialize it
      if (!dailyData[dayOfWeek]) {
        dailyData[dayOfWeek] = { spending: 0, earning: 0 };
      }

      // Add to the appropriate category (spending or earning)
      if (transaction.type === 'SPENDING') {
        dailyData[dayOfWeek].spending += transaction.amount;
      } else if (transaction.type === 'EARNING') {
        dailyData[dayOfWeek].earning += transaction.amount;
      }
    });

    const chartData = last7Days.map((dayData) => {
      const { day } = dayData;
      const { spending = 0, earning = 0 } = dailyData[day] || {};
      return {
        day,
        spending,
        earning,
      };
    });

    return {
      data: chartData,
      ok: true,
    };
  } catch (err) {
    console.error('Failed to get transactions for the last 7 days', err);
    return {
      message: err instanceof Error ? err.message : 'Internal Server Error',
      ok: false,
    };
  }
}

export async function getSpendingsChartData() {
  const { userId } = auth();

  try {
    if (!userId) throw new Error('User not authenticated');
    const transactions = await prisma.transaction.findMany({
      where: {
        userId,
        type: 'SPENDING',
      },
      include: {
        category: true,
      },
    });

    const categoryMap: {
      [key: string]: { name: string; totalSpent: number; fill: string };
    } = {};

    transactions.forEach((transaction) => {
      const categoryId = transaction.categoryId;
      if (categoryId && transaction.category) {
        const { name, emoji } = transaction.category;
        if (!categoryMap[categoryId]) {
          categoryMap[categoryId] = {
            name,
            totalSpent: 0,
            fill: `hsl(var(--chart-${Object.keys(categoryMap).length + 1}))`,
          };
        }
        categoryMap[categoryId].totalSpent += transaction.amount;
      }
    });

    const sortedCategories = Object.values(categoryMap).sort(
      (a, b) => b.totalSpent - a.totalSpent
    );

    // Prepare chart data
    let chartData;
    if (sortedCategories.length <= 6) {
      chartData = sortedCategories.map((category) => ({
        category: category.name,
        spent: category.totalSpent,
        fill: category.fill,
      }));
    } else {
      const topCategories = sortedCategories.slice(0, 6);
      const otherSpent = sortedCategories
        .slice(6)
        .reduce((sum, category) => sum + category.totalSpent, 0);

      chartData = [
        ...topCategories.map((category) => ({
          category: category.name,
          spent: category.totalSpent,
          fill: category.fill,
        })),
        {
          category: 'Other',
          spent: otherSpent,
          fill: `hsl(var(--chart-${Object.keys(categoryMap).length + 1}))`,
        },
      ];
    }

    return {
      data: chartData,
      ok: true,
    };
  } catch (err) {
    console.error('Failed to get spendings chart data', err);
    return {
      message: err instanceof Error ? err.message : 'Internal Server Error',
      ok: false,
    };
  }
}

export async function getEarningsChartData() {
  const { userId } = auth();

  try {
    if (!userId) throw new Error('User not authenticated');
    const transactions = await prisma.transaction.findMany({
      where: {
        userId,
        type: 'EARNING',
      },
      include: {
        category: true,
      },
    });

    const categoryMap: {
      [key: string]: { name: string; totalEarnt: number; fill: string };
    } = {};

    transactions.forEach((transaction) => {
      const categoryId = transaction.categoryId;
      if (categoryId && transaction.category) {
        const { name, emoji } = transaction.category;
        if (!categoryMap[categoryId]) {
          categoryMap[categoryId] = {
            name,
            totalEarnt: 0,
            fill: `hsl(var(--chart-${Object.keys(categoryMap).length + 1}))`,
          };
        }
        categoryMap[categoryId].totalEarnt += transaction.amount;
      }
    });

    const sortedCategories = Object.values(categoryMap).sort(
      (a, b) => b.totalEarnt - a.totalEarnt
    );

    // Prepare chart data
    let chartData;
    if (sortedCategories.length <= 6) {
      chartData = sortedCategories.map((category) => ({
        category: category.name,
        earnt: category.totalEarnt,
        fill: category.fill,
      }));
    } else {
      const topCategories = sortedCategories.slice(0, 6);
      const otherEarnt = sortedCategories
        .slice(6)
        .reduce((sum, category) => sum + category.totalEarnt, 0);

      chartData = [
        ...topCategories.map((category) => ({
          category: category.name,
          earnt: category.totalEarnt,
          fill: category.fill,
        })),
        {
          category: 'Other',
          earnt: otherEarnt,
          fill: `hsl(var(--chart-${Object.keys(categoryMap).length + 1}))`,
        },
      ];
    }

    return {
      data: chartData,
      ok: true,
    };
  } catch (err) {
    console.error('Failed to get spendings chart data', err);
    return {
      message: err instanceof Error ? err.message : 'Internal Server Error',
      ok: false,
    };
  }
}

export async function editTransaction(data: any) {
  try {
    const existingTransaction = await prisma.transaction.findUnique({
      where: { id: data.id },
    });

    if (!existingTransaction) {
      throw new Error('Transaction not found');
    }

    let categoryId = null;
    if (data.category) {
      let category = await prisma.category.findFirst({
        where: {
          userId: existingTransaction.userId,
          name: data.category,
        },
      });
      if (category) categoryId = category.id;
    }

    const amountDifference = data.amount - existingTransaction.amount;

    await prisma.$transaction(async (prisma) => {
      await prisma.transaction.update({
        where: { id: data.id },
        data: {
          description: data.description,
          amount: Number(data.amount),
          categoryId: categoryId,
        },
      });

      if (existingTransaction.type === 'SPENDING') {
        await prisma.user.update({
          where: { id: existingTransaction.userId },
          data: {
            balance: { decrement: amountDifference },
            spendings: { increment: amountDifference },
          },
        });
      } else if (existingTransaction.type === 'EARNING') {
        await prisma.user.update({
          where: { id: existingTransaction.userId },
          data: {
            balance: { increment: amountDifference },
            earnings: {
              increment: amountDifference,
            },
          },
        });
      }
    });

    return {
      ok: true,
      message: 'Transaction updated successfully',
    };
  } catch (error) {
    console.error('Error editing transaction:', error);
    return {
      ok: false,
      message: 'Failed to edit transaction',
    };
  } finally {
    revalidatePath('/dashboard/transactions');
  }
}
