import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Stack,
  Container,
  Box,
} from "@mui/material";
import BuildIcon from "@mui/icons-material/Build";
import InfoIcon from "@mui/icons-material/Info";
import CollectionsIcon from "@mui/icons-material/Collections";
import { Link as RouterLink } from "react-router-dom";

export default function Header() {
  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      sx={{ mb: 0, py: 1 }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <Box
            component={RouterLink}
            to="/"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <img
              src="/images/lorcana-logo.png"
              alt="Disney Lorcana Trading Card Game"
              style={{ height: 36, width: "auto", objectFit: "contain" }}
            />
          </Box>
          <Stack direction="row" spacing={1}>
            <Button
              color="inherit"
              startIcon={<BuildIcon />}
              component={RouterLink}
              to="/"
            >
              Builder
            </Button>
            <Button
              color="inherit"
              startIcon={<CollectionsIcon />}
              component={RouterLink}
              to="/decks"
            >
              Decks
            </Button>
            <Button
              color="inherit"
              startIcon={<InfoIcon />}
              component={RouterLink}
              to="/about"
            >
              About
            </Button>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
