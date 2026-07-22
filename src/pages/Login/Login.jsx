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

    // const handleLogin = async () => {
    //     startLoading('login');

    //     try {
    //         const loginRes = await apiLogin({
    //             npk: inputFields[0].value,
    //             password: inputFields[1].value,
    //         });

    //         cookies.set('access_token', loginRes.data.data.accessToken, {
    //             path: '/',
    //             secure: true,
    //             sameSite: 'strict',
    //         });

    //         const getMeRes = await getMe();

    //         const encryptedGetMe = CryptoJS.AES.encrypt(
    //             JSON.stringify(getMeRes.data.data),
    //             'madafidev'
    //         ).toString();

    //         cookies.set('getMe', encryptedGetMe, {
    //             path: '/',
    //             secure: true,
    //             sameSite: 'strict',
    //         });

    //         window.location.reload();
    //     } catch (err) {
    //         handleAPIError(err, navigate);
    //     } finally {
    //         stopLoading('login');
    //     }
    // };

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

            // Add success class to button before reload
            const button = document.querySelector('.loginButton');
            if (button) {
                button.classList.add('success');
            }

            // Slight delay before reload to show success state
            setTimeout(() => {
                window.location.reload();
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
                {/* Left Panel */}
                <div className={styles.brandPanel}>
                    <div className={styles.brandContent}>
                        <div className={styles.logoSection}>
                            <img
                                src={LOGO}
                                alt="SIMKO"
                                className={styles.logo}
                            />

                            <div>
                                <p className={styles.brandSubtitle}>
                                    SISTEM MANAJEMEN KOPERASI
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Panel */}
                <div className={styles.formPanel}>
                    <div className={styles.formCard}>
                        <div className={styles.formHeader}>
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
                                                    className={
                                                        styles.inputPrefix
                                                    }
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
                                                    className={
                                                        styles.inputPrefix
                                                    }
                                                />
                                            }
                                        />
                                    )}

                                    {item.error && (
                                        <span
                                            className={styles.errorMessage}
                                        >
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

                        {/* <div className={styles.formFooter}>
                            <span className={styles.copyright}>
                                © {new Date().getFullYear()} SIMKO. All rights
                                reserved.
                                <br />
                                Developed with ❤️ by{' '}
                                <a
                                    href="https://www.linkedin.com/in/fachrul-dwi-aprilian-97543b230/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.devLink}
                                >
                                    Fachrul Dwi Aprilian
                                </a>
                            </span>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;