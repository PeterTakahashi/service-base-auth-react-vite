import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { signUpSchema } from "@/features/zodSchemas/auth/signUpSchema";
import { signInSchema } from "@/features/zodSchemas/auth/signInSchema";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { FormButton } from "@/components/ui/FormButton";

type AuthFormProps = {
  mode: "signup" | "signin";
  onSubmit: (data: SignUpValues | SignInValues) => void;
};

export type SignUpValues = z.infer<typeof signUpSchema>;
export type SignInValues = z.infer<typeof signInSchema>;

export const AuthForm: React.FC<AuthFormProps> = ({ mode, onSubmit }) => {
  const isSignUp = mode === "signup";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpValues & SignInValues>({
    resolver: zodResolver(isSignUp ? signUpSchema : signInSchema),
  });

  const onFormSubmit = async (data: SignUpValues & SignInValues) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          placeholder="Email"
          {...register("email")}
          required
          autoComplete="email"
          errorMessage={errors.email && errors.email.message}
        />
      </div>

      <div className="grid w-full max-w-sm items-center gap-1.5 mt-2">
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          placeholder="Password"
          {...register("password")}
          required
          autoComplete="current-password"
          errorMessage={errors.password && errors.password.message}
        />
      </div>

      <div>
        <FormButton
          type="submit"
          disabled={isSubmitting}
          className="flex w-full justify-center"
        >
          {isSubmitting ? "Sending..." : isSignUp ? "Sign up" : "Sign in"}
        </FormButton>
      </div>
    </form>
  );
};
