import SignUpForm from "./components/SignUpForm";

const SignUpPage = () => {
  return (
    <div className="w-full h-[100vh]">
      <div className="h-full flex items-center justify-center">
        <div className="w-[350px] border-2 rounded-lg p-3">
          <SignUpForm />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
