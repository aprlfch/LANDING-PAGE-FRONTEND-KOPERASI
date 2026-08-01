import React from "react";
import styles from "./SuperHomeK3.module.css";
import { Card } from "antd";
import {
    TeamOutlined,
    ScheduleOutlined,
    FlagOutlined,
    SafetyOutlined,
    ReadOutlined,
    FileDoneOutlined,
    SafetyCertificateOutlined,
    DesktopOutlined,
} from "@ant-design/icons";
import { getAllMasterDashboard } from "../../../services/dashboard.service";
import { handleAPIError } from "../../../helper/handle";
import useLoading from "../../../hooks/useLoading";
import { useNavigate } from "react-router-dom";

function SuperHomeK3() {
    const { startLoading, stopLoading } = useLoading();
    const navigate = useNavigate();

    const [summary, setSummary] = React.useState({});
    const [userByLocation, setUserByLocation] = React.useState([]);
    const [userByRole, setUserByRole] = React.useState([]);
    const [dailyTrend, setDailyTrend] = React.useState([]);
    const [shiftTrend, setShiftTrend] = React.useState([]);
    const [apelTrend, setApelTrend] = React.useState([]);
    const [jointTrend, setJointTrend] = React.useState([]);

    // const [incidentTrend, setIncidentTrend] = React.useState([]);

    const COLORS = ["#3b82f6", "#3b82f6", "#f97316", "#ef4444", "#9333ea"];

    React.useEffect(() => {
        startLoading("getData");
        getAllMasterDashboard()
            .then((res) => {
                const data = res.data.data;
                setSummary(data.summary || {});
                setUserByLocation(data.userByLocation || []);
                setUserByRole(data.userByRole || []);
                setDailyTrend(data.dailyReportTrend || []);
                setShiftTrend(data.shiftTrend || []);
                setApelTrend(data.apelTrend || []);
                setJointTrend(data.jointPatrolTrend || []);
            })
            .catch((err) => {
                handleAPIError(err, navigate);
            })
            .finally(() => {
                stopLoading("getData");
            });
    }, []);

    const cardItems = [
        {
            label: "Total Laporan Safety Meeting",
            value: summary.safety_meeting || 0,
            icon: <ReadOutlined className={styles.cardIcon} />,
            color: "#3b82f6",
        },
        {
            label: "Total Laporan Work Permit",
            value: summary.work_permits || 0,
            icon: <FileDoneOutlined className={styles.cardIcon} />,
            color: "#3b82f6",
        },
        {
            label: "Total Laporan P2H Truck Mixer",
            value: summary.truck_mixers || 0,
            icon: <SafetyCertificateOutlined className={styles.cardIcon} />,
            color: "#3b82f6",
        },
        {
            label: "Total Laporan P2H Concrete Pump",
            value: summary.concrete_pump || 0,
            icon: <SafetyCertificateOutlined className={styles.cardIcon} />,
            color: "#3b82f6",
        },
        {
            label: "Total Laporan P2H Kendaraan Ringan ",
            value: summary.light_vehicles || 0,
            icon: <SafetyCertificateOutlined className={styles.cardIcon} />,
            color: "#3b82f6",
        },
        {
            label: "Total Pengguna",
            value: summary.user || 0,
            icon: <TeamOutlined className={styles.cardIcon} />,
            color: "#3b82f6",
        },
    ];

    return (
        <div className={styles.container}>
            {/* Header */}
            <div className={styles.header}>
                <h1 className={styles.title}>Dashboard Overview</h1>
                <p className={styles.subtitle}>Ringkasan data dan statistik sistem</p>
            </div>

            <div className={styles.section}>
                <div className={styles.cardContainer}>
                    {cardItems.map((item) => (
                        <div key={item.label} className={styles.card}>
                            <div className={styles.cardContent}>
                                <div className={styles.cardIconContainer}>{item.icon}</div>
                                <div className={styles.infoCard}>
                                    <p className={styles.infoValue}>{item.value}</p>
                                    <p className={styles.infoLabel}>{item.label}</p>
                                </div>
                            </div>
                            <div className={styles.cardWave}></div>
                            <div className={styles.cardGlow}></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SuperHomeK3;
