import { createFileRoute, Link, redirect, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/lib/store/authToken";
import { CreateUser } from "@/lib/api";
import { Button } from "@/components/ui/button";
import type { RegisterType } from "@/lib/type";
import toast from 'react-hot-toast';

export const Route = createFileRoute("/auth/sign_up/")({
  beforeLoad: async () => {
    const token = useAuthStore.getState().token;
    if (token) {
      throw redirect({ to: "/" });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { setToken } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterType>();

  const signUpMutation = useMutation({
    mutationFn: async (data: RegisterType) => {
      const response = await CreateUser(data);
      return response;
    },
    onSuccess: (response) => {
      setToken(response.token);
      toast.success('Sign up successful');
      navigate({ to: "/auth/login" })
    },
    onError: (error: any) => {
    const message =
      error?.message || "Something went wrong. Please try again.";
    toast.error(message);
  },
  });

  const onSubmit: SubmitHandler<RegisterType> = (data) => {
    const FormData = {
      name: data.name,
      email: data.email,
      gender: data.gender,
      role: "student",
      password: data.password,
    };
    signUpMutation.mutate(FormData);
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-linear-to-r from-indigo-500 to-purple-600">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded-lg p-6 w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>

        <input
          type="text"
          placeholder="Name"
          {...register("name", { required: "Name is required" })}
          className="w-full p-2 border rounded-md"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}

        <input
          type="email"
          placeholder="Email"
          {...register("email", { required: "Email is required" })}
          className="w-full p-2 border rounded-md"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        <select
          {...register("gender", { required: "Gender is required" })}
          className="w-full h-10 p-2 border rounded-md"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        {errors.gender && (
          <p className="text-red-500">{errors.gender.message}</p>
        )}

        <input
          type="password"
          placeholder="Password"
          {...register("password", { required: "Password is required" })}
          className="w-full p-2 border rounded-md"
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}

        <Button
          type="submit"
          disabled={signUpMutation.isLoading}
          className="w-full"
        >
          {signUpMutation.isLoading ? "Signing up..." : "Sign Up"}
        </Button>
        <p className="mt-6 text-center text-gray-500 dark:text-gray-400 text-sm">
        Already have an account?{" "}
        <Link
          to="/auth/login"
          className="text-indigo-600 hover:underline dark:text-indigo-400"
        >
          Login
        </Link>
      </p>
      </form>
    </div>
  );
}
