import { createFileRoute, Link } from "@tanstack/react-router";
import { UserLayout } from "@/lib/layout/userLayout";
import { Button } from "@/components/ui/button";
import { PageTitle } from "@/components/content/pageTitle";

export const Route = createFileRoute("/user/journal/$journal_detail")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <UserLayout>
      <PageTitle title="Journal Detail" />
      <div className="mt-5">
        <div className="flex items-center gap-x-4">
          <input
            type="text"
            placeholder="Journal Title"
            className="mb-4 p-2 border"
          />
          <input
            type="date"
            placeholder="Journal Title"
            className="mb-4 p-2 border"
          />
        </div>
        <textarea
          placeholder="Journal Content"
          className="mb-4 p-2 border w-full h-40"
        ></textarea>
        <div className="flex items-center gap-x-4">
          <Link to="/user/journal">
            <Button variant="outline" className="mr-4 px-4 py-2">
              Cancel
            </Button>
          </Link>
          <Link to="/user/journal">
            <Button
              variant="secondary"
              className="px-4 py-2 bg-blue-500 text-white"
            >
              Save Journal
            </Button>
          </Link>
        </div>
      </div>
    </UserLayout>
  );
}
