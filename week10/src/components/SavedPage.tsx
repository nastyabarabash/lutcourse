import { Card, CardContent, Typography, Box } from "@mui/material";
import { IJoke } from "../hooks/useJokes";

interface SavedPageProps {
  savedJokes: IJoke[];
}

const SavedPage = ({ savedJokes }: SavedPageProps) => {
  if (savedJokes.length === 0) {
    return <Typography>No saved jokes yet.</Typography>;
  }

  return (
    <Box sx={{ padding: 3 }}>
      {savedJokes.map((joke) => (
        <Card key={joke.id} sx={{ maxWidth: 500, mb: 2 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {joke.setup}
            </Typography>

            <Typography variant="body1" color="text.secondary">
              {joke.punchline}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default SavedPage;
