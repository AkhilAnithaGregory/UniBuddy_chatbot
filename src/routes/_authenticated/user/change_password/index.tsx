import { createFileRoute } from '@tanstack/react-router';
import { UserLayout } from '@/lib/layout/userLayout';
import { PageTitle } from '@/components/content/pageTitle';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { ChangePassword } from '@/lib/api'; // your existing API function
import { Label } from '@radix-ui/react-label';

export const Route = createFileRoute('/_authenticated/user/change_password/')({
  component: RouteComponent,
});

type FormValues = {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

function RouteComponent() {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();

  const mutation = useMutation({
    mutationFn: (data: { currentPassword: string; newPassword: string }) =>
      ChangePassword(data),
    onSuccess: () => {
      navigate({ to: '/settings' });
    },
    onError: (err: any) => {
      alert(err.message || 'Error changing password');
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (data.newPassword !== data.confirmNewPassword) {
      alert('New password and confirm password do not match');
      return;
    }
    mutation.mutate({
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    });
  };

  return (
    <UserLayout>
      <PageTitle title="Change Password" />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
        <div>
          <Label htmlFor="current_password">Current Password</Label>
          <input
            type="password"
            id="current_password"
            {...register('currentPassword', { required: true })}
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:outline-none px-3 py-2"
          />
          {errors.currentPassword && <p className="text-red-500">Current password is required</p>}
        </div>

        <div>
          <Label htmlFor="new_password">New Password</Label>
          <input
            type="password"
            id="new_password"
            {...register('newPassword', { required: true })}
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:outline-none px-3 py-2"
          />
          {errors.newPassword && <p className="text-red-500">New password is required</p>}
        </div>

        <div>
          <Label htmlFor="confirm_new_password">Confirm New Password</Label>
          <input
            type="password"
            id="confirm_new_password"
            {...register('confirmNewPassword', { required: true })}
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:outline-none px-3 py-2"
          />
          {errors.confirmNewPassword && <p className="text-red-500">Confirm password is required</p>}
        </div>

        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90"
          disabled={mutation.isLoading}
        >
          {mutation.isLoading ? 'Updating...' : 'Change Password'}
        </button>
      </form>
    </UserLayout>
  );
}
