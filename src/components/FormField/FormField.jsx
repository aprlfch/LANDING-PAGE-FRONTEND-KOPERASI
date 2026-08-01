import styles from './FormField.module.css'
import PropTypes from 'prop-types';

function FormField({ children }) {
    return (
        <div className={styles.formField}>
            {children}
        </div>
    )
}

FormField.propTypes = {
    children: PropTypes.node.isRequired,
}

export default FormField