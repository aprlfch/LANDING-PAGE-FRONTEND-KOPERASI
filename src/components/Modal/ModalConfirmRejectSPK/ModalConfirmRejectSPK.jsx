import { Input, Modal } from 'antd'
import React from 'react'
import FormGroup from '../../FormGroup/FormGroup'
import FormField from '../../FormField/FormField'
import { handleAPIError, handleApiSuccess } from '../../../helper/handle'
import { useNavigate } from 'react-router-dom'
import { verifySpk } from '../../../services/spk.service'
import styles from './ModalConfirmRejectSPK.module.css'

// eslint-disable-next-line react/prop-types
function ModalConfirmRejectSPK({ visible, handleCancel, choosenId }) {
    const [rejectReason, setRejectReason] = React.useState('')
    const [confirmLoading, setConfirmLoading] = React.useState(false)
    const navigate = useNavigate()
    console.log('tes')

    const handleOk = () => {
        setConfirmLoading(true)
        verifySpk(choosenId, 'reject', rejectReason).then((res) => {
            handleApiSuccess(res)
        }).catch((err) => {
            handleAPIError(err, navigate)
        }).finally(() => {
            setConfirmLoading(false)
        })
    }

    return (
        <Modal
            title='Tolak Pengajuan SPK'
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
                            name='rejectReason'
                            value={rejectReason}
                            onChange={(e) => setRejectReason(e.target.value)}
                            placeholder='Masukkan alasan ditolak'
                        />
                    </FormField>
                </FormGroup>
            </div>
        </Modal>
    )
}

export default ModalConfirmRejectSPK