import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import * as React from 'react';
import Tooltip from '@mui/material/Tooltip';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import IconButton from '@mui/material/IconButton';
import { useState, useEffect } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Slide from '@mui/material/Slide';
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
import Divider from '@mui/material/Divider';
import Popup from './Popup';
import ProductList from './ProductList';
import MapComponent from './MapComponent';
import useMediaQuery from '@mui/material/useMediaQuery';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import './buyerscreen.css';
import { animations } from 'react-animation';

// const Transition = React.forwardRef(function Transition(props, ref) {
//     return <Slide direction="up" ref={ref} {...props} />;
// });

function BuyerScreen() {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [open, setOpen] = React.useState(false);
    const matches = useMediaQuery('(max-width:768px)');
    const [sideNav, setSideNav] = useState(true);
    const [viewAll, setViewAll] = useState(false);

    const sampleData = {
        availableProducts: [
            {
                id: 'asd',
                name: 'Bottles',
                icon: ''
            },
            {
                id: 'asd',
                name: 'Glasses',
                icon: ''
            }
        ],
        allProducts: [
            {
                id: 'asd',
                name: 'Plastics',
                icon: ''
            },
            {
                id: 'asd',
                name: 'E-waste',
                icon: ''
            },
            {
                id: 'asd',
                name: 'Plastic',
                icon: ''
            },
            {
                id: 'asd',
                name: 'E-waste',
                icon: ''
            },
            {
                id: 'asd',
                name: 'Plastic',
                icon: ''
            },
            {
                id: 'asd',
                name: 'E-waste',
                icon: ''
            }
        ],
        inventories: [
            {
                id: '001',
                latitude: 13.0403,
                longitude: 80.1723,
                seller: {
                    id: '001',
                    name: 'Dinesh',
                    rating: 5,
                    distance: '5 KM',
                    image: '',
                    products: [
                        {
                            id: '001',
                            name: 'Bottles',
                            weight: '',
                            price: ''
                        }
                    ]
                }
            },
            {
                id: '002',
                latitude: 13.0827,
                longitude: 80.2707,
                seller: {
                    id: '001',
                    name: 'Kumar',
                    rating: 2,
                    distance: '3 KM',
                    image: '',
                    products: [
                        {
                            id: '002',
                            name: 'Glasses',
                            weight: '',
                            price: ''
                        },
                        {
                            id: '002',
                            name: 'Bottles',
                            weight: '',
                            price: ''
                        }
                    ]
                }
            }
        ]
    };

    const products = [
        {
            id: 0,
            name: 'Bottles'
        },
        {
            id: 1,
            name: 'Cartons'
        },
        {
            id: 2,
            name: 'Metals'
        },
        {
            id: 3,
            name: 'Magazines'
        },
        {
            id: 4,
            name: 'e-waste'
        },
        {
            id: 5,
            name: 'Glasses'
        },
        {
            id: 6,
            name: 'Books'
        }
    ];

    useEffect(() => {
        if (matches) setSideNav(false);
    }, [matches]);

    const handlePopOver = (open) => {
        setOpen(open);
    };

    function setProduct(product) {
        // alert(product);
    }

    const defaultStyles = {
        transition: `opacity 5s ease-in-out, display 5s ease-in-out`
        // color: 'black'
    };

    const transitionStyles = {
        entering: { opacity: 0, display: 'none' },
        entered: { opacity: 1, display: 'block' },
        exiting: { opacity: 1, display: 'block' },
        exited: { opacity: 0, display: 'none' }
    };

    return (
        <>
            <Stack flexDirection="row">
                <div style={{ display: matches ? 'block' : 'none', position: 'absolute', zIndex: 2, top: '16vh', left: 10 }}>
                    <button className="btn1" size="large" onClick={() => setSideNav(true)}>
                        <span>Filter</span>
                        <FilterListIcon />
                    </button>
                </div>
                <Box
                    // style={matches ? { animation: animations.fadeInUp } : {}}
                    sx={{
                        width: matches && sideNav ? '100%' : '300px',
                        height: '92vh',
                        position: 'absolute',
                        boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
                        backgroundColor: 'white',
                        overflow: 'auto',
                        opacity: matches && !sideNav ? 0 : 1,
                        zIndex: matches && !sideNav ? -1 : 2,
                        transition: 'width 300ms ease-in-out'
                    }}
                >
                    <Box
                        sx={{
                            flexGrow: 1,
                            backgroundColor: 'white',
                            display: !viewAll ? 'block' : 'none'
                        }}
                    >
                        <List dense={true}>
                            <ListItem
                                secondaryAction={
                                    <Stack flexDirection="row" gap={2}>
                                        <Tooltip title="Locate me" arrow>
                                            <IconButton edge="end" onClick={() => alert('Locate me hitted')}>
                                                <GpsFixedIcon style={{ color: '#1bd7a0' }} />
                                            </IconButton>
                                        </Tooltip>
                                        <div
                                            style={{
                                                flexDirection: 'row',
                                                justifyContent: 'flex-end',
                                                display: !matches ? 'none' : 'flex',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <Tooltip title="Close" arrow>
                                                <IconButton onClick={() => setSideNav(false)}>
                                                    <CloseIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </div>
                                    </Stack>
                                }
                            >
                                <ListItemAvatar>
                                    <Avatar>
                                        <LocationOnIcon style={{ color: '#013f56' }} />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={<Typography style={{ color: '#013f56', fontWeight: 'bold' }}>Chennai</Typography>}
                                    secondary={<Typography style={{ color: '#1bd7a0', fontSize: '12px' }}>Change Location</Typography>}
                                />
                            </ListItem>
                        </List>
                    </Box>
                    <Box sx={{ display: !viewAll ? 'block' : 'none' }}>
                        <ProductList products={[...sampleData?.availableProducts, ...sampleData?.allProducts]} setProduct={setProduct} />
                    </Box>
                    {/* <AnimateOnChange animationIn="fadeInUp" animationOut="fadeOut" durationOut={300}> */}
                    <Stack flexDirection="row" justifyContent="space-between" alignItems="center" padding="10px">
                        <Typography component="div" variant="p" color="#013f56" fontWeight="bold">
                            Sellers Near By
                        </Typography>
                        <Button onClick={() => setViewAll(!viewAll)}> {!viewAll ? 'View All' : 'Show Less'} </Button>
                    </Stack>
                    <Box sx={{ flexGrow: 0 }}>
                        <List>
                            {sampleData?.inventories.map((data, index) => {
                                return (
                                    <div key={index}>
                                        <ListItemButton
                                            key={index}
                                            selected={selectedIndex === index}
                                            onClick={(event) => {
                                                setSelectedIndex(index);
                                                setOpen(true);
                                            }}
                                            sx={{
                                                padding: 0,
                                                width: '100%',
                                                borderRight: selectedIndex === index ? 'solid 3px #013f56' : 'default'
                                            }}
                                        >
                                            <ListItemIcon>
                                                <Avatar
                                                    src={data?.seller?.image}
                                                    variant="square"
                                                    alt="P"
                                                    sx={{ height: 50, width: 50 }}
                                                ></Avatar>
                                            </ListItemIcon>
                                            <div
                                                className="container"
                                                style={{
                                                    lineHeight: 1.5,
                                                    fontSize: '12px',
                                                    padding: '5px',
                                                    alignItems: 'space-between'
                                                }}
                                            >
                                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <div style={{ color: '#013f56', fontWeight: 'bold' }}>{data?.seller?.name}</div>
                                                    <div style={{ color: 'grey', fontWeight: 'bold' }}>
                                                        <LocationOnIcon style={{ fontSize: '15px' }} />
                                                        {data?.seller?.distance}
                                                    </div>
                                                </div>
                                                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                                    {data?.seller?.products.slice(0, 3).map((product, index) => {
                                                        return (
                                                            <Tooltip key={index} title={product?.name} arrow>
                                                                <div style={{ marginRight: '2px' }} className="chip">
                                                                    {product?.name}
                                                                </div>
                                                            </Tooltip>
                                                        );
                                                    })}
                                                    {data?.seller?.products.length > 3 ? (
                                                        <Tooltip title={products.length - 3 + 'more'} arrow>
                                                            <div className="chip">{'+ ' + (products.length - 3) + 'more'}</div>
                                                        </Tooltip>
                                                    ) : (
                                                        <></>
                                                    )}
                                                </div>
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'center',
                                                        fontSize: '11px'
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            color: '#013f56',
                                                            fontWeight: 'bold',
                                                            display: 'flex',
                                                            alignItems: 'end'
                                                        }}
                                                    >
                                                        <StarRateRoundedIcon sx={{ color: 'orange' }} style={{ fontSize: '20px' }} />
                                                        &nbsp; {data?.seller?.rating}
                                                    </div>
                                                    {/* <div style={{ color: 'grey' }}>20K Reviews</div> */}
                                                    <div style={{ color: '#1bd7a0' }}>View Details</div>
                                                </div>
                                            </div>
                                        </ListItemButton>
                                        <Divider />
                                    </div>
                                );
                            })}
                        </List>
                    </Box>
                    {/* </AnimateOnChange> */}
                </Box>
                <Box
                    sx={{
                        height: 'auto',
                        width: '100%',
                        zIndex: 1,
                        marginLeft: matches && !sideNav ? 0 : '300px',
                        animation: animations.popIn
                    }}
                >
                    <MapComponent data={sampleData?.inventories} handlePopOver={handlePopOver} />
                </Box>
            </Stack>
            <Popup open={open} setOpen={setOpen} data={products} />
        </>
    );
}

export default BuyerScreen;
