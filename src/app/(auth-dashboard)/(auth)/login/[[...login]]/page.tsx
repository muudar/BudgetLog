import { SignIn } from '@clerk/nextjs';

const LoginPage = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <SignIn
        signUpUrl={'/sign-up'}
        forceRedirectUrl={'/dashboard'}
        appearance={{
          variables: {
            colorPrimary: 'green',
          },
        }}
      ></SignIn>
    </div>
  );
};

export default LoginPage;
