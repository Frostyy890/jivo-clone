import { buttonVariants } from "@/components/ui/button";
import SignUpForm from "./components/SignUpForm";

const SignUpPage = () => {
  return (
    <div className="w-full h-[100vh]">
      <div className="flex h-full justify-between">
        <div className="w-full h-full bg-primary"></div>
        <div className="w-full relative h-full flex flex-col items-center justify-center text-center">
          <div className="absolute top-4 right-4 font-semibold">
            <a href="/sign-in" className={buttonVariants({ variant: "ghost" })}>
              Login
            </a>
          </div>
          <div className="w-[350px]">
            <h1 className="font-semibold text-2xl">Create an account</h1>
            <p className="text-sm text-muted-foreground">
              Enter your credentials to create an account
            </p>
            <SignUpForm />
            <span className="text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <a
                href="/terms"
                className=" outline-none underline underline-offset-2"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="/privacy"
                className="outline-none underline underline-offset-2"
              >
                Privacy Policy
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
