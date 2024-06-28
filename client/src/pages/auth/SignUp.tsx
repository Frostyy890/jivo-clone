import { Button, buttonVariants } from "@/components/ui/button";
import SignUpForm from "./components/SignUpForm";

const SignUpPage = () => {
  return (
    <div className="flex w-full h-full justify-between">
      <div className="w-full h-full bg-primary"></div>
      <div className="w-full relative h-full flex items-center justify-center">
        <div className="absolute top-4 right-4 font-semibold">
          <a
            href="/auth/sign-in"
            className={buttonVariants({ variant: "ghost" })}
          >
            Login
          </a>
        </div>
        <div className="w-[350px] flex flex-col gap-4 text-center">
          <div className="flex flex-col gap-2">
            <h1 className="font-semibold text-2xl">Create an account</h1>
            <p className="text-muted-foreground">
              Enter your email below to create an account
            </p>
          </div>

          <SignUpForm />

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t"></span>
            </div>
            <div className="relative flex justify-center text-sm uppercase">
              <span className="px-2 bg-background text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Button variant={"outline"} className="font-semibold">
              <GoogleIconSvg />
              Google
            </Button>
            <Button className="font-semibold" variant={"outline"}>
              <GitHubIconSvg /> GitHub
            </Button>
          </div>

          <span className="text-muted-foreground">
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
  );
};

export function GitHubIconSvg() {
  return (
    <svg viewBox="0 0 438.549 438.549" className="mr-2 h-4 w-4">
      <path
        fill="currentColor"
        d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"
      ></path>
    </svg>
  );
}

export function GoogleIconSvg() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 186.69 190.5"
      className="mr-2 h-4 w-4"
    >
      <path
        fill="#4285f4"
        d="M95.25 77.932v36.888h51.262c-2.251 11.863-9.006 21.908-19.137 28.662l30.913 23.986c18.011-16.625 28.402-41.044 28.402-70.052 0-6.754-.606-13.249-1.732-19.483z"
      ></path>
      <path
        fill="#34a853"
        d="m41.869 113.38-6.972 5.337-24.679 19.223c15.673 31.086 47.796 52.561 85.03 52.561 25.717 0 47.278-8.486 63.038-23.033l-30.913-23.986c-8.486 5.715-19.31 9.179-32.125 9.179-24.765 0-45.806-16.712-53.34-39.226z"
      ></path>
      <path
        fill="#fbbc05"
        d="M10.218 52.561C3.724 65.376.001 79.837.001 95.25s3.723 29.874 10.217 42.689c0 .086 31.693-24.592 31.693-24.592-1.905-5.715-3.031-11.776-3.031-18.098s1.126-12.383 3.031-18.098z"
      ></path>
      <path
        fill="#ea4335"
        d="M95.25 37.927c14.028 0 26.497 4.849 36.455 14.201l27.276-27.276C142.442 9.439 120.968 0 95.25 0 58.016 0 25.891 21.388 10.218 52.561L41.91 77.153c7.533-22.514 28.575-39.226 53.34-39.226"
      ></path>
    </svg>
  );
}

export default SignUpPage;
