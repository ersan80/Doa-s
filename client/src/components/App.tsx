import { AuthProvider } from "../context/AuthContext";
import { CartProvider } from "../context/CartContext"; // ✅ ekle
import Header from "./Header";
import CssBaseline from "@mui/material/CssBaseline";
import { Container, Toolbar } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer";
import DiscountPopup from "../pages/DiscountPopup";

function App() {
  const location = useLocation();
  const isHome = location.pathname === "/" || location.pathname === "/home";

  return (
    <AuthProvider>
      <CartProvider> {/* ✅ sepet context sarmalayıcı */}
        <CssBaseline />
        <Header />
        <DiscountPopup />
        <Toolbar />
        {isHome ? (
          <Outlet />
        ) : (
          <Container disableGutters maxWidth={false} sx={{ mt: 0, px: 2 }}>
            <Outlet />
          </Container>
        )}
        <Footer />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;

