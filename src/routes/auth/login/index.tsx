import { createFileRoute, Link,redirect, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import type { SubmitHandler } from "react-hook-form";
import { GetUser, LoginUser } from "@/lib/api";
import { useAuthStore } from "@/lib/store/authToken";
import { Button } from "@/components/ui/button";
import toast from 'react-hot-toast';

export const Route = createFileRoute("/auth/login/")({
  beforeLoad: async () => {
    const token = useAuthStore.getState().token;
    if (token) {
      throw redirect({ to: "/" });
    }
  },
  component: RouteComponent,
});

type LoginType = {
  email: string;
  password: string;
};

function RouteComponent() {
  const navigate = useNavigate();
  const { setToken, setUser } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>();
  const loginMutation = useMutation({
    mutationFn: async (data: LoginType) => {
      const response = await LoginUser(data);
      return response;
    },
    onSuccess: async (response) => {
      setToken(response.token);
      if(response){
        const getUser = await GetUser()
        setUser(getUser);
      }
      toast.success('Login Successfully');
       navigate({ to: "/" })
    },
    onError: (error: any) => {
    const message =
      error?.message || "Something went wrong. Please try again.";
    toast.error(message);
  },
  });
  const onSubmit: SubmitHandler<LoginType> = (data) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-linear-to-r from-indigo-500 to-purple-600">
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-10 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-center">
          Welcome Back
        </h2>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className={`w-full p-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-gray-700 dark:text-gray-100 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-500 mt-1 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className={`w-full p-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-gray-700 dark:text-gray-100 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="text-red-500 mt-1 text-sm">{errors.password.message}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={loginMutation.isLoading}
          >
            {loginMutation.isLoading ? "Logging in..." : "Login"}
          </Button>

        </form>

        <p className="mt-6 text-center text-gray-500 dark:text-gray-400 text-sm">
          Don't have an account?{" "}
          <Link
            to="/auth/sign_up"
            className="text-indigo-600 hover:underline dark:text-indigo-400"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}