import {
    Stack,
    Grid,
    Typography,
    Tooltip,
    Avatar,
    IconButton,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle
} from '@mui/material/index';
import { useState, useEffect } from 'react';
import img from '~assets/images/seller_img1.PNG';
import PropTypes from 'prop-types';

function ProductsModal({ products = [], selectedProducts = [], handleClose }) {
    const [open, setOpen] = useState(true);
    const [selectedDatas, setSelectedDatas] = useState([]);

    useEffect(() => {
        setSelectedDatas(selectedProducts.map((selectedProduct) => selectedProduct?.id));
    }, []);

    function onClose() {
        setOpen(false);
        handleClose(
            products.filter((product) => selectedDatas.includes(product?.id)),
            true
        );
    }

    function handleSelection(id) {
        setSelectedDatas((oldArray) => {
            return oldArray.includes(id) ? [...oldArray.filter((e) => e != id)] : [...oldArray, id];
        });
    }

    return (
        <Dialog
            fullWidth
            maxWidth="sm"
            open={open}
            onClose={() => handleClose(null, false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                <Stack flexDirection="row" justifyContent="space-between">
                    <Typography component="div" variant="h6">
                        Choose Products
                    </Typography>
                    <Button onClick={() => handleClose(null, false)}>x</Button>
                </Stack>
            </DialogTitle>
            <DialogContent>
                <Grid
                    container
                    spacing={1}
                    sx={{ backgroundColor: '#f7f7f7', justifyContent: 'start', padding: '10px', borderRadius: '10px' }}
                >
                    {products.map((product, index) => {
                        return (
                            <Grid key={index} item xs={4} md={4} lg={3} sm={3} sx={{ textAlign: 'center' }}>
                                <Stack
                                    sx={{
                                        backgroundColor: selectedDatas.includes(product?.id) ? 'white' : '#f7f7f7',
                                        boxShadow: selectedDatas.includes(product?.id)
                                            ? 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px'
                                            : 'none',
                                        borderRadius: '10px',
                                        textAlign: 'center',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        padding: '2%'
                                    }}
                                >
                                    <IconButton onClick={() => handleSelection(product?.id)}>
                                        <Avatar size="medium" alt={product?.name} src={img} />
                                    </IconButton>
                                    <div style={{ display: 'flex', width: '100%' }}>
                                        <div style={{ width: '100%', textAlign: 'center' }}>
                                            <Tooltip title={product?.name}>
                                                <Typography
                                                    component="div"
                                                    variant="subtitle1"
                                                    noWrap
                                                    style={{ maxWidth: '100%', textOverflow: 'ellipsis', overflow: 'hidden' }}
                                                >
                                                    {product?.name}
                                                </Typography>
                                            </Tooltip>
                                        </div>
                                    </div>
                                </Stack>
                            </Grid>
                        );
                    })}
                    {products.length === 0 ? (
                        <Grid item xs={12} md={12} lg={12} sm={12}>
                            <Stack alignItems="center" justifyContent="center" padding="5%">
                                <Typography>No Products !</Typography>
                            </Stack>
                        </Grid>
                    ) : (
                        <></>
                    )}
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Save</Button>
                <Button onClick={() => handleClose(null, false)}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
}

ProductsModal.propTypes = {
    products: PropTypes.array,
    selectedProducts: PropTypes.array,
    handleClose: PropTypes.func
};

export default ProductsModal;
