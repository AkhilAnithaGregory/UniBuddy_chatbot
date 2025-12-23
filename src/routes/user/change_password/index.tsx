import { createFileRoute } from '@tanstack/react-router'
import { UserLayout } from '@/lib/layout/userLayout'
import { Label } from '@radix-ui/react-label'
import { PageTitle } from '@/components/content/pageTitle'

export const Route = createFileRoute('/user/change_password/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
  <UserLayout>
    <PageTitle title="Change Password" />
    <div>
        <div>
            <Label htmlFor="current_password">Current Password</Label>
            <input type="password" id="current_password" className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:outline-none px-3 py-2"/>
        </div>
        <div>
            <Label htmlFor="new_password">New Password</Label>
            <input type="password" id="new_password" className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:outline-none px-3 py-2"/>
        </div>
        <div>
            <Label htmlFor="confirm_new_password">Confirm New Password</Label>
            <input type="password" id="confirm_new_password" className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:outline-none px-3 py-2"/>
        </div>
        <div className="mt-4">
            <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90">Change Password</button> 
        </div>
    </div>
  </UserLayout>
)
}
