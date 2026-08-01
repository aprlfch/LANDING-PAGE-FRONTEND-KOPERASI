import styles from './CardInfo.module.css'
import { Tooltip } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'

// eslint-disable-next-line react/prop-types
function CardInfo({ title, value, color, tooltipText }) {
    return (
        <div className={styles.wrapper} style={{ borderTopColor: color }}>
            <div className={styles.section}>
                <div className={styles.info}>
                    <p className={styles.infoText}>{title}</p>
                    <Tooltip placement="bottom" title={tooltipText}>
                        <QuestionCircleOutlined className={styles.icon} />
                    </Tooltip>
                </div>
                <p className={styles.valueText}>{value}</p>
            </div>
        </div>
    )
}

export default CardInfo