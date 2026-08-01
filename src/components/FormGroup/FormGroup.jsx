import styles from './FormGroup.module.css'
import PropTypes from 'prop-types';

function FormGroup({ children }) {
    return (
        <div className={styles.formGroup}>
            {children}
        </div>
    )
}

FormGroup.propTypes = {
    children: PropTypes.node.isRequired,
}

export default FormGroup