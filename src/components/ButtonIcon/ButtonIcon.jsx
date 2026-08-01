import { Button, Tooltip } from "antd"

// eslint-disable-next-line react/prop-types
function ButtonIcon({ color, onClick, tooltipTitle, children }) {
    return (
        <Tooltip placement="bottom" title={tooltipTitle}>
            <Button style={{ color: color, backgroundColor: 'transparent', border: 'none', padding: '8px' }} onClick={onClick}>
                {children}
            </Button>
        </Tooltip>
    )
}

export default ButtonIcon