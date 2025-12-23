import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
    
export const RemoveDataPopUp = ({ open, setOpen, modalType } : { open: boolean; setOpen: (open: boolean) => void, modalType: 'delete' | 'clear' | null }) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{modalType === 'delete' ? 'Delete your account?' : 'Clear your chat history?'}</DialogTitle>
          <DialogDescription>
            This action cannot be undone. {modalType === 'delete' ? ' Your account will be permanently deleted.' : ' All your chat history will be permanently deleted.'}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant={modalType === 'delete' ? 'destructive' : 'secondary'} onClick={() => {
            setOpen(false);
          }}>
            {modalType === 'delete' ? 'Delete Account' : 'Clear History'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
