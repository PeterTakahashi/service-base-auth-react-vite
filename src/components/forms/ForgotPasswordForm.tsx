import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { forgotPasswordSchema } from "@/schemas/auth";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";

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
