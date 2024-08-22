import { SignUp } from '@clerk/nextjs';

const SignUpPage = () => {
  return (
    <div className="flex items-center justify-center">
      <SignUp
        signInUrl={`/login`}
        forceRedirectUrl={'/dashboard'}
        fallbackRedirectUrl={'/dashboard'}
        signInForceRedirectUrl={'/dashboard'}
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
