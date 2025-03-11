import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Grid,
    Paper,
    Typography,
    Box,
    Avatar,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
} from '@mui/material';
import {
    Person,
    Lock,
    Star,
    Payment,
    History,
    Settings,
    ExitToApp,
} from '@mui/icons-material';

const Profile = () => {
    const navigate = useNavigate();
    const user = {
        name: 'Nguyễn Văn A',
        email: 'nguyenvana@example.com',
        avatar: 'https://via.placeholder.com/150',
    };

    const menuItems = [
        {
            title: 'Chỉnh sửa thông tin',
            icon: <Person />,
            path: '/profile/edit',
        },
        {
            title: 'Đổi mật khẩu',
            icon: <Lock />,
            path: '/profile/change-password',
        },
        {
            title: 'Xem đánh giá',
            icon: <Star />,
            path: '/profile/reviews',
        },
        {
            title: 'Thanh toán',
            icon: <Payment />,
            path: '/profile/payment',
        },
        {
            title: 'Lịch sử đơn hàng',
            icon: <History />,
            path: '/profile/orders',
        },
        {
            title: 'Cài đặt',
            icon: <Settings />,
            path: '/profile/settings',
        },
    ];

    const handleNavigate = (path) => {
        navigate(path);
    };

    const handleLogout = () => {
        // Xử lý đăng xuất ở đây
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Grid container spacing={3}>
                {/* Thông tin người dùng */}
                <Grid item xs={12}>
                    <Paper elevation={3} sx={{ p: 3 }}>
                        <Box display="flex" alignItems="center" gap={2}>
                            <Avatar
                                src={user.avatar}
                                sx={{ width: 80, height: 80 }}
                                alt={user.name}
                            />
                            <Box>
                                <Typography variant="h5" gutterBottom>
                                    {user.name}
                                </Typography>
                                <Typography color="textSecondary">{user.email}</Typography>
                            </Box>
                        </Box>
                    </Paper>
                </Grid>

                {/* Menu điều hướng */}
                <Grid item xs={12}>
                    <Paper elevation={3}>
                        <List>
                            {menuItems.map((item, index) => (
                                <React.Fragment key={item.title}>
                                    <ListItem
                                        button
                                        onClick={() => handleNavigate(item.path)}
                                        sx={{
                                            '&:hover': {
                                                backgroundColor: 'rgba(0, 0, 0, 0.04)',
                                            },
                                        }}
                                    >
                                        <ListItemIcon>{item.icon}</ListItemIcon>
                                        <ListItemText primary={item.title} />
                                    </ListItem>
                                    {index < menuItems.length - 1 && <Divider />}
                                </React.Fragment>
                            ))}
                            <Divider />
                            <ListItem
                                button
                                onClick={handleLogout}
                                sx={{
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 0, 0, 0.04)',
                                    },
                                    color: 'error.main',
                                }}
                            >
                                <ListItemIcon>
                                    <ExitToApp color="error" />
                                </ListItemIcon>
                                <ListItemText primary="Đăng xuất" />
                            </ListItem>
                        </List>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Profile; 