import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEditUserMutation } from "@/features/hooks/swr/mutation/useEditUserMutation";
import type { UserEditValues } from "@/components/forms/UserEditForm";

export function useEditUserForm() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { trigger: editUserTrigger, isMutating } = useEditUserMutation();
  const navigate = useNavigate();

  const onSubmitEditUser = useCallback(
    async (data: UserEditValues) => {
      try {
        await editUserTrigger({
          email: data.email,
          password: data.password,
        });
        navigate("/");
      } catch {
        const errorMsg = "Failed to update user data.";
        setErrorMessage(errorMsg);
      }
    },
    [editUserTrigger, navigate]
  );

  return {
    onSubmitEditUser,
    errorMessage,
    isMutating,
  };
}
