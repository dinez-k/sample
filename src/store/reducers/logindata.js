// types
import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
    name: 'Dinesh',
    token: 'sample Token',
    isLoggedIn: false,
    email: 'dineshk@calpyte.com'
};

// ==============================|| SLICE - MENU ||============================== //

const logindata = createSlice({
    name: 'logindata',
    initialState,
    reducers: {
        setData(state, action) {
            state.name = action.payload.name;
            state.token = action.payload.name;
            state.isLoggedIn = action.payload.name;
            state.email = action.payload.name;
        },
        setName(state, action) {
            state.name = action.payload.name;
        },

        setToken(state, action) {
            state.token = action.payload.token;
        },

        setIsLoggedIn(state, action) {
            state.isLoggedIn = action.payload.isLoggedIn;
        },

        setEmail(state, action) {
            state.email = action.payload.email;
        }
    }
});

export default logindata.reducer;

// export const { setData, setName, setToken, setIsLoggedIn, setEmail } = logindata.actions;
