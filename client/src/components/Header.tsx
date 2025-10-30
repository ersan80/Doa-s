import { useState, useEffect } from "react";
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
import { NavLink, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { useUser } from "../hooks/useUser";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import useScrollTrigger from "@mui/material/useScrollTrigger";

const brandBrown = "#b87333";

export default function Header() {
  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 0 });
  const { token, logout, isAdmin } = useAuth();
  const { user } = useUser(token);
  const { getTotalCount } = useCart();
  const navigate = useNavigate();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [profile, setProfile] = useState<{ name?: string; avatar?: string | null }>({});

  const email = user?.email ?? "";
  const displayName = email
    ? email.split("@")[0].replace(/[._-]/g, " ").trim().replace(/\s+/g, " ")
    : "Guest";

  // 🔄 Profil foto ve isim localStorage’dan sürekli dinle
  useEffect(() => {
    const loadProfile = () => {
      const stored = JSON.parse(localStorage.getItem("userProfile") || "{}");
      if (stored.email === email) {
        setProfile({ name: stored.name, avatar: stored.avatar });
      } else {
        setProfile({});
      }
    };
    loadProfile();
    window.addEventListener("profile-updated", loadProfile);
    return () => window.removeEventListener("profile-updated", loadProfile);
  }, [email]);

  const drawerLinks = token
    ? [
      { title: "All Orders", path: "/orders", icon: <ListAlt /> },
      { title: "User Info", path: "/profile", icon: <Info /> },
      { title: "Help", path: "/help", icon: <Help /> },
      ...(isAdmin
        ? [{ title: "Dashboard", path: "/dashboard", icon: <Dashboard /> }]
        : []),
      {
        title: "Logout",
        icon: <Logout />,
        action: () => {
          logout();
          navigate("/login", { replace: true });
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

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

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
          justifyContent: "center",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", px: { xs: 1.5, md: 4 } }}>
          {/* LEFT */}
          <Stack direction="row" alignItems="center" spacing={{ xs: 1, md: 2 }}>
            <Box
              component={NavLink}
              to="/home"
              sx={{
                display: "flex",
                alignItems: "center",
                height: "100%",
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
                  "&:hover": { transform: "scale(1.05)" },
                }}
              />
            </Box>

            {!isMobile && (
              <Stack direction="row" spacing={2}>
                {["Home", "About Doa's Cezve", "Blog", "Shop"].map((title, idx) => (
                  <Button
                    key={idx}
                    component={NavLink}
                    to={`/${title.toLowerCase().replace(" ", "")}`}
                    sx={{
                      color: "#000",
                      textTransform: "none",
                      fontWeight: 400,
                      "&.active": { color: brandBrown, borderBottom: `2px solid ${brandBrown}` },
                      "&:hover": { color: brandBrown },
                    }}
                  >
                    {title}
                  </Button>
                ))}
              </Stack>
            )}
          </Stack>

          {/* RIGHT */}
          <Stack direction="row" alignItems="center" spacing={1}>
            <IconButton size="large" component={NavLink} to="/checkout">
              <Badge
                badgeContent={getTotalCount()}
                sx={{ "& .MuiBadge-badge": { backgroundColor: brandBrown } }}
              >
                <ShoppingCart sx={{ color: "#000" }} />
              </Badge>
            </IconButton>

            {/* ✅ Profil foto veya isim baş harfi */}
            {!isMobile && (
              <Avatar
                src={profile.avatar || ""}
                alt={profile.name || displayName}
                sx={{
                  width: 38,
                  height: 38,
                  cursor: "pointer",
                  bgcolor: "#c49b63",
                  color: "#fff",
                  fontWeight: 600,
                  "&:hover": { boxShadow: 2 },
                }}
                onClick={handleAvatarClick}
              >
                {!profile.avatar && (profile.name?.[0] || displayName[0]).toUpperCase()}
              </Avatar>
            )}

            {isMobile && (
              <IconButton onClick={() => setDrawerOpen(true)}>
                <MenuIcon sx={{ color: "#000" }} />
              </IconButton>
            )}
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Popover Menü */}
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
              fontWeight: 500,
              textAlign: "center",
              color: "#a75e22",
            }}
          >
            Welcome, {profile.name || displayName}
          </Typography>
          <Divider sx={{ my: 1 }} />
          <List>{drawerLinks.filter(Boolean).map(renderDrawerItem)}</List>
        </Box>
      </Popover>

      {/* Mobil Drawer */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 260, p: 2 }}>
          <Box sx={{ textAlign: "center", mb: 2 }}>
            <img src="./logo.png" alt="DOA'S CEZVE" style={{ width: 100, height: "auto" }} />
          </Box>
          <Divider sx={{ mb: 2 }} />
          <List>
            {["Home", "About Doa's Cezve", "Blog", "Shop"].map((title, idx) => (
              <ListItem
                key={idx}
                component={NavLink}
                to={`/${title.toLowerCase().replace(" ", "")}`}
                onClick={() => setDrawerOpen(false)}
              >
                <ListItemText primary={title} />
              </ListItem>
            ))}
          </List>
          <Divider sx={{ my: 2 }} />
          <List>{drawerLinks.filter(Boolean).map(renderDrawerItem)}</List>
        </Box>
      </Drawer>
    </>
  );
}
