import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { UserLayout } from "@/lib/layout/userLayout";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Label } from "@/components/ui/label";
import { RemoveDataPopUp } from "@/components/content/removeDataPopUp";
import { Button } from "@/components/ui/button";
import { PageTitle } from "@/components/content/pageTitle";

export const Route = createFileRoute("/settings/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState<'delete' | 'clear' | null>(null);
  return (
    <UserLayout>
      <PageTitle title="Settings" />
      <div>
        <h2 className="text-lg">Preferences</h2>
        <ul className="space-y-3 sm:px-10 my-4">
          <li className="flex items-center justify-between">
            <Label htmlFor="toggle">Enable Dark Theme</Label>
            <ModeToggle />
          </li>
         {/*  <li className="flex items-center justify-between">
            <Label htmlFor="email_notification">Email Notifications</Label>
            <Switch id="email_notification" />
          </li> */}
        </ul>
      </div>
      <div>
        <h2 className="text-lg">Account</h2>
        <ul className="space-y-3 sm:px-10 my-4">
          <li className="flex items-center justify-between">
           <Link to="/user/change_password">Change Password</Link>
          </li>
         {/*  <li className="flex items-center justify-between">
            <Button variant='secondary' onClick={() => { setOpen(true); setModalType('clear'); }}>Clear Chat History</Button>
          </li> */}
          <li className="flex items-center justify-between">
            <Button variant='destructive' onClick={() => { setOpen(true); setModalType('delete'); }}>Delete Account</Button>
          </li>
        </ul>
      </div>
      <div>
        <h2 className="text-lg">Privacy</h2>
        <ul className="space-y-3 sm:px-10 my-4">
          <li className="flex items-center justify-between">
            <Link to="/support/privacy_policy">Privacy Policy</Link>
          </li>
          <li className="flex items-center justify-between">
            <Link to="/support/terms_and_conditions">Terms and Condition</Link>
          </li>
        </ul>
      </div>
      <RemoveDataPopUp open={open} setOpen={setOpen} modalType={modalType} />
    </UserLayout>
  );
}
