import { AppBar, Toolbar, Typography, Button, Stack, Container } from '@mui/material';
import BuildIcon from '@mui/icons-material/Build';
import InfoIcon from '@mui/icons-material/Info';
import CollectionsIcon from '@mui/icons-material/Collections';
import { Link as RouterLink } from 'react-router-dom';

export default function Header() {
  return (
    <AppBar position="static" color="transparent" elevation={0} sx={{ mb: 2 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" component={RouterLink} to="/" color="inherit" sx={{ textDecoration: 'none' }}>
            Lorcana
          </Typography>
          <Stack direction="row" spacing={1}>
            <Button color="inherit" startIcon={<BuildIcon />} component={RouterLink} to="/">
              Builder
            </Button>
            <Button color="inherit" startIcon={<CollectionsIcon />} component={RouterLink} to="/decks">
              Decks
            </Button>
            <Button color="inherit" startIcon={<InfoIcon />} component={RouterLink} to="/about">
              About
            </Button>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
