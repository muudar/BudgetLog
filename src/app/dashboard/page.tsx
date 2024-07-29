import { SignedIn, SignOutButton } from '@clerk/nextjs';
import React from 'react';

const page = () => {
  return (
    <div className="flex flex-col">
      <SignedIn>
        <SignOutButton redirectUrl="/login"></SignOutButton>
      </SignedIn>
      <div>dashboard page</div>
    </div>
  );
};

export default page;
