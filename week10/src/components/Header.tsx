import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {/* Logo / Title */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Lorem Ipsum
        </Typography>

        {/* Navigation buttons */}
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            color="inherit"
            component={Link}
            to="/"
          >
            home
          </Button>

          <Button
            color="inherit"
            component={Link}
            to="/saved"
          >
            saved
          </Button>

          {/* Language switch */}
          <Button color="inherit" onClick={() => changeLanguage("fi")}>
            FI
          </Button>

          <Button color="inherit" onClick={() => changeLanguage("en")}>
            EN
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;