import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const PrivateRoute = ({ children, roles }) => {
    const isLoggedIn = cookies.get("access_token");
    const user = "administrator"; // get from local storage

    if (!isLoggedIn) {
        return <Navigate to="/" />;
    }

    if (roles && roles.length > 0 && !roles.includes(user)) {
        return <Navigate to="/error-403" />;
    }

    return children;
};

export const PublicRoute = ({ children }) => {
    const isLoggedIn = cookies.get('access_token');
    return isLoggedIn ? <Navigate to="/home" replace /> : children;
};

PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
    roles: PropTypes.array,
};

PublicRoute.propTypes = {
    children: PropTypes.node.isRequired,
};
