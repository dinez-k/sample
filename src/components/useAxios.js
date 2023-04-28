import React, { createContext, useContext } from 'react';
import { useKeycloak } from '@react-keycloak/web';
import { environment } from '~/util/Environment';
import axios from 'axios';
import PropTypes from 'prop-types';

const AxiosContext = createContext(null);

const AxiosProvider = ({ children }) => {
    const { keycloak } = useKeycloak();
    const instance = axios.create({
        baseURL: environment.productBaseURL // Set your base URL here
    });

    instance.interceptors.request.use(
        async (config) => {
            config.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000';
            if (keycloak.authenticated) {
                config.headers.Authorization = `Bearer ${keycloak.token}`;
            }
            return config;
        },
        (error) => {
            // Do something with request error
            return Promise.reject(error);
        }
    );

    return <AxiosContext.Provider value={instance}>{children}</AxiosContext.Provider>;
};

const useAxios = () => {
    const axiosInstance = useContext(AxiosContext);
    if (!axiosInstance) {
        throw new Error(
            'useAxios must be used within an AxiosProvider. ' + 'Wrap a parent component in <AxiosProvider> to fix this error.'
        );
    }
    return axiosInstance;
};

AxiosProvider.propTypes = {
    children: PropTypes.node
};

export { AxiosProvider, useAxios };
