import { Input, Modal } from 'antd'
import React from 'react'
import FormGroup from '../../FormGroup/FormGroup'
import FormField from '../../FormField/FormField'
import styles from './ModalConfirmFunction.module.css'
import { verifyCommitment } from '../../../services/verification.service'
import { handleAPIError, handleApiSuccess } from '../../../helper/handle'
import { useNavigate } from 'react-router-dom'

// eslint-disable-next-line react/prop-types
function ModalConfirmFunction({ visible, handleCancel }) {
    const [confirmReason, setConfirmReason] = React.useState('')
    const [confirmLoading, setConfirmLoading] = React.useState(false)
    const navigate = useNavigate()

    const handleOk = () => {
        setConfirmLoading(true)
        verifyCommitment(id, 'verified', confirmReason).then((res) => {
            handleApiSuccess(res)
        }).catch((err) => {
            handleAPIError(err, navigate)
        }).finally(() => {
            setConfirmLoading(false)
        })
    }

    return (
        <Modal
            title='Tolak Pengajuan Komitmen'
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            okText='Ok'
            cancelText='Batal'
            confirmLoading={confirmLoading}
        >
            <div className={styles.innerContainer}>
                <FormGroup>
                    <FormField>
                        <p className={styles.label}>Alasan ditolak</p>
                        <Input
                            size="large"
                            className={styles.inputField}
                            name='confirmReason'
                            value={confirmReason}
                            onChange={(e) => setConfirmReason(e.target.value)}
                            placeholder='Masukkan alasan ditolak'
                        />
                    </FormField>
                </FormGroup>
            </div>
        </Modal>
    )
}

export default ModalConfirmFunction