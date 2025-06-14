import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Container,
    Typography,
    TextField,
    Paper,
    InputAdornment,
    Rating,
    useTheme,
    useMediaQuery,
    CardActions
} from '@mui/material';
import {
    Search as SearchIcon,
    CalendarMonth as CalendarIcon,
    AccessTime as TimeIcon,
    LocationOn as LocationIcon,
    Star as StarIcon,
    ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const HeroSection = styled(Box)(({ theme }) => ({
    background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1585747860715-2ba090e1d03c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: theme.palette.common.white,
    padding: theme.spacing(15, 0),
    textAlign: 'center',
}));

const Home = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const handleReservar = () => {
        navigate('/booking');
    }

    return (
        <Box>
            {/* Hero Section */}
            <HeroSection>
                <Container maxWidth="md">
                    <Typography variant="h2" component="h1" gutterBottom>
                        Reservar un servicio
                    </Typography>

                </Container>
            </HeroSection>

            {/* Services Section */}
            <Container maxWidth="lg" sx={{ py: 8 }}>
                <Typography variant="subtitle1" align="center" color="textSecondary" paragraph sx={{ mb: 6 }}>
                    Reserva ya
                </Typography>

                <Box sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: { xs: 'center' },
                    '& > *': {
                        width: { xs: '100%', sm: 'calc(50% - 16px)', md: 'calc(33.333% - 22px)' },
                        minWidth: '280px',
                        maxWidth: '400px',
                    }
                }}>
                    {/*Card with image and button*/}
                    <Card>
                        <CardMedia
                            component="img"
                            height="140"
                            image="https://images.unsplash.com/photo-1585747860715-2ba090e1d03c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                            alt="green iguana"
                        />
                        <CardContent>
                        </CardContent>
                        <CardActions>
                            <Button onClick={handleReservar}>Reservar</Button>
                        </CardActions>
                    </Card>

                </Box>
            </Container>

            {/* How It Works Section */}
            <Box bgcolor="background.paper" py={8}>
                <Container maxWidth="lg">
                    <Typography variant="h4" component="h2" align="center" gutterBottom>
                        Como funciona
                    </Typography>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        gap: '32px',
                        mt: 4,
                        '& > *': {
                            flex: 1,
                            minWidth: '200px',
                            px: 2
                        }
                    }}>
                        {[
                            {
                                icon: <SearchIcon color="primary" sx={{ fontSize: 48 }} />,
                                title: 'Escoge una opción',
                                description: 'Selecciona el servicio que deseas reservar.'
                            },
                            {
                                icon: <CalendarIcon color="primary" sx={{ fontSize: 48 }} />,
                                title: 'Reserva tu cita',
                                description: 'Selecciona la fecha y hora.'
                            },
                            {
                                icon: <LocationIcon color="primary" sx={{ fontSize: 48 }} />,
                                title: 'Presentate',
                                description: ''
                            }
                        ].map((step, index) => (
                            <Box key={index} sx={{ textAlign: 'center' }}>
                                <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
                                    {step.icon}
                                </Box>
                                <Typography variant="h6" gutterBottom>
                                    {step.title}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {step.description}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </Container>
            </Box>
        </Box>
    );
};

export default Home;