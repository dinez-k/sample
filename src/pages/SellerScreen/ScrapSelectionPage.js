import { Stack, Box, Grid, Typography, Tooltip } from '@mui/material/index';
import { ThemeContext } from '~/util/ThemeProvider';
import img from '~assets/images/seller_img1.PNG';
import { useContext, useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { useMediaQuery } from '@mui/material/index';
import Badge from '@mui/material/Badge';
import ProductsModal from './ProductsModal';
import { useNavigate } from 'react-router-dom';

function ScrapSelectionPage() {
    const { colors } = useContext(ThemeContext);
    const matches = useMediaQuery('(max-width:768px)');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState([]);
    const [open, setOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    const productss = [
        {
            id: '0',
            name: 'Paper'
        },
        {
            id: '1',
            name: 'Cardboard'
        },
        {
            id: '2',
            name: 'Plastic'
        },
        {
            id: '3',
            name: 'Plastic Cover'
        },
        {
            id: '4',
            name: 'Metal'
        }
    ];

    useEffect(() => {
        setCategories(productss.map((product) => Object.assign(product, { products: [] })));
    }, []);

    const subCategoriess = [
        {
            id: '0',
            name: 'sub1',
            category: {
                id: '0',
                name: 'Paper'
            }
        },
        {
            id: '1',
            name: 'sub2',
            category: {
                id: '0',
                name: 'Paper'
            }
        },
        {
            id: '2',
            name: 'sub3',
            category: {
                id: '1',
                name: 'Cardboard'
            }
        },
        {
            id: '3',
            name: 'sub4',
            category: {
                id: '1',
                name: 'Cardboard'
            }
        },
        {
            id: '4',
            name: 'sub5',
            category: {
                id: '1',
                name: 'Cardboard'
            }
        }
    ];

    const handleCategorySelection = (category) => {
        setSelectedCategory(category?.id);
        setProducts(subCategoriess.filter((data) => data?.category?.id === category?.id));
        handleClickOpen();
    };

    function handleClose(selected, isAction) {
        if (isAction) {
            setCategories((oldArray) => {
                return oldArray.map((category) => {
                    if (category?.id === selectedCategory) {
                        category['products'] = [...selected];
                        return category;
                    } else {
                        return category;
                    }
                });
            });
        }
        setOpen(false);
    }

    function handleClickOpen() {
        setOpen(true);
    }

    function handleSubmit() {
        let selectedProducts = categories.filter((data) => data?.products?.length > 0);
        navigate('/seller/stock');
        console.log(selectedProducts);
    }

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={0}>
                    <Grid item xs={12} md={6} style={{ height: '92vh' }}>
                        <img style={{ objectFit: 'contain', width: '100%', height: '92vh' }} src={img} alt="ico"></img>
                    </Grid>
                    <Grid item xs={12} md={6} style={{ backgroundColor: 'white', height: '92vh', overflow: 'auto' }}>
                        <div style={{ dimensions: '100%', padding: matches ? '5%' : '5% 10%', textAlign: 'start' }}>
                            <Typography sx={{ color: colors.primary, fontWeight: 'bold', padding: '20px' }} component="div" varient="h1">
                                Choose Scrap Category
                            </Typography>
                            <Grid
                                container
                                spacing={1}
                                sx={{ backgroundColor: '#f7f7f7', justifyContent: 'start', padding: '0 10px 10px 0px' }}
                            >
                                {categories.map((category, index) => {
                                    return (
                                        <Grid key={index} item xs={4} md={4} lg={3} sm={3} sx={{ textAlign: 'center' }}>
                                            <Stack
                                                sx={{
                                                    borderRadius: '10px',
                                                    textAlign: 'center',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    padding: '2%'
                                                }}
                                            >
                                                <IconButton onClick={() => handleCategorySelection(category)}>
                                                    <Badge
                                                        overlap="circular"
                                                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                                                        badgeContent={
                                                            category?.products?.length === 0 ? (
                                                                ''
                                                            ) : (
                                                                <Avatar
                                                                    sx={{
                                                                        bgcolor: 'orange',
                                                                        height: '20px',
                                                                        width: '20px',
                                                                        fontSize: '10px'
                                                                    }}
                                                                >
                                                                    {category?.products?.length}
                                                                </Avatar>
                                                            )
                                                        }
                                                    >
                                                        <Avatar size="medium" alt={category?.name} src={img} />
                                                    </Badge>
                                                </IconButton>
                                                <div style={{ display: 'flex', width: '100%' }}>
                                                    <div style={{ width: '100%', textAlign: 'center' }}>
                                                        <Tooltip title={category?.name}>
                                                            <Typography
                                                                component="div"
                                                                variant="subtitle1"
                                                                noWrap
                                                                style={{ maxWidth: '100%', textOverflow: 'ellipsis', overflow: 'hidden' }}
                                                            >
                                                                {category?.name}
                                                            </Typography>
                                                        </Tooltip>
                                                    </div>
                                                    {/* <div style={{ width: '15%', textAlign: 'start' }}>
                                                        <div>
                                                            <InfoOutlinedIcon />
                                                        </div>
                                                    </div> */}
                                                </div>
                                            </Stack>
                                        </Grid>
                                    );
                                })}
                            </Grid>
                            <div style={{ paddingTop: '20px' }}>
                                <button style={{ width: '150px', borderRadius: '30px' }} className="btn1" onClick={handleSubmit}>
                                    Submit
                                </button>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </Box>
            {open ? (
                <ProductsModal
                    open={open}
                    handleClose={handleClose}
                    products={products}
                    selectedProducts={categories.find((category) => category.id === selectedCategory)?.['products']}
                />
            ) : (
                <></>
            )}
        </>
    );
}

export default ScrapSelectionPage;
