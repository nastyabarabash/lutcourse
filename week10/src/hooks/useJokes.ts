import { useState } from "react";

export interface IJoke {
  id: number;
  setup: string;
  punchline: string;
}

export const useJokes = () => {
  const [savedJokes, setSavedJokes] = useState<IJoke[]>([]);

  const saveJoke = (joke: IJoke): boolean => {
    setSavedJokes((prev) => {
      // prevent duplicates by id
      if (prev.some((j) => j.id === joke.id)) {
        return prev;
      }
      return [...prev, joke];
    });

    return true;
  };

  return {
    savedJokes,
    saveJoke,
  };
};
