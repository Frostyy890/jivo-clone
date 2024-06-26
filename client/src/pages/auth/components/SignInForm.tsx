import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAppSelector, useAppDispatch } from "@/redux/store";
import { authenticateAction, AuthActionEnum } from "@/redux/actions/AuthActions";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const signInSchema = z.object({
  email: z.string().email({ message: "Email must be valid" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
});

export type SignInFormData = z.infer<typeof signInSchema>;

const SignInForm = () => {
  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const {
    formState: { isDirty, isValid },
  } = form;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { success } = useAppSelector((state) => state.auth);
  const onSubmit = async (data: SignInFormData) => {
    await dispatch(authenticateAction({ action: AuthActionEnum.LOGIN, userInfo: data }));
    if (success) {
      navigate("/");
      toast({
        title: "Success",
        description: "You have successfully logged in",
        variant: "success",
      });
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {Object.keys(signInSchema.shape).map((fieldName, index) => (
          <FormField
            key={index}
            control={form.control}
            name={fieldName as keyof SignInFormData}
            render={({ field }) => (
              <FormItem className="py-1">
                <FormControl>
                  <Input
                    type={`${fieldName === "password" ? "password" : "text"}`}
                    placeholder={`Enter ${fieldName}`}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
        ))}
        <Button className="w-full mt-1 font-semibold" type="submit" disabled={!isDirty || !isValid}>
          Login
        </Button>
      </form>
    </Form>
  );
};

export default SignInForm;
