import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import { IJoke } from "../hooks/useJokes";

interface FrontPageProps {
  saveJoke?: (joke: IJoke) => boolean;
}

const FrontPage = ({ saveJoke }: FrontPageProps) => {
  const [joke, setJoke] = useState<IJoke | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchJoke = () => {
    const controller = new AbortController();
    setLoading(true);

    fetch("https://official-joke-api.appspot.com/random_joke", {
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch joke");
        }
        return res.json();
      })
      .then((data: IJoke) => {
        setJoke(data);
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          console.error(error);
        }
      })
      .finally(() => {
        setLoading(false);
      });

    return controller;
  };

  useEffect(() => {
    const controller = fetchJoke();

    return () => {
      controller.abort();
    };
  }, []);

  const handleSaveJoke = () => {
    if (joke && saveJoke) {
      saveJoke(joke);
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Button
        variant="contained"
        onClick={fetchJoke}
        sx={{ marginBottom: 2, marginRight: 2 }}
      >
        Get Joke
      </Button>

      {joke && saveJoke && (
        <Button
          variant="outlined"
          onClick={handleSaveJoke}
          sx={{ marginBottom: 2 }}
        >
          Save joke
        </Button>
      )}

      {loading && <Typography>Loading a joke...</Typography>}

      {!loading && joke && (
        <Card key={joke.id} sx={{ maxWidth: 500 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {joke.setup}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {joke.punchline}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default FrontPage;
