// src/components/NavigationBar.js

import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { AppBar, Toolbar, Button, Container, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { useTheme, useMediaQuery } from '@mui/material';

const NavigationBar = () => {
    const { authData, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [menuAnchor, setMenuAnchor] = useState(null);

    const handleMenuOpen = (event) => {
        setMenuAnchor(event.currentTarget);
    };

    const handleMenuClose = () => {
        setMenuAnchor(null);
    };

    const handleLogout = () => {
        logout();
        navigate('/');
        handleMenuClose();
    };

    console.log('NavigationBar: authData.role is', authData.role, 'isAuthenticated:', authData.isAuthenticated);

    const menuItems = [
        { label: 'Мои заказы', to: '/orders', visible: authData.role === 'user' },
        { label: 'Главная', to: '/', visible: authData.role === 'user' },
        { label: 'Корзина', to: '/cart', visible: authData.role === 'user' },
        { label: 'Админка метиза', to: '/metiz-admin', visible: authData.role === 'metiz' },
        { label: 'Профиль', to: '/profile', visible: authData.role === 'user' },
        { label: 'Регистрация', to: '/register', visible: !authData.isAuthenticated },
        { label: 'Вход', to: '/login', visible: !authData.isAuthenticated },
    ];

    return (
        <AppBar position="static">
            <Container maxWidth="lg">
                <Toolbar>
                    {isMobile ? (
                        <>
                            <IconButton
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                onClick={handleMenuOpen}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                anchorEl={menuAnchor}
                                open={Boolean(menuAnchor)}
                                onClose={handleMenuClose}
                                keepMounted
                            >
                                {menuItems.map(
                                    (item, index) =>
                                        item.visible && (
                                            <MenuItem
                                                key={index}
                                                onClick={handleMenuClose}
                                                component={Link}
                                                to={item.to}
                                            >
                                                {item.label}
                                            </MenuItem>
                                        )
                                )}
                                {authData.isAuthenticated && (
                                    <MenuItem onClick={handleLogout}>Выход</MenuItem>
                                )}
                            </Menu>
                        </>
                    ) : (
                        <>
                            {menuItems.map(
                                (item, index) =>
                                    item.visible && (
                                        <Button
                                            key={index}
                                            component={Link}
                                            to={item.to}
                                            color="inherit"
                                            sx={{ marginRight: 2 }}
                                        >
                                            {item.label}
                                        </Button>
                                    )
                            )}
                            {authData.isAuthenticated && (
                                <Button color="inherit" onClick={handleLogout}>
                                    Выход
                                </Button>
                            )}
                        </>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default NavigationBar;