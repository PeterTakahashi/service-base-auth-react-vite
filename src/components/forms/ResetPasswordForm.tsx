import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { resetPasswordSchema } from "@/schemas/auth";

export type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;

type ResetPasswordProps = {
  onSubmit: (data: ResetPasswordValues) => void;
};

export const ResetPasswordForm: React.FC<ResetPasswordProps> = ({
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label
          htmlFor="password"
          className="block text-sm/6 font-medium text-gray-900"
        >
          New Password
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
        <label
          htmlFor="confirmPassword"
          className="block text-sm/6 font-medium text-gray-900"
        >
          Confirm Password
        </label>
        <div className="mt-2">
          <input
            id="confirmPassword"
            {...register("confirmPassword")}
            type="password"
            required
            autoComplete="current-password"
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1
                       -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2
                       focus:-outline-offset-2 focus:outline-teal-600 sm:text-sm/6"
          />
          {errors.confirmPassword && (
            <p className="text-sm text-red-600 mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-md bg-teal-600 px-3 py-1.5 text-base text-white hover:bg-teal-700 focus:outline-none focus:ring focus:ring-teal-500
        focus:ring-opacity-50 sm:text-sm/6"
      >
        {isSubmitting ? "Sending..." : "Reset Password"}
      </button>
    </form>
  );
};
