import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { signUpSchema, signInSchema } from "@/schemas/auth";

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
    window.location.href = "/dashboard";
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label
          htmlFor="email"
          className="block text-sm/6 font-medium text-gray-900"
        >
          Email address
        </label>
        <div className="mt-2">
          <input
            id="email"
            {...register("email")}
            type="email"
            required
            autoComplete="email"
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1
                       -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2
                       focus:-outline-offset-2 focus:outline-teal-600 sm:text-sm/6"
          />
          {errors.email && (
            <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm/6 font-medium text-gray-900"
        >
          Password
        </label>
        <div className="mt-2">
          <input
            id="password"
            {...register("password")}
            type="password"
            required
            autoComplete="current-password"
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1
                       -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2
                       focus:-outline-offset-2 focus:outline-teal-600 sm:text-sm/6"
          />
          {errors.password && (
            <p className="text-sm text-red-600 mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
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
