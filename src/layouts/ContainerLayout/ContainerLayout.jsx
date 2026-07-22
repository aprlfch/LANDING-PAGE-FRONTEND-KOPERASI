import PropTypes from 'prop-types';
import styles from './ContainerLayout.module.css'

function ContainerLayout({ children }) {
    return (
        <div className={styles.container}>
            {children}
        </div>
    )
}



ContainerLayout.propTypes = {
    children: PropTypes.node.isRequired
}

export default ContainerLayout