import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import dogo from "../../styles/dogo.png";
import Image from "next/image";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useRouter } from "next/router";

export const Navbar = ({ toggleTheme }: { toggleTheme: () => void }) => {
  const router = useRouter();

  return (
    <AppBar position="sticky" enableColorOnDark>
      <Toolbar>
        <IconButton
          onClick={() => router.push("/")}
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <Image src={dogo} height="32px" width="32px" />
        </IconButton>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, color: "white" }}
        >
          Kinda Kona
        </Typography>
        <IconButton onClick={toggleTheme}>
          <LightModeIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
