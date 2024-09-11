import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
        gap: 2,
      }}
    >
      <Typography variant="h3" color="primary">
        404
      </Typography>
      <Typography variant="h5" color="text.secondary">
        Oops! Page not found.
      </Typography>
      <Button variant="contained" component={Link} to="/">
        Go Back Home
      </Button>
    </Box>
  );
}
