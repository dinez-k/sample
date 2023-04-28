import { Grid, Box, Stack, IconButton, Avatar, Typography, FormControlLabel } from '@mui/material/index';
import img from '~assets/images/product.png';
import { useState, useContext } from 'react';
import { ThemeContext } from '~/util/ThemeProvider';
import Checkbox from '@mui/material/Checkbox';
import { useEffect } from 'react';
import { useAxios } from '~/components/useAxios';

export default function ProductPage() {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState([]);
    const { colors, fonts } = useContext(ThemeContext);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const axios = useAxios();
    const [checkedValues, setCheckedValues] = useState([]);

    const categoriess = [
        {
            id: '0',
            name: 'Bottles'
        },
        {
            id: '1',
            name: 'Metals'
        },
        {
            id: '2',
            name: 'Glasses'
        },
        {
            id: '3',
            name: 'Wood'
        }
    ];

    const productss = [
        {
            id: '0',
            name: 'Sub1',
            category: {
                id: '0',
                name: 'Bottles'
            }
        },
        {
            id: '0',
            name: 'Sub1',
            category: {
                id: '0',
                name: 'Bottles'
            }
        },
        {
            id: '0',
            name: 'Sub1',
            category: {
                id: '0',
                name: 'Bottles'
            }
        }
    ];

    function getProducts() {
        axios
            .get('category')
            .then((res) => {
                if (res?.data && res?.data?.length > 0) {
                    setCategories(res?.data);
                    setSelectedCategory(res?.data[0]?.id);
                }
                if (res?.data[0]?.products.length > 0) {
                    setProducts(res?.data[0]?.products);
                }
            })
            .catch((err) => console.log(err));
    }

    useEffect(() => {
        getProducts();
    }, []);

    const handleCategoryChange = (id) => {
        setSelectedCategory(id);
        setProducts(categories.find((e) => e?.id === id)?.products);
    };

    const handleProductChange = (event) => {
        const id = event.target.id;
        const isChecked = event.target.checked;

        if (isChecked) {
            setCheckedValues([...checkedValues, id]);
        } else {
            setCheckedValues(checkedValues.filter((value) => value !== id));
        }
    };

    return (
        <>
            <Box flexGrow={0}>
                <Grid container spacing={1}>
                    <Grid item xs={4} sx={{ height: '40vh', overflow: 'auto' }}>
                        <Stack spacing={0}>
                            {categories.map((category, index) => {
                                return (
                                    <Stack
                                        key={index}
                                        alignItems="center"
                                        justifyContent="center"
                                        onClick={() => handleCategoryChange(category?.id)}
                                        sx={{
                                            bgcolor: selectedCategory === category?.id ? 'white' : '#e9ecef',
                                            padding: '10px',
                                            borderRight:
                                                selectedCategory === category?.id ? 'solid 3px ' + colors.secondary : 'solid 3px #e9ecef'
                                        }}
                                    >
                                        <IconButton>
                                            <Avatar src={img} alt="ico"></Avatar>
                                        </IconButton>
                                        <Typography component="div" varient="p">
                                            {category?.name}
                                        </Typography>
                                    </Stack>
                                );
                            })}
                        </Stack>
                    </Grid>
                    <Grid item xs={8} sx={{ height: '40vh', overflow: 'auto' }}>
                        <Stack>
                            <Box sx={{ position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 1 }}>
                                <Typography varient="h1" sx={{ fontSize: '1rem' }}>
                                    Select Favorite Items
                                </Typography>
                                <Typography varient="p" sx={{ fontSize: '0.7rem' }}>
                                    (max 9 items is to be selected)
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                {products.map((product, index) => {
                                    return (
                                        <FormControlLabel
                                            key={index}
                                            label={product?.name}
                                            control={
                                                <Checkbox
                                                    id={product?.id}
                                                    checked={checkedValues.includes(product?.id)}
                                                    onChange={handleProductChange}
                                                    sx={{
                                                        color: colors.secondary,
                                                        '&.Mui-checked': {
                                                            color: colors.secondary
                                                        }
                                                    }}
                                                    size="small"
                                                />
                                            }
                                        />
                                    );
                                })}
                            </Box>
                        </Stack>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}
