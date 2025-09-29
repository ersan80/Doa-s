import React, { useState } from 'react';
import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    CssBaseline,
    Container,
    Grid,
    Card,
    CardContent,
    Stack,
    Button,
    Avatar,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import {
    Menu as MenuIcon,
    Dashboard as DashboardIcon,
    ShoppingCart as ShoppingCartIcon,
    People as PeopleIcon,
    BarChart as BarChartIcon,
    Inventory as InventoryIcon,
} from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

// Mock data
const kpis: { title: string; value: string; change: string }[] = [
    { title: 'Revenue', value: '₺ 42,315', change: '+8.2%' },
    { title: 'Orders', value: '1,234', change: '+3.1%' },
    { title: 'Customers', value: '897', change: '+1.8%' },
    { title: 'Products', value: '128', change: '+0.6%' },
];

const salesData = [
    { name: 'Jan', sales: 4000 },
    { name: 'Feb', sales: 3000 },
    { name: 'Mar', sales: 5000 },
    { name: 'Apr', sales: 4780 },
    { name: 'May', sales: 5890 },
    { name: 'Jun', sales: 4390 },
    { name: 'Jul', sales: 4490 },
    { name: 'Aug', sales: 5300 },
    { name: 'Sep', sales: 6100 },
    { name: 'Oct', sales: 7000 },
    { name: 'Nov', sales: 6700 },
    { name: 'Dec', sales: 7400 },
];

const recentOrders = [
    { id: '#1001', customer: 'Merve Y', total: '₺420', status: 'Shipped' },
    { id: '#1002', customer: 'Onur K', total: '₺1,250', status: 'Processing' },
    { id: '#1003', customer: 'Zeynep A', total: '₺89', status: 'Delivered' },
    { id: '#1004', customer: 'Barış T', total: '₺540', status: 'Cancelled' },
];

export default function DashboardPage() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const theme = useTheme();
    const isSm = useMediaQuery(theme.breakpoints.up('sm'));

    const drawerWidth = 240;

    const Sidebar = (
        <Box sx={{ width: { xs: '80vw', sm: drawerWidth }, p: 1 }} role="presentation">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 1, py: 2 }}>
                <Avatar sx={{ bgcolor: '#7d6c6c' }}>DC</Avatar>
                <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>DOA's Cezve</Typography>
                    <Typography variant="caption">Admin Panel</Typography>
                </Box>
            </Box>
            <Divider />
            <List>
                {[
                    { title: 'Dashboard', icon: <DashboardIcon /> },
                    { title: 'Orders', icon: <ShoppingCartIcon /> },
                    { title: 'Customers', icon: <PeopleIcon /> },
                    { title: 'Products', icon: <InventoryIcon /> },
                    { title: 'Reports', icon: <BarChartIcon /> },
                ].map((item) => (
                    <ListItem key={item.title} sx={{ borderRadius: 1, my: 0.5 }}>
                        <ListItemIcon sx={{ color: '#7d6c6c' }}>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.title} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />

            <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1, backgroundColor: '#fff', color: '#000' }}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {!isSm && (
                            <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => setMobileOpen(true)}>
                                <MenuIcon />
                            </IconButton>
                        )}
                        <Typography variant="h6" sx={{ fontWeight: 700 }} noWrap>
                            Admin Dashboard
                        </Typography>
                    </Box>

                    <Box>
                        <Stack direction="row" spacing={2} alignItems="center">
                            <Button variant="contained" size="small" sx={{ bgcolor: '#7d6c6c', textTransform: 'none' }}>New Order</Button>
                            <Avatar src="/profile.jpg" />
                        </Stack>
                    </Box>
                </Toolbar>
            </AppBar>

            {isSm ? (
                <Drawer variant="permanent" open sx={{ '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' } }}>
                    {Sidebar}
                </Drawer>
            ) : (
                <Drawer
                    anchor="left"
                    open={mobileOpen}
                    onClose={() => setMobileOpen(false)}
                    ModalProps={{ keepMounted: true }}
                >
                    {Sidebar}
                </Drawer>
            )}

            <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
                <Toolbar />

                <Container maxWidth="xl">
                    <Grid container spacing={2}>
                        {/* KPIs */}
                        {kpis.map((kpi) => (
                            <Grid  sx={{xs:12,sm:6,md:3}} key={kpi.title as string}>
                                <Card sx={{ height: '100%' }}>
                                    <CardContent>
                                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>{kpi.title}</Typography>
                                        <Typography variant="h5" sx={{ fontWeight: 700, mt: 1 }}>{kpi.value}</Typography>
                                        <Typography variant="body2" sx={{ color: 'success.main', mt: 0.5 }}>{kpi.change}</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}

                        {/* Sales chart + Recent orders */}
                        <Grid sx={{ xs: 12, md: 8 }} >
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Sales (Last 12 months)</Typography>
                                    <Box sx={{ height: 260 }}>
                                        <ResponsiveContainer width="100%" height="100%">
                                            <LineChart data={salesData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="name" />
                                                <YAxis />
                                                <Tooltip />
                                                <Line type="monotone" dataKey="sales" stroke="#7d6c6c" strokeWidth={3} dot={{ r: 2 }} />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid sx={{ xs: 12, md: 4 }} >
                            <Card sx={{ height: '100%' }}>
                                <CardContent>
                                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Recent Orders</Typography>
                                    <TableContainer>
                                        <Table size="small">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Order</TableCell>
                                                    <TableCell>Customer</TableCell>
                                                    <TableCell>Total</TableCell>
                                                    <TableCell>Status</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {recentOrders.map((r) => (
                                                    <TableRow key={r.id} hover>
                                                        <TableCell>{r.id}</TableCell>
                                                        <TableCell>{r.customer}</TableCell>
                                                        <TableCell>{r.total}</TableCell>
                                                        <TableCell>{r.status}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid sx={{ xs: 12}} >
                            <Card>
                                <CardContent>
                                    <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                                        <Typography variant="h6" sx={{ fontWeight: 700 }}>All Orders</Typography>
                                        <Button size="small" sx={{ textTransform: 'none' }}>View all</Button>
                                    </Stack>

                                    <TableContainer>
                                        <Table size="small">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Order</TableCell>
                                                    <TableCell>Customer</TableCell>
                                                    <TableCell>Date</TableCell>
                                                    <TableCell>Total</TableCell>
                                                    <TableCell>Status</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {Array.from({ length: 6 }).map((_, i) => (
                                                    <TableRow key={i} hover>
                                                        <TableCell>{`#10${10 + i}`}</TableCell>
                                                        <TableCell>{['Mert', 'Ayşe', 'Kerem', 'Seda', 'Bora', 'Nil'][i]}</TableCell>
                                                        <TableCell>{`2025-0${(i % 9) + 1}-12`}</TableCell>
                                                        <TableCell>{`₺${(i + 1) * 120}`}</TableCell>
                                                        <TableCell>{['Processing', 'Shipped', 'Delivered', 'Cancelled'][i % 4]}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>
    );
}