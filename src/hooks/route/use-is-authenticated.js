
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
export const useIsAuthenticated = () => {
    const navigate  = useNavigate();
    const accessToken = localStorage.getItem('accessToken');
    
    useEffect(() => {
        if (accessToken) {
            navigate('/');
        }
    }, [navigate, accessToken]);
    
    return {
        accessToken
    };
};