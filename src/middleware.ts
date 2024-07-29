import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { request } from 'http';
import { NextResponse } from 'next/server';

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)']);

export default clerkMiddleware((auth, req) => {
  const url = req.nextUrl;
  const { userId, getToken } = auth();
  if (isProtectedRoute(req) && !userId) {
    return new Response(null, {
      status: 302,
      headers: {
        Location: process.env.CLERK_SIGN_IN_URL as string,
      },
    });
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
