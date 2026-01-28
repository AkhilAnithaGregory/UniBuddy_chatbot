import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { DeleteUser } from "@/lib/api"; // your API function
import { useAuthStore } from "@/lib/store/authToken";

export const RemoveDataPopUp = ({
  open,
  setOpen,
  modalType
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  modalType: "delete" | "clear" | null;
}) => {
  const navigate = useNavigate();
  const clearToken = useAuthStore((state) => state.clearAuth);

  const deleteMutation = useMutation({
    mutationFn: async () => {
      return DeleteUser();
    },
    onSuccess: () => {
      clearToken(); 
      navigate({ to: "/" }); 
    },
    onError: (err) => {
      console.error("Failed to delete user:", err);
    }
  });

  const handleAction = () => {
    if (modalType === "delete") {
      deleteMutation.mutate();
    } else {
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {modalType === "delete"
              ? "Delete your account?"
              : "Clear your chat history?"}
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone.{" "}
            {modalType === "delete"
              ? " Your account will be permanently deleted."
              : " All your chat history will be permanently deleted."}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            variant={modalType === "delete" ? "destructive" : "secondary"}
            onClick={handleAction}
            disabled={deleteMutation.isLoading}
          >
            {modalType === "delete" ? "Delete Account" : "Clear History"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
