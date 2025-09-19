import { useState } from 'react';
import { ShoppingCart, Menu as MenuIcon } from '@mui/icons-material';
import {
  AppBar, Badge, Box, Button, Drawer, IconButton, List, ListItem, ListItemText,
  Stack, Toolbar, useMediaQuery, Avatar, Divider
} from '@mui/material';
import { NavLink } from 'react-router';
import { useTheme } from '@mui/material/styles';
import { createGlobalStyle } from 'styled-components';

const links = [
  { title: 'Home', path: '/' },
  { title: 'About', path: '/about' },
  { title: 'Contact', path: '/contact' },
  { title: 'Catalog', path: '/catalog' },
];
const authLinks = [{ title: 'Login', path: '/auth' }]

const GlobalFont = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
  body {
    font-family: 'Poppins', sans-serif;
  }
`;

export default function Header() {

  const [drawerOpen, setDrawerOpen] = useState(false); // Menü için
  const [userDrawerOpen, setUserDrawerOpen] = useState(false); // Kullanıcı için
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const brandBrown = '#7d6c6c';

  return (
    <>
      <GlobalFont />
      <AppBar position="static" sx={{ mb: 4, backgroundColor: "#fff", fontFamily: 'Poppins, sans-serif', boxShadow: 3 }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, mt: 1 }} component={NavLink} to="/">
            <Avatar
              
              src="./logo.svg"
              alt="DOA'S CEZVE"
              sx={{
                width: 56,
                height: 56,
                bgcolor: '#8c7373',
                boxShadow: 2
              }}
            />
          </Box>
          {!isMobile && (
            <Stack direction="row" spacing={3} marginLeft={2} flexGrow={1}>
              {links.map(link =>
                <Button
                  component={NavLink}
                  to={link.path}
                  key={link.title}
                  sx={{
                    color: '#000',
                    textTransform: 'none',
                    fontWeight: 500,
                    fontSize: '1rem',
                    "&.active": { color: brandBrown, fontWeight: 700 },
                    "&:hover": { color: brandBrown },
                  }}
                >
                  {link.title}
                </Button>
              )}
            </Stack>
          )}

          <Stack direction="row" spacing={1} alignItems="center">
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton size='large' edge="start" color='inherit'>
                <Badge sx={{ "& .MuiBadge-badge": { backgroundColor: brandBrown } }} badgeContent={2} color="secondary">
                  <ShoppingCart sx={{ color: "#000" }} />
                </Badge>
              </IconButton>
              {isMobile && (
                <IconButton
                  edge="end"
                  size='large'
                  sx={{ ml: 1, color: '#000' }}
                  onClick={() => setDrawerOpen(true)}
                >
                  <MenuIcon />
                </IconButton>
              )}
            </Box>
            <Avatar
              src="./profile.jpg" // Profil resminizin yolunu buraya yazın
              alt=""
              sx={{
                width: 40,
                height: 40,
                cursor: 'pointer',
                '&:hover': { boxShadow: 2 },
              }}
              onClick={() => setUserDrawerOpen(true)}
            />
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Menü Drawer (Mobil için) */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: 260,
            backgroundColor: "#fbfbfb",
            boxShadow: 3,
          }
        }}
      >
        <Box sx={{ p: 2 }}>
          <Avatar
            src="./logo.svg"
            alt="DOA'S CEZVE"
            sx={{
              width: 72,
              height: 72,
              margin: "0 auto",
              bgcolor: 'white',
              border: '2px solid #fff',
              boxShadow: 2,
              mb: 2
            }}
          />
          <Divider />
          <List sx={{ mt: 1 }}>
            {links.map(link => (
              <ListItem
                key={link.title}
                component={NavLink}
                to={link.path}
                onClick={() => setDrawerOpen(false)}
                sx={{
                  "& .MuiListItemText-primary": {
                    fontSize: "1rem",
                    fontWeight: 500,
                    color: '#000',
                    transition: 'color 0.2s ease',
                  },
                  "&.active .MuiListItemText-primary": {
                    color: brandBrown,
                    fontWeight: 700,
                  },
                  "&:hover .MuiListItemText-primary": {
                    color: brandBrown,
                  },
                }}
              >
                <ListItemText primary={link.title} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Kullanıcı Bilgileri Drawer */}
      <Drawer
        anchor="right"
        open={userDrawerOpen}
        onClose={() => setUserDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: 300,
            backgroundColor: "#fff",
            boxShadow: 3,
          }
        }}
      >
        <Box sx={{ p: 2 }}>
          <Avatar
            src="./profile.jpg"
            alt=""
            sx={{
              width: 80,
              height: 80,
              margin: "0 auto",
              bgcolor: '#8c7373',
              mb: 2,
            }}
          />
          <List>
            <ListItem
              component={NavLink}
              to={links[0].path} // Tüm Siparişlerim sayfasının yolu
              sx={{
                "&:hover .MuiListItemText-primary": {
                  color: brandBrown,
                },
                cursor: 'pointer',
              }}
              onClick={() => {
                // Tüm Siparişlerim sayfasına yönlendirme (örnek URL)
                setUserDrawerOpen(false);

              }}
            >
              <ListItemText primary="All Orders" />
            </ListItem>
            <ListItem
              component={NavLink}

              to={authLinks[0].path}
              sx={{
                "&:hover .MuiListItemText-primary": {
                  color: brandBrown,
                },
                cursor: 'pointer',
              }}
              onClick={() => {
                
                setUserDrawerOpen(false);

              }}
            >
              <ListItemText primary="User Info" />
            </ListItem>
            <ListItem 
              component={NavLink}
              to={links[0].path} // Yardım sayfasının yolu
              sx={{
                "&:hover .MuiListItemText-primary": {
                  color: brandBrown,
                },
                cursor: 'pointer',
              }}
              onClick={() => {
                // Yardım sayfasına yönlendirme (örnek URL)

                setUserDrawerOpen(false);
              }}
            >
              <ListItemText  primary="Help" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
}
