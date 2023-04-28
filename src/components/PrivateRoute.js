import { useKeycloak } from '@react-keycloak/web';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

export default function PrivateRoute(props) {
    const { keycloak, initialized } = useKeycloak();

    if (!initialized) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: window.innerHeight - 400,
                    width: '100%'
                }}
            >
                <Stack alignItems="center">
                    <CircularProgress
                        sx={{
                            color: '#1bd7a0',
                            zIndex: 1
                        }}
                    />
                    <br></br>
                    <b style={{ color: '#1bd7a0' }}>Authenticating...</b>
                </Stack>
            </Box>
        );
    }

    if (!keycloak.authenticated) {
        return keycloak.login();
    } else {
        // console.log(keycloak.token);
        // eslint-disable-next-line react/prop-types
        return <>{props.children}</>;
    }
}
