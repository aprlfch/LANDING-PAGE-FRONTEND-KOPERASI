import { Modal, Select } from 'antd'
import styles from './ModalRequestVerification.module.css'
import React from 'react'
import { getListAssignmentUser, requestVerification } from '../../../services/verification.service'
import { useNavigate } from 'react-router-dom'
import { handleAPIError, handleApiSuccess } from '../../../helper/handle'
// eslint-disable-next-line react/prop-types
function ModalRequestVerification({ visible, handleCloseModalRequest, choosenId }) {
    const navigate = useNavigate()
    const [confirmLoading, setConfirmLoading] = React.useState(false)
    const [user, setUser] = React.useState([])
    const [userIdChoosen, setUserIdChoosen] = React.useState()

    const handleOk = () => {
        setConfirmLoading(true)
        const mappedUserIdChoosen = userIdChoosen.map((item, index) => ({
            user_id: item,
            position: index + 1,
        }));

        const data = {
            "commitment_id": choosenId,
            "assignment_to": mappedUserIdChoosen
        }

        requestVerification(data).then((res) => {
            handleApiSuccess(res)
        }).catch((err) => {
            handleAPIError(err, navigate)
        }).finally(() => {
            handleCloseModalRequest()
            setConfirmLoading(false)
        })
    }

    const handleChange = (value) => {
        setUserIdChoosen(value)
    };

    React.useEffect(() => {
        getListAssignmentUser().then((res) => {
            console.log(res)
            setUser(res.data.data.map((item) => {
                return {
                    value: item.id,
                    label: item.fullname + ' - ' + item.departement
                }
            }))
        }).catch((err) => {
            handleAPIError(err, navigate)
        })
    }, [])

    return (
        <Modal
            title='Ajukan Verifikasi Komitmen'
            visible={visible}
            onOk={handleOk}
            onCancel={handleCloseModalRequest}
            confirmLoading={confirmLoading}
            okText='Ajukan'
            cancelText='Batal'>
            <div className={styles.innerContainer}>
                <div className={styles.info}>
                    <p className={styles.infoText}>Pilih pengguna yang akan memverifikasi komitmen anda!</p>
                    <p className={styles.infoText}>*Pengguna harus dipilih secara berurutan sesuai dengan alur pengajuan</p>
                </div>
                <Select
                    mode="multiple"
                    style={{
                        width: '100%',
                    }}
                    placeholder="Pilih pengguna"
                    onChange={handleChange}
                    options={user}
                />

            </div>
        </Modal>
    )
}

export default ModalRequestVerification