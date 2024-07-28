import { SignIn } from '@clerk/nextjs';

const LoginPage = () => {
  return (
    <SignIn
      signUpUrl={'/sign-up'}
      appearance={{
        variables: {
          colorPrimary: 'black',
        },
      }}
    ></SignIn>
  );
};

export default LoginPage;
