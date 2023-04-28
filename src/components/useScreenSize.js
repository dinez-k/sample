import { useState, useLayoutEffect } from 'react';

function useScreenSize() {
    const [screenSize, setScreenSize] = useState([window.innerWidth, window.innerHeight]);

    useLayoutEffect(() => {
        // alert('hitted');
        const handleResize = () => {
            setScreenSize([window.innerWidth, window.innerHeight]);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return screenSize;
}
export default useScreenSize;
