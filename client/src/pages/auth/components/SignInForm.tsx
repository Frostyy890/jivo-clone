import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/store/auth/AuthContext";
import { IAuthData, useApi } from "@/hooks/api/useApi";
import { useToast } from "@/components/ui/use-toast";

const signInSchema = z.object({
  email: z.string().email({ message: "Email must be valid" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
});

type SignInFormData = z.infer<typeof signInSchema>;

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
  const [authData, setAuthData] = React.useState<IAuthData>();
  const { dispatchLogIn } = useAuth();
  const { apiRequest } = useApi();
  const { toast } = useToast();
  const onSubmit = async (data: SignInFormData) => {
    await apiRequest({
      config: {
        url: "/auth/login",
        method: "POST",
        data,
      },
      handleSuccessResponse: (data) => {
        setAuthData(data);
        toast({
          title: "Success",
          description: "Signed in successfully",
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
