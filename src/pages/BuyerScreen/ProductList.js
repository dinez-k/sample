import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import img from '/src/assets/images/product.png';
import { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';

export default function ProductList({ products, setProduct }) {
    const [selectedProduct, setSelectedProduct] = useState([]);

    useEffect(() => {}, []);

    const handleSelectedProduct = (index) => {
        setSelectedProduct((oldArray) => {
            if (oldArray.includes(index)) {
                let data = [...oldArray.filter((e) => e != index)];
                setProduct(data);
                return data;
            } else {
                let data = [...oldArray, index];
                setProduct(data);
                return data;
            }
        });
    };

    return (
        <div
            style={{
                display: 'flex',
                backgroundColor: '#f7f7f7',
                justifyContent: 'flex-start',
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: 5,
                width: '100%',
                padding: '10px',
                boxShadow: '#f7f7f7 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset'
            }}
        >
            {products.map((e, index) => {
                return (
                    <Stack
                        key={index}
                        onClick={() => handleSelectedProduct(index)}
                        style={{
                            flex: '0 0 32%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: '10px',
                            maxWidth: '32%',
                            padding: '10px',
                            cursor: 'pointer'
                        }}
                        sx={
                            selectedProduct.includes(index)
                                ? {
                                      boxShadow: '0px 9px 14px rgba(0, 0, 0, 0.12)',
                                      backgroundColor: 'white',
                                      transition: 'box-shadow 0.3s ease-in-out , background-color 0.3s ease-in-out'
                                  }
                                : { boxShadow: 'none', backgroundColor: 'none' }
                        }
                    >
                        <IconButton aria-haspopup="true">
                            <div style={{ textAlign: 'center' }}>
                                <Avatar alt="img" src={img} sx={{ width: '50px', height: '50px' }} />
                            </div>
                        </IconButton>
                        <Tooltip title={e?.name} style={{ maxWidth: '100%', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                            <Typography
                                noWrap
                                sx={selectedProduct.includes(index) ? { color: '#013f56', fontWeight: 'bold' } : {}}
                                component="div"
                                varient="p"
                            >
                                {e?.name}
                            </Typography>
                        </Tooltip>
                    </Stack>
                );
            })}
        </div>
    );
}
