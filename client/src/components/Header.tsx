import { useState } from 'react';
import { ShoppingCart, Menu as MenuIcon, Logout, Dashboard, Help, Info, ListAlt } from '@mui/icons-material';
import {
  AppBar, Badge, Box, Button, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText,
  Stack, Toolbar, useMediaQuery, Avatar, Divider, Popover, Typography
} from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { useUser } from '../hooks/useUser';
import { useAuth } from '../context/AuthContext';

interface DrawerLink {
  title: string;
  path?: string;
  icon?: JSX.Element;
  action?: () => void;
}

interface User {
  name?: string;
  isEmailConfirmed?: boolean;
  email?: string;
}

// Geliştirilmiş isim formatlama fonksiyonu
const formatName = (value: string | undefined): string => {
  if (!value) return "";

  // @ işaretinden sonrasını kaldır
  let clean = value.split("@")[0];

  // Nokta, alt çizgi, tire gibi ayırıcıları boşluk yap
  clean = clean.replace(/[._-]/g, " ");

  // Fazla boşlukları temizle
  clean = clean.trim().replace(/\s+/g, " ");

  // Her kelimenin baş harfini büyük yap
  return clean
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

export default function Header() {
  const { token, logout } = useAuth();
  const { user } = useUser(token);

  // Varsayılan değerler
  const name = user?.name ?? "";
  const email = user?.email ?? "";
  const displayName = name || email; // name yoksa email kullan

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const brandBrown = '#7d6c6c';

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const drawerLinks: DrawerLink[] = token ? [
    { title: 'All Orders', path: '/orders', icon: <ListAlt /> },
    { title: 'User Info', path: '/profile', icon: <Info /> },
    { title: 'Help', path: '/help', icon: <Help /> },
    { title: 'Dashboard', path: '/dashboard', icon: <Dashboard /> },
    { title: 'Logout', icon: <Logout />, action: () => { logout(); window.location.href = '/login'; } },
  ] : [
    { title: 'Login', path: '/login', icon: <Info /> },
    { title: 'Sign Up', path: '/register', icon: <ListAlt /> },
  ];

  const renderDrawerItem = (item: DrawerLink, idx: number) => (
    <ListItem
      key={idx}
      onClick={() => {
        if (item.action) item.action();
        handleClose();
        setDrawerOpen(false);
      }}
      component={item.path ? NavLink : 'div'}
      to={item.path || ''}
      sx={{
        '&:hover': { backgroundColor: '#f0f0f0' },
        '& .MuiListItemIcon-root': { color: brandBrown },
        '& .MuiListItemText-primary': { fontWeight: 500 }
      }}
    >
      {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
      <ListItemText primary={item.title} />
    </ListItem>
  );

  return (
    <>
      <AppBar
        position="static"
        sx={{
          mb: 4,
          backgroundColor: "#fff",
          boxShadow: 3,
          width: "100%",
          boxSizing: "border-box",
          overflowX: "hidden"
        }}
      >
        <Toolbar
          sx={{
            px: 1,
            justifyContent: "space-between",
            width: "100%",
            maxWidth: "100%",
            boxSizing: "border-box",
            overflowX: "hidden"
          }}
        >
          {/* Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center' }} component={NavLink} to="/">
            <Avatar src="./logo.svg" alt="DOA" sx={{ width: 56, height: 56, bgcolor: '#d8c3c3', boxShadow: 2 }} />
          </Box>

          {/* Menü butonları (masaüstü) */}
          {!isMobile && (
            <Stack
              direction="row"
              spacing={3}
              sx={{
                ml: { xs: 0, sm: 2 },
                flexGrow: 1,
                justifyContent: { xs: "center", sm: "flex-start" }
              }}
            >
              {['Home', 'About', 'Contact', 'Catalog'].map((title, idx) => (
                <Button
                  key={idx}
                  component={NavLink}
                  to={`/${title.toLowerCase()}`}
                  sx={{
                    color: '#000',
                    textTransform: 'none',
                    fontWeight: 500,
                    fontSize: '1rem',
                    '&.active': { color: brandBrown, fontWeight: 700 },
                    '&:hover': { color: brandBrown },
                  }}
                >
                  {title}
                </Button>
              ))}
            </Stack>
          )}

          {/* Sağ taraf: Sepet + Avatar/Menu */}
          <Stack direction="row" spacing={1} alignItems="center">
            <IconButton size='large'>
              <Badge badgeContent={2} sx={{ "& .MuiBadge-badge": { backgroundColor: brandBrown } }}>
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
                  sx={{ width: 40, height: 40, cursor: 'pointer', '&:hover': { boxShadow: 2 } }}
                  onClick={handleAvatarClick}
                />
                <Popover
                  open={Boolean(anchorEl)}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                  <Box sx={{ p: 2, minWidth: 220 }}>
                    {token && (
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, textAlign: 'center' }}>
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
        ModalProps={{
          keepMounted: true,
          disableScrollLock: false
        }}
      >
        <Box sx={{ width: { xs: '80vw', sm: 260 }, p: 2 }}>
          <Avatar src="./logo.svg" alt="DOA'S CEZVE" sx={{ width: 72, height: 72, m: "0 auto", mb: 2 }} />
          <Divider />
          <List>{drawerLinks.map(renderDrawerItem)}</List>
        </Box>
      </Drawer>
    </>
  );
}
