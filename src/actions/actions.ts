'use server';

import prisma from '@/lib/db';
import { auth } from '@clerk/nextjs/server';

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
