import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { resetPasswordSchema } from "@/schemas/auth";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { FormButton } from "@/components/ui/FormButton";

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
          placeholder="Password"
          {...register("password")}
          required
          autoComplete="current-password"
          errorMessage={errors.password && errors.password.message}
        />
      </div>

      <div className="grid w-full max-w-sm items-center gap-1.5 mt-2">
        <Label htmlFor="confirmPassword"> Confirm Password</Label>
        <Input
          type="password"
          id="confirmPassword"
          placeholder="Confirm Password"
          {...register("confirmPassword")}
          required
          autoComplete="current-password"
          errorMessage={
            errors.confirmPassword && errors.confirmPassword.message
          }
        />
      </div>

      <FormButton
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-md mt-4"
      >
        {isSubmitting ? "Sending..." : "Reset Password"}
      </FormButton>
    </form>
  );
};
