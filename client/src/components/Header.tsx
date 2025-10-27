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

// ✅ Modern fontlar
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";

interface User {
  name?: string;
  isEmailConfirmed?: boolean;
  email?: string;
}

// İsim formatlama
const formatName = (value: string | undefined): string => {
  if (!value) return "";
  let clean = value.split("@")[0];
  clean = clean.replace(/[._-]/g, " ");
  clean = clean.trim().replace(/\s+/g, " ");
  return clean
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
};

export default function Header() {
  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 0 });
  const { token, logout } = useAuth();
  const { user } = useUser(token);
  const name = user?.name ?? "";
  const email = user?.email ?? "";
  const displayName = name || email;

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const brandBrown = "#b87333";

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

  interface DrawerLink {
    title: string;
    path?: string;
    icon?: JSX.Element;
    action?: () => void;
  }

  const drawerLinks: DrawerLink[] = token
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

  const renderDrawerItem = (item: DrawerLink, idx: number) => (
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
        "&:hover": { backgroundColor: "#f9f9f9" },
        "& .MuiListItemIcon-root": { color: brandBrown },
        "& .MuiListItemText-primary": {
          fontWeight: 500,
          fontFamily: "Poppins, sans-serif",
        },
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
          boxShadow: trigger ? 3 : 0,
          transition: "box-shadow 0.3s ease",
          fontFamily: "Poppins, sans-serif",
        }}
      >
        <Toolbar
          sx={{
            px: { xs: 1, sm: 3 },
            justifyContent: "space-between",
            alignItems: "center",
            height: 72,
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          {/* ✅ Logo hizalaması düzeltildi */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: 56,
            }}
            component={NavLink}
            to="/home"
          >
            <Avatar
              src="./logo.png"
              alt="DOA"
              sx={{
                width: 64,
                height: 64,
                bgcolor: "#fff",
                border: "1px solid #ddd",
                boxShadow: 1,
                objectFit: "contain",
                padding: "4px",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": { transform: "scale(1.07)", boxShadow: 2 },
              }}
            />
          </Box>

          {/* Menü */}
          {!isMobile && (
            <Stack
              direction="row"
              spacing={3.5}
              sx={{
                ml: 3,
                flexGrow: 1,
                justifyContent: "flex-start",
                "& a": {
                  textTransform: "none",
                  fontWeight: 500,
                  fontSize: "1.05rem",
                  letterSpacing: "0.4px",
                  color: "#222",
                  fontFamily: "Poppins, sans-serif",
                  position: "relative",
                  "&:hover": {
                    color: brandBrown,
                  },
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: -4,
                    left: 0,
                    width: "0%",
                    height: "2px",
                    backgroundColor: brandBrown,
                    transition: "width 0.3s ease",
                  },
                  "&:hover::after": { width: "100%" },
                  "&.active": {
                    color: brandBrown,
                    fontWeight: 600,
                    "&::after": { width: "100%" },
                  },
                },
              }}
            >
              {["Home", "About Doa's Cezve", "Blog", "Shop"].map((title, idx) => (
                <Button
                  key={idx}
                  component={NavLink}
                  to={`/${title.toLowerCase().replace(/\s+/g, "")}`}
                >
                  {title}
                </Button>
              ))}
            </Stack>
          )}

          {/* Sağ taraf */}
          <Stack direction="row" spacing={1} alignItems="center">
            <IconButton size="large">
              <Badge
                badgeContent={2}
                sx={{ "& .MuiBadge-badge": { backgroundColor: brandBrown } }}
              >
                <ShoppingCart sx={{ color: "#000" }} />
              </Badge>
            </IconButton>

            {isMobile ? (
              <IconButton onClick={() => setDrawerOpen(true)}>
                <MenuIcon />
              </IconButton>
            ) : (
              <Box>
                <Avatar
                  src="./profile.jpg"
                  alt={email}
                  sx={{
                    width: 40,
                    height: 40,
                    cursor: "pointer",
                    "&:hover": { boxShadow: 2 },
                  }}
                  onClick={handleAvatarClick}
                />
                <Popover
                  open={Boolean(anchorEl)}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                >
                  <Box sx={{ p: 2, minWidth: 220 }}>
                    {token && (
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 600,
                          mb: 1,
                          textAlign: "center",
                          fontFamily: "Poppins, sans-serif",
                        }}
                      >
                        Welcome, {formatName(displayName)}
                      </Typography>
                    )}
                    <Divider sx={{ mb: 1 }} />
                    <List>{drawerLinks.map(renderDrawerItem)}</List>
                  </Box>
                </Popover>
              </Box>
            )}
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Mobil Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        ModalProps={{ keepMounted: true }}
      >
        <Box sx={{ width: { xs: "80vw", sm: 260 }, p: 2 }}>
          <Avatar
            src="./logo.png"
            alt="DOA'S CEZVE"
            sx={{ width: 72, height: 72, m: "0 auto", mb: 2 }}
          />
          <Divider />
          <List>{drawerLinks.map(renderDrawerItem)}</List>
        </Box>
      </Drawer>
    </>
  );
}
