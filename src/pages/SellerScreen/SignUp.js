import * as yup from 'yup';
import { useFormik } from 'formik';
import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '~/util/ThemeProvider';
import { useMediaQuery } from '@mui/material/index';
import { animations } from 'react-animation';
// import axios from '~util/axios';
import { useAxios } from '~/components/useAxios';
import { FadeIn as Animate } from 'react-animated-components';
import { SlideInLeft } from 'react-animated-components';

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
import LocationPicker from './LocationPicker';
import { useNavigate } from 'react-router-dom';
import './Seller.css';
import OtpInput from 'react-otp-input';
import Button from '@mui/material/Button';

const validationSchema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    mobile: yup
        .string()
        .matches(/^[1-9]{1}[0-9]{9}$/, 'Invalid mobile number')
        .required('Mobile number is required'),
    email: yup.string().email(),
    gender: yup.string(),
    // otp: yup.number().required(),
    type: yup.string().required()
});

function SignUp() {
    const { colors } = useContext(ThemeContext);
    const [page, setPage] = useState(0);
    const [selectedProducts, setSelectedProducts] = useState(0);
    const [location, setLocation] = useState(null);
    const navigate = useNavigate();
    const matches = useMediaQuery('(max-width:768px)');
    var formResult = {};
    const axios = useAxios();

    const basicForm = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            mobile: '',
            email: '',
            gender: '',
            // otp: '',
            type: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            formResult = Object.assign(values);
            // console.log(formResult);
            setPage(1);
        }
    });

    function handleLocation(coordinates) {
        console.log(coordinates);
        setLocation(coordinates);
    }

    const addressForm = useFormik({
        initialValues: {
            address: '',
            city: '',
            state: '',
            pincode: ''
        },
        onSubmit: (values) => {
            formResult = Object.assign(formResult, values);
            handleSubmit();
            // console.log(values);
        }
    });

    function handleSubmit() {
        let result = Object.assign(basicForm.values, addressForm.values);
        axios
            .post('seller/register', result)
            .then((res) => {
                console.log(res);
                navigate('/seller/products');
            })
            .catch((err) => navigate('/seller/products'));
        // console.log();
    }

    useEffect(() => {}, []);
    //     {
    //         id: 0,
    //         name: 'Bottles'
    //     },
    //     {
    //         id: 1,
    //         name: 'Cartons'
    //     },
    //     {
    //         id: 2,
    //         name: 'Metals'
    //     },
    //     {
    //         id: 3,
    //         name: 'Magazines'
    //     },
    //     {
    //         id: 4,
    //         name: 'e-waste'
    //     },
    //     {
    //         id: 5,
    //         name: 'Glasses'
    //     },
    //     {
    //         id: 6,
    //         name: 'Books'
    //     },
    //     {
    //         id: 4,
    //         name: 'e-waste'
    //     },
    //     {
    //         id: 5,
    //         name: 'Glasses'
    //     },
    //     {
    //         id: 6,
    //         name: 'Books'
    //     }
    // ];

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

    const [otp, setOtp] = useState(null);

    return (
        <>
            <Animate>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={0}>
                        <Grid item xs={12} md={6} style={{ display: matches ? 'none' : 'block', height: '92vh' }}>
                            <img
                                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                                src="https://cdn.shopify.com/s/files/1/0098/1362/2848/products/community_600x.jpg?v=1597415519"
                                alt="ico"
                            ></img>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            md={6}
                            sx={{ animation: animations.fadeIn }}
                            style={page == 0 ? { height: '92vh', position: 'relative', overflow: 'auto' } : { display: 'none' }}
                        >
                            <div style={{ dimensions: '100%', padding: matches ? '10% 5%' : '5% 20%', textAlign: 'center' }}>
                                <h3 style={{ color: colors.primary }}>Scrapify</h3>
                                <div style={{ textAlign: 'start', color: colors.primary }}>
                                    <p>
                                        <b>Seller Registration</b>
                                    </p>
                                </div>
                                <form onSubmit={basicForm.handleSubmit}>
                                    <div className="row col-md-12">
                                        <div className="col-md-6" style={{ minHeight: '65px', paddingTop: '5px' }}>
                                            <FormControl fullWidth>
                                                <TextField
                                                    id="firstName"
                                                    name="firstName"
                                                    label="FirstName"
                                                    required
                                                    value={basicForm.values.firstName}
                                                    onChange={basicForm.handleChange}
                                                    onBlur={basicForm.handleBlur}
                                                    error={basicForm.touched.firstName && Boolean(basicForm.errors.firstName)}
                                                    size="small"
                                                    fullWidth={true}
                                                    // variant="oulined"
                                                />
                                                <FormHelperText sx={{ color: 'red', margin: 0 }}>
                                                    {basicForm.errors.firstName}
                                                </FormHelperText>
                                            </FormControl>
                                        </div>
                                        <div className="col-md-6" style={{ minHeight: '65px', paddingTop: '5px' }}>
                                            <FormControl fullWidth>
                                                <TextField
                                                    id="lastName"
                                                    name="lastName"
                                                    label="LastName"
                                                    required
                                                    value={basicForm.values.lastName}
                                                    onChange={basicForm.handleChange}
                                                    onBlur={basicForm.handleBlur}
                                                    error={basicForm.touched.lastName && Boolean(basicForm.errors.lastName)}
                                                    size="small"
                                                    fullWidth={true}
                                                    // variant="oulined"
                                                />
                                                <FormHelperText sx={{ color: 'red', margin: 0 }}>
                                                    {basicForm.errors.lastName}
                                                </FormHelperText>
                                            </FormControl>
                                        </div>
                                        <div className="col-md-12" style={{ minHeight: '65px', paddingTop: '5px' }}>
                                            <FormControl fullWidth>
                                                <TextField
                                                    id="email"
                                                    name="email"
                                                    label="Email"
                                                    value={basicForm.values.email}
                                                    onChange={basicForm.handleChange}
                                                    onBlur={basicForm.handleBlur}
                                                    error={basicForm.touched.email && Boolean(basicForm.errors.email)}
                                                    size="small"
                                                    fullWidth={true}
                                                    // variant="oulined"
                                                />
                                                <FormHelperText sx={{ color: 'red', margin: 0 }}>{basicForm.errors.email}</FormHelperText>
                                            </FormControl>
                                        </div>
                                        <div className="col-lg-9" style={{ minHeight: '65px', paddingTop: '5px' }}>
                                            <FormControl fullWidth>
                                                <TextField
                                                    id="mobile"
                                                    name="mobile"
                                                    label="Mobile"
                                                    required
                                                    inputProps={{ pattern: '^[1-9]{1}[0-9]{9}$' }}
                                                    value={basicForm.values.mobile}
                                                    onChange={basicForm.handleChange}
                                                    onBlur={basicForm.handleBlur}
                                                    error={basicForm.touched.mobile && Boolean(basicForm.errors.mobile)}
                                                    size="small"
                                                    fullWidth={true}
                                                    // variant="oulined"
                                                />
                                                <FormHelperText sx={{ color: 'red', margin: 0 }}>{basicForm.errors.mobile}</FormHelperText>
                                            </FormControl>
                                        </div>
                                        <div className="col-lg-3" style={{ minHeight: '65px', paddingTop: '5px' }}>
                                            <Button
                                                sx={{ width: '100%', height: '40px' }}
                                                variant="outlined"
                                                type="button"
                                                // onClick={() => {
                                                //     alert(Math.random().toFixed(4) * 10000);
                                                // }}
                                            >
                                                GET OTP
                                            </Button>
                                        </div>

                                        <div className="col-md-12" style={{ minHeight: '65px', paddingTop: '5px' }}>
                                            <FormControl fullWidth>
                                                <FormLabel id="group-label" style={{ textAlign: 'start' }}>
                                                    Enter Your OTP
                                                </FormLabel>
                                                <OtpInput
                                                    inputStyle={{
                                                        width: '2.5rem',
                                                        height: '2.5rem',
                                                        marginRight: '0.5rem',
                                                        fontSize: '1.5rem',
                                                        borderRadius: '4px',
                                                        border: '1px solid #ccc'
                                                    }}
                                                    value={otp}
                                                    onChange={setOtp}
                                                    onChangeRegex={/^([0-9]{0,})$/}
                                                    numInputs={4}
                                                    inputType="tel"
                                                    separator={<span>-</span>}
                                                    renderInput={(props) => <input {...props} />}
                                                />
                                                {/* <TextField
                                                id="otp"
                                                name="otp"
                                                label="otp"
                                                value={basicForm.values.otp}
                                                onChange={basicForm.handleChange}
                                                onBlur={basicForm.handleBlur}
                                                error={basicForm.touched.otp && Boolean(basicForm.errors.otp)}
                                                size="small"
                                                fullWidth={true}
                                            /> */}
                                                {/* <FormHelperText sx={{ color: otp ? 'none' : 'red', margin: 0 }}>
                                                {basicForm.errors.otp}
                                            </FormHelperText> */}
                                            </FormControl>
                                        </div>
                                    </div>
                                    <div className="col-md-12" style={{ minHeight: '85px', paddingTop: '5px', textAlign: 'start' }}>
                                        <FormControl fullWidth>
                                            <FormLabel id="group-label">Gender</FormLabel>
                                            <RadioGroup
                                                row
                                                aria-labelledby="group-label"
                                                name="gender"
                                                value={basicForm.values.gender}
                                                onChange={basicForm.handleChange}
                                                onBlur={basicForm.handleBlur}
                                                error={true.toString()}
                                                // error={basicForm.touched.gender && Boolean(basicForm.errors.gender)}
                                                size="small"
                                            >
                                                <FormControlLabel value="female" control={<Radio size="small" />} label="Female" />
                                                <FormControlLabel value="male" control={<Radio size="small" />} label="Male" />
                                                <FormControlLabel value="other" control={<Radio size="small" />} label="Other" />
                                            </RadioGroup>
                                            <FormHelperText sx={{ color: 'red', margin: 0 }}>{basicForm.errors.gender}</FormHelperText>
                                        </FormControl>
                                    </div>
                                    <div className="col-md-12" style={{ minHeight: '65px', paddingTop: '5px', textAlign: 'start' }}>
                                        <FormControl fullWidth>
                                            <FormLabel id="group-label">Seller Type</FormLabel>
                                            <RadioGroup
                                                row
                                                aria-labelledby="group-label"
                                                name="type"
                                                value={basicForm.values.type}
                                                onChange={basicForm.handleChange}
                                                onBlur={basicForm.handleBlur}
                                                size="small"
                                            >
                                                <FormControlLabel value="1" control={<Radio size="small" />} label="City Corporation" />
                                                <FormControlLabel value="2" control={<Radio size="small" />} label="Premium Institution" />
                                                <FormControlLabel value="0" control={<Radio size="small" />} label="Other" />
                                            </RadioGroup>
                                            <FormHelperText sx={{ color: 'red', margin: 0 }}>{basicForm.errors.type}</FormHelperText>
                                        </FormControl>
                                    </div>
                                    <br></br>
                                    <button type="submit" className="btn1" onClick={() => setPage(1)}>
                                        Next
                                    </button>
                                </form>
                            </div>
                        </Grid>
                        <Grid
                            sx={{ animation: animations.fadeIn }}
                            item
                            xs={12}
                            md={6}
                            style={page === 1 ? { height: '92vh', position: 'relative' } : { display: 'none' }}
                        >
                            <div style={{ dimensions: '100%', padding: '5% 2%', textAlign: 'center' }}>
                                <h3 style={{ color: colors.primary }}>Scrapify</h3>
                                <div style={{ textAlign: 'start', color: colors.primary }}>
                                    <p>
                                        <b>Pick Your Location</b>
                                    </p>
                                </div>
                                <LocationPicker handleLocation={handleLocation} />
                                <button
                                    onClick={() => {
                                        setPage(2);
                                    }}
                                    style={{ maxWidth: '50%', marginTop: '10px' }}
                                    type="button"
                                    className="btn1"
                                >
                                    Next
                                </button>
                                <br></br>
                                <button
                                    type="button"
                                    style={{ backgroundColor: '#f7f7f7', color: '#013f56', maxWidth: '50%' }}
                                    className="btn1"
                                    onClick={() => {
                                        setLocation(null);
                                        setPage(2);
                                    }}
                                >
                                    I will do it later
                                </button>
                            </div>
                        </Grid>
                        <Grid
                            sx={{ animation: animations.fadeIn }}
                            item
                            xs={12}
                            md={6}
                            style={page === 2 ? { height: '92vh', position: 'relative' } : { display: 'none' }}
                        >
                            <div style={{ dimensions: '100%', padding: matches ? '10% 5%' : '5% 20%', textAlign: 'center' }}>
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
                                        Submit
                                    </button>
                                </form>
                            </div>
                        </Grid>
                    </Grid>
                </Box>
            </Animate>
        </>
    );
}
export default SignUp;
