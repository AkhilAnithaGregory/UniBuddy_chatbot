import { createFileRoute } from "@tanstack/react-router";
import { UserLayout } from "@/lib/layout/userLayout";
import { PageTitle } from "@/components/content/pageTitle";
import { DashboardCard } from "@/components/content/card";
import { useCheckIn } from "@/lib/context/checkInContext";

export const Route = createFileRoute("/_authenticated/user/dashboard/")({
  component: RouteComponent,
});

function RouteComponent() {
 const { streak } = useCheckIn();
  const date = new Date().toDateString();
    const moodAverage = localStorage.getItem("moodAverage");
  const stressLevel = localStorage.getItem("stressLevel");

  const moodTextMap = {
  1: "Very Sad",
  2: "Sad",
  3: "Neutral",
  4: "Happy",
  5: "Very Happy",
};

const stressTextMap = {
  1: "Very Low",
  2: "Low",
  3: "Medium",
  4: "High",
  5: "Very High",
};

const moodText = moodTextMap[moodAverage] || "--";
const stressText = stressTextMap[stressLevel] || "--";

  return (
    <UserLayout>
      <PageTitle title="Dashboard" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full text-white dark:text-black">
        <DashboardCard img="/elements/mood.png" value={moodText} />
        <DashboardCard img="/elements/stress.png" value={stressText} />
        <DashboardCard img="/elements/checkin.png" value={date} />
        <DashboardCard img="/elements/streak.png" value={streak === 1 ? `${streak} Day` : `${streak} Days`} />
      </div>
    </UserLayout>
  );
}
