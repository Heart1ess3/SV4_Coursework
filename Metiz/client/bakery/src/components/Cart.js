import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';
import OrderForm from './OrderForm';
import {
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    CardMedia,
    Button,
    TextField,
    Box,
    Divider,
    CircularProgress,
    Alert,
} from '@mui/material';
import { useTheme, useMediaQuery } from '@mui/material';

function Cart() {
    const { cartItems, removeFromCart, updateQuantity, totalAmount, loading, error } = useContext(CartContext);
    const [showOrderForm, setShowOrderForm] = useState(false);
    const theme = useTheme();
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md')); // 768px
    const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // 320px and smaller

    const handleQuantityChange = (productId, value) => {
        const qty = parseInt(value, 10);
        if (qty >= 1) {
            updateQuantity(productId, qty);
        }
    };

    const toggleOrderForm = () => {
        setShowOrderForm(!showOrderForm);
    };

    return (
        <Container
            sx={{
                padding: isMobile ? '10px' : isTablet ? '15px' : '20px',
            }}
        >
            <Typography
                variant="h3"
                component="h1"
                gutterBottom
                sx={{
                    fontSize: isMobile ? '1.5rem' : isTablet ? '2rem' : '3rem',
                    textAlign: isMobile ? 'center' : 'left',
                }}
            >
                Корзина
            </Typography>
            {loading ? (
                <Box sx={{ textAlign: 'center', marginTop: '50px' }}>
                    <CircularProgress />
                    <Typography variant="h6" sx={{ marginTop: '20px', fontSize: isMobile ? '1rem' : '1.25rem' }}>
                        Загрузка корзины...
                    </Typography>
                </Box>
            ) : cartItems.length === 0 ? (
                <Typography
                    variant="body1"
                    sx={{ fontSize: isMobile ? '0.9rem' : '1rem', textAlign: isMobile ? 'center' : 'left' }}
                >
                    Ваша корзина пуста. <Link to="/">Перейти к покупкам</Link>
                </Typography>
            ) : (
                <Box>
                    {error && (
                        <Alert severity="error" sx={{ marginBottom: '20px' }}>
                            {error}
                        </Alert>
                    )}
                    <Grid container spacing={isMobile ? 2 : 4}>
                        {cartItems.map((item) => (
                            <Grid item xs={12} key={item.productId}>
                                <Card
                                    sx={{
                                        display: 'flex',
                                        flexDirection: isMobile ? 'column' : 'row',
                                        marginBottom: '20px',
                                    }}
                                >
                                    {item.Product && item.Product.photo && (
                                        <CardMedia
                                            component="img"
                                            image={`http://localhost:5000${item.Product.photo}`}
                                            alt={item.Product.name}
                                            sx={{
                                                width: isMobile
                                                    ? '100%' // Full width for mobile
                                                    : isTablet
                                                    ? '150px' // Fixed size for tablet
                                                    : '200px', // Larger size for full-width
                                                height: isMobile
                                                    ? 'auto' // Auto height for mobile to preserve aspect ratio
                                                    : isTablet
                                                    ? '150px'
                                                    : '200px',
                                                objectFit: 'cover', // Ensures the image fills the box without distortion
                                                borderRadius: '4px',
                                            }}
                                        />
                                    )}
                                    <CardContent
                                        sx={{
                                            flex: 1,
                                            textAlign: isMobile ? 'center' : 'left',
                                        }}
                                    >
                                        <Typography
                                            variant="h5"
                                            component="h3"
                                            sx={{
                                                fontSize: isMobile ? '1rem' : '1.25rem',
                                            }}
                                        >
                                            {item.Product ? item.Product.name : 'Продукт не найден'}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            paragraph
                                            sx={{
                                                fontSize: isMobile ? '0.85rem' : '1rem',
                                            }}
                                        >
                                            {item.Product ? item.Product.description : 'Описание отсутствует'}
                                        </Typography>
                                        <Typography
                                            variant="body1"
                                            color="text.primary"
                                            sx={{
                                                fontSize: isMobile ? '0.9rem' : '1rem',
                                            }}
                                        >
                                            Цена за единицу: {item.Product ? item.Product.price : '0'} ₽
                                        </Typography>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexDirection: isMobile ? 'column' : 'row',
                                                alignItems: isMobile ? 'center' : 'flex-start',
                                                marginTop: '10px',
                                            }}
                                        >
                                            <TextField
                                                label="Количество"
                                                type="number"
                                                inputProps={{ min: 1 }}
                                                value={item.quantity}
                                                onChange={(e) => handleQuantityChange(item.productId, e.target.value)}
                                                sx={{
                                                    width: isMobile ? '100%' : '80px',
                                                    marginBottom: isMobile ? '10px' : '0',
                                                    marginRight: isMobile ? '0' : '10px',
                                                }}
                                            />
                                            <Button
                                                variant="outlined"
                                                color="secondary"
                                                onClick={() => removeFromCart(item.productId)}
                                                sx={{
                                                    fontSize: isMobile ? '0.8rem' : '1rem',
                                                }}
                                            >
                                                Удалить
                                            </Button>
                                        </Box>
                                        <Typography
                                            variant="body1"
                                            sx={{
                                                marginTop: '10px',
                                                fontSize: isMobile ? '0.9rem' : '1rem',
                                            }}
                                        >
                                            Итого: {item.Product ? item.Product.price * item.quantity : 0} ₽
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                    <Divider sx={{ marginY: '20px' }} />
                    <Typography
                        variant="h4"
                        component="h2"
                        sx={{
                            fontSize: isMobile ? '1.2rem' : '1.5rem',
                            textAlign: isMobile ? 'center' : 'left',
                        }}
                    >
                        Общая сумма: {totalAmount} ₽
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={toggleOrderForm}
                        sx={{
                            padding: isMobile ? '8px 16px' : '10px 20px',
                            fontSize: isMobile ? '0.9rem' : '1rem',
                            marginTop: '20px',
                            width: isMobile ? '100%' : 'auto',
                        }}
                    >
                        {showOrderForm ? 'Отмена' : 'Сформировать заказ'}
                    </Button>
                    {showOrderForm && (
                        <Box sx={{ marginTop: '20px' }}>
                            <OrderForm />
                        </Box>
                    )}
                </Box>
            )}
        </Container>
    );
}

export default Cart;