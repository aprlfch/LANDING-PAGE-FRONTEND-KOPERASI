import React from 'react'
import { ProfileContext } from '../../context/ProfileContext'
import DashboardLayout from '../../layouts/DashboardLayout/DashboardLayout'
import styles from './Home.module.css'
import SuperHome from '../../components/Home/SuperHome/SuperHome'

function Home() {
    const { getMe } = React.useContext(ProfileContext)

    const allowedRoles = ['superadmin', 'bendahara', 'ketua_koperasi']

    return (
        <DashboardLayout>
            <div className={styles.container}>
                {allowedRoles.includes(getMe?.role) ? (
                    <SuperHome />
                ) : (
                    <p>Sedang Dalam Tahap Pengembangan.</p>
                )}
            </div>
        </DashboardLayout>
    )
}

export default Home