import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import MenuProvider from './MenuProvider';

const MainLayout = () => {
    return (
        <Box sx={{ display: 'flex', width: '100%' }}>
            <CssBaseline />
            <MenuProvider />
            <div style={{ flexGrow: 1, marginTop: '8vh' }}>
                <Outlet />
            </div>
        </Box>
    );
};

export default MainLayout;
