import { createFileRoute, Link, useParams, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { UserLayout } from "@/lib/layout/userLayout";
import { Button } from "@/components/ui/button";
import { PageTitle } from "@/components/content/pageTitle";
import { CreateJournal, UpdateUserJournal, GetUserJournalById } from "@/lib/api"; // your API functions
import toast from "react-hot-toast";

export const Route = createFileRoute("/_authenticated/user/journal/$journal_detail")({
  component: RouteComponent,
});

function RouteComponent() {
  const journal_detail = useParams({ from: "/_authenticated/user/journal/$journal_detail" });
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (journal_detail.journal_detail !== "add_journal") {
      GetUserJournalById(journal_detail.journal_detail)
        .then((res) => {
          setTitle(res.title);
          setDate(res.date);
          setContent(res.content);
        })
        .catch((err) => {
          console.error(err);
          toast.error("Failed to load journal");
        });
    }
  }, [journal_detail]);

  const mutation = useMutation({
    mutationFn: async () => {
      const body = { title, date, content };
      if (journal_detail.journal_detail !== "add_journal") {
        return UpdateUserJournal(body,journal_detail.journal_detail); 
      } else {
        return CreateJournal(body);
      }
    },
    onSuccess: () => {
      toast.success(journal_detail ? "Journal updated successfully" : "Journal created successfully");
      navigate({to : "/user/journal"});
    },
    onError: (err: any) => {
      console.error(err);
      toast.error(err?.message || "Something went wrong");
    },
  });

  const handleSave = () => {
    if (!title || !date || !content) {
      toast.error("Please fill all fields");
      return;
    }
    mutation.mutate();
  };

  return (
    <UserLayout>
      <PageTitle title={journal_detail ? "Edit Journal" : "Create Journal"} />
      <div className="mt-5 flex flex-col gap-4">
        <input
          type="text"
          placeholder="Journal Title"
          className="p-2 border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Date (e.g., 12-10-2025)"
          className="p-2 border rounded"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <textarea
          placeholder="Journal Content"
          className="p-2 border rounded w-full h-40"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>

        <div className="flex items-center gap-x-4">
          <Link to="/user/journal">
            <Button variant="outline" className="px-4 py-2">
              Cancel
            </Button>
          </Link>
          <Button
            variant="secondary"
            className="px-4 py-2 bg-blue-500 text-white"
            onClick={handleSave}
            disabled={mutation.isLoading}
          >
            {mutation.isLoading
              ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>
    </UserLayout>
  );
}
