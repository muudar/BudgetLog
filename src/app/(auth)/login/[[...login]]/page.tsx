import { SignIn } from '@clerk/nextjs';

const LoginPage = () => {
  return (
    <SignIn
      signUpUrl={'/sign-up'}
      appearance={{
        variables: {
          colorPrimary: 'green',
        },
      }}
    ></SignIn>
  );
};

export default LoginPage;
