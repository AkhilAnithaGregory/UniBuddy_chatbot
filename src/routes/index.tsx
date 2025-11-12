import { createFileRoute } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import { IoSend } from "react-icons/io5";
import { useSidebar } from "@/lib/context/sidebar-context";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const {isSidebarOpen} = useSidebar();

  return (
    <div className={`${isSidebarOpen ? "pl-56" : "pl-28"} transition-all duration-300 relative basis-auto flex-col shrink flex justify-end max-sm:grow max-sm:justify-center sm:min-h-[42svh]`}>
      <h3 className="text-center my-2">Welcome Home!</h3>
      <div className="relative w-1/2 mx-auto">
        <Input multiple placeholder="Ask anything" className="py-4 focus:outline-none" />
        <button className="absolute top-4 right-3">
          <IoSend />
        </button>
      </div>
    </div>
  );
}