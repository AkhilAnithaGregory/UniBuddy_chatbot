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

export const DailyCheckinDialog = () => {
  const year = new Date().getFullYear();
  const month = new Date().getMonth();
  const daysInCurrentMonth = new Date(year, month + 1, 0).getDate();
  const days = Array.from({ length: daysInCurrentMonth }, (_, i) => i + 1);
  return (
    <Dialog open={true}>
      <form>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Daily Checkin</DialogTitle>
            <DialogDescription>
              Mark the checking and increase the daily streak
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-5 gap-2">
            {days?.map((date) => (
              <div className="bg-blue-300 text-center py-2 rounded-md text-xl font-semibold select-none text-white">{date}</div>
            ))}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button className="w-full" type="submit">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};
