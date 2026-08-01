import React from "react";
import styles from "./SuperHomePengamanan.module.css";
import { Card } from "antd";
import {
    TeamOutlined,
    ScheduleOutlined,
    FlagOutlined,
    SafetyOutlined,
} from "@ant-design/icons";
import { getAllMasterDashboard } from "../../../services/dashboard.service";
import { handleAPIError } from "../../../helper/handle";
import useLoading from "../../../hooks/useLoading";
import { useNavigate } from "react-router-dom";

// charts
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Legend,
} from "recharts";

function SuperHomePengamanan() {
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
                // setIncidentTrend(data.incidentTrend || []);
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
            label: "Total Laporan Shift",
            value: summary.shift || 0,
            icon: <ScheduleOutlined className={styles.cardIcon} />,
            color: "#0d9488",
        },
        {
            label: "Total Laporan Apel",
            value: summary.apel || 0,
            icon: <FlagOutlined className={styles.cardIcon} />,
            color: "#14532d",
        },
        {
            label: "Total Laporan Hasil Patroli",
            value: summary.daily_report || 0,
            icon: <ScheduleOutlined className={styles.cardIcon} />,
            color: "#166534",
        },
        {
            label: "Total Laporan Gabungan",
            value: summary.joint_patrol || 0,
            icon: <SafetyOutlined className={styles.cardIcon} />,
            color: "#15803d",
        },
        {
            label: "Total Laporan Insiden",
            value: summary.incident_report || 0,
            icon: <TeamOutlined className={styles.cardIcon} />,
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


            {/* Charts */}
            <div className={styles.section}>
                <div className={styles.chartRow}>
                    {/* Pie chart user by location */}
                    <Card title="Penempatan Lokasi Kerja" className={styles.chartCard}>
                        <ResponsiveContainer width="100%" height={250}>
                            <PieChart>
                                <Pie
                                    data={userByLocation}
                                    dataKey="total"
                                    nameKey="work_location"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    fill="#3b82f6"
                                    label
                                >
                                    {userByLocation.map((_, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={COLORS[index % COLORS.length]}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </Card>

                    {/* Pie chart user by role */}
                    <Card title="Role Pengguna" className={styles.chartCard}>
                        <ResponsiveContainer width="100%" height={250}>
                            <PieChart>
                                <Pie
                                    data={userByRole}
                                    dataKey="total"
                                    nameKey="role"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    fill="#3b82f6"
                                    label
                                >
                                    {userByRole.map((_, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={COLORS[index % COLORS.length]}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </Card>
                </div>

                {/* Line chart daily trend */}
                <Card title="Statistik Laporan Harian" className={styles.chartCardFull}>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={dailyTrend}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="total" stroke="#3b82f6" />
                        </LineChart>
                    </ResponsiveContainer>
                </Card>

                <Card title="Statistik Laporan Shift" className={styles.chartCardFull}>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={shiftTrend}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="total" stroke="#3b82f6" />
                        </LineChart>
                    </ResponsiveContainer>
                </Card>

                <Card title="Statistik Laporan Apel" className={styles.chartCardFull}>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={apelTrend}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="total" stroke="#3b82f6" />
                        </LineChart>
                    </ResponsiveContainer>
                </Card>

                <Card title="Statistik Laporan Gabungan" className={styles.chartCardFull}>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={jointTrend}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="total" stroke="#3b82f6" />
                        </LineChart>
                    </ResponsiveContainer>
                </Card>

                {/* <Card title="Statistik Laporan Insiden" className={styles.chartCardFull}>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={incidentTrend}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="total" stroke="#3b82f6" />
                        </LineChart>
                    </ResponsiveContainer>
                </Card> */}
            </div>
        </div>
    );
}

export default SuperHomePengamanan;
