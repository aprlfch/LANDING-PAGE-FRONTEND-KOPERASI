import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, Result } from 'antd';

function ErrorPage({ title, subTitle }) {
    const navigate = useNavigate()
    return (
        <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Result
                status={title}
                title={title}
                subTitle={subTitle}
                extra={<Button onClick={() => navigate('/')} type="primary">Back Home</Button>}
            />
        </div>
    )
}

ErrorPage.propTypes = {
    title: PropTypes.node.isRequired,
    subTitle: PropTypes.string.isRequired,
};

export default ErrorPage