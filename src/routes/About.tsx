import { Stack, Typography, Box, Link } from '@mui/material';

export default function About() {
  return (
    <Stack spacing={2} py={4} alignItems="center" textAlign="center">
      <Box component="img" src="/art/hero.jpg" alt="Hero" loading="lazy" sx={{ maxWidth: '100%', borderRadius: 2 }} />
      <Typography variant="h4">About</Typography>
      <Typography>
        Data from{' '}
        <Link href="https://github.com/LorcanaJSON/LorcanaJSON" target="_blank" rel="noopener">
          LorcanaJSON
        </Link>
        . Not affiliated with Disney.
      </Typography>
    </Stack>
  );
}
