import { createFileRoute } from '@tanstack/react-router'
import { UserLayout } from '@/lib/layout/userLayout'
import { PageTitle } from '@/components/content/pageTitle'

export const Route = createFileRoute('/support/terms_and_conditions/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
  <UserLayout>
    <PageTitle title="Terms and Conditions" />
  </UserLayout>
)
}
