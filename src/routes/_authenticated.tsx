import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { useAuthStore } from "@/lib/store/authToken";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async () => {
    const token = useAuthStore.getState().token; 
    if (!token) {
      throw redirect({ to: "/" }); 
    }
  },
  component: ProtectedLayout,
});

function ProtectedLayout() {
  return <Outlet />;
}