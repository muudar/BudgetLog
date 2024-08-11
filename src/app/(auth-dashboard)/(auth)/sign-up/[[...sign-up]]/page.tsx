import { SignUp } from '@clerk/nextjs';

const SignUpPage = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <SignUp
        signInUrl={`/login`}
        forceRedirectUrl={'/dashboard'}
        appearance={{
          variables: {
            colorPrimary: 'green',
          },
        }}
      ></SignUp>
    </div>
  );
};

export default SignUpPage;
