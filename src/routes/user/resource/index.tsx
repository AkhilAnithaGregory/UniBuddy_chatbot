import { createFileRoute } from "@tanstack/react-router";
import { UserLayout } from "@/lib/layout/userLayout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PageTitle } from "@/components/content/pageTitle";

export const Route = createFileRoute("/user/resource/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <UserLayout>
      <PageTitle title="Resources" />
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </UserLayout>
  );
}
