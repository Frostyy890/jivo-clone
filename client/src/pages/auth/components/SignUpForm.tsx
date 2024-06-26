import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IAuthData, useApi } from "@/hooks/api/useApi1.0";
import { useAuth } from "@/store/auth/AuthContext";
import { useToast } from "@/components/ui/use-toast";

const signUpSchema = z.object({
  username: z.string().min(6, { message: "Username must be at least 6 characters long" }),
  email: z.string().email({ message: "Email must be valid" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
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

  const [authData, setAuthData] = React.useState<IAuthData>();
  const { dispatchLogIn } = useAuth();
  const { apiRequest } = useApi();
  const { toast } = useToast();
  const onSubmit = async (data: SignUpFormData) => {
    await apiRequest({
      config: {
        url: "/auth/register",
        method: "POST",
        data,
      },
      handleSuccessResponse: (data) => {
        setAuthData(data);
        toast({
          title: "Success",
          description: "Signed up successfully",
          variant: "success",
          duration: 3000,
        });
      },
      handleErrorResponse: (data) =>
        toast({
          title: "Error",
          description: data,
          variant: "destructive",
          duration: 3000,
        }),
    });
  };
  React.useEffect(() => {
    if (authData && authData.success) {
      dispatchLogIn({
        token: authData.token,
        user: authData.user,
      });
    }
  }, [authData, dispatchLogIn]);
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
        <Button className="w-full mt-1 font-semibold" type="submit" disabled={!isDirty || !isValid}>
          Sign up with Email
        </Button>
      </form>
    </Form>
  );
};

export default SignUpForm;
