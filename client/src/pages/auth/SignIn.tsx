import SignInForm from "./components/SignInForm";

const SignInPage = () => {
  return (
    <div className="w-full h-[100vh]">
      <div className="flex h-full justify-between">
        <div className="w-full h-full bg-primary"></div>
        <div className="w-full relative h-full flex flex-col items-center justify-center text-center">
          <h1 className="font-semibold text-2xl">Welcome back!</h1>
          <p className="text-sm text-muted-foreground">
            Enter your credentials to login to your account
          </p>
          <SignInForm />
          <span className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <a href="/sign-up" className="underline underline-offset-2">
              Sign Up
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};
export default SignInPage;
