import PropTypes from 'prop-types';
import styles from './MenuContainerLayout.module.css'

function MenuContainerLayout({ firstChildren, secondChildren }) {
    return (
        <div className={styles.menu}>
            <div className={styles.left}>
                {firstChildren}
            </div>
            <div className={styles.right}>
                {secondChildren}
            </div>
        </div>
    )
}

MenuContainerLayout.propTypes = {
    firstChildren: PropTypes.node.isRequired,
    secondChildren: PropTypes.node.isRequired
}

export default MenuContainerLayout