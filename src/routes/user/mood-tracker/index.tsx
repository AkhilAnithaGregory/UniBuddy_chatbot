import { createFileRoute } from "@tanstack/react-router";
import { UserLayout } from "@/lib/layout/userLayout";
import {
  CgSmileMouthOpen,
  CgSmile,
  CgSmileNeutral,
  CgSmileSad,
} from "react-icons/cg";
import { FaRegFaceSadTear } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { PageTitle } from "@/components/content/pageTitle";

export const Route = createFileRoute("/user/mood-tracker/")({
  component: RouteComponent,
});

function RouteComponent() {
  const questions = [
    "How are you feeling today?",
    "How stressed are you today?",
    "How relaxed are you at this moment?",
    "How well did you sleep last night?",
    "How supported did you feel by others today?",
    "How excited do you feel right now?",
  ];
  return (
    <UserLayout>
      <PageTitle title="Mood Tracker" />
      <div className="p-3 my-2 shadow-lg rounded-md">
        {questions?.map((question, index) => (
          <div key={index + 1}>
            <h1 className="font-semibold">{question}</h1>
            <div className="flex items-center gap-x-4 my-2">
              <CgSmileMouthOpen size="30" />
              <CgSmile className="bg-yellow-400 rounded-full" size="30" />
              <CgSmileNeutral size="30" />
              <CgSmileSad size="30" />
              <FaRegFaceSadTear size="25" />
            </div>
          </div>
        ))}
        <Button variant="secondary" className="mt-4">Submit</Button>
      </div>
    </UserLayout>
  );
}
