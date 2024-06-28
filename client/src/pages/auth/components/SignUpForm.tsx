import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { registerAction } from "@/redux/actions/AuthActions";
import { useAppSelector, useAppDispatch } from "@/redux/store";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const signUpSchema = z.object({
  username: z
    .string()
    .min(6, { message: "Username must be at least 6 characters long" }),
  email: z.string().email({ message: "Email must be valid" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export type SignUpFormData = z.infer<typeof signUpSchema>;

const SignUpForm = () => {
  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });
  const {
    formState: { isDirty, isValid },
  } = form;

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const onSubmit = async (data: SignUpFormData) => {
    dispatch(registerAction(data));
  };
  React.useEffect(() => {
    if (isAuthenticated) {
      toast({
        title: "Registration Successful",
        description: `Welcome ${user?.username}`,
        variant: "success",
      });
      navigate("/");
    }
  }, [isAuthenticated]);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {Object.keys(signUpSchema.shape).map((fieldName, index) => (
          <FormField
            key={index}
            control={form.control}
            name={fieldName as keyof SignUpFormData}
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
        <Button
          className="w-full mt-1 font-semibold"
          type="submit"
          disabled={!isDirty || !isValid}
        >
          Sign up with Email
        </Button>
      </form>
    </Form>
  );
};

export default SignUpForm;
