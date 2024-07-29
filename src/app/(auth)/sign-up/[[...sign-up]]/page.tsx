import { SignUp } from '@clerk/nextjs';

const SignUpPage = () => {
  return (
    <SignUp
      signInUrl={`/login`}
      forceRedirectUrl={'/dashboard'}
      appearance={{
        variables: {
          colorPrimary: 'green',
        },
      }}
    ></SignUp>
  );
};

export default SignUpPage;
