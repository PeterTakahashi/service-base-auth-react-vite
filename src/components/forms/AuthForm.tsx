import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { signUpSchema, signInSchema } from "@/schemas/auth";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";

type AuthFormProps = {
  mode: "signup" | "signin";
};

type SignUpValues = z.infer<typeof signUpSchema>;
type SignInValues = z.infer<typeof signInSchema>;

export const AuthForm: React.FC<AuthFormProps> = ({ mode }) => {
  const isSignUp = mode === "signup";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpValues & SignInValues>({
    resolver: zodResolver(isSignUp ? signUpSchema : signInSchema),
  });

  const onSubmit = async (data: SignUpValues & SignInValues) => {
    console.log("Form submitted:", data);
    document.cookie = `token=test-token; path=/;`;
    window.location.href = "/";
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          placeholder="Email"
          {...register("email")}
          required
          autoComplete="email"
        />

        {errors.email && (
          <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
        )}
      </div>

      <div className="grid w-full max-w-sm items-center gap-1.5 mt-2">
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          {...register("password")}
          required
          autoComplete="current-password"
        />
        {errors.password && (
          <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>
        )}
      </div>

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex w-full justify-center rounded-md bg-teal-600 px-3 py-1.5
                     text-sm/6 font-semibold text-white shadow-xs hover:bg-teal-500
                     focus-visible:outline-2 focus-visible:outline-offset-2
                     focus-visible:outline-teal-600"
        >
          {isSubmitting ? "Sending..." : isSignUp ? "Sign up" : "Sign in"}
        </button>
      </div>
    </form>
  );
};
