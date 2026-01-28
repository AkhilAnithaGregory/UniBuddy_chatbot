import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
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
import MoodResult from "@/lib/json/moodResult.json";

export const Route = createFileRoute("/_authenticated/user/mood-tracker/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [showRating, setShowRating] = useState(false);
  const [resultImage, setResultImage] = useState(null);
  const [resultMessage, setResultMessage] = useState("");

  const moodAverage = localStorage.getItem("moodAverage");
  const stressLevel = localStorage.getItem("stressLevel");
  useEffect(() => {
    if (moodAverage) {
      const mood = MoodResult[moodAverage];
      const randomMessage = getRandomMessage(mood.messages);
      setResultMessage(randomMessage);
      setResultImage(mood.image);
      setShowRating(true);
    }
  },[]);

  const questions = [
    "How are you feeling today?",
    "How stressed are you today?",
    "How relaxed are you at this moment?",
    "How well did you sleep last night?",
    "How supported did you feel by others today?",
    "How excited do you feel right now?",
  ];

  const [selectedValues, setSelectedValues] = useState(
    new Array(questions.length).fill(null),
  );

  const calculateAverage = () => {
    if (selectedValues.includes(null)) return null;
    return (
      selectedValues.reduce((acc, current) => acc + current, 0) /
      selectedValues.length
    ).toFixed(2);
  };

  const getFinalRating = () => {
    const avg = calculateAverage();
    if (!avg) return null;
    return Math.min(5, Math.max(1, Math.round(avg)));
  };

  const getRandomMessage = (messages) =>
    messages[Math.floor(Math.random() * messages.length)];

  const handleSubmit = () => {
    const rating = getFinalRating();
    if (!rating) return;

    const mood = MoodResult[rating];
    const randomMessage = getRandomMessage(mood.messages);

    localStorage.setItem("moodAverage", rating);

    const stressQuestionIndex = questions.findIndex(
      (q) => q === "How stressed are you today?",
    );
    if (stressQuestionIndex !== -1) {
      const stressValue = selectedValues[stressQuestionIndex];
      localStorage.setItem("stressLevel", stressValue);
    }

    // Set state to display result
    setResultMessage(randomMessage);
    setResultImage(mood.image);
    setShowRating(true);
  };
  
  return (
    <UserLayout>
      <PageTitle title="Mood Tracker" />
      {showRating || moodAverage ? (
        <div className="flex flex-col items-center gap-4 p-6">
          <img
            src={resultImage ? resultImage : ""}
            alt="Mood result"
            className="w-24 h-24"
          />
          <h2 className="text-lg font-semibold">
            Mood Score: {Math.round(Number(calculateAverage())) || moodAverage}/5
          </h2>
          <p className="text-center text-gray-600 max-w-md">{resultMessage}</p>
        </div>
      ) : (
        <div className="p-3 my-2 shadow-lg rounded-md">
          {questions?.map((question, index) => (
            <div key={index + 1}>
              <h1 className="font-semibold">{question}</h1>
              <div className="flex items-center gap-x-4 my-2">
                {[
                  <CgSmileMouthOpen size="30" key="1" />,
                  <CgSmile size="30" key="2" />,
                  <CgSmileNeutral size="30" key="3" />,
                  <CgSmileSad size="30" key="4" />,
                  <FaRegFaceSadTear size="25" key="5" />,
                ].map((icon, iconIndex) => (
                  <div
                    key={iconIndex + 1}
                    className="rounded-full p-2 hover:bg-gray-200"
                    onClick={() =>
                      setSelectedValues((prevValues) => {
                        const newValues = [...prevValues];
                        newValues[index] = iconIndex + 1;
                        return newValues;
                      })
                    }
                    style={{
                      backgroundColor:
                        selectedValues[index] === iconIndex + 1 ? "yellow" : "",
                    }}
                  >
                    {icon}
                  </div>
                ))}
              </div>
            </div>
          ))}
          <Button
            disabled={calculateAverage() === null}
            onClick={handleSubmit}
            variant="secondary"
            className="mt-4"
          >
            Submit
          </Button>
        </div>
      )}
    </UserLayout>
  );
}
