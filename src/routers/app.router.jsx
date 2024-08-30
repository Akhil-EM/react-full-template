import { useRoutes,Navigate } from "react-router-dom";
import { lazy } from "react";
import Cookies from "js-cookie";
import PropTypes from 'prop-types';
// ------------------------------------

const PageNotFoundPage = lazy(()=>import("../pages/404"));
const LoginPage = lazy(()=>import("../pages/login"));
const RegisterPage = lazy(()=>import("../pages/register"));
const HomePage = lazy(()=>import("../pages/home"));

const CheckToken = ({ children }) => {
    const refreshToken = Cookies.get("refreshToken");
    if(!refreshToken)  return <Navigate to="/login" replace />;
    return children;
}

CheckToken.propTypes = {
    children: PropTypes.node
};

export default function AppRouter() {
    return useRoutes([
        {
            path: "/login",
            element: <LoginPage/>
        },
        {
            path: "/register",
            element: <RegisterPage/>
        },
        {
            path: "/",
            element: <CheckToken><HomePage/></CheckToken>
        },
        {
            path:"*",
            element: <PageNotFoundPage/>
        }
    ]);
};