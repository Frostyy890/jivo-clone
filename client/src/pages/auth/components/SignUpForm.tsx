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

const signUpSchema = z.object({
  username: z
    .string()
    .min(6, { message: "Username must be at least 6 characters long" }),
  email: z.string().email({ message: "Email must be valid" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

type SignUpFormData = z.infer<typeof signUpSchema>;

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

  const onSubmit = (data: SignUpFormData) => {
    console.log(data);
  };
  return (
    <Form {...form}>
      <form className="w-[350px] p-2" onSubmit={form.handleSubmit(onSubmit)}>
        {Object.keys(signUpSchema.shape).map((fieldName, index) => (
          <FormField
            key={index}
            control={form.control}
            name={fieldName as keyof SignUpFormData}
            render={({ field }) => (
              <FormItem className="py-1">
                <FormControl>
                  <Input placeholder={`Enter ${fieldName}`} {...field} />
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
          Create Account
        </Button>
      </form>
    </Form>
  );
};

export default SignUpForm;
