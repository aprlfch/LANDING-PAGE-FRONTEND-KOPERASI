import React from "react";
import styles from "./SuperHomeSecurity.module.css";
import { handleAPIError } from "../../../helper/handle";
import useLoading from "../../../hooks/useLoading";
import { useNavigate } from "react-router-dom";
import {
    ResponsiveContainer, LineChart, Line, BarChart, Bar,
    XAxis, YAxis, CartesianGrid, Tooltip, Cell
} from "recharts";
import { getAllMasterDashboardSecurity } from "../../../services/dashboard.service";

// ── helpers ──────────────────────────────────────────────
const MONTH_NAMES = ["", "Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
const DAYS_ORDER = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const DAY_LABEL = { Monday: "Sen", Tuesday: "Sel", Wednesday: "Rab", Thursday: "Kam", Friday: "Jum", Saturday: "Sab", Sunday: "Min" };
const TEAL_SHADES = ["#E1F5EE", "#9FE1CB", "#5DCAA5", "#1D9E75", "#0F6E56", "#085041"];

const statusConfig = {
    pending: { label: "Menunggu", cls: "pending" },
    approved_koordinator: { label: "Koord. OK", cls: "info" },
    approved_koordinator_utama: { label: "Koord. Utama OK", cls: "info" },
    confirmed_kabag: { label: "Selesai", cls: "success" },
    rejected: { label: "Ditolak", cls: "danger" },
};

const typeStyle = {
    pagi: { bg: "#FAEEDA", color: "#633806", label: "☀ Pagi" },
    sore: { bg: "#E1F5EE", color: "#085041", label: "🌅 Sore" },
    malam: { bg: "#EEEDFE", color: "#3C3489", label: "🌙 Malam" },
};

function getHeatColor(val, max) {
    if (!val || !max) return "rgba(0,0,0,0.04)";
    const idx = Math.min(5, Math.floor((val / max) * 5));
    return TEAL_SHADES[idx];
}

// ── component ─────────────────────────────────────────────
function SecurityDashboard() {
    const { startLoading, stopLoading } = useLoading();
    const navigate = useNavigate();
    const [data, setData] = React.useState(null);

    React.useEffect(() => {
        startLoading("getData");
        getAllMasterDashboardSecurity()          // <-- endpoint GET /dashboard/security
            .then(res => setData(res.data.data))
            .catch(err => handleAPIError(err, navigate))
            .finally(() => stopLoading("getData"));
    }, []);

    if (!data) return null;

    const {
        user, today, thisMonth, summary,
        trends, monthly, byLocation,
        heatmap, latestShifts,
    } = data;

    // ── heatmap lookup ──────────────────────────────────────
    const heatLookup = {};
    (heatmap.byDayAndHour || []).forEach(r => {
        if (r.hour !== null) heatLookup[`${r.day}_${r.hour}`] = r.total;
    });
    const heatMax = Math.max(...Object.values(heatLookup), 1);

    const hours = Array.from({ length: 24 }, (_, i) => i);

    // ── monthly labels ──────────────────────────────────────
    const monthlyFormatted = (monthly || []).map(d => ({
        label: `${MONTH_NAMES[d.month]} '${String(d.year).slice(2)}`,
        total: d.total,
    }));

    return (
        <div className={styles.container}>

            {/* ── HEADER ── */}
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Dashboard Security</h1>
                    <p className={styles.subtitle}>
                        {user.fullname} &nbsp;·&nbsp; {user.work_location}
                    </p>
                </div>
                {today.isFullDay && (
                    <span className={styles.fullDayBadge}>✔ Semua shift terisi hari ini</span>
                )}
            </div>

            {/* ── SUMMARY CARDS ── */}
            <section className={styles.section}>
                <p className={styles.sectionTitle}>Ringkasan</p>
                <div className={styles.grid4}>
                    {[
                        { label: "Total Shift", value: summary.totalShift, sub: "Sepanjang waktu" },
                        { label: "Bulan Ini", value: thisMonth.total, sub: new Date().toLocaleString("id", { month: "long", year: "numeric" }) },
                        { label: "Streak", value: summary.streak, sub: "Hari berturut-turut" },
                        { label: "Disetujui", value: summary.approvalProgress.approved_koordinator_utama, sub: "Koord. Utama" },
                    ].map(c => (
                        <div key={c.label} className={styles.metricCard}>
                            <p className={styles.metricLabel}>{c.label}</p>
                            <p className={styles.metricValue}>{c.value}</p>
                            <p className={styles.metricSub}>{c.sub}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── SHIFT TYPE + TODAY + APPROVAL ── */}
            <div className={styles.grid3}>

                {/* shift by type */}
                <div className={styles.card}>
                    <p className={styles.sectionTitle}>Jenis Shift</p>
                    {["pagi", "sore", "malam"].map(t => (
                        <div key={t} className={styles.shiftTypePill}
                            style={{ background: typeStyle[t].bg, color: typeStyle[t].color }}>
                            <span>{typeStyle[t].label}</span>
                            <span className={styles.shiftTypeCount}>{summary.byType[t] || 0}</span>
                        </div>
                    ))}
                </div>

                {/* today */}
                <div className={styles.card}>
                    <p className={styles.sectionTitle}>Aktivitas Hari Ini</p>
                    <div className={styles.todayRow}>
                        <span>Total shift hari ini</span>
                        <strong>{today.totalShift}</strong>
                    </div>
                    {["pagi", "sore", "malam"].map(t => {
                        const filled = today.completedTypes.includes(t);
                        return (
                            <div key={t} className={styles.todayRow}>
                                <span style={{ textTransform: "capitalize" }}>Shift {t}</span>
                                <span className={`${styles.badge} ${filled ? styles.badgeSuccess : styles.badgePending}`}>
                                    {filled ? "✔ Terisi" : "Belum"}
                                </span>
                            </div>
                        );
                    })}
                    {today.remainingTypes.length > 0 && (
                        <p className={styles.reminderText}>
                            Belum diisi: {today.remainingTypes.join(", ")}
                        </p>
                    )}
                </div>

                {/* approval progress */}
                <div className={styles.card}>
                    <p className={styles.sectionTitle}>Status Approval</p>
                    {Object.entries(summary.approvalProgress).map(([key, val]) => {
                        const cfg = statusConfig[key] || { label: key, cls: "info" };
                        return (
                            <div key={key} className={styles.approvalRow}>
                                <span>{cfg.label}</span>
                                <span className={`${styles.badge} ${styles["badge_" + cfg.cls]}`}>{val}</span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* ── TREND + LOCATION ── */}
            <div className={styles.grid2}>
                <div className={styles.card}>
                    <p className={styles.sectionTitle}>Tren 30 Hari Terakhir</p>
                    <ResponsiveContainer width="100%" height={180}>
                        <LineChart data={trends.last30Days}
                            margin={{ top: 4, right: 8, bottom: 0, left: -20 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
                            <XAxis dataKey="date"
                                tickFormatter={d => d.slice(5)}
                                tick={{ fontSize: 10, fill: "#888" }}
                                interval={4}
                            />
                            <YAxis tick={{ fontSize: 10, fill: "#888" }} allowDecimals={false} />
                            <Tooltip formatter={v => [v, "Shift"]} />
                            <Line type="monotone" dataKey="total"
                                stroke="#1D9E75" strokeWidth={2}
                                dot={{ r: 3, fill: "#1D9E75" }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className={styles.card}>
                    <p className={styles.sectionTitle}>Distribusi Lokasi</p>
                    {byLocation.map(loc => (
                        <div key={loc.pos_location} className={styles.locRow}>
                            <span className={styles.locName}>{loc.pos_location}</span>
                            <div className={styles.locBarWrap}>
                                <div className={styles.locBar}
                                    style={{ width: `${(loc.total / byLocation[0].total) * 100}%` }} />
                            </div>
                            <span className={styles.locCount}>{loc.total}</span>
                        </div>
                    ))}

                    <p className={styles.sectionTitle} style={{ marginTop: 16 }}>Bulanan</p>
                    <ResponsiveContainer width="100%" height={90}>
                        <BarChart data={monthlyFormatted}
                            margin={{ top: 0, right: 4, bottom: 0, left: -20 }}>
                            <XAxis dataKey="label" tick={{ fontSize: 10, fill: "#888" }} />
                            <YAxis tick={{ fontSize: 10, fill: "#888" }} allowDecimals={false} />
                            <Tooltip formatter={v => [v, "Shift"]} />
                            <Bar dataKey="total" radius={[3, 3, 0, 0]}>
                                {monthlyFormatted.map((_, i) => (
                                    <Cell key={i} fill={i === monthlyFormatted.length - 1 ? "#0F6E56" : "#1D9E75"} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* ── HEATMAP ── */}
            <div className={`${styles.card} ${styles.heatmapCard}`}>
                <p className={styles.sectionTitle}>Heatmap — Jam Aktif per Hari</p>
                <div className={styles.heatmapScroll}>
                    <div className={styles.heatmapGrid}>
                        {/* hour labels */}
                        <div />
                        {hours.map(h => (
                            <div key={h} className={styles.hourLabel}>
                                {h % 3 === 0 ? h : ""}
                            </div>
                        ))}
                        {/* rows */}
                        {DAYS_ORDER.map(day => (
                            <React.Fragment key={day}>
                                <div className={styles.dayLabel}>{DAY_LABEL[day]}</div>
                                {hours.map(h => {
                                    const val = heatLookup[`${day}_${h}`] || 0;
                                    return (
                                        <div key={h} className={styles.heatCell}
                                            style={{ background: getHeatColor(val, heatMax) }}
                                            title={val ? `${DAY_LABEL[day]} ${h}:00 — ${val} shift` : ""}
                                        />
                                    );
                                })}
                            </React.Fragment>
                        ))}
                    </div>
                    {/* legend */}
                    <div className={styles.heatLegend}>
                        <span>Rendah</span>
                        {TEAL_SHADES.map(c => (
                            <div key={c} className={styles.heatLegendDot} style={{ background: c }} />
                        ))}
                        <span>Tinggi</span>
                    </div>
                </div>
            </div>

            {/* ── LATEST SHIFTS ── */}
            <div className={styles.card}>
                <p className={styles.sectionTitle}>Riwayat Shift Terbaru</p>
                {latestShifts.map(s => {
                    const cfg = statusConfig[s.status] || { label: s.status, cls: "info" };
                    const ts = typeStyle[s.shift_type] || {};
                    const dateStr = new Date(s.date).toLocaleDateString("id", { day: "2-digit", month: "short", year: "numeric" });
                    return (
                        <div key={s.id} className={styles.shiftRow}>
                            <div className={styles.shiftTypeBadge}
                                style={{ background: ts.bg, color: ts.color }}>
                                {s.shift_type}
                            </div>
                            <div className={styles.shiftInfo}>
                                <p>{s.pos_location} &mdash; {s.time}</p>
                                <span>{dateStr} · {s.weather} · {s.situation?.slice(0, 45)}{s.situation?.length > 45 ? "…" : ""}</span>
                            </div>
                            <span className={`${styles.badge} ${styles["badge_" + cfg.cls]}`}>
                                {cfg.label}
                            </span>
                        </div>
                    );
                })}
            </div>

        </div>
    );
}

export default SecurityDashboard;