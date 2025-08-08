import { Stack, Button, Typography, Box } from '@mui/material';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import BuildIcon from '@mui/icons-material/Build';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <Stack spacing={4} alignItems="center" textAlign="center" py={5}>
      <Box component="img" src="/art/hero.jpg" alt="Hero" loading="lazy" sx={{ maxWidth: '100%', borderRadius: 2 }} />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Typography variant="h3" gutterBottom>
          Lorcana Builder
        </Typography>
      </motion.div>
      <Typography>Search cards and build decks.</Typography>
      <Stack direction="row" spacing={2}>
        <Button variant="contained" startIcon={<ViewModuleIcon />} component={RouterLink} to="/cards">
          Browse Cards
        </Button>
        <Button variant="contained" startIcon={<BuildIcon />} component={RouterLink} to="/builder">
          Build a Deck
        </Button>
      </Stack>
    </Stack>
  );
}
