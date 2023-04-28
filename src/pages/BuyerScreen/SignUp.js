import * as yup from 'yup';
import { useFormik } from 'formik';
import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '~/util/ThemeProvider';
import { useMediaQuery } from '@mui/material/index';

import {
    TextField,
    FormControl,
    FormHelperText,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormLabel,
    Stack,
    Box,
    Avatar,
    Grid,
    Typography
} from '@mui/material/index';
import { animations } from 'react-animation';

const validationSchema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    mobile: yup
        .string()
        .matches(/^[1-9]{1}[0-9]{9}$/, 'Invalid mobile number')
        .required('Mobile number is required'),
    email: yup.string().email().required(),
    gender: yup.string().required(),
    password: yup
        .string()
        .min(8, 'Password must be at least 8 characters')
        .max(20, 'Password must be at most 20 characters')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
            'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
        )
        .required('Password is required')
});

export default function SignUp() {
    const { colors } = useContext(ThemeContext);
    const [page, setPage] = useState(0);
    const [selectedProducts, setSelectedProducts] = useState(0);
    const matches = useMediaQuery('(max-width:768px)');

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            mobile: '',
            email: '',
            gender: '',
            password: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log(values);
            setPage(1);
        }
    });

    const addressForm = useFormik({
        initialValues: {
            address: '',
            city: '',
            state: '',
            pincode: ''
        },
        onSubmit: (values) => {
            console.log(values);
            setPage(0);
        }
    });

    useEffect(() => {}, []);

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

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={0}>
                    <Grid item xs={12} md={6} sx={{ display: matches ? 'none' : 'block', animation: animations.fadeInUp }}>
                        <img
                            style={{ objectFit: 'cover', width: '100%', height: '92vh' }}
                            src="https://cdn.shopify.com/s/files/1/0098/1362/2848/products/community_600x.jpg?v=1597415519"
                            alt="ico"
                        ></img>
                    </Grid>
                    <Grid sx={{ animation: animations.fadeIn }} item xs={12} md={6} style={page == 0 ? {} : { display: 'none' }}>
                        <div style={{ dimensions: '100%', padding: '10% 20%', textAlign: 'center' }}>
                            <h3 style={{ color: colors.primary }}>Scrapify</h3>
                            <div style={{ textAlign: 'start', color: colors.primary }}>
                                <p>
                                    <b>Buyer Registration</b>
                                </p>
                            </div>
                            <form onSubmit={formik.handleSubmit}>
                                <div style={{ minHeight: '65px', paddingTop: '5px' }}>
                                    <FormControl fullWidth>
                                        <TextField
                                            id="firstName"
                                            name="firstName"
                                            label="FirstName"
                                            value={formik.values.firstName}
                                            onChange={formik.handleChange}
                                            error={formik.touched.firstName && formik.errors.firstName}
                                            size="small"
                                            fullWidth={true}
                                        />
                                        <FormHelperText sx={{ bgcolor: '#641E16', color: 'white', margin: 0 }}>
                                            {formik.touched.firstName || formik.errors.firstName ? formik.errors.firstName : ''}
                                        </FormHelperText>
                                    </FormControl>
                                </div>
                                <div style={{ minHeight: '65px', paddingTop: '5px' }}>
                                    <FormControl fullWidth>
                                        <TextField
                                            id="lastName"
                                            name="lastName"
                                            label="LastName"
                                            value={formik.values.lastName}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                            size="small"
                                            fullWidth={true}
                                            // variant="oulined"
                                        />
                                        <FormHelperText sx={{ color: 'red', margin: 0 }}>{formik.errors.lastName}</FormHelperText>
                                    </FormControl>
                                </div>
                                <div style={{ minHeight: '65px', paddingTop: '5px' }}>
                                    <FormControl fullWidth>
                                        <TextField
                                            id="mobile"
                                            name="mobile"
                                            label="Mobile"
                                            value={formik.values.mobile}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.mobile && Boolean(formik.errors.mobile)}
                                            size="small"
                                            fullWidth={true}
                                            // variant="oulined"
                                        />
                                        <FormHelperText sx={{ color: 'red', margin: 0 }}>{formik.errors.mobile}</FormHelperText>
                                    </FormControl>
                                </div>
                                <div style={{ minHeight: '65px', paddingTop: '5px' }}>
                                    <FormControl fullWidth>
                                        <TextField
                                            id="email"
                                            name="email"
                                            label="Email"
                                            value={formik.values.email}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.email && Boolean(formik.errors.email)}
                                            size="small"
                                            fullWidth={true}
                                            // variant="oulined"
                                        />
                                        <FormHelperText sx={{ color: 'red', margin: 0 }}>{formik.errors.email}</FormHelperText>
                                    </FormControl>
                                </div>
                                <div style={{ minHeight: '65px', paddingTop: '5px', textAlign: 'start' }}>
                                    <FormControl fullWidth>
                                        <FormLabel id="group-label">Gender</FormLabel>
                                        <RadioGroup
                                            row
                                            aria-labelledby="group-label"
                                            name="gender"
                                            value={formik.values.gender}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={true.toString()}
                                            // error={formik.touched.gender && Boolean(formik.errors.gender)}
                                            size="small"
                                        >
                                            <FormControlLabel value="female" control={<Radio size="small" />} label="Female" />
                                            <FormControlLabel value="male" control={<Radio size="small" />} label="Male" />
                                            <FormControlLabel value="other" control={<Radio size="small" />} label="Other" />
                                        </RadioGroup>
                                        <FormHelperText sx={{ color: 'red', margin: 0 }}>{formik.errors.gender}</FormHelperText>
                                    </FormControl>
                                </div>
                                <div style={{ minHeight: '65px', paddingTop: '5px' }}>
                                    <FormControl fullWidth>
                                        <TextField
                                            id="password"
                                            name="password"
                                            label="Password"
                                            value={formik.values.password}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.password && Boolean(formik.errors.password)}
                                            size="small"
                                            fullWidth={true}
                                        />
                                        <FormHelperText sx={{ color: 'red', margin: 0 }}>{formik.errors.password}</FormHelperText>
                                    </FormControl>
                                </div>
                                <button type="submit" className="btn1">
                                    Next
                                </button>
                            </form>
                        </div>
                    </Grid>
                    <Grid sx={{ animation: animations.fadeIn }} item xs={12} md={6} style={page === 1 ? {} : { display: 'none' }}>
                        <div style={{ dimensions: '100%', padding: '10% 5%', textAlign: 'center' }}>
                            <h3 style={{ color: colors.primary }}>Scrapify</h3>
                            <div style={{ textAlign: 'start', color: colors.primary }}>
                                <p>
                                    <b>Select Product Types</b>
                                </p>
                            </div>
                            <div
                                style={{
                                    dimensions: '100%',
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: 2,
                                    paddingBottom: '20px',
                                    justifyContent: 'center'
                                }}
                            >
                                {products.map((product, index) => {
                                    return (
                                        <Stack
                                            key={index}
                                            spacing={1}
                                            onClick={() => {
                                                setSelectedProducts(index);
                                            }}
                                            style={{
                                                width: '100px',
                                                justifyContent: 'center',
                                                padding: '10px',
                                                alignItems: 'center',
                                                borderRadius: '10px',
                                                boxShadow: selectedProducts === index ? 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' : 'none'
                                            }}
                                        >
                                            <Avatar>H</Avatar>
                                            <Typography sx={selectedProducts === index ? { color: '#013f56', fontWeight: 'bold' } : {}}>
                                                {product?.name}
                                            </Typography>
                                        </Stack>
                                    );
                                })}
                            </div>
                            <button style={{ maxWidth: '50%' }} type="button" className="btn1" onClick={() => setPage(2)}>
                                Next
                            </button>
                            <br></br>
                            <button
                                type="button"
                                style={{ backgroundColor: '#f7f7f7', color: '#013f56', maxWidth: '50%' }}
                                className="btn1"
                                onClick={() => setPage(2)}
                            >
                                I will do it later
                            </button>
                        </div>
                    </Grid>
                    <Grid sx={{ animation: animations.fadeIn }} item xs={12} md={6} style={page === 2 ? {} : { display: 'none' }}>
                        <div style={{ dimensions: '100%', padding: '10% 20%', textAlign: 'center' }}>
                            <h3 style={{ color: colors.primary }}>Scrapify</h3>
                            <div style={{ textAlign: 'start', color: colors.primary }}>
                                <p>
                                    <b>Buisness Address</b>
                                </p>
                            </div>
                            <form onSubmit={addressForm.handleSubmit}>
                                <div style={{ minHeight: '65px', paddingTop: '5px' }}>
                                    <FormControl fullWidth>
                                        <TextField
                                            id="address"
                                            name="address"
                                            label="Address"
                                            value={addressForm.values.address}
                                            onChange={addressForm.handleChange}
                                            onBlur={addressForm.handleBlur}
                                            error={addressForm.touched.address && Boolean(addressForm.errors.address)}
                                            size="small"
                                            fullWidth={true}
                                        />
                                        <FormHelperText sx={{ color: 'red', margin: 0 }}>{addressForm.errors.address}</FormHelperText>
                                    </FormControl>
                                </div>
                                <div style={{ minHeight: '65px', paddingTop: '5px' }}>
                                    <FormControl fullWidth>
                                        <TextField
                                            id="city"
                                            name="city"
                                            label="City"
                                            value={addressForm.values.city}
                                            onChange={addressForm.handleChange}
                                            onBlur={addressForm.handleBlur}
                                            error={addressForm.touched.city && Boolean(addressForm.errors.city)}
                                            size="small"
                                            fullWidth={true}
                                        />
                                        <FormHelperText sx={{ color: 'red', margin: 0 }}>{addressForm.errors.city}</FormHelperText>
                                    </FormControl>
                                </div>
                                <div style={{ minHeight: '65px', paddingTop: '5px' }}>
                                    <FormControl fullWidth>
                                        <TextField
                                            id="state"
                                            name="state"
                                            label="State"
                                            value={addressForm.values.state}
                                            onChange={addressForm.handleChange}
                                            onBlur={addressForm.handleBlur}
                                            error={addressForm.touched.state && Boolean(addressForm.errors.state)}
                                            size="small"
                                            fullWidth={true}
                                        />
                                        <FormHelperText sx={{ color: 'red', margin: 0 }}>{addressForm.errors.state}</FormHelperText>
                                    </FormControl>
                                </div>
                                <div style={{ minHeight: '65px', paddingTop: '5px' }}>
                                    <FormControl fullWidth>
                                        <TextField
                                            id="pincode"
                                            name="pincode"
                                            label="Pincode"
                                            value={addressForm.values.pincode}
                                            onChange={addressForm.handleChange}
                                            onBlur={addressForm.handleBlur}
                                            error={addressForm.touched.pincode && Boolean(addressForm.errors.pincode)}
                                            size="small"
                                            fullWidth={true}
                                        />
                                        <FormHelperText sx={{ color: 'red', margin: 0 }}>{addressForm.errors.pincode}</FormHelperText>
                                    </FormControl>
                                </div>
                                <button type="submit" className="btn1">
                                    Next
                                </button>
                            </form>
                        </div>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}
