import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { sidebarItems } from '../../constants/sidebarItem';
import styles from './Sidebar.module.css';
import { ProfileContext } from '../../context/ProfileContext';

function Sidebar({ showSidebar }) {
    const location = useLocation();
    const navigate = useNavigate();
    const { getMe } = React.useContext(ProfileContext);

    const role = getMe?.role;

    const changePage = (url) => {
        navigate(url);
    };

    return (
        <div className={showSidebar ? styles.wrapper : styles.wrapperClose}>
            <div className={styles.sidebar}>
                <div className={styles.sidebarContainer}>
                    {sidebarItems
                        .filter(item => !item.permissions || item.permissions.includes(role))
                        .map((item) => (
                            <div
                                onClick={() => changePage(item.url)}
                                key={item.label}
                                className={location.pathname.startsWith(item.url) ? styles.sidebarItemActive : styles.sidebarItem}
                            >
                                <div className={styles.iconContainer}>
                                    {item.icon}
                                </div>
                                {showSidebar && (
                                    <>
                                        <span className={styles.label}>{item.label}</span>
                                        {/* <div className={styles.activeIndicator}></div> */}
                                    </>
                                )}
                            </div>
                        ))}
                    {/* <div className={styles.footer}>
                        <span className={styles.copyright}>
                            © {new Date().getFullYear()} by Fachrul Dwi Aprilian
                        </span>
                    </div> */}
                </div>
            </div>
        </div>
    );
}

Sidebar.propTypes = {
    showSidebar: PropTypes.bool.isRequired,
};

export default Sidebar;