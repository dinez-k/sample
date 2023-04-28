import { useEffect, useState } from 'react';
import Login from '../Login/index';
import Register from '../Register/index';

const VerifyUser = ({ type, handleClose }) => {
    const [isLogin, setIsLogin] = useState(false);
    const [isRegister, setIsRegister] = useState(false);

    useEffect(() => {
        alert('hitted');
        if (type === 'login') {
            setIsLogin(true);
        }
        if (type === 'register') {
            setIsRegister(false);
        }
    }, []);

    const handleLogin = (isLogin, isRegister) => {
        setIsLogin(isLogin);
        setIsRegister(isRegister);
    };

    return (
        <>
            {isLogin ? <Login open={isLogin} close={handleLogin} /> : <></>}
            {isRegister ? <Register open={isRegister} setOpen={setIsRegister}></Register> : <></>}
        </>
    );
};

export default VerifyUser;
