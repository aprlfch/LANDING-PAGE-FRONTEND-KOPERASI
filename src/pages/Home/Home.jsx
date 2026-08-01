import React from 'react'
import { ProfileContext } from '../../context/ProfileContext'
import DashboardLayout from '../../layouts/DashboardLayout/DashboardLayout'
import styles from './Home.module.css'

function Home() {
    const { getMe } = React.useContext(ProfileContext)

    const allowedRoles = ['superadmin', 'bendahara', 'ketua_koperasi']

    return (
        <DashboardLayout>
            <div className={styles.container}>
                <p>Sedang Dalam Tahap Pengembangan.</p>
            </div>
        </DashboardLayout>
    )
}

export default Home