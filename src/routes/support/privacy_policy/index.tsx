import { createFileRoute } from "@tanstack/react-router";
import { UserLayout } from "@/lib/layout/userLayout";
import { PageTitle } from "@/components/content/pageTitle";

export const Route = createFileRoute("/support/privacy_policy/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <UserLayout>
      <PageTitle title="Privacy Policy" />
    </UserLayout>
  );
}
