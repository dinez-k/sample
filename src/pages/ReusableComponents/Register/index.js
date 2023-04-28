import { useEffect, useState, useContext } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { Box, FormControl, IconButton, Stack, Tooltip, Typography } from '@mui/material/index';
import { useMediaQuery } from '@mui/material/index';
import { ThemeContext } from '~/util/ThemeProvider';
import { styled } from '@mui/material/styles';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import GoogleIcon from '@mui/icons-material/Google';
import OtpInput from 'react-otp-input';
import { ToastContainer, toast } from 'react-toastify';
import Badge from '@mui/material/Badge';
import CloseIcon from '@mui/icons-material/Close';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';
import StorefrontIcon from '@mui/icons-material/Storefront';
import LocationPicker from '~/pages/SellerScreen/LocationPicker';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import ProductSelection from './ProductSelection';
import { useAxios } from '~/components/useAxios';
import SelectedProducts from './SelectedProducts';
import FormHelperText from '@mui/material/FormHelperText';

function Register({ open, setOpen }) {
    const { colors, fonts } = useContext(ThemeContext);
    const [step, setStep] = useState(0);
    const [checkedValues, setCheckedValues] = useState([]);
    const axios = useAxios();
    const [categories, setCategories] = useState([]);
    const [formValues, setFormValues] = useState({
        name: '',
        buisnessType: '',
        email: '',
        phone: '',
        otp: '',
        address: '',
        location: '',
        userType: 'seller'
    });
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [isTouched, setIsTouched] = useState(false);

    function getProducts() {
        axios
            .get('category')
            .then((res) => {
                if (res?.data && res?.data?.length > 0) {
                    setCategories(res?.data.filter((obj) => obj?.id != null));
                }
            })
            .catch((err) => toast.error('Error: ' + err.message));
    }

    useEffect(() => {
        getProducts();
    }, []);

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        const { name, value } = event;
        setFormValues((prevState) => ({ ...prevState, [name]: value }));
    };

    const ThemeButton = styled(Button)({
        backgroundColor: colors.primary,
        color: 'white',
        borderRadius: '30px',
        width: '100%',
        height: 'fit-content',
        border: 'solid 1px' + colors.primary,
        '&:hover': {
            backgroundColor: colors.primary // new background color on hover
        }
    });

    const ThemeButton2 = styled(Button)({
        backgroundColor: 'white',
        color: colors.primary,
        borderRadius: '30px',
        border: 'solid 1px' + colors.primary,
        width: '100%',
        height: 'fit-content',
        '&:hover': {
            backgroundColor: 'white' // new background color on hover
        }
    });

    const HelperText = styled(FormHelperText)({
        color: 'red'
    });

    const handleForward = () => {
        setIsTouched(true);
        if (step === 1) {
            if (formValues.name.trim() === '') {
                toast.error('Name is Required');
            } else {
                setStep(step + 1);
                setIsTouched(false);
            }
        } else if (step === 2) {
            if (formValues.buisnessType.trim() === '') toast.error('Buisness type is Required');
            else {
                setStep(step + 1);
                setIsTouched(false);
            }
        } else if (step === 3) {
            if (formValues.email.trim() !== '') {
                if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formValues.email)) setStep(step + 1);
                else toast.error('Enter a valid Email');
            } else {
                setStep(step + 1);
                setIsTouched(false);
            }
        } else if (step === 4) {
            if (formValues.phone.trim() === '') toast.error('Phone Number is Required');
            else if (/^[1-9]{1}[0-9]{9}$/.test(formValues.phone)) {
                setStep(step + 1);
                setIsTouched(false);
            } else toast.error('Enter a valid phone number');
        } else if (step === 5) {
            if (formValues.otp.trim() === '' || formValues.otp.length !== 6) {
                toast.error('Enter OTP');
            } else {
                setStep(step + 1);
                setIsTouched(false);
            }
        } else if (step === 6) {
            if (formValues.address.trim() === '') toast.error('Address Is Required');
            else {
                setStep(step + 1);
                setIsTouched(false);
            }
        } else if (step === 7) {
            if (checkedValues?.length > 0 && checkedValues?.length <= 9) {
                setStep(step + 1);
                setIsTouched(false);
                getSelectedProducts();
            } else toast.error('Please selected atleast 1 product but should not exceed 9');
        } else if (step === 8) {
            console.log(selectedProducts);
            console.log(formValues);
            toast.success('Registered Successfully !');
            handleClose();
        } else {
            setStep(step + 1);
            setIsTouched(false);
        }
    };

    function getSelectedProducts() {
        let arr = [];
        categories.forEach((category) => {
            let products = [...category?.products];
            let obj = {
                id: category?.id,
                name: category?.name,
                icon: category?.icon,
                products: products.filter((product) => checkedValues.includes(product?.id))
            };
            arr.push(obj);
        });
        setSelectedProducts(arr.filter((e) => e?.products?.length > 0));
    }

    const handleBackward = () => {
        if (step !== 0) {
            setStep(step - 1);
        }
    };

    const buisnessTypes = [
        {
            id: '0',
            name: 'organization'
        },
        {
            id: '1',
            name: 'indivudual'
        }
    ];

    return (
        <>
            <Dialog
                BackdropProps={{
                    invisible: false
                }}
                maxWidth="xs"
                open={open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    <Stack flexDirection="row" justifyContent="end">
                        <IconButton size="small" onClick={handleClose}>
                            <Tooltip title="close">
                                <CloseIcon sx={{ fontSize: '1rem' }} />
                            </Tooltip>
                        </IconButton>
                    </Stack>
                    <Stack justifyContent="center" alignItems="center" spacing={1}>
                        <Typography
                            noWrap
                            component="div"
                            sx={{ color: colors.secondary, fontSize: '2rem', fontWeight: 'bold', overflow: 'hidden' }}
                        >
                            Scrapify
                        </Typography>
                    </Stack>
                </DialogTitle>
                <DialogContent sx={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Grid container spacing={1} rowSpacing={1}>
                        {
                            {
                                0: (
                                    <>
                                        <Grid
                                            item
                                            xs={6}
                                            sx={{ justifyContent: 'center' }}
                                            onClick={() => handleChange({ name: 'userType', value: 'seller' })}
                                        >
                                            <Stack
                                                sx={{
                                                    color: formValues.userType === 'seller' ? colors.secondary : colors.primary,
                                                    border:
                                                        formValues.userType === 'seller'
                                                            ? 'solid 2px' + colors.secondary
                                                            : 'solid 2px #EAECEE',
                                                    padding: '10px 25px',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    borderRadius: '10px'
                                                }}
                                            >
                                                <IconButton sx={{ textAlign: 'center' }}>
                                                    <StorefrontIcon
                                                        sx={{
                                                            fontSize: '2rem',
                                                            color: formValues.userType === 'seller' ? colors.secondary : colors.primary
                                                        }}
                                                    />
                                                </IconButton>
                                                <Typography component="div" varient="h6">
                                                    Seller
                                                </Typography>
                                            </Stack>
                                        </Grid>
                                        <Grid
                                            item
                                            xs={6}
                                            sx={{ justifyContent: 'center' }}
                                            onClick={() => handleChange({ name: 'userType', value: 'buyer' })}
                                        >
                                            <Stack
                                                sx={{
                                                    color: formValues.userType === 'buyer' ? colors.secondary : colors.primary,
                                                    border:
                                                        formValues.userType === 'buyer'
                                                            ? 'solid 2px' + colors.secondary
                                                            : 'solid 2px #EAECEE',
                                                    padding: '10px 25px',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    borderRadius: '10px'
                                                }}
                                            >
                                                <IconButton>
                                                    <PersonIcon
                                                        sx={{
                                                            fontSize: '2rem',
                                                            color: formValues.userType === 'buyer' ? colors.secondary : colors.primary
                                                        }}
                                                    />
                                                </IconButton>
                                                <Typography component="div" varient="h6">
                                                    Buyer
                                                </Typography>
                                            </Stack>
                                        </Grid>
                                    </>
                                ),
                                1: (
                                    <>
                                        <Grid item xs={12} sx={{ justifyContent: 'center' }}>
                                            <TextField
                                                id="name"
                                                name="name"
                                                label="Name"
                                                value={formValues.name}
                                                required
                                                error={isTouched && formValues.name.trim() === ''}
                                                onChange={(e) => handleChange(e.target)}
                                                margin="normal"
                                                fullWidth
                                                size="small"
                                            />
                                            {/* <HelperText>{isTouched && formValues.name.trim() === '' && 'Name is Required'}</HelperText> */}
                                        </Grid>
                                    </>
                                ),
                                2: (
                                    <>
                                        <Grid item xs={12} sx={{ justifyContent: 'center' }}>
                                            <FormControl sx={{ width: '100%', marginTop: '10px' }}>
                                                <InputLabel
                                                    sx={{ color: isTouched && formValues.buisnessType.trim() === '' && 'red' }}
                                                    id="buisnessType"
                                                >
                                                    Buisness Type
                                                </InputLabel>
                                                <Select
                                                    labelId="buisnessType"
                                                    id="buisnessType"
                                                    value={formValues.buisnessType}
                                                    name="buisnessType"
                                                    label="BuisnessType"
                                                    required
                                                    fullWidth
                                                    error={isTouched && formValues.buisnessType.trim() === ''}
                                                    margin="none"
                                                    size="small"
                                                    sx={{ minWidth: '300px' }}
                                                    onChange={(e) => handleChange(e.target)}
                                                >
                                                    {buisnessTypes.map((type, index) => {
                                                        return (
                                                            <MenuItem key={index} value={type?.id}>
                                                                {type?.name}
                                                            </MenuItem>
                                                        );
                                                    })}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                    </>
                                ),
                                3: (
                                    <>
                                        <Grid item xs={12} sx={{ justifyContent: 'center' }}>
                                            <TextField
                                                id="email"
                                                name="email"
                                                label="Email"
                                                value={formValues.email}
                                                error={isTouched && !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formValues.email)}
                                                onChange={(e) => handleChange(e.target)}
                                                margin="normal"
                                                fullWidth
                                                size="small"
                                            />
                                        </Grid>
                                    </>
                                ),
                                4: (
                                    <>
                                        <Grid item xs={12} sx={{ justifyContent: 'center' }}>
                                            <TextField
                                                id="phone"
                                                name="phone"
                                                label="Phone Number"
                                                error={isTouched && !/^[1-9]{1}[0-9]{9}$/.test(formValues.phone)}
                                                inputProps={{ pattern: '^[1-9]{1}[0-9]{9}$' }}
                                                value={formValues.phone}
                                                required
                                                onChange={(e) => handleChange(e.target)}
                                                InputProps={{
                                                    startAdornment: <InputAdornment position="start">+91-</InputAdornment>
                                                }}
                                                margin="normal"
                                                fullWidth
                                                size="small"
                                            />
                                        </Grid>
                                    </>
                                ),
                                5: (
                                    <>
                                        <Grid item xs={12} sx={{ justifyContent: 'center', alignItems: 'center' }}>
                                            <Stack sx={{ justifyContent: 'center', alignItems: 'center' }}>
                                                <Typography
                                                    id="group-label"
                                                    component="div"
                                                    varient="p"
                                                    sx={{ fontSize: '0.7rem', color: colors.primary }}
                                                >
                                                    Verication Code is Sent to <b>+91-{formValues.phone}</b>
                                                </Typography>
                                                <br></br>
                                                <OtpInput
                                                    inputStyle={{
                                                        width: '1.5rem',
                                                        height: '1.5rem',
                                                        marginRight: '0.5rem',
                                                        fontSize: '1rem',
                                                        border: 'none',
                                                        boxShadow: 'none',
                                                        // borderRadius: '4px',
                                                        border: '0.5px solid grey'
                                                    }}
                                                    id="otp"
                                                    name="otp"
                                                    value={formValues.otp}
                                                    onChange={(e) => setFormValues((prevState) => ({ ...prevState, otp: e }))}
                                                    onChangeRegex={/^([0-9]{0,})$/}
                                                    numInputs={6}
                                                    inputType="tel"
                                                    separator={<span>-</span>}
                                                    renderInput={(props) => <input {...props} />}
                                                />
                                                <Typography
                                                    component={Button}
                                                    // onClick={}
                                                    varient="p"
                                                    sx={{ textTransform: 'none', fontSize: '0.7rem', color: colors.primary }}
                                                >
                                                    Resend Code
                                                </Typography>
                                            </Stack>
                                        </Grid>
                                    </>
                                ),
                                6: (
                                    <>
                                        <Grid item xs={12} sx={{ justifyContent: 'center', alignItems: 'center' }}>
                                            <Stack sx={{ justifyContent: 'center', alignItems: 'center' }}>
                                                <Typography
                                                    id="group-label"
                                                    component="div"
                                                    varient="p"
                                                    sx={{ fontSize: '1rem', color: colors.primary }}
                                                >
                                                    Select your shop location
                                                </Typography>
                                                <br></br>
                                                <LocationPicker
                                                    handleLocation={(e) => handleChange({ name: 'location', value: e })}
                                                    height="35vh"
                                                />
                                                <TextField
                                                    id="address"
                                                    name="address"
                                                    label="Address"
                                                    value={formValues.address}
                                                    required
                                                    multiline
                                                    error={isTouched && formValues.address.trim() === ''}
                                                    maxRows={4}
                                                    onChange={(e) => handleChange(e.target)}
                                                    margin="normal"
                                                    fullWidth
                                                    size="small"
                                                />
                                            </Stack>
                                        </Grid>
                                    </>
                                ),
                                7: (
                                    <>
                                        <Grid item xs={12} sx={{ justifyContent: 'center', alignItems: 'center' }}>
                                            <ProductSelection
                                                checkedValues={checkedValues}
                                                categories={categories}
                                                setCheckedValues={setCheckedValues}
                                            />
                                        </Grid>
                                    </>
                                ),
                                8: (
                                    <Grid item xs={12} sx={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <SelectedProducts categories={selectedProducts} />
                                    </Grid>
                                )
                            }[step]
                        }
                        {step !== 0 && (
                            <Grid item xs={6} sx={{ marginTop: '20px' }}>
                                <ThemeButton2 varient="contained" onClick={handleBackward}>
                                    Back
                                </ThemeButton2>
                            </Grid>
                        )}
                        <Grid item xs={step === 0 ? 12 : 6} sx={{ marginTop: '20px' }}>
                            <ThemeButton varient="contained" onClick={handleForward}>
                                {step === 4 ? 'Get OTP' : step === 8 ? 'Done' : 'Next'}
                            </ThemeButton>
                        </Grid>
                        <Grid item xs={12} display="flex" justifyContent="center">
                            <Typography
                                component={Button}
                                // onClick={}
                                varient="p"
                                sx={{ textTransform: 'none', fontSize: '0.7rem', color: colors.primary }}
                            >
                                Registered User ? Login
                            </Typography>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        </>
    );
}
export default Register;
