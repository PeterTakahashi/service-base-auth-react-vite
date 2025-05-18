import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEditUserMutation } from "@/features/hooks/swr/mutation/useEditUserMutation";
import type { UserEditValues } from "@/components/forms/UserEditForm";
import { type UserUpdate } from "@/types/api/user";

export function useEditUserForm() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { trigger: editUserTrigger, isMutating } = useEditUserMutation();
  const navigate = useNavigate();

  const onSubmitEditUser = useCallback(
    async (data: UserEditValues) => {
      try {
        const requestData: UserUpdate = {};
        if (data.email) {
          requestData.email = data.email;
        }
        await editUserTrigger(requestData);
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
