import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { nanoid } from "nanoid";

export const RateLimitedDialog = ({ dialog, setDialog }) => {
  const refreshPage = () => {
    const newConversationId = nanoid();
    const newUserId = nanoid();
    sessionStorage.removeItem("chat-session");
    sessionStorage.setItem("cid", newConversationId);
    sessionStorage.setItem("uid", newUserId);
    setDialog(false);
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  return (
    <Dialog open={dialog} onOpenChange={setDialog}>
      <form>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Rate Limit Reached</DialogTitle>
            <DialogDescription>
              You have reached the maximum amount of chat
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-5 gap-2"></div>
          <DialogFooter>
            <DialogClose asChild>
              <Button onClick={refreshPage} className="w-full" type="submit">
                New Chat
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};
