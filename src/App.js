import ScrollTop from './components/ScrollTop';
import ThemeRoutes from './routes/index';
import { useKeycloak } from '@react-keycloak/web';

export default function App() {
    // const { keycloak, initialized } = useKeycloak();

    // if (!initialized) {
    //     return <div>Loading...</div>;
    // }

    // if (!keycloak.authenticated) {
    //     return keycloak.login();
    // }
    return (
        <ScrollTop>
            <ThemeRoutes />
        </ScrollTop>
    );
}
