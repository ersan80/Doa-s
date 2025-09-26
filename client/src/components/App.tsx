import { AuthProvider } from '../context/AuthContext';
import Header from './Header';
import CssBaseline from '@mui/material/CssBaseline';
import { Container } from '@mui/material';
import { Outlet } from 'react-router';

function App() {
  return (
    <AuthProvider>
      <CssBaseline />
      <Header />
      <Container>
        <Outlet />
      </Container>
    </AuthProvider>
  );
}

export default App;