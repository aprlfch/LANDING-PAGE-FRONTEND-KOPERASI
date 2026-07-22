import styles from './PaperPreviewLayout.module.css'

// eslint-disable-next-line react/prop-types
function PaperPreviewLayout({ children }) {
    return (
        <div className={styles.wrapper}>
            {children}
        </div>
    )
}

export default PaperPreviewLayout