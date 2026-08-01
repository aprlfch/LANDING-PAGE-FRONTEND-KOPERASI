import PropTypes from 'prop-types';
import { Breadcrumb } from 'antd';

import styles from './HeaderLayout.module.css';

const HeaderLayout = ({ title, item }) => {
    return (
        <div>
            <h1 className={styles.title}>{title}</h1>
            <Breadcrumb
                items={item}
            />
        </div>
    )
}

HeaderLayout.propTypes = {
    title: PropTypes.string.isRequired,
    item: PropTypes.array.isRequired
}


export default HeaderLayout;