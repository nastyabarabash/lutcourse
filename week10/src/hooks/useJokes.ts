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
      if (prev.some((j) => j.id === joke.id)) {
        return prev;
      }
      return [...prev, joke];
    });

    return true;
  };

  // ✅ NEW delete functionality
  const deleteJoke = (id: number): void => {
    setSavedJokes((prev) => prev.filter((joke) => joke.id !== id));
  };

  return {
    savedJokes,
    saveJoke,
    deleteJoke,
  };
};
