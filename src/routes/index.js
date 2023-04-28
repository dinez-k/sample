import MainLayout from '~/layout/MainLayout';
import { useRoutes, Navigate } from 'react-router-dom';
import Loadable from '/src/components/Loadable';
import { lazy } from 'react';
import { useKeycloak } from '@react-keycloak/web';
import PrivateRoute from '~/components/PrivateRoute';

const BuyerScreen = Loadable(lazy(() => import('../pages/BuyerScreen')));
const SellerScreen = Loadable(lazy(() => import('../pages/SellerScreen')));
const SignUpScreen = Loadable(lazy(() => import('../pages/BuyerScreen/SignUp')));

const ThemeRoutes = () => {
    const { keycloak, initialized } = useKeycloak();
    return useRoutes([
        {
            path: '/',
            element: <MainLayout />,
            children: [
                {
                    path: 'buyer',
                    element: <BuyerScreen />
                },
                {
                    path: 'seller/*',
                    element: (
                        <PrivateRoute>
                            <SellerScreen />
                        </PrivateRoute>
                    )
                },
                {
                    path: 'home',
                    element: <Navigate to="buyer" replace={true} />
                },
                {
                    path: 'login',
                    element: (
                        <PrivateRoute>
                            <SignUpScreen />
                        </PrivateRoute>
                    )
                },
                {
                    path: '/',
                    element: <Navigate to="buyer" replace={true} />
                }
                // {
                //     path: '*',
                //     element: <BuyerScreen />
                // }
            ]
        },
        {
            path: '*',
            element: <MainLayout />
        }
    ]);
};

export default ThemeRoutes;
