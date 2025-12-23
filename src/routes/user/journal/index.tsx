import { createFileRoute, Link } from "@tanstack/react-router";
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
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { PageTitle } from "@/components/content/pageTitle";

export const Route = createFileRoute("/user/journal/")({
  component: RouteComponent,
});

function RouteComponent() {
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
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
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
          <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Test</TableCell>
            <TableCell>12-10-2025</TableCell>
            <TableCell className="flex items-center gap-x-4 justify-end">
              <RiDeleteBin6Line />
              <Link
                to="/user/journal/$journal_detail"
                params={{ journal_detail: "INV001" }}
              >
                <FaRegEdit />
              </Link>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </UserLayout>
  );
}
