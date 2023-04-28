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
import Register from '../Register/index';

export default function Login({ open, close }) {
    const { colors, fonts } = useContext(ThemeContext);
    const [toggle, setToggle] = useState('seller');
    const [step, setStep] = useState(0);

    const [formValues, setFormValues] = useState({
        phone: '',
        otp: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues((prevState) => ({ ...prevState, [name]: value }));
    };

    function handleToggle(event, value) {
        setFormValues({
            phone: '',
            otp: ''
        });
        setToggle(value);
        setStep(0);
    }

    const MyToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        border: '1px solid ' + colors.primary,
        padding: '1px',
        borderRadius: '30px',
        overflow: 'hidden',
        width: '60%',
        height: 'fit-content',
        '.MuiToggleButton-root': {
            color: '#333',
            border: 'none',
            backgroundColor: 'transparent',
            borderRadius: '30px !important',
            padding: '6px 10px',
            width: '100%',
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

    const ThemeButton = styled(Button)({
        backgroundColor: colors.primary,
        color: 'white',
        borderRadius: '30px',
        width: '250px',
        '&:hover': {
            backgroundColor: colors.primary // new background color on hover
        }
    });

    const ThemeButton2 = styled(Button)({
        backgroundColor: 'white',
        color: colors.primary,
        borderRadius: '30px',
        border: 'solid 1px' + colors.primary,
        width: '250px',
        '&:hover': {
            backgroundColor: 'white' // new background color on hover
        }
    });

    function handleOTP() {
        if (step === 0) {
            if (formValues.phone.length === 0) {
                toast.error('🧐 Phone Number is Required!');
            } else {
                const pattern = /^[1-9]{1}[0-9]{9}$/;
                const isMatch = pattern.test(formValues.phone);
                if (isMatch) {
                    toast.success('😉 OTP sent !');
                    setStep(1);
                } else toast.error('🧐 Invalid Phone Number!');
            }
        } else if (step === 1) {
            console.log(formValues);
            if (formValues.otp.length === 6) {
                console.log(formValues);
                console.log(toggle);
                toast.success('😉 Login Successfully !');
                close(false, false);
            } else toast.error('🧐 Invalid OTP !');
        }
    }

    const handleClose = () => {
        handleToggle(null, 'seller');
        close(false, false);
    };

    const handleRegister = () => {
        close(false, true);
    };

    return (
        <>
            <Dialog
                // PaperProps={{
                //     sx: {
                //     }
                // }}
                BackdropProps={{
                    invisible: false
                }}
                open={open}
                // onClose={handleClose}
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
                        <MyToggleButtonGroup value={toggle} onChange={handleToggle} exclusive aria-label="Platform">
                            <ToggleButton size="small" value="seller" sx={{ fontSize: '0.7rem' }}>
                                Seller
                            </ToggleButton>
                            <ToggleButton size="small" value="buyer" sx={{ fontSize: '0.7rem' }}>
                                Buyer
                            </ToggleButton>
                        </MyToggleButtonGroup>
                    </Stack>
                </DialogTitle>
                <DialogContent sx={{ alignItems: 'center', textAlign: 'center' }}>
                    {
                        {
                            0: (
                                <>
                                    <FormControl>
                                        <TextField
                                            id="phone"
                                            name="phone"
                                            label="Phone Number"
                                            inputProps={{ pattern: '^[1-9]{1}[0-9]{9}$' }}
                                            value={formValues.phone}
                                            required
                                            onChange={handleChange}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">+91-</InputAdornment>
                                            }}
                                            margin="normal"
                                            fullWidth
                                            size="small"
                                        />
                                    </FormControl>
                                    <br></br>
                                    <br></br>
                                    <Stack spacing={1}>
                                        <ThemeButton type="submit" varient="contained" onClick={handleOTP}>
                                            GET OTP
                                        </ThemeButton>
                                        <ThemeButton2 varient="contained">
                                            Login With&nbsp;
                                            <GoogleIcon sx={{ height: '0.7rem' }} />
                                        </ThemeButton2>
                                        <Stack sx={{ alignItems: 'center' }}>
                                            <Typography
                                                onClick={handleRegister}
                                                component={Button}
                                                varient="p"
                                                sx={{ textTransform: 'none', fontSize: '0.7rem', color: colors.primary }}
                                            >
                                                Don't have an account ? <b>Register Here</b>
                                            </Typography>
                                        </Stack>
                                    </Stack>
                                </>
                            ),
                            1: (
                                <>
                                    <FormControl style={{ alignItems: 'center' }}>
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
                                    </FormControl>
                                    <br></br>
                                    <br></br>
                                    <Stack spacing={1}>
                                        <ThemeButton2 type="submit" varient="contained" onClick={() => toast.success('OTP is resended !')}>
                                            Resend Code
                                        </ThemeButton2>
                                        <ThemeButton onClick={handleOTP} varient="contained">
                                            Verify
                                        </ThemeButton>
                                        <Stack sx={{ alignItems: 'center' }}>
                                            <Typography
                                                component={Button}
                                                onClick={handleRegister}
                                                varient="p"
                                                sx={{ textTransform: 'none', fontSize: '0.7rem', color: colors.primary }}
                                            >
                                                Don't have an account ? <b>&nbsp;Register Here</b>
                                            </Typography>
                                        </Stack>
                                    </Stack>
                                </>
                            )
                        }[step]
                    }
                </DialogContent>
            </Dialog>
            <ToastContainer position="top-center" autoClose={1000} />
        </>
    );
}
