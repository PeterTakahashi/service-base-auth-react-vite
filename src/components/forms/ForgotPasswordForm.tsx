import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { forgotPasswordSchema } from "@/schemas/auth";

export type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

type ForgotPasswordProps = {
  onSubmit: (data: ForgotPasswordValues) => void;
};

export const ForgotPasswordForm: React.FC<ForgotPasswordProps> = ({
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

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

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-md bg-teal-600 px-3 py-1.5 text-base text-white hover:bg-teal-700 focus:outline-none focus:ring focus:ring-teal-500
        focus:ring-opacity-50 sm:text-sm/6"
      >
        {isSubmitting ? "Sending..." : "Send Reset Link"}
      </button>
    </form>
  );
};
