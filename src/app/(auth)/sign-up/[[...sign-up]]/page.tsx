import { SignUp } from '@clerk/nextjs';

const SignUpPage = () => {
  return (
    <SignUp
      signInUrl={`/login`}
      appearance={{
        variables: {
          colorPrimary: 'black',
        },
      }}
    ></SignUp>
  );
};

export default SignUpPage;
