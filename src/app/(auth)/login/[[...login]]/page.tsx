import { SignIn } from '@clerk/nextjs';

const LoginPage = () => {
  return (
    <SignIn
      signUpUrl={'/sign-up'}
      forceRedirectUrl={'/dashboard'}
      appearance={{
        variables: {
          colorPrimary: 'green',
        },
      }}
    ></SignIn>
  );
};

export default LoginPage;
