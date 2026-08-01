import styles from './CardSection.module.css'

// eslint-disable-next-line react/prop-types
function CardSection({ children }) {
    return (
        <div className={styles.card}>
            {children}
        </div>
    )
}

export default CardSection