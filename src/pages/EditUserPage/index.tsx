import type { FC } from "react";
import { useUser } from "@/features/hooks/swr/fetcher/user/useUser";
import { UserEditForm } from "@/components/forms/UserEditForm";
import { useEditUserForm } from "@/features/hooks/form/user/useEditUserForm";

export const EditUserPage: FC = () => {
  const { user, isLoading, isError } = useUser();
  const { onSubmitEditUser, errorMessage } = useEditUserForm();

  if (isLoading) {
    return <div>Loading user info...</div>;
  }
  if (!user || isError) {
    return <div>Error or no user data...</div>;
  }

  return (
    <div className="max-w-sm mx-auto mt-16">
      <h1 className="text-2xl font-bold mb-4">Edit User</h1>

      <UserEditForm
        defaultValues={{ email: user.email }}
        onSubmit={onSubmitEditUser}
      />

      {errorMessage && (
        <p className="mt-4 text-center text-sm text-red-600">{errorMessage}</p>
      )}
    </div>
  );
};
