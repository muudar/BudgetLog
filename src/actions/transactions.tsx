'use server';

import prisma from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';

//TODO: addEarningsRecord
