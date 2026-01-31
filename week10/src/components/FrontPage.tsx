import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";

type Joke = {
  id: number;
  setup: string;
  punchline: string;
};

const FrontPage = () => {
  const [joke, setJoke] = useState<Joke | null>(null);
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
      .then((data: Joke) => {
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

    // Cleanup with AbortController
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <Box sx={{ padding: 3 }}>
      <Button
        variant="contained"
        onClick={fetchJoke}
        sx={{ marginBottom: 3 }}
      >
        Get Joke
      </Button>

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
