
import { AuthProvider } from "../context/AuthContext";
import Header from "./Header";
import CssBaseline from "@mui/material/CssBaseline";
import { Container, Toolbar } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer";

function App() {
  const location = useLocation();
  const isHome = location.pathname === "/" || location.pathname === "/home";

  return (
    <AuthProvider>
      <CssBaseline />
      <Header />
      <Toolbar /> {/* Header yüksekliği kadar boşluk ekler */}
      {isHome ? (
        <Outlet />
      ) : (
        <Container disableGutters maxWidth={false} sx={{ mt: 0, px: 2 }}>
          <Outlet />
          </Container>
      )}
      <Footer />
    </AuthProvider>
  );
}

export default App;

