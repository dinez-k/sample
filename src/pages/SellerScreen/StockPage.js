import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useState } from 'react';
import Stack from '@mui/material/Stack';
import { useContext } from 'react';
import { ThemeContext } from '~/util/ThemeProvider';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function StockPage() {
    const [toggle, setToggle] = useState('pre');
    const { colors, fonts } = useContext(ThemeContext);

    const MyToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        border: '1px solid ' + colors.secondary,
        padding: '1px',
        borderRadius: '30px',
        overflow: 'hidden',
        width: 'fit-content',
        '.MuiToggleButton-root': {
            color: '#333',
            border: 'none',
            backgroundColor: 'transparent',
            borderRadius: '30px !important',
            padding: '8px 15px',
            '&.Mui-selected': {
                backgroundColor: colors.secondary,
                transition: 'background-color 500ms',
                color: '#fff'
            },
            '&.Mui-selected:hover': {
                backgroundColor: '#013f56'
            }
        }
    }));
    return (
        <Grid container spacing={0}>
            <Grid item xs={12} md={6}>
                <Stack alignItems="center">
                    <MyToggleButtonGroup
                        value={toggle}
                        onChange={(event, value) => {
                            value ? setToggle(value) : setToggle(toggle);
                        }}
                        exclusive
                        aria-label="Platform"
                    >
                        <ToggleButton value="post">Post Requirement</ToggleButton>
                        <ToggleButton value="pre">Pick Up Location</ToggleButton>
                    </MyToggleButtonGroup>
                </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
                <Box>
                    <Typography component="div" varient="h5">
                        Available Strap Stocks
                    </Typography>
                </Box>
            </Grid>
        </Grid>
    );
}
export default StockPage;
