import React from 'react';
import PropTypes from 'prop-types';
import theme from './theme';

export const ThemeContext = React.createContext();

export function ThemeProvider({ children }) {
    return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}

ThemeProvider.propTypes = {
    children: PropTypes.node.isRequired
};
