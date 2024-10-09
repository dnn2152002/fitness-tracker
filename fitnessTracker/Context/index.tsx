import React, { createContext, useState } from "react";
import Loader from "@/components/Loader";

interface AppContext {
  completed: Array<any>;
  setCompleted: React.Dispatch<React.SetStateAction<any>>;
  workout: number;
  setWorkout: React.Dispatch<React.SetStateAction<number>>;
  calories: number;
  setCalories: React.Dispatch<React.SetStateAction<number>>;
  minutes: number;
  setMinutes: React.Dispatch<React.SetStateAction<number>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const FitnessItems = createContext<AppContext>({
  completed: [],
  setCompleted: () => {},
  workout: 0,
  setWorkout: () => {},
  calories: 0,
  setCalories: () => {},
  minutes: 0,
  setMinutes: () => {},
  isLoading: false,
  setIsLoading: () => {},
});

const FitnessContext = ({ children }: any) => {
  const [completed, setCompleted] = useState([]);
  const [workout, setWorkout] = useState(0);
  const [calories, setCalories] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  return (
    <FitnessItems.Provider
      value={{
        completed,
        setCompleted,
        workout,
        setWorkout,
        calories,
        setCalories,
        minutes,
        setMinutes,
        isLoading,
        setIsLoading,
      }}
    >
      <>
        <Loader loading={isLoading} message="" />
        {children}
      </>
    </FitnessItems.Provider>
  );
};

export { FitnessContext, FitnessItems };
