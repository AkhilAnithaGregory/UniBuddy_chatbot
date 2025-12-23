import { createFileRoute } from '@tanstack/react-router'
import { UserLayout } from '@/lib/layout/userLayout'
import { PageTitle } from '@/components/content/pageTitle'

export const Route = createFileRoute('/user/dashboard/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
  <UserLayout>
    <PageTitle title="User Dashboard" />
  </UserLayout>
)
}
