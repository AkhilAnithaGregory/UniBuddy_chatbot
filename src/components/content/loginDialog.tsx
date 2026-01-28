import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { NavigationButton } from "@/components/content/navigationButton";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/lib/store/authToken";

const LOGOUT_DIALOG_KEY = "dialog_timestamp";

export const LoginDialog = () => {
  const token = useAuthStore((state) => state.token);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (token) {
      setOpen(false);
      return;
    }

    const hiddenUntil = localStorage.getItem(LOGOUT_DIALOG_KEY);
    const now = Date.now();

    if (!hiddenUntil || now > Number(hiddenUntil)) {
      setOpen(true);
    }
  }, [token]);

  const handleStayLogout = () => {
    const fifteenMinutesLater = Date.now() + 15 * 60 * 1000;
    localStorage.setItem(LOGOUT_DIALOG_KEY, fifteenMinutesLater.toString());
    setOpen(false);
  };

  if (!open) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Welcome back</DialogTitle>
            <DialogDescription>
              Login or Signup to get smarter response and save chat history.
            </DialogDescription>
          </DialogHeader>

          <div className="grid space-y-2">
            <NavigationButton path="/auth/login" variant="outline" name="Login" />
            <NavigationButton
              path="/auth/sign_up"
              variant="outline"
              name="Create New Account"
            />
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button className="w-full" type="button" onClick={handleStayLogout}>
                Stay Logout
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};
