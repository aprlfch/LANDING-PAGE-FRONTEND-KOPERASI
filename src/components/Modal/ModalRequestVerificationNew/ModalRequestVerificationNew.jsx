/* eslint-disable react/prop-types */
import React from 'react'
import { getListAssignmentUser, requestVerification } from '../../../services/verification.service'
import { useNavigate } from 'react-router-dom'
import { handleAPIError, handleApiSuccess } from '../../../helper/handle'
import { Modal, Select, message } from 'antd'
import styles from './ModalRequestVerificationNew.module.css'
import FormField from '../../FormField/FormField'
import FormGroup from '../../FormGroup/FormGroup'

function ModalRequestVerificationNew({ visible, handleClose, type, commitmentId }) {
    const navigate = useNavigate()
    const [confirmLoading, setConfirmLoading] = React.useState(false)
    const [user, setUser] = React.useState([])
    const [userVerificator, setUserVerificator] = React.useState([])
    const [leadVerificator, setLeadVerificator] = React.useState([])
    const [ppAssignment, setPPAssignment] = React.useState({
        id1: '',
        id2: '',
        id3: '',
        id4: '',
        id5: '',
        id6: '',
    })

    const [pppAssignment, setPPPAssignment] = React.useState({
        id1: '',
        id2: '',
        id3: '',
        id4: '',
        id5: '',
        id6: '',
    })

    const [pcAssignment, setPCAssignment] = React.useState({
        id1: '',
        id2: '',
        id3: '',
        id4: '',
        id5: '',
    })

    const [umAssignment, setUMAssignment] = React.useState({
        id1: '',
        id2: '',
        id3: '',
        id4: '',
        id5: '',
        id6: '',
    })

    const [reimbursmentAssignment, setReimbursmentAssignment] = React.useState({
        id1: '',
        id2: '',
        id3: '',
        id4: '',
        id5: '',
        id6: '',
        id7: '',
    })

    const [jorAssignment, setJorAssignment] = React.useState({
        id1: '',
        id2: '',
        id3: '',
    })

    const [generalAssignment, setgeneralAssignment] = React.useState({
        id1: '',
        id2: '',
        id3: '',
        id4: '',
        id5: '',
        // id6: '',
        // id7: '',
    })
    const [jurnalAssignment, setjurnalAssignment] = React.useState({
        id1: '',
    })


    const filterOption = (input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    const handleOk = () => {
        if (type === 'PP') {
            const mappedUserIdChoosen = Object.values(ppAssignment).map((item, index) => ({
                user_id: item,
                position: index + 1,
            }));

            const isValid = mappedUserIdChoosen.every((item, index) => {
                if (index === 0) {
                    // Skip validation for position 1
                    return true;
                }
                return item.user_id !== null && item.user_id !== '' && item.user_id !== undefined;
            });

            const transformedArray = mappedUserIdChoosen
                .filter((item) => {
                    if (item.position === 1) {
                        if (item.user_id) {
                            return true
                        } else {
                            return false
                        }
                    }
                    return true;
                })
                .map((item, index) => ({
                    user_id: item.user_id,
                    position: index + 1,
                }));

            const requestData = {
                "commitment_id": commitmentId,
                "assignment_to": transformedArray
            }

            if (isValid) {
                requestVerification(requestData).then((res) => {
                    handleApiSuccess(res)
                }).catch((err) => {
                    handleAPIError(err, navigate)
                }).finally(() => {
                    handleClose()
                    setConfirmLoading(false)
                })
            } else {
                message.error('Form wajib diisi semua')
            }
        } else if (type === 'PPP') {
            const mappedUserIdChoosen = Object.values(pppAssignment).map((item, index) => ({
                user_id: item,
                position: index + 1,
            }));

            const isValid = mappedUserIdChoosen.every((item, index) => {
                if (index === 0) {
                    return true;
                }
                return item.user_id !== null && item.user_id !== '' && item.user_id !== undefined;
            });

            const transformedArray = mappedUserIdChoosen
                .filter((item) => {
                    if (item.position === 1) {
                        if (item.user_id) {
                            return true
                        } else {
                            return false
                        }
                    }
                    return true;
                })
                .map((item, index) => ({
                    user_id: item.user_id,
                    position: index + 1,
                }));

            const requestData = {
                "commitment_id": commitmentId,
                "assignment_to": transformedArray
            }

            if (isValid) {
                requestVerification(requestData).then((res) => {
                    handleApiSuccess(res)
                }).catch((err) => {
                    handleAPIError(err, navigate)
                }).finally(() => {
                    handleClose()
                    setConfirmLoading(false)
                })
            } else {
                message.error('Form wajib diisi semua')
            }
        } else if (type === 'PC') {
            const mappedUserIdChoosen = Object.values(pcAssignment).map((item, index) => ({
                user_id: item,
                position: index + 1,
            }));
            const isValid = mappedUserIdChoosen.every(item => item.user_id !== null && item.user_id !== '' && item.user_id !== undefined);
            const requestData = {
                "commitment_id": commitmentId,
                "assignment_to": mappedUserIdChoosen
            }
            if (isValid) {
                requestVerification(requestData).then((res) => {
                    handleApiSuccess(res)
                }).catch((err) => {
                    handleAPIError(err, navigate)
                }).finally(() => {
                    handleClose()
                    setConfirmLoading(false)
                })
            } else {
                message.error('Form wajib diisi semua')
            }
        } else if (type === 'UM') {
            const mappedUserIdChoosen = Object.values(umAssignment).map((item, index) => ({
                user_id: item,
                position: index + 1,
            }));

            const isValid = mappedUserIdChoosen.every((item, index) => {
                if (index === 0) {
                    // Skip validation for position 1
                    return true;
                }
                return item.user_id !== null && item.user_id !== '' && item.user_id !== undefined;
            });

            const transformedArray = mappedUserIdChoosen
                .filter((item) => {
                    if (item.position === 1) {
                        console.log(item.user_id, 'tes')
                        // Keep position 1 if it has a user_id value
                        if (item.user_id) {
                            return true
                        } else {
                            return false
                        }
                    }
                    return true;
                })
                .map((item, index) => ({
                    user_id: item.user_id,
                    position: index + 1,
                }));

            const requestData = {
                "commitment_id": commitmentId,
                "assignment_to": transformedArray
            }
            if (isValid) {
                requestVerification(requestData).then((res) => {
                    handleApiSuccess(res)
                }).catch((err) => {
                    handleAPIError(err, navigate)
                }).finally(() => {
                    handleClose()
                    setConfirmLoading(false)
                })
            } else {
                message.error('Form wajib diisi semua')
            }
        } else if (type === 'REIMBURSMENT') {
            const mappedUserIdChoosen = Object.values(reimbursmentAssignment).map((item, index) => ({
                user_id: item,
                position: index + 1,
            }));
            const isValid = mappedUserIdChoosen.every((item, index) => {
                if (index === 0) {
                    // Skip validation for position 1
                    return true;
                }
                return item.user_id !== null && item.user_id !== '' && item.user_id !== undefined;
            });

            const transformedArray = mappedUserIdChoosen
                .filter((item) => {
                    if (item.position === 1) {
                        console.log(item.user_id, 'tes')
                        // Keep position 1 if it has a user_id value
                        if (item.user_id) {
                            return true
                        } else {
                            return false
                        }
                    }
                    return true;
                })
                .map((item, index) => ({
                    user_id: item.user_id,
                    position: index + 1,
                }));

            // const isValid = mappedUserIdChoosen.every(item => item.user_id !== null && item.user_id !== '' && item.user_id !== undefined);
            const requestData = {
                "commitment_id": commitmentId,
                "assignment_to": transformedArray
            }
            if (isValid) {
                requestVerification(requestData).then((res) => {
                    handleApiSuccess(res)
                }).catch((err) => {
                    handleAPIError(err, navigate)
                }).finally(() => {
                    handleClose()
                    setConfirmLoading(false)
                })
            } else {
                message.error('Form wajib diisi semua')
            }
        } else if (type === 'JOR') {
            const mappedUserIdChoosen = Object.values(jorAssignment).map((item, index) => ({
                user_id: item,
                position: index + 1,
            }));
            const isValid = mappedUserIdChoosen.every(item => item.user_id !== null && item.user_id !== '' && item.user_id !== undefined);
            const requestData = {
                "commitment_id": commitmentId,
                "assignment_to": mappedUserIdChoosen
            }
            if (isValid) {
                requestVerification(requestData).then((res) => {
                    handleApiSuccess(res)
                }).catch((err) => {
                    handleAPIError(err, navigate)
                }).finally(() => {
                    handleClose()
                    setConfirmLoading(false)
                })
            } else {
                message.error('Form wajib diisi semua')
            }
        }

        else if (type === 'GENERAL_LETTER') {
            const mappedUserIdChoosen = Object.values(generalAssignment).map((item, index) => ({
                user_id: item,
                position: index + 1,
            }));

            const isValid = mappedUserIdChoosen.every((item, index) => {
                if (index === 0) {
                    // Skip validation for position 1
                    return true;
                }
                return item.user_id !== null && item.user_id !== '' && item.user_id !== undefined;
            });

            const transformedArray = mappedUserIdChoosen
                .filter((item) => {
                    if (item.position === 1) {
                        console.log(item.user_id, 'tes')
                        // Keep position 1 if it has a user_id value
                        if (item.user_id) {
                            return true
                        } else {
                            return false
                        }
                    }
                    return true;
                })
                .map((item, index) => ({
                    user_id: item.user_id,
                    position: index + 1,
                }));

            const requestData = {
                "commitment_id": commitmentId,
                "assignment_to": transformedArray
            }
            if (isValid) {
                requestVerification(requestData).then((res) => {
                    handleApiSuccess(res)
                }).catch((err) => {
                    handleAPIError(err, navigate)
                }).finally(() => {
                    handleClose()
                    setConfirmLoading(false)
                })
            } else {
                message.error('Form wajib diisi semua')
            }
        }
        else if (type === 'JURNAL') {
            const mappedUserIdChoosen = Object.values(jurnalAssignment).map((item, index) => ({
                user_id: item,
                position: index + 1,
            }));
            const isValid = mappedUserIdChoosen.every(item => item.user_id !== null && item.user_id !== '' && item.user_id !== undefined);
            const requestData = {
                "commitment_id": commitmentId,
                "assignment_to": mappedUserIdChoosen
            }
            if (isValid) {
                requestVerification(requestData).then((res) => {
                    handleApiSuccess(res)
                }).catch((err) => {
                    handleAPIError(err, navigate)
                }).finally(() => {
                    handleClose()
                    setConfirmLoading(false)
                })
            } else {
                message.error('Form wajib diisi semua')
            }
        }
    }

    React.useEffect(() => {
        getListAssignmentUser().then((res) => {
            console.log('admin', getListAssignmentUser)
            setUser([
                { value: '', label: '-' },
                ...res.data.data
                    .filter((item) => item.role !== 'Admin Verifikasi')
                    .map((item) => ({
                        value: item.id,
                        label: `${item.fullname} - ${item.role}` + (item?.departement ? ` ${item.departement}` : '')
                    }))
            ]);
            setUserVerificator(res.data.data.filter((item) => item.role === 'Admin Verifikasi').map((item) => {
                return {
                    value: item.id,
                    label: `${item.fullname} - ${item.role}` + (item?.departement ? ` ${item.departement}` : '')
                }
            }))
            setLeadVerificator(res.data.data.filter((item) => item.role === 'Lead Verificator').map((item) => {
                return {
                    value: item.id,
                    label: `${item.fullname} - ${item.role}` + (item?.departement ? ` ${item.departement}` : '')
                }
            }))
        }).catch((err) => {
            setUser([])
            handleAPIError(err, navigate)
        })
    }, [])

    const handleChangePP = (name, e) => {
        setPPAssignment({
            ...ppAssignment,
            [name]: e
        })
    }

    const handleChangePPP = (name, e) => {
        setPPPAssignment({
            ...pppAssignment,
            [name]: e
        })
    }

    const handleChangePC = (name, e) => {
        setPCAssignment({
            ...pcAssignment,
            [name]: e
        })
    }

    const handleChangeUM = (name, e) => {
        setUMAssignment({
            ...umAssignment,
            [name]: e
        })
    }

    const handleChangeReimbursment = (name, e) => {
        setReimbursmentAssignment({
            ...reimbursmentAssignment,
            [name]: e
        })
    }

    const handleChangeJor = (name, e) => {
        setJorAssignment({
            ...jorAssignment,
            [name]: e
        })
    }

    const handleChangeGL = (name, e) => {
        setgeneralAssignment({
            ...generalAssignment,
            [name]: e
        })
    }

    const handleChangeJurnal = (name, e) => {
        setjurnalAssignment({
            ...jurnalAssignment,
            [name]: e
        })
    }

    return (
        <Modal
            title='Ajukan Verifikasi Komitmen'
            visible={visible}
            onOk={handleOk}
            onCancel={handleClose}
            confirmLoading={confirmLoading}
            okText='Ajukan'
            cancelText='Batal'>
            <div className={styles.innerContainer}>
                {
                    type === 'PP' &&
                    <div className={styles.info}>
                        <p className={styles.infoText}>Pilih pengguna yang akan memverifikasi komitmen anda!</p>
                        <FormGroup>
                            <FormField className={styles.infoSection}>
                                <p className={styles.infoText}>Verifikasi Penggunaan Anggaran (opsional)</p>
                                <Select
                                    showSearch
                                    filterOption={filterOption}
                                    style={{
                                        width: '100%',
                                    }}
                                    placeholder="Pilih pengguna"
                                    onChange={(e) => handleChangePP('id1', e)}
                                    options={user}
                                />
                                <p>*Pilih jika anda menggunakan anggaran cost center lain</p>
                            </FormField>
                            <FormField className={styles.infoSection}>
                                <p className={styles.infoText}>Disiapkan Oleh</p>
                                <Select
                                    showSearch
                                    filterOption={filterOption}
                                    style={{
                                        width: '100%',
                                    }}
                                    placeholder="Pilih pengguna"
                                    onChange={(e) => handleChangePP('id2', e)}
                                    options={user}
                                />
                            </FormField>
                            <FormField className={styles.infoSection}>
                                <p className={styles.infoText}>Disetujui oleh</p>
                                <Select
                                    showSearch
                                    filterOption={filterOption}
                                    style={{
                                        width: '100%',
                                    }}
                                    placeholder="Pilih pengguna"
                                    onChange={(e) => handleChangePP('id3', e)}
                                    options={user}
                                />
                            </FormField>
                            <FormField className={styles.infoSection}>
                                <p className={styles.infoText}>Dikonfirmasi Oleh</p>
                                <Select
                                    showSearch
                                    filterOption={filterOption}
                                    style={{
                                        width: '100%',
                                    }}
                                    placeholder="Pilih pengguna"
                                    onChange={(e) => handleChangePP('id6', e)}
                                    options={user}
                                />
                            </FormField>
                            <FormField className={styles.infoSection}>
                                <p className={styles.infoText}>Pilih Admin Verifikator</p>
                                <Select
                                    showSearch
                                    filterOption={filterOption}
                                    style={{
                                        width: '100%',
                                    }}
                                    placeholder="Pilih pengguna"
                                    onChange={(e) => handleChangePP('id4', e)}
                                    options={userVerificator}
                                />
                            </FormField>
                            <FormField className={styles.infoSection}>
                                <p className={styles.infoText}>Divalidasi Oleh</p>
                                <Select
                                    showSearch
                                    filterOption={filterOption}
                                    style={{
                                        width: '100%',
                                    }}
                                    placeholder="Pilih pengguna"
                                    onChange={(e) => handleChangePP('id5', e)}
                                    options={leadVerificator}
                                />
                            </FormField>
                        </FormGroup>
                    </div>
                }
                {
                    type === 'PPP' && <div className={styles.info}>
                        <p className={styles.infoText}>Pilih pengguna yang akan memverifikasi komitmen anda!</p>
                        <FormGroup>
                            <FormField className={styles.infoSection}>
                                <p className={styles.infoText}>Verifikasi Penggunaan Anggaran (opsional)</p>
                                <Select
                                    showSearch
                                    filterOption={filterOption}
                                    style={{
                                        width: '100%',
                                    }}
                                    placeholder="Pilih pengguna"
                                    onChange={(e) => handleChangePPP('id1', e)}
                                    options={user}
                                />
                                <p>*Pilih jika anda menggunakan anggaran cost center lain</p>
                            </FormField>
                            <FormField className={styles.infoSection}>
                                <p className={styles.infoText}>Disiapkan Oleh</p>
                                <Select
                                    showSearch
                                    filterOption={filterOption}
                                    style={{
                                        width: '100%',
                                    }}
                                    placeholder="Pilih pengguna"
                                    onChange={(e) => handleChangePPP('id2', e)}
                                    options={user}
                                />
                            </FormField>
                            <FormField className={styles.infoSection}>
                                <p className={styles.infoText}>Disetujui oleh</p>
                                <Select
                                    showSearch
                                    filterOption={filterOption}
                                    style={{
                                        width: '100%',
                                    }}
                                    placeholder="Pilih pengguna"
                                    onChange={(e) => handleChangePPP('id3', e)}
                                    options={user}
                                />
                            </FormField>
                            <FormField className={styles.infoSection}>
                                <p className={styles.infoText}>Dikonfirmasi oleh</p>
                                <Select
                                    showSearch
                                    filterOption={filterOption}
                                    style={{
                                        width: '100%',
                                    }}
                                    placeholder="Pilih pengguna"
                                    onChange={(e) => handleChangePPP('id6', e)}
                                    options={user}
                                />
                            </FormField>
                            <FormField className={styles.infoSection}>
                                <p className={styles.infoText}>Pilih Admin Verifikator</p>
                                <Select
                                    showSearch
                                    filterOption={filterOption}
                                    style={{
                                        width: '100%',
                                    }}
                                    placeholder="Pilih pengguna"
                                    onChange={(e) => handleChangePPP('id4', e)}
                                    options={userVerificator}
                                />
                            </FormField>
                            <FormField className={styles.infoSection}>
                                <p className={styles.infoText}>Divalidasi Oleh</p>
                                <Select
                                    showSearch
                                    filterOption={filterOption}
                                    style={{
                                        width: '100%',
                                    }}
                                    placeholder="Pilih pengguna"
                                    onChange={(e) => handleChangePPP('id5', e)}
                                    options={leadVerificator}
                                />
                            </FormField>
                        </FormGroup>
                    </div>
                }
                {
                    type === 'PC' && <div className={styles.info}>
                        <p className={styles.infoText}>Pilih pengguna yang akan memverifikasi komitmen anda!</p>
                        <FormGroup>
                            <FormField className={styles.infoSection}>
                                <p className={styles.infoText}>Diajukan</p>
                                <Select
                                    showSearch
                                    filterOption={filterOption}
                                    style={{
                                        width: '100%',
                                    }}
                                    placeholder="Pilih pengguna"
                                    onChange={(e) => handleChangePC('id1', e)}
                                    options={user}
                                />
                            </FormField>
                            <FormField className={styles.infoSection}>
                                <p className={styles.infoText}>Disetujui</p>
                                <Select
                                    showSearch
                                    filterOption={filterOption}
                                    style={{
                                        width: '100%',
                                    }}
                                    placeholder="Pilih pengguna"
                                    onChange={(e) => handleChangePC('id2', e)}
                                    options={user}
                                />
                            </FormField>
                            <FormField className={styles.infoSection}>
                                <p className={styles.infoText}>Diketahui</p>
                                <Select
                                    showSearch
                                    filterOption={filterOption}
                                    style={{
                                        width: '100%',
                                    }}
                                    placeholder="Pilih pengguna"
                                    onChange={(e) => handleChangePC('id5', e)}
                                    options={user}
                                />
                            </FormField>
                            <FormField className={styles.infoSection}>
                                <p className={styles.infoText}>Pilih Admin Verifikator</p>
                                <Select
                                    showSearch
                                    filterOption={filterOption}
                                    style={{
                                        width: '100%',
                                    }}
                                    placeholder="Pilih pengguna"
                                    onChange={(e) => handleChangePC('id3', e)}
                                    options={userVerificator}
                                />
                            </FormField>
                            <FormField className={styles.infoSection}>
                                <p className={styles.infoText}>Divalidasi Oleh</p>
                                <Select
                                    showSearch
                                    filterOption={filterOption}
                                    style={{
                                        width: '100%',
                                    }}
                                    placeholder="Pilih pengguna"
                                    onChange={(e) => handleChangePC('id4', e)}
                                    options={leadVerificator}
                                />
                            </FormField>
                        </FormGroup>
                    </div>
                }
                {
                    type === 'UM' && <div className={styles.info}>
                        <p className={styles.infoText}>Pilih pengguna yang akan memverifikasi komitmen anda!</p>
                        <FormGroup>
                            <FormField className={styles.infoSection}>
                                <p className={styles.infoText}>Verifikasi Penggunaan Anggaran (opsional)</p>
                                <Select
                                    showSearch
                                    filterOption={filterOption}
                                    style={{
                                        width: '100%',
                                    }}
                                    placeholder="Pilih pengguna"
                                    onChange={(e) => handleChangeUM('id1', e)}
                                    options={user}
                                />
                                <p>*Pilih jika anda menggunakan anggaran cost center lain</p>
                            </FormField>
                            <FormField className={styles.infoSection}>
                                <p className={styles.infoText}>Pemohon</p>
                                <Select
                                    showSearch
                                    filterOption={filterOption}
                                    style={{
                                        width: '100%',
                                    }}
                                    placeholder="Pilih pengguna"
                                    onChange={(e) => handleChangeUM('id2', e)}
                                    options={user}
                                />
                            </FormField>
                            <FormField className={styles.infoSection}>
                                <p className={styles.infoText}>Disetujui Oleh</p>
                                <Select
                                    showSearch
                                    filterOption={filterOption}
                                    style={{
                                        width: '100%',
                                    }}
                                    placeholder="Pilih pengguna"
                                    onChange={(e) => handleChangeUM('id3', e)}
                                    options={user}
                                />
                            </FormField>
                            <FormField className={styles.infoSection}>
                                <p className={styles.infoText}>Konfirmasi</p>
                                <Select
                                    showSearch
                                    filterOption={filterOption}
                                    style={{
                                        width: '100%',
                                    }}
                                    placeholder="Pilih pengguna"
                                    onChange={(e) => handleChangeUM('id6', e)}
                                    options={user}
                                />
                            </FormField>
                            <FormField className={styles.infoSection}>
                                <p className={styles.infoText}>Pilih Admin Verifikator</p>
                                <Select
                                    showSearch
                                    filterOption={filterOption}
                                    style={{
                                        width: '100%',
                                    }}
                                    placeholder="Pilih pengguna"
                                    onChange={(e) => handleChangeUM('id4', e)}
                                    options={userVerificator}
                                />
                            </FormField>
                            <FormField className={styles.infoSection}>
                                <p className={styles.infoText}>Divalidasi Oleh</p>
                                <Select
                                    showSearch
                                    filterOption={filterOption}
                                    style={{
                                        width: '100%',
                                    }}
                                    placeholder="Pilih pengguna"
                                    onChange={(e) => handleChangeUM('id5', e)}
                                    options={leadVerificator}
                                />
                            </FormField>
                        </FormGroup>
                    </div>
                }
                {
                    type === 'REIMBURSMENT' && <div className={styles.info}>
                        <p className={styles.infoText}>Pilih pengguna yang akan memverifikasi komitmen anda!</p>
                        <FormGroup>
                            <FormField className={styles.infoSection}>
                                <p className={styles.infoText}>Verifikasi Penggunaan Anggaran (opsional)</p>
                                <Select
                                    showSearch
                                    filterOption={filterOption}
                                    style={{
                                        width: '100%',
                                    }}
                                    placeholder="Pilih pengguna"
                                    onChange={(e) => handleChangeReimbursment('id1', e)}
                                    options={user}
                                />
                                <p>*Pilih jika anda menggunakan anggaran cost center lain</p>
                            </FormField>
                            <FormField className={styles.infoSection}>
                                <p className={styles.infoText}>Pemohon</p>
                                <Select
                                    showSearch
                                    filterOption={filterOption}
                                    style={{
                                        width: '100%',
                                    }}
                                    placeholder="Pilih pengguna"
                                    onChange={(e) => handleChangeReimbursment('id2', e)}
                                    options={user}
                                />
                            </FormField>
                            <FormField className={styles.infoSection}>
                                <p className={styles.infoText}>Mengetahui</p>
                                <Select
                                    showSearch
                                    filterOption={filterOption}
                                    style={{
                                        width: '100%',
                                    }}
                                    placeholder="Pilih pengguna"
                                    onChange={(e) => handleChangeReimbursment('id3', e)}
                                    options={user}
                                />
                            </FormField>
                            <FormField className={styles.infoSection}>
                                <p className={styles.infoText}>Menyetujui</p>
                                <Select
                                    showSearch
                                    filterOption={filterOption}
                                    style={{
                                        width: '100%',
                                    }}
                                    placeholder="Pilih pengguna"
                                    onChange={(e) => handleChangeReimbursment('id4', e)}
                                    options={user}
                                />
                            </FormField>
                            <FormField className={styles.infoSection}>
                                <p className={styles.infoText}>Konfirmasi</p>
                                <Select
                                    showSearch
                                    filterOption={filterOption}
                                    style={{
                                        width: '100%',
                                    }}
                                    placeholder="Pilih pengguna"
                                    onChange={(e) => handleChangeReimbursment('id7', e)}
                                    options={user}
                                />
                            </FormField>
                            <FormField className={styles.infoSection}>
                                <p className={styles.infoText}>Pilih admin verifikator</p>
                                <Select
                                    showSearch
                                    filterOption={filterOption}
                                    style={{
                                        width: '100%',
                                    }}
                                    placeholder="Pilih pengguna"
                                    onChange={(e) => handleChangeReimbursment('id5', e)}
                                    options={userVerificator}
                                />
                            </FormField>
                            <FormField className={styles.infoSection}>
                                <p className={styles.infoText}>Divalidasi Oleh</p>
                                <Select
                                    showSearch
                                    filterOption={filterOption}
                                    style={{
                                        width: '100%',
                                    }}
                                    placeholder="Pilih pengguna"
                                    onChange={(e) => handleChangeReimbursment('id6', e)}
                                    options={leadVerificator}
                                />
                            </FormField>
                        </FormGroup>
                    </div>
                }
                {
                    type === 'JOR' && <div className={styles.info}>
                        <p className={styles.infoText}>Pilih pengguna yang akan memverifikasi komitmen anda!</p>
                        <FormGroup>
                            <FormField className={styles.infoSection}>
                                <p className={styles.infoText}>Diketahui Oleh</p>
                                <Select
                                    showSearch
                                    filterOption={filterOption}
                                    style={{
                                        width: '100%',
                                    }}
                                    placeholder="Pilih pengguna"
                                    onChange={(e) => handleChangeJor('id1', e)}
                                    options={user}
                                />
                            </FormField>
                            <FormField className={styles.infoSection}>
                                <p className={styles.infoText}>Diverifikasi Oleh</p>
                                <Select
                                    showSearch
                                    filterOption={filterOption}
                                    style={{
                                        width: '100%',
                                    }}
                                    placeholder="Pilih pengguna"
                                    onChange={(e) => handleChangeJor('id2', e)}
                                    options={userVerificator}
                                />
                            </FormField>
                            <FormField className={styles.infoSection}>
                                <p className={styles.infoText}>Divalidasi Oleh</p>
                                <Select
                                    showSearch
                                    filterOption={filterOption}
                                    style={{
                                        width: '100%',
                                    }}
                                    placeholder="Pilih pengguna"
                                    onChange={(e) => handleChangeJor('id3', e)}
                                    options={leadVerificator}
                                />
                            </FormField>
                        </FormGroup>
                    </div>
                }
                {
                    type === 'GENERAL_LETTER' && <div className={styles.info}>
                        <p className={styles.infoText}>Pilih pengguna yang akan memverifikasi komitmen anda!</p>
                        <FormGroup>
                            <FormField className={styles.infoSection}>
                                <p className={styles.infoText}>Verifikasi Penggunaan Anggaran (opsional)</p>
                                <Select
                                    showSearch
                                    filterOption={filterOption}
                                    style={{
                                        width: '100%',
                                    }}
                                    placeholder="Pilih pengguna"
                                    onChange={(e) => handleChangeGL('id1', e)}
                                    options={user}
                                />
                                <p>*Pilih jika anda menggunakan anggaran cost center lain</p>
                            </FormField>
                            {/* <FormField className={styles.infoSection}>
                                <p className={styles.infoText}>Diverifikasi Oleh (opsional)</p>
                                <Select
                                    showSearch
                                    filterOption={filterOption}
                                    style={{
                                        width: '100%',
                                    }}
                                    placeholder="Pilih pengguna"
                                    onChange={(e) => handleChangeGL('id6', e)}
                                    options={user}
                                />
                                <p>*Pilih jika anda perlu paraf</p>
                            </FormField>
                            <FormField className={styles.infoSection}>
                                <p className={styles.infoText}>Diverifikasi Oleh (opsional)</p>
                                <Select
                                    showSearch
                                    filterOption={filterOption}
                                    style={{
                                        width: '100%',
                                    }}
                                    placeholder="Pilih pengguna"
                                    onChange={(e) => handleChangeGL('id7', e)}
                                    options={user}
                                />
                                <p>*Pilih jika anda perlu paraf</p>
                            </FormField> */}
                            <FormField className={styles.infoSection}>
                                <p className={styles.infoText}>Diketahui Oleh</p>
                                <Select
                                    showSearch
                                    filterOption={filterOption}
                                    style={{
                                        width: '100%',
                                    }}
                                    placeholder="Pilih pengguna"
                                    onChange={(e) => handleChangeGL('id2', e)}
                                    options={user}
                                />
                            </FormField>
                            <FormField className={styles.infoSection}>
                                <p className={styles.infoText}>Disetujui Oleh</p>
                                <Select
                                    showSearch
                                    filterOption={filterOption}
                                    style={{
                                        width: '100%',
                                    }}
                                    placeholder="Pilih pengguna"
                                    onChange={(e) => handleChangeGL('id5', e)}
                                    options={user}
                                />
                            </FormField>
                            <FormField className={styles.infoSection}>
                                <p className={styles.infoText}>Diverifikasi Oleh</p>
                                <Select
                                    showSearch
                                    filterOption={filterOption}
                                    style={{
                                        width: '100%',
                                    }}
                                    placeholder="Pilih pengguna"
                                    onChange={(e) => handleChangeGL('id3', e)}
                                    options={userVerificator}
                                />
                            </FormField>
                            <FormField className={styles.infoSection}>
                                <p className={styles.infoText}>Divalidasi Oleh</p>
                                <Select
                                    showSearch
                                    filterOption={filterOption}
                                    style={{
                                        width: '100%',
                                    }}
                                    placeholder="Pilih pengguna"
                                    onChange={(e) => handleChangeGL('id4', e)}
                                    options={leadVerificator}
                                />
                            </FormField>
                        </FormGroup>
                    </div>
                }
                {
                    type === 'JURNAL' && <div className={styles.info}>
                        <p className={styles.infoText}>Pilih pengguna yang akan memverifikasi komitmen anda!</p>
                        <FormGroup>
                            <FormField className={styles.infoSection}>
                                <p className={styles.infoText}>Diverifikasi Oleh</p>
                                <Select
                                    showSearch
                                    filterOption={filterOption}
                                    style={{
                                        width: '100%',
                                    }}
                                    placeholder="Pilih pengguna"
                                    onChange={(e) => handleChangeJurnal('id1', e)}
                                    options={userVerificator}
                                />
                            </FormField>
                        </FormGroup>
                    </div>
                }
            </div>
        </Modal>
    )
}

export default ModalRequestVerificationNew