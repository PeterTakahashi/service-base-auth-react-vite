import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { resetPasswordSchema } from "@/schemas/auth";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";

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
      <div className="grid w-full max-w-sm items-center gap-1.5 mt-2">
        <Label htmlFor="password">New Password</Label>
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

      <div className="grid w-full max-w-sm items-center gap-1.5 mt-2">
        <Label htmlFor="confirmPassword"> Confirm Password</Label>
        <Input
          type="password"
          id="confirmPassword"
          {...register("confirmPassword")}
          required
          autoComplete="current-password"
        />
        {errors.confirmPassword && (
          <p className="text-sm text-red-600 mt-1">
            {errors.confirmPassword.message}
          </p>
        )}
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
