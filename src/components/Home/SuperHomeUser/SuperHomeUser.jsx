import React from 'react'
// import { ProfileContext } from '../../../context/ProfileContext'
import styles from './SuperHomeUser.module.css'
import { ContainerOutlined } from '@ant-design/icons'
import useLoading from '../../../hooks/useLoading'
import { getAllMasterBudget } from '../../../services/masterBudget.service'
import { handleAPIError } from '../../../helper/handle'
import { useNavigate } from 'react-router-dom'
import { getAllCostCenter } from '../../../services/costCenter.service'
import { getAllGlAccount } from '../../../services/glAccount.service'
import { getAllUser } from '../../../services/user.service'
import { getAllInternalOrder } from '../../../services/internalOrder'
// import { Card } from 'antd'
import MasterBudgetChart from '../../Charts/MasterBudgetChart/MasterBudgetChart'
import CostCenterChart from '../../Charts/CostCenterChart/CostCenterChart'
import CostCenterAllocationChart from '../../Charts/CostCenterAllocationChart/CostCenterAllocationChart'
import { Card, Carousel } from 'antd';
import { LOGO } from '../../../assets'
import MasterOwnAllocationChart from '../../Charts/MasterOwnAllocationChart/MasterOwnAllocationChart'
import { ProfileContext } from '../../../context/ProfileContext'

function SuperHomeUser() {
    return (
        <div className={styles.container}>
            <div className={styles.section}>
                <Card>
                    <MasterOwnAllocationChart />
                </Card>
            </div>
        </div>
    )
}

export default SuperHomeUser