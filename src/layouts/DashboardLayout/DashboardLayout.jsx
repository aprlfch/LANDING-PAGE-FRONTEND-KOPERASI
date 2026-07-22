import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Topbar from '../../components/Topbar/Topbar';
import styles from './DashboardLayout.module.css';
import Sidebar from '../../components/Sidebar/Sidebar';

function DashboardLayout({ children }) {
    const storedShowSidebar = localStorage.getItem('showSidebar') === 'false' ? false : true;
    const [showSidebar, setShowSidebar] = React.useState(storedShowSidebar);

    useEffect(() => {
        localStorage.setItem('showSidebar', showSidebar);
    }, [showSidebar]);

    const changeSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    return (
        <div className={styles.wrapper}>
            <Topbar changeSidebar={changeSidebar} />
            <div className={styles.main}>
                <Sidebar showSidebar={showSidebar} />
                <div className={`${styles.content} ${!showSidebar ? styles.contentCollapsed : ''}`}>
                    {children}
                </div>
            </div>
        </div>
    );
}

DashboardLayout.propTypes = {
    children: PropTypes.node.isRequired
};

export default DashboardLayout;