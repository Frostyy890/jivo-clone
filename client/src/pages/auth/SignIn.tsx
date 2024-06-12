import SignInForm from "./components/SignInForm";

const SignInPage = () => {
  return (
    <div className="w-full h-[100vh]">
      <div className="h-full flex items-center justify-center">
        <div className="w-[350px] border-2 rounded-lg p-3">
          <SignInForm />
        </div>
      </div>
    </div>
  );
};
export default SignInPage;
