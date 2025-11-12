import { createFileRoute } from '@tanstack/react-router'
import { UserLayout } from '@/lib/layout/userLayout'
import { ModeToggle } from "@/components/ui/mode-toggle";

export const Route = createFileRoute('/settings/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <UserLayout>
    <h1>Settings</h1>
    <div>
      <span>Appearance</span>
      <ModeToggle/>
    </div>
  </UserLayout>
}
