import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { useEffect } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import './menu.css';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined';
import { useNavigate } from 'react-router-dom';
import { Divide as Hamburger } from 'hamburger-react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ThemeContext } from '/src/util/ThemeProvider';
import { useContext } from 'react';
import Login from '~/pages/ReusableComponents/Login';
import Register from '~/pages/ReusableComponents/Register/index';
import VerifyUser from '~/pages/ReusableComponents/VerifyUser/index';
const drawerWidth = 300;

export default function MenuProvider() {
    const [open, setOpen] = useState(false);
    const [toggle, setToggle] = React.useState('buyer');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();
    const { colors, fonts } = useContext(ThemeContext);
    const [isLogin, setIsLogin] = useState(false);
    const [isRegister, setIsRegister] = useState(false);
    const [isVerify, setIsVerify] = useState(false);

    const AppBar = styled(MuiAppBar, {
        shouldForwardProp: (prop) => prop !== 'open'
    })(({ theme, open }) => ({
        background: colors.secondary,
        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
        alignItems: 'space-between',
        justifyContent: 'center',
        width: `100%`,
        height: '8vh'
    }));

    const MyToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.theme,
        border: '1px solid #ccc',
        borderRadius: '30px',
        overflow: 'hidden',
        '.MuiToggleButton-root': {
            color: '#333',
            border: 'none',
            backgroundColor: 'transparent',
            borderRadius: '30px !important',
            padding: '8px 15px',
            '&.Mui-selected': {
                backgroundColor: colors.primary,
                transition: 'background-color 500ms',
                color: '#fff'
            },
            '&.Mui-selected:hover': {
                backgroundColor: '#013f56'
            }
        }
    }));

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
        setOpen(!open);
    };

    const handleLogin = (isLogin, isRegister) => {
        setIsLogin(isLogin);
        setIsRegister(isRegister);
    };

    const menus = [
        {
            icon: <HomeOutlinedIcon />,
            label: 'Home',
            link: '/buyer'
        },
        {
            icon: <CallOutlinedIcon />,
            label: 'Scrap Rates',
            link: '/scrap-rates'
        },
        {
            icon: <PersonAddAltOutlinedIcon />,
            label: 'Become A Buyer',
            link: '/become-buyer'
        },
        {
            icon: <CurrencyExchangeOutlinedIcon />,
            label: 'Refer & Earn',
            link: '/refer-earn'
        },
        {
            icon: <CallOutlinedIcon />,
            label: 'Contact',
            link: '/contatc'
        }
    ];
    useEffect(() => {
        if (location.pathname.includes('/seller')) setToggle('seller');
    }, []);

    return (
        <>
            <Box sx={{ flexGrow: 0, zIndex: 3 }}>
                <AppBar position="fixed" open={open}>
                    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Stack flexDirection="row" alignItems="center" gap={1}>
                            <Hamburger duration={3} onToggle={() => setOpen(!open)} rounded toggled={open} size={25} />
                            <Typography variant="h5" noWrap component="div">
                                Scrapify
                            </Typography>
                        </Stack>
                        <MyToggleButtonGroup
                            value={toggle}
                            onChange={(event, value) => {
                                value ? setToggle(value) : setToggle(toggle);
                                navigate(value == 'seller' ? '/seller' : '/buyer');
                            }}
                            exclusive
                            aria-label="Platform"
                        >
                            <ToggleButton value="buyer">Buyer</ToggleButton>
                            <ToggleButton value="seller">Seller</ToggleButton>
                        </MyToggleButtonGroup>
                        <Button
                            // onClick={() => navigate('/login')}
                            onClick={() => setIsLogin(true)}
                            sx={{ backgroundColor: colors.primary, color: 'white', borderRadius: '30px', padding: '5px 15px' }}
                        >
                            Login
                        </Button>
                        {/* <Tooltip title="Account settings">
                            <IconButton size="large" sx={{ ml: 2 }} aria-haspopup="true">
                                <Avatar
                                    alt="Remy Sharp"
                                    src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8&w=1000&q=80"
                                />
                            </IconButton>
                        </Tooltip>*/}
                    </Toolbar>
                </AppBar>
            </Box>
            <Drawer
                className="drawer"
                PaperProps={{
                    sx: {
                        paddingTop: '8vh',
                        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'
                    }
                }}
                sx={{
                    zIndex: 2,
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box'
                    },
                    '& .MuiDrawer-paper::-webkit-scrollbar': {
                        width: '8px',
                        scrollPaddingRight: '10px'
                    },
                    '& .MuiDrawer-paper::-webkit-scrollbar-thumb': {
                        backgroundColor: '#999',
                        borderRadius: '4px',
                        borderRight: 'solid 3px white',
                        filter: 'blur'
                    }
                }}
                variant="temporary"
                anchor="left"
                open={open}
            >
                <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    <List component="nav" aria-label="main mailbox folders">
                        {menus.map((menu, index) => {
                            return (
                                <ListItemButton
                                    component={Link}
                                    to={menu.link}
                                    key={index}
                                    selected={selectedIndex === index}
                                    onClick={(event) => handleListItemClick(event, index)}
                                >
                                    <ListItemIcon sx={selectedIndex === index ? { color: '#1bd7a0' } : { color: '#013f56' }}>
                                        {menu?.icon}
                                    </ListItemIcon>
                                    <ListItemText
                                        sx={selectedIndex === index ? { color: '#1bd7a0' } : { color: '#013f56' }}
                                        primary={menu?.label}
                                    />
                                </ListItemButton>
                            );
                        })}
                    </List>
                    <Divider />
                </Box>
            </Drawer>
            {/* {isVerify ? <VerifyUser type="login" /> : <></>} */}

            {isLogin ? <Login open={isLogin} close={handleLogin} /> : <></>}
            {isRegister ? <Register open={isRegister} setOpen={setIsRegister}></Register> : <></>}
        </>
    );
}
