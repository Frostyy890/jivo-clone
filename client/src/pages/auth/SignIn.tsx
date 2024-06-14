import { Button, buttonVariants } from "@/components/ui/button";
import SignInForm from "./components/SignInForm";
import { GitHubIconSvg, GoogleIconSvg } from "./SignUp";

const SignInPage = () => {
  return (
    <div className="flex w-full h-full justify-between">
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="absolute top-4 left-4 font-semibold">
          <a href="/" className={buttonVariants({ variant: "ghost" })}>
            <ArrowBackIconSvg />
            Back
          </a>
        </div>

        <div className="w-[350px] text-center flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="font-semibold text-2xl">Welcome back</h1>
            <p className="text-sm text-muted-foreground">
              Enter your credentials to login to your account
            </p>
          </div>

          <SignInForm />

          <div className="flex flex-col gap-2">
            <a
              href="/sign-in"
              className="text-sm text-muted-foreground underline underline-offset-2"
            >
              Forgot password?
            </a>
            <span className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <a href="/sign-up" className="underline underline-offset-2">
                Sign Up
              </a>
            </span>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="px-2 bg-background text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Button className="font-semibold" variant={"outline"}>
              <GoogleIconSvg />
              Google
            </Button>
            <Button className="font-semibold" variant={"outline"}>
              <GitHubIconSvg /> GitHub
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export function ArrowBackIconSvg() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="far"
      data-icon="chevron-left"
      className="svg-inline--fa fa-chevron-left mr-2 h-3 w-3"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 320 512"
    >
      <path
        fill="currentColor"
        d="M15 239c-9.4 9.4-9.4 24.6 0 33.9L207 465c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9L65.9 256 241 81c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0L15 239z"
      ></path>
    </svg>
  );
}

export default SignInPage;
