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
import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";

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

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#fff",
          boxShadow: trigger ? 2 : 0,
          transition: "box-shadow 0.3s ease",
          fontFamily: "Poppins, sans-serif",
          height: 64, // sabit yükseklik
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
            px: { xs: 1, sm: 2 }, // kenar boşluklarını azalttık
            minHeight: "60px !important",
            width: "100%",
            maxWidth: "100vw",
            overflow: "hidden",
          }}
        >
          {/* SOL: Logo */}
          <Box
            component={NavLink}
            to="/home"
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box
              component="img"
              src="./logo.png"
              alt="DOA'S CEZVE"
              sx={{
                height: { xs: 38, sm: 44 },
                width: "auto",
                objectFit: "contain",
                ml: { xs: 0, sm: 1 }, // sola yaklaştır
                transition: "transform 0.25s ease",
                "&:hover": { transform: "scale(1.04)" },
              }}
            />
          </Box>

          {/* SAĞ: Sepet + Avatar / Menü */}
          <Stack
            direction="row"
            alignItems="center"
            spacing={0.5}
            sx={{
              pr: { xs: 0.5, sm: 1 }, // sağ boşluğu azalttık
            }}
          >
            <IconButton size="large">
              <Badge
                badgeContent={2}
                sx={{
                  "& .MuiBadge-badge": { backgroundColor: "#b87333" },
                }}
              >
                <ShoppingCart sx={{ color: "#000", fontSize: 22 }} />
              </Badge>
            </IconButton>

            {isMobile ? (
              <IconButton onClick={() => setDrawerOpen(true)} sx={{ p: 0.5 }}>
                <MenuIcon sx={{ color: "#000", fontSize: 26 }} />
              </IconButton>
            ) : (
              <Avatar
                src="./profile.jpg"
                alt={email}
                sx={{
                  width: 36,
                  height: 36,
                  cursor: "pointer",
                  "&:hover": { boxShadow: 2 },
                }}
                onClick={handleAvatarClick}
              />
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
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, textAlign: "center" }}>
            Welcome, {user?.name ?? email}
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
            <img src="./logo.png" alt="DOA'S CEZVE" style={{ width: 90 }} />
          </Box>
          <Divider sx={{ mb: 2 }} />
          <List>
            {["Home", "About Doa's Cezve", "Blog", "Shop"].map((title, idx) => (
              <ListItem
                key={idx}
                component={NavLink}
                to={`/${title.toLowerCase().replaceAll(" ", "")}`}
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
