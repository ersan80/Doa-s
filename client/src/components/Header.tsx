import { useState } from "react";
import {
  ShoppingCart,
  Menu as MenuIcon,
  Logout,
  Dashboard,
  Help,
  Info,
  ListAlt,
} from "@mui/icons-material";
import {
  AppBar,
  Badge,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  useMediaQuery,
  Avatar,
  Divider,
  Popover,
  Typography,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { useUser } from "../hooks/useUser";
import { useAuth } from "../context/AuthContext";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

// modern fontlar
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter-tight/500.css"
import "@fontsource/poppins/500.css"
import "@fontsource/outfit/500.css"
const brandBrown = "#b87333";

export default function Header() {
  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 0 });
  const { token, logout } = useAuth();
  const { user } = useUser(token);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const email = user?.email ?? "";

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

  // @ sonrasını kaldır, nokta ve alt çizgiyi boşluk yap
  const displayName = email
    ? email.split("@")[0].replace(/[._-]/g, " ").trim().replace(/\s+/g, " ")
    : "Guest";

  const drawerLinks = token
    ? [
      { title: "All Orders", path: "/orders", icon: <ListAlt /> },
      { title: "User Info", path: "/profile", icon: <Info /> },
      { title: "Help", path: "/help", icon: <Help /> },
      { title: "Dashboard", path: "/dashboard", icon: <Dashboard /> },
      {
        title: "Logout",
        icon: <Logout />,
        action: () => {
          logout();
          window.location.href = "/login";
        },
      },
    ]
    : [
      { title: "Login", path: "/login", icon: <Info /> },
      { title: "Sign Up", path: "/register", icon: <ListAlt /> },
    ];

  const renderDrawerItem = (item: any, idx: number) => (
    <ListItem
      key={idx}
      onClick={() => {
        if (item.action) item.action();
        handleClose();
        setDrawerOpen(false);
      }}
      component={item.path ? NavLink : "div"}
      to={item.path || ""}
      sx={{
        "&:hover": { backgroundColor: "#f0f0f0" },
        "& .MuiListItemIcon-root": { color: brandBrown },
        "& .MuiListItemText-primary": { fontWeight: 500 },
      }}
    >
      {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
      <ListItemText primary={item.title} />
    </ListItem>
  );
  
  const { getTotalCount } = useCart(); // ✅ sepet sayısı için
  const navigate = useNavigate(); // ✅ yönlendirme için
  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#fff",
          boxShadow: trigger ? 2 : 0,
          transition: "box-shadow 0.3s ease",
          fontFamily: "Inter, sans-serif",
          height: 64,
          display: "flex",
          justifyContent: "center",
          overflowX: "hidden", // 🔧 mobil taşmayı engeller
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
            px: { xs: 1.5, md: 4 },
            minHeight: "64px !important",
            width: "100%",
            maxWidth: "100vw", // 🔧 ekstra taşmaları önler
          }}
        >
          {/* SOL: Logo + Menü */}
          <Stack
            direction="row"
            alignItems="center"
            spacing={{ xs: 1, md: 2 }}
            sx={{ flexShrink: 1, minWidth: 0 }}
          >
            <Box
              component={NavLink}
              to="/home"
              sx={{
                display: "flex",
                alignItems: "center",
                height: "100%",
                flexShrink: 0,
              }}
            >
              <Box
                component="img"
                src="./logo.png"
                alt="DOA'S CEZVE"
                sx={{
                  height: { xs: 38, sm: 42 },
                  width: "auto",
                  objectFit: "contain",
                  transition: "transform 0.25s ease",
                  "&:hover": { transform: "scale(1.05)" },
                }}
              />
            </Box>

            {/* Masaüstü Menü */}
            {!isMobile && (
              <Stack direction="row" spacing={2} sx={{ ml: 1 }}>
                {["Home", "About Doa's Cezve", "Blog", "Shop"].map(
                  (title, idx) => (
                    <Button
                      key={idx}
                      component={NavLink}
                      to={`/${title.toLowerCase().replace(" ", "")}`}
                      sx={{
                        color: "#000",
                        textTransform: "none",
                        fontWeight: 400,
                        fontSize: "1rem",
                        "&.active": {
                          color: brandBrown,
                          fontWeight: 600,
                          borderBottom: `2px solid ${brandBrown}`,
                        },
                        "&:hover": { color: brandBrown },
                      }}
                    >
                      {title}
                    </Button>
                  )
                )}
              </Stack>
            )}
          </Stack>

          {/* SAĞ: Sepet + Avatar + Menü */}
          <Stack direction="row" alignItems="center" spacing={1}>
            <IconButton size="large" component={NavLink} to="/orders">
              <Badge
                badgeContent={getTotalCount()} // ✅ dinamik sayı
                sx={{
                  "& .MuiBadge-badge": { backgroundColor: brandBrown },
                }}
              >
                <ShoppingCart sx={{ color: "#000" }} />
              </Badge>
            </IconButton>

            {/* Avatar masaüstü */}
            {!isMobile && (
              <Avatar
                alt={displayName}
                sx={{
                  width: 38,
                  height: 38,
                  cursor: "pointer",
                  "&:hover": { boxShadow: 2 },
                }}
                onClick={handleAvatarClick}
              >
                {displayName.charAt(0).toUpperCase()}
              </Avatar>
            )}

            {/* Hamburger Menü mobil */}
            {isMobile && (
              <IconButton onClick={() => setDrawerOpen(true)}>
                <MenuIcon sx={{ color: "#000" }} />
              </IconButton>
            )}
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Avatar Popover */}
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Box sx={{ p: 2, minWidth: 220 }}>
          <Typography
            variant="subtitle1"
            sx={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 500,
              fontSize: "1.05rem",
              textAlign: "center",
              color: "#d05d5d",
            }}
          >
            Welcome, {displayName}
          </Typography>
          <Divider sx={{ mb: 1 }} />
          <List>{drawerLinks.map(renderDrawerItem)}</List>
        </Box>
      </Popover>

      {/* Mobil Drawer Menü */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        ModalProps={{ keepMounted: true }}
      >
        <Box sx={{ width: 260, p: 2 }}>
          <Box sx={{ textAlign: "center", mb: 2 }}>
            <img
              src="./logo.png"
              alt="DOA'S CEZVE"
              style={{ width: 100, height: "auto", objectFit: "contain" }}
            />
          </Box>
          <Divider sx={{ mb: 2 }} />
          <List>
            {["Home", "About Doa's Cezve", "Blog", "Shop"].map((title, idx) => (
              <ListItem
                key={idx}
                component={NavLink}
                to={`/${title.toLowerCase().replace(" ", "")}`}
                onClick={() => setDrawerOpen(false)}
                sx={{
                  "& .MuiListItemText-primary": { fontWeight: 500 },
                  "&:hover": { backgroundColor: "#f5f5f5" },
                }}
              >
                <ListItemText primary={title} />
              </ListItem>
            ))}
          </List>
          <Divider sx={{ mt: 2, mb: 1 }} />
          <List>{drawerLinks.map(renderDrawerItem)}</List>
        </Box>
      </Drawer>
    </>
  );
}
