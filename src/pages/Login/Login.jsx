import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { Button, Input } from 'antd';
import CryptoJS from 'crypto-js';
import {
    LockOutlined,
    UserOutlined,
    EyeInvisibleOutlined,
    EyeTwoTone,
    ArrowRightOutlined,
} from '@ant-design/icons';

import { ProfileContext } from '../../context/ProfileContext';
import useDynamicForm from '../../hooks/useDynamicForm';
import useLoading from '../../hooks/useLoading';
import { apiLogin, getMe } from '../../services/auth.service';
import { handleAPIError } from '../../helper/handle';
import styles from './Login.module.css';
import { loginFormField } from '../../constants/formsfield/loginFormField';
import { LOGO } from '../../assets';

const cookies = new Cookies();

function Login() {
    const { inputFields, handleInputChange } = useDynamicForm(loginFormField);
    const { loadingStates, startLoading, stopLoading } = useLoading();
    const { data } = React.useContext(ProfileContext);
    const navigate = useNavigate();

    const handleLogin = async () => {
        startLoading('login');

        try {
            const loginRes = await apiLogin({
                npk: inputFields[0].value,
                password: inputFields[1].value,
            });

            cookies.set('access_token', loginRes.data.data.accessToken, {
                path: '/',
                secure: true,
                sameSite: 'strict',
            });

            const getMeRes = await getMe();

            const encryptedGetMe = CryptoJS.AES.encrypt(
                JSON.stringify(getMeRes.data.data),
                'madafidev'
            ).toString();

            cookies.set('getMe', encryptedGetMe, {
                path: '/',
                secure: true,
                sameSite: 'strict',
            });

            const button = document.querySelector('.loginButton');
            if (button) {
                button.classList.add('success');
            }

            setTimeout(() => {
                navigate('/home');
            }, 500);

        } catch (err) {
            handleAPIError(err, navigate);
        } finally {
            stopLoading('login');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
    };

    return (
        <div className={styles.loginWrapper}>
            <div className={styles.container}>
                <div className={styles.formCard}>

                    {/* Header Terpusat (Logo & Judul) */}
                    <div className={styles.formHeader}>
                        {/* <img
                            src={LOGO}
                            alt="KOPERASI-KIE"
                            className={styles.logo}
                        />
                        <p className={styles.brandSubtitle}>
                            SISTEM MANAJEMEN KOPERASI
                        </p> */}

                        <h2 className={styles.formTitle}>
                            Selamat Datang
                        </h2>
                        <p className={styles.formSubtitle}>
                            Masuk ke akun Anda untuk melanjutkan
                        </p>
                    </div>

                    <div className={styles.formBody}>
                        {inputFields.map((item) => (
                            <div
                                key={item.key}
                                className={styles.formGroup}
                            >
                                <label className={styles.formLabel}>
                                    {item.label}
                                    {item.required && (
                                        <span className={styles.required}>
                                            *
                                        </span>
                                    )}
                                </label>

                                {item.kind === 'password' ? (
                                    <Input.Password
                                        size="large"
                                        className={styles.inputField}
                                        name={item.name}
                                        value={item.value}
                                        onChange={(e) =>
                                            handleInputChange(
                                                item.name,
                                                e.target.value
                                            )
                                        }
                                        onKeyPress={handleKeyPress}
                                        placeholder={item.placeholder}
                                        prefix={
                                            <LockOutlined
                                                className={styles.inputPrefix}
                                            />
                                        }
                                        iconRender={(visible) =>
                                            visible ? (
                                                <EyeTwoTone />
                                            ) : (
                                                <EyeInvisibleOutlined />
                                            )
                                        }
                                    />
                                ) : (
                                    <Input
                                        size="large"
                                        className={styles.inputField}
                                        name={item.name}
                                        value={item.value}
                                        onChange={(e) =>
                                            handleInputChange(
                                                item.name,
                                                e.target.value
                                            )
                                        }
                                        onKeyPress={handleKeyPress}
                                        placeholder={item.placeholder}
                                        prefix={
                                            <UserOutlined
                                                className={styles.inputPrefix}
                                            />
                                        }
                                    />
                                )}

                                {item.error && (
                                    <span className={styles.errorMessage}>
                                        {item.error}
                                    </span>
                                )}
                            </div>
                        ))}

                        <Button
                            type="primary"
                            block
                            size="large"
                            className={styles.loginButton}
                            onClick={handleLogin}
                            loading={loadingStates.login}
                        >
                            {loadingStates.login ? (
                                'Memproses...'
                            ) : (
                                <>
                                    Masuk
                                    <ArrowRightOutlined
                                        className={styles.buttonIcon}
                                    />
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;