import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { UserLayout } from "@/lib/layout/userLayout";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { PageTitle } from "@/components/content/pageTitle";
import { DeleteUserJournalById, GetUserJournal } from "@/lib/api";
import toast from "react-hot-toast";

export const Route = createFileRoute("/_authenticated/user/journal/")({
  component: RouteComponent,
});

function RouteComponent() {
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["journal"],
    queryFn: () => GetUserJournal(),
  });
  const deleteMutation = useMutation({
    mutationFn: (id: string) => DeleteUserJournalById(id),
    onSuccess: () => {
       toast.success("Deleted Successfully");
      queryClient.invalidateQueries(["journal"]);
    },
    onError: (err) => {
      console.error("Delete failed:", err);
    },
  });
  return (
    <UserLayout>
      <PageTitle title="Journal" />
      <Link
        to="/user/journal/$journal_detail"
        params={{ journal_detail: "add_journal" }}
      >
        <Button className="flex ml-auto mb-3">Add New Journal</Button>
      </Link>
      <Table>
        <TableCaption>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  disabled={data?.page === 1}
                />
              </PaginationItem>

              {Array.from(
                { length: data?.totalPage || 1 },
                (_, i) => i + 1,
              ).map((pageNumber) => (
                <PaginationItem key={pageNumber}>
                  <PaginationLink
                    href="#"
                    className={pageNumber === data?.page ? "font-bold" : ""}
                    onClick={() => setPage(pageNumber)}
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={() =>
                    setPage((prev) => Math.min(prev + 1, data?.totalPage || 1))
                  }
                  disabled={data?.page === data?.totalPage}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Sl.No</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="w-[100px]">Dated On</TableHead>
            <TableHead className="w-[100px] text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.journals?.map((item) => (
            <TableRow>
              <TableCell className="font-medium">
                {item._id?.slice(0, 5)}
              </TableCell>
              <TableCell>{item.title}</TableCell>
              <TableCell>{item.date}</TableCell>
              <TableCell className="flex items-center gap-x-4 justify-end">
                <RiDeleteBin6Line
                  onClick={() => deleteMutation.mutate(item._id)}
                />
                <Link
                  to="/user/journal/$journal_detail"
                  params={{ journal_detail: item._id }}
                >
                  <FaRegEdit />
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </UserLayout>
  );
}
