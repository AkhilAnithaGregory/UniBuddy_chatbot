import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuthStore } from "@/lib/store/authToken";
import { MarkDailyCheckin } from "@/lib/api"; 

interface CheckInContextType {
  streak: number | null;
  doCheckIn: () => Promise<void>;
}

const CheckInContext = createContext<CheckInContextType | undefined>(undefined);

export const CheckInProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const token = useAuthStore((state) => state.token);

  const [streak, setStreak] = useState<number | null>(() => {
    const saved = sessionStorage.getItem("streak");
    return saved ? parseInt(saved) : null;
  });

  const doCheckIn = async () => {
    if (!token) return; 

    try {
      const response = await MarkDailyCheckin();

      // Save streak in state and sessionStorage
      setStreak(response.streak);
      sessionStorage.setItem("streak", response.streak.toString());
    } catch (err) {
      console.error("CheckIn failed", err);
    }
  };

  useEffect(() => {
    if (token) {
      doCheckIn();
    }
  }, [token]);

  return (
    <CheckInContext.Provider value={{ streak, doCheckIn }}>
      {children}
    </CheckInContext.Provider>
  );
};

export const useCheckIn = () => {
  const context = useContext(CheckInContext);
  if (!context) throw new Error("useCheckIn must be used within CheckInProvider");
  return context;
};
