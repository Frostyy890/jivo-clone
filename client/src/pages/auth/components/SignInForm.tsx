import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Capitalize from "@/utils/Capitalize";

const signInSchema = z.object({
  email: z.string().email({ message: "Email must be valid" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
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

  const onSubmit = (data: SignInFormData) => {
    console.log(data);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {Object.keys(signInSchema.shape).map((fieldName, index) => (
          <FormField
            key={index}
            control={form.control}
            name={fieldName}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{Capitalize(fieldName)}</FormLabel>
                <FormControl>
                  <Input placeholder={`Enter ${fieldName}`} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
        ))}
        <Button
          className="w-full mt-3 bg-blue-500 hover:bg-blue-400"
          type="submit"
          disabled={!isDirty || !isValid}
        >
          Sign In
        </Button>
      </form>
    </Form>
  );
};

export default SignInForm;
