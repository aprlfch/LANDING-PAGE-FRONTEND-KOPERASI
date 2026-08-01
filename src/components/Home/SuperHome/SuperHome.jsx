import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    LineChart,
    Line,
} from "recharts";
import { getAllMasterDashboard, getAllMasterDashboardbyTopUser } from "../../../services/dashboard.service";
import { handleAPIError } from "../../../helper/handle";
import useLoading from "../../../hooks/useLoading";
import { useNavigate } from "react-router-dom";

// ─── colour tokens ───────────────────────────────────────────────────────────
const BLUE = ["#E6F1FB", "#85B7EB", "#378ADD", "#185FA5", "#0C447C"];
const TEAL = ["#E1F5EE", "#5DCAA5", "#1D9E75", "#0F6E56", "#085041"];
const AMBER = ["#FAEEDA", "#EF9F27", "#BA7517", "#854F0B", "#633806"];
const RED = ["#FCEBEB", "#F09595", "#E24B4A", "#A32D2D", "#791F1F"];
const GREEN = ["#EAF3DE", "#97C459", "#639922", "#3B6D11", "#27500A"];
const PURPLE = ["#EEEDFE", "#AFA9EC", "#7F77DD", "#534AB7", "#3C3489"];
const GRAY = ["#F1EFE8", "#B4B2A9", "#888780", "#5F5E5A", "#444441"];
const CORAL = ["#FAECE7", "#F0997B", "#D85A30", "#993C1D", "#712B13"];

const PIE_COLORS = [BLUE[2], TEAL[2], AMBER[1], PURPLE[2], CORAL[2], RED[2], GREEN[2], GRAY[2]];

const MONTHS_ID = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember",
];

// ─── tiny reusable components ─────────────────────────────────────────────────

function SectionTitle({ children }) {
    return (
        <p style={{
            fontSize: 11, fontWeight: 500, letterSpacing: "0.07em",
            textTransform: "uppercase", color: "#888780", margin: "1.5rem 0 0.75rem",
        }}>
            {children}
        </p>
    );
}

function Card({ title, icon, children, style = {} }) {
    return (
        <div style={{
            background: "#fff", border: "0.5px solid rgba(0,0,0,0.12)",
            borderRadius: 12, padding: "1rem 1.25rem", ...style,
        }}>
            {title && (
                <div style={{
                    fontSize: 12, fontWeight: 500, color: "#5F5E5A",
                    marginBottom: 12, display: "flex", alignItems: "center", gap: 6,
                }}>
                    {icon && <span style={{ fontSize: 14 }}>{icon}</span>}
                    {title}
                </div>
            )}
            {children}
        </div>
    );
}

function Badge({ children, type = "pending" }) {
    const styles = {
        pending: { bg: AMBER[0], color: AMBER[3] },
        approved: { bg: GREEN[0], color: GREEN[3] },
        rejected: { bg: RED[0], color: RED[3] },
        info: { bg: BLUE[0], color: BLUE[3] },
    };
    const s = styles[type] || styles.info;
    return (
        <span style={{
            display: "inline-block", fontSize: 11, fontWeight: 500,
            padding: "2px 9px", borderRadius: 10,
            background: s.bg, color: s.color,
        }}>
            {children}
        </span>
    );
}

function ApprovalRow({ label, badge, type }) {
    return (
        <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "6px 0", borderBottom: "0.5px solid rgba(0,0,0,0.08)", fontSize: 13,
        }}>
            <span>{label}</span>
            <Badge type={type}>{badge}</Badge>
        </div>
    );
}

function BarRow({ label, value, max, color }) {
    const pct = max > 0 ? Math.round((value / max) * 100) : 0;
    return (
        <div style={{ marginBottom: 8 }}>
            <div style={{
                display: "flex", justifyContent: "space-between",
                fontSize: 12, color: "#5F5E5A", marginBottom: 3,
            }}>
                <span>{label}</span><span>{value}</span>
            </div>
            <div style={{ background: "#f1efe8", borderRadius: 3, height: 7, overflow: "hidden" }}>
                <div style={{
                    width: `${pct}%`, height: "100%", background: color,
                    borderRadius: 3, transition: "width 0.6s ease",
                }} />
            </div>
        </div>
    );
}

// ─── helpers ─────────────────────────────────────────────────────────────────

function statusBadgeType(status = "") {
    if (status.startsWith("approved")) return "approved";
    if (status === "rejected") return "rejected";
    return "pending";
}
function statusLabel(status = "") {
    const map = {
        pending: "Pending",
        approved_koordinator: "Disetujui Oleh Koordinator",
        approved_koordinator_utama: "Disetujui Oleh Koordinator Utama",
        confirmed_kabag: "Dikonfirmasi Oleh Kabag",
        approved: "Approved",
        rejected: "Rejected",
    };

    return map[status] || status;
}
const DAY_ORDER = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const DAY_ID = { Monday: "Sen", Tuesday: "Sel", Wednesday: "Rab", Thursday: "Kam", Friday: "Jum", Saturday: "Sab", Sunday: "Min" };

// ─── main component ───────────────────────────────────────────────────────────

function SuperHome() {
    const { startLoading, stopLoading } = useLoading();
    const navigate = useNavigate();

    const [data, setData] = React.useState(null);

    // ── Top active users state ──
    const [topUserData, setTopUserData] = React.useState(null);
    const [topUserType, setTopUserType] = React.useState("shift");
    const [topUserMonth, setTopUserMonth] = React.useState(new Date().getMonth() + 1);
    const [topUserYear, setTopUserYear] = React.useState(new Date().getFullYear());
    const [topUserLoading, setTopUserLoading] = React.useState(false);
    const [topUserSearch, setTopUserSearch] = React.useState("");
    const [topUserPage, setTopUserPage] = React.useState(1);
    const TOP_USER_PER_PAGE = 15;

    // ── Fetch global dashboard ──
    React.useEffect(() => {
        startLoading("getData");
        getAllMasterDashboard()
            .then((res) => setData(res.data.data))
            .catch((err) => handleAPIError(err, navigate))
            .finally(() => stopLoading("getData"));
    }, []);

    // ── Fetch top active users (re-fetch on type/month/year change) ──
    React.useEffect(() => {
        setTopUserLoading(true);
        setTopUserPage(1);
        getAllMasterDashboardbyTopUser(topUserType, topUserMonth, topUserYear)
            .then((res) => setTopUserData(res.data.data))
            .catch((err) => handleAPIError(err, navigate))
            .finally(() => setTopUserLoading(false));
    }, [topUserType, topUserMonth, topUserYear]);

    if (!data) return null;

    const {
        summary = {}, todayActivity = {}, approvals = {},
        pendingCounts = {}, totalPendingApprovals = 0,
        analytics = {}, trends = {}, operational = {},
        safety = {}, monthly = {}, heatmap = {},
    } = data;

    // ── derived data ─────────────────────────────────────────────────────────

    const summaryCards = [
        { label: "Laporan Shift", value: summary.shift, accent: BLUE[2] },
        { label: "Laporan Apel", value: summary.apel, accent: TEAL[2] },
        { label: "Laporan Harian", value: summary.daily_report, accent: BLUE[2] },
        { label: "Patroli Gabungan", value: summary.joint_patrol, accent: GREEN[2] },
        { label: "Patroli Udara", value: summary.air_patrol, accent: PURPLE[2] },
        { label: "Laporan Insiden", value: summary.incident_report, accent: RED[2] },
        { label: "Safety Meeting", value: summary.safety_meeting, accent: AMBER[1] },
        { label: "Work Permit", value: summary.work_permits, accent: BLUE[3] },
        { label: "P2H Truck Mixer", value: summary.truck_mixers, accent: TEAL[3] },
        { label: "P2H Concrete Pump", value: summary.concrete_pump, accent: TEAL[2] },
        { label: "P2H Kendaraan Ringan", value: summary.light_vehicles, accent: TEAL[1] },
        { label: "Total Pengguna", value: summary.user, accent: GRAY[2] },
    ];

    const todayCards = [
        { label: "Shift", value: todayActivity.shift },
        { label: "Apel", value: todayActivity.apel },
        { label: "Patroli", value: todayActivity.patrol },
        { label: "Laporan", value: todayActivity.report },
        { label: "Patroli Udara", value: todayActivity.air_patrol },
        { label: "Command Center", value: todayActivity.command_center },
    ];

    const pendingTiles = [
        { label: "Shift", value: pendingCounts.shift, color: RED[3] },
        { label: "Insiden", value: pendingCounts.incident_report, color: RED[2] },
        { label: "Work Permit", value: pendingCounts.work_permit, color: AMBER[3] },
        { label: "Apel", value: pendingCounts.apel, color: AMBER[3] },
        { label: "Patroli Gabungan", value: pendingCounts.joint_patrol, color: AMBER[2] },
        { label: "Patroli Udara", value: pendingCounts.air_patrol, color: AMBER[1] },
        { label: "Laporan Harian", value: pendingCounts.daily_report, color: GREEN[3] },
        { label: "Command Center", value: pendingCounts.command_center, color: GREEN[3] },
    ];

    const wp = operational.workPermitProgress || {};
    const wpPendingPct = wp.total > 0 ? Math.round((wp.pending / wp.total) * 100) : 0;

    const byDay = (heatmap.byDay || []).sort(
        (a, b) => DAY_ORDER.indexOf(a.day) - DAY_ORDER.indexOf(b.day)
    );

    const vs = operational.vehicleSummary || {};
    const truckMixer = vs.truck_mixer || {};
    const concretePump = vs.concrete_pump || {};
    const lightVehicle = vs.light_vehicle || {};
    const shiftByType = (operational.shiftByType || []).sort((a, b) => b.total - a.total);

    const jsaByMonth = (monthly.jsaByMonth || []).map((m) => ({
        name: MONTHS_ID[m.month - 1],
        total: m.total,
    }));

    const incidentByType = safety.incidentByType || [];
    const incidentByLocation = safety.incidentByLocation || [];
    const maxIncident = Math.max(...incidentByType.map((i) => i.total), 1);
    const maxLocIncident = Math.max(...incidentByLocation.map((i) => i.total), 1);

    const userByLocation = (analytics.userByLocation || []).filter((u) => u.work_location);
    const userByRole = (analytics.userByRole || []).filter((u) => u.role);

    // ── Top user computed ─────────────────────────────────────────────────────
    const typeColors = { shift: BLUE[2], apel: TEAL[2], patrol: CORAL[2] };
    const topColor = typeColors[topUserType] || BLUE[2];

    const topFiltered = (topUserData?.users || []).filter(
        (u) => u.created_by?.toLowerCase().includes(topUserSearch.toLowerCase())
    );
    const topMaxVal = topFiltered[0] ? parseInt(topFiltered[0].total) : 1;
    const topTotalPages = Math.ceil(topFiltered.length / TOP_USER_PER_PAGE);
    const topPaged = topFiltered.slice(
        (topUserPage - 1) * TOP_USER_PER_PAGE,
        topUserPage * TOP_USER_PER_PAGE
    );

    // ── layout helpers ────────────────────────────────────────────────────────
    const grid = (cols, gap = 8) => ({
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        gap, marginBottom: 12,
    });
    const row = (gap = 12) => ({
        display: "grid", gridTemplateColumns: "1fr 1fr",
        gap, marginBottom: 12,
    });

    // ─── render ───────────────────────────────────────────────────────────────
    return (
        <div style={{ padding: "1.5rem 1.5rem 3rem", maxWidth: 1400, margin: "0 auto", fontFamily: "inherit" }}>

            {/* ── Header ── */}
            <div style={{
                display: "flex", alignItems: "flex-end", justifyContent: "space-between",
                marginBottom: "2rem", paddingBottom: "1.25rem",
                borderBottom: "0.5px solid rgba(0,0,0,0.1)",
            }}>
                <div>
                    <p style={{
                        fontSize: 11, fontWeight: 500, letterSpacing: "0.1em",
                        textTransform: "uppercase", color: "#888780", margin: "0 0 6px",
                    }}>Sistem Manajemen</p>
                    <h1 style={{ fontSize: 24, fontWeight: 500, margin: 0, lineHeight: 1.1 }}>
                        Dashboard Overview
                    </h1>
                    <p style={{ fontSize: 13, color: "#888780", marginTop: 4 }}>
                        Ringkasan data dan statistik sistem
                    </p>
                </div>
                <div style={{ textAlign: "right", fontSize: 12, color: "#888780", lineHeight: 1.5 }}>
                    <strong style={{ display: "block", fontSize: 14, color: "#5F5E5A" }}>
                        {new Date().toLocaleDateString("id-ID", { weekday: "short", day: "numeric", month: "long", year: "numeric" })}
                    </strong>
                    Diperbarui real-time
                </div>
            </div>

            {/* ── Summary cards ── */}
            <SectionTitle>Ringkasan Keseluruhan</SectionTitle>
            <div style={{ ...grid(6), marginBottom: "1.5rem" }}>
                {summaryCards.map((c) => (
                    <div key={c.label} style={{
                        background: "#f8f8f6", borderRadius: 8,
                        padding: "0.875rem 0.875rem 0.75rem",
                        position: "relative", overflow: "hidden",
                    }}>
                        {c.accent && (
                            <div style={{
                                position: "absolute", top: 0, left: 0, right: 0,
                                height: 2, background: c.accent, borderRadius: "2px 2px 0 0",
                            }} />
                        )}
                        <div style={{ fontSize: 28, fontWeight: 500, lineHeight: 1, marginTop: 2 }}>
                            {c.value ?? 0}
                        </div>
                        <div style={{ fontSize: 11, color: "#888780", marginTop: 6, lineHeight: 1.3 }}>
                            {c.label}
                        </div>
                    </div>
                ))}
            </div>

            {/* ── Today activity ── */}
            <SectionTitle>Aktivitas Hari Ini</SectionTitle>
            <div style={{ ...grid(6), marginBottom: "1.5rem" }}>
                {todayCards.map((c) => (
                    <div key={c.label} style={{
                        background: "#f8f8f6", border: "0.5px solid rgba(0,0,0,0.1)",
                        borderRadius: 8, padding: "0.875rem 0.875rem 0.75rem",
                        position: "relative", overflow: "hidden",
                    }}>
                        <div style={{
                            position: "absolute", top: 0, left: 0, right: 0,
                            height: 2, background: BLUE[2], borderRadius: "2px 2px 0 0",
                        }} />
                        <div style={{ fontSize: 28, fontWeight: 500, lineHeight: 1, marginTop: 2 }}>
                            {c.value ?? 0}
                        </div>
                        <div style={{ fontSize: 11, color: "#888780", marginTop: 6, lineHeight: 1.3 }}>
                            {c.label}
                        </div>
                    </div>
                ))}
            </div>

            {/* ── Pending banner ── */}
            <div style={{
                display: "grid", gridTemplateColumns: "auto 1fr auto",
                alignItems: "center", gap: 20,
                background: RED[0], border: `0.5px solid ${RED[1]}`,
                borderLeft: `3px solid ${RED[4]}`, borderRadius: 12,
                padding: "1rem 1.25rem", marginBottom: 12,
            }}>
                <div style={{
                    width: 36, height: 36, borderRadius: "50%",
                    background: "rgba(162,45,45,0.12)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 18, color: RED[4],
                }}>⚠</div>
                <div>
                    <div style={{ fontSize: 34, fontWeight: 500, color: RED[3], lineHeight: 1 }}>
                        {totalPendingApprovals}
                    </div>
                    <div style={{ fontSize: 12, color: RED[3], marginTop: 3, opacity: 0.8 }}>
                        Total Pending Approval
                    </div>
                </div>
                <span style={{
                    fontSize: 11, fontWeight: 500, padding: "4px 12px", borderRadius: 20,
                    background: "rgba(162,45,45,0.1)", color: RED[4],
                    border: `0.5px solid rgba(162,45,45,0.25)`, whiteSpace: "nowrap",
                }}>
                    Memerlukan perhatian segera
                </span>
            </div>

            {/* ── Pending per kategori ── */}
            <SectionTitle>Pending per Kategori</SectionTitle>
            <div style={{ ...grid(8), marginBottom: "1.5rem" }}>
                {pendingTiles.map((t) => (
                    <div key={t.label} style={{
                        background: "#f8f8f6", border: "0.5px solid rgba(0,0,0,0.08)",
                        borderRadius: 8, padding: "10px 8px", textAlign: "center",
                    }}>
                        <div style={{
                            width: 6, height: 6, borderRadius: "50%",
                            background: t.color, margin: "0 auto 6px",
                        }} />
                        <div style={{ fontSize: 22, fontWeight: 500, color: t.color, lineHeight: 1 }}>
                            {t.value ?? 0}
                        </div>
                        <div style={{ fontSize: 10, color: "#888780", marginTop: 4, lineHeight: 1.3 }}>
                            {t.label}
                        </div>
                    </div>
                ))}
            </div>

            {/* ── Approvals ── */}
            <SectionTitle>Status Approval</SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))", gap: 12, marginBottom: "1.5rem" }}>
                {["shift", "apel", "joint_patrol", "daily_report", "air_patrol", "incident_report"].map((key) => {
                    const rows = approvals[key] || [];
                    if (!rows.length) return null;
                    const labels = {
                        shift: "Shift", apel: "Apel", joint_patrol: "Patroli Gabungan",
                        daily_report: "Laporan Harian", air_patrol: "Patroli Udara",
                        incident_report: "Insiden",
                    };
                    return (
                        <Card key={key} title={labels[key]}>
                            {rows.map((r) => (
                                <ApprovalRow key={r.status} label={statusLabel(r.status)} badge={r.total} type={statusBadgeType(r.status)} />
                            ))}
                        </Card>
                    );
                })}
            </div>

            {/* ── Work Permit ── */}
            <SectionTitle>Work Permit Progress</SectionTitle>
            <Card style={{ marginBottom: "1.5rem" }}>
                <div style={{ display: "flex", gap: 24, marginBottom: 12 }}>
                    {[
                        { label: "Pending", value: wp.pending ?? 0, color: AMBER[3] },
                        { label: "Approved", value: wp.approved ?? 0, color: GREEN[3] },
                        { label: "Rejected", value: wp.rejected ?? 0, color: RED[3] },
                        { label: "Total", value: wp.total ?? 0, color: "#2C2C2A" },
                    ].map((s) => (
                        <div key={s.label}>
                            <div style={{ fontSize: 20, fontWeight: 500, color: s.color }}>{s.value}</div>
                            <div style={{ fontSize: 11, color: "#888780" }}>{s.label}</div>
                        </div>
                    ))}
                </div>
                <div style={{ background: "#f1efe8", borderRadius: 3, height: 8, overflow: "hidden" }}>
                    <div style={{
                        width: `${wpPendingPct}%`, height: "100%",
                        background: AMBER[1], borderRadius: 3, transition: "width 0.6s ease",
                    }} />
                </div>
                <div style={{ fontSize: 11, color: "#888780", marginTop: 4 }}>
                    {wpPendingPct}% masih menunggu persetujuan — {wp.pendingApprovals ?? 0} pending approval aktif
                </div>
            </Card>

            {/* ── Incident ── */}
            <SectionTitle>Laporan Insiden</SectionTitle>
            <div style={{ ...row(12), marginBottom: "1.5rem" }}>
                <Card title="Insiden per Jenis">
                    {incidentByType.map((inc) => (
                        <BarRow key={inc.type_of_incident} label={inc.type_of_incident} value={inc.total} max={maxIncident} color={RED[2]} />
                    ))}
                </Card>
                <Card title="Insiden per Lokasi">
                    {incidentByLocation.map((inc) => (
                        <BarRow key={inc.location_incident} label={inc.location_incident} value={inc.total} max={maxLocIncident} color={CORAL[2]} />
                    ))}
                </Card>
            </div>

            {/* ── Operasional ── */}
            <SectionTitle>Operasional</SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: "1.5rem" }}>
                <Card title="Kendaraan & Inspeksi P2H">
                    {[
                        { label: "Truck Mixer", inspections: truckMixer.inspections, units: truckMixer.units },
                        { label: "Concrete Pump", inspections: concretePump.inspections, units: concretePump.units },
                        { label: "Kendaraan Ringan", inspections: lightVehicle.inspections, units: lightVehicle.units },
                    ].map((v) => (
                        <div key={v.label} style={{
                            display: "flex", justifyContent: "space-between", alignItems: "center",
                            padding: "7px 0", borderBottom: "0.5px solid rgba(0,0,0,0.08)", fontSize: 13,
                        }}>
                            <span>{v.label}</span>
                            <span style={{ fontSize: 12, color: "#5F5E5A" }}>
                                {v.units ?? 0} unit · {v.inspections ?? 0} inspeksi
                            </span>
                        </div>
                    ))}
                </Card>
                <Card title="Shift per Tipe">
                    {shiftByType.map((s, i) => (
                        <div key={s.shift_type} style={{
                            display: "flex", alignItems: "center", gap: 10,
                            padding: "7px 0", borderBottom: "0.5px solid rgba(0,0,0,0.08)", fontSize: 13,
                        }}>
                            <div style={{
                                width: 8, height: 8, borderRadius: "50%",
                                background: [BLUE[2], AMBER[1], PURPLE[2]][i % 3], flexShrink: 0,
                            }} />
                            <span style={{ flex: 1, textTransform: "capitalize" }}>{s.shift_type}</span>
                            <strong>{s.total}</strong>
                        </div>
                    ))}
                </Card>
                <Card title="Keselamatan">
                    {[
                        { label: "Safety Meeting", value: safety.totalSafetyMeetings },
                        { label: "Peserta Meeting", value: safety.totalWorkersInSafetyMeeting },
                        { label: "JSA", value: safety.totalJSA },
                        { label: "Work Permit", value: safety.totalWorkPermits },
                        { label: "Total Insiden", value: safety.totalIncidents },
                    ].map((s) => (
                        <div key={s.label} style={{
                            display: "flex", justifyContent: "space-between",
                            padding: "6px 0", borderBottom: "0.5px solid rgba(0,0,0,0.08)", fontSize: 13,
                        }}>
                            <span>{s.label}</span><strong>{s.value ?? 0}</strong>
                        </div>
                    ))}
                </Card>
            </div>

            {/* ── Aktivitas per Hari ── */}
            <SectionTitle>Distribusi Aktivitas per Hari</SectionTitle>
            <Card style={{ marginBottom: "1.5rem" }}>
                <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={byDay.map((d) => ({ name: DAY_ID[d.day] || d.day, total: d.total }))}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
                        <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#888780" }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 12, fill: "#888780" }} axisLine={false} tickLine={false} />
                        <Tooltip contentStyle={{ fontSize: 12, border: "0.5px solid rgba(0,0,0,0.12)", borderRadius: 8 }} cursor={{ fill: "rgba(0,0,0,0.04)" }} />
                        <Bar dataKey="total" name="Aktivitas" fill={BLUE[2]} radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </Card>

            {/* ── JSA per Bulan ── */}
            {jsaByMonth.length > 0 && (
                <>
                    <SectionTitle>JSA per Bulan (2026)</SectionTitle>
                    <Card style={{ marginBottom: "1.5rem" }}>
                        <ResponsiveContainer width="100%" height={200}>
                            <BarChart data={jsaByMonth}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
                                <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#888780" }} axisLine={false} tickLine={false} />
                                <YAxis tick={{ fontSize: 12, fill: "#888780" }} axisLine={false} tickLine={false} />
                                <Tooltip contentStyle={{ fontSize: 12, border: "0.5px solid rgba(0,0,0,0.12)", borderRadius: 8 }} />
                                <Bar dataKey="total" name="JSA" fill={TEAL[2]} radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </Card>
                </>
            )}

            {/* ── Trend Charts ── */}
            {(trends.shiftTrend || []).length > 0 && (
                <>
                    <SectionTitle>Tren Laporan Shift</SectionTitle>
                    <Card style={{ marginBottom: "1.5rem" }}>
                        <ResponsiveContainer width="100%" height={220}>
                            <LineChart data={trends.shiftTrend}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
                                <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#888780" }} axisLine={false} tickLine={false} />
                                <YAxis tick={{ fontSize: 11, fill: "#888780" }} axisLine={false} tickLine={false} />
                                <Tooltip contentStyle={{ fontSize: 12, border: "0.5px solid rgba(0,0,0,0.12)", borderRadius: 8 }} />
                                <Line type="monotone" dataKey="total" stroke={BLUE[2]} strokeWidth={2} dot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    </Card>
                </>
            )}

            {(trends.apelTrend || []).length > 0 && (
                <>
                    <SectionTitle>Tren Laporan Apel</SectionTitle>
                    <Card style={{ marginBottom: "1.5rem" }}>
                        <ResponsiveContainer width="100%" height={220}>
                            <LineChart data={trends.apelTrend}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
                                <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#888780" }} axisLine={false} tickLine={false} />
                                <YAxis tick={{ fontSize: 11, fill: "#888780" }} axisLine={false} tickLine={false} />
                                <Tooltip contentStyle={{ fontSize: 12, border: "0.5px solid rgba(0,0,0,0.12)", borderRadius: 8 }} />
                                <Line type="monotone" dataKey="total" stroke={TEAL[2]} strokeWidth={2} dot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    </Card>
                </>
            )}

            {(trends.jointPatrolTrend || []).length > 0 && (
                <>
                    <SectionTitle>Tren Patroli Gabungan</SectionTitle>
                    <Card style={{ marginBottom: "1.5rem" }}>
                        <ResponsiveContainer width="100%" height={220}>
                            <LineChart data={trends.jointPatrolTrend}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
                                <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#888780" }} axisLine={false} tickLine={false} />
                                <YAxis tick={{ fontSize: 11, fill: "#888780" }} axisLine={false} tickLine={false} />
                                <Tooltip contentStyle={{ fontSize: 12, border: "0.5px solid rgba(0,0,0,0.12)", borderRadius: 8 }} />
                                <Line type="monotone" dataKey="total" stroke={GREEN[2]} strokeWidth={2} dot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    </Card>
                </>
            )}

            {(trends.dailyReportTrend || []).length > 0 && (
                <>
                    <SectionTitle>Tren Laporan Harian</SectionTitle>
                    <Card style={{ marginBottom: "1.5rem" }}>
                        <ResponsiveContainer width="100%" height={220}>
                            <LineChart data={trends.dailyReportTrend}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
                                <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#888780" }} axisLine={false} tickLine={false} />
                                <YAxis tick={{ fontSize: 11, fill: "#888780" }} axisLine={false} tickLine={false} />
                                <Tooltip contentStyle={{ fontSize: 12, border: "0.5px solid rgba(0,0,0,0.12)", borderRadius: 8 }} />
                                <Line type="monotone" dataKey="total" stroke={PURPLE[2]} strokeWidth={2} dot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    </Card>
                </>
            )}

            {/* ── Analitik Pengguna ── */}
            <SectionTitle>Analitik Pengguna</SectionTitle>
            <div style={{ ...row(12), marginBottom: "1.5rem" }}>
                <Card title="Lokasi Kerja">
                    {userByLocation.map((u, i) => (
                        <BarRow
                            key={u.work_location || i}
                            label={u.work_location || "Tidak diketahui"}
                            value={u.total}
                            max={Math.max(...userByLocation.map((x) => x.total), 1)}
                            color={PIE_COLORS[i % PIE_COLORS.length]}
                        />
                    ))}
                </Card>
                <Card title="Role Pengguna">
                    {userByRole.map((u, i) => (
                        <BarRow
                            key={u.role || i}
                            label={u.role || "Tanpa role"}
                            value={u.total}
                            max={Math.max(...userByRole.map((x) => x.total), 1)}
                            color={PIE_COLORS[i % PIE_COLORS.length]}
                        />
                    ))}
                </Card>
            </div>

            {/* ── Top Pengguna Aktif (dengan filter bulan & tipe) ── */}
            <SectionTitle>Top Pengguna Aktif</SectionTitle>
            <Card style={{ marginBottom: "1.5rem" }}>

                {/* Controls: tab + filter bulan/tahun */}
                <div style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    flexWrap: "wrap", gap: 8, marginBottom: 12,
                }}>
                    {/* Tab tipe */}
                    <div style={{ display: "flex", background: "#f1efe8", borderRadius: 8, padding: 3, gap: 2 }}>
                        {[
                            { key: "shift", label: "Shift" },
                            { key: "apel", label: "Apel" },
                            { key: "patrol", label: "Patroli" },
                        ].map((t) => (
                            <button
                                key={t.key}
                                onClick={() => setTopUserType(t.key)}
                                style={{
                                    padding: "5px 16px", fontSize: 12, borderRadius: 6, border: "none",
                                    cursor: "pointer",
                                    background: topUserType === t.key ? "#fff" : "transparent",
                                    color: topUserType === t.key ? "#2C2C2A" : "#888780",
                                    fontWeight: topUserType === t.key ? 500 : 400,
                                    boxShadow: topUserType === t.key ? "0 0.5px 2px rgba(0,0,0,0.12)" : "none",
                                    transition: "all 0.15s",
                                }}
                            >
                                {t.label}
                            </button>
                        ))}
                    </div>

                    {/* Filter bulan & tahun */}
                    <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                        <select
                            value={topUserMonth}
                            onChange={(e) => {
                                setTopUserMonth(e.target.value);
                                setTopUserPage(1);
                            }}
                            style={{
                                fontSize: 12,
                                padding: "5px 8px",
                                borderRadius: 6,
                                border: "0.5px solid rgba(0,0,0,0.15)",
                                background: "#f8f8f6",
                                color: "#2C2C2A",
                                cursor: "pointer",
                            }}
                        >
                            <option value="all">Semua Bulan</option>

                            {MONTHS_ID.map((m, i) => (
                                <option key={i + 1} value={String(i + 1)}>
                                    {m}
                                </option>
                            ))}
                        </select>

                        <select
                            value={topUserYear}
                            onChange={(e) => {
                                setTopUserYear(e.target.value);
                                setTopUserPage(1);
                            }}
                            style={{
                                fontSize: 12,
                                padding: "5px 8px",
                                borderRadius: 6,
                                border: "0.5px solid rgba(0,0,0,0.15)",
                                background: "#f8f8f6",
                                color: "#2C2C2A",
                                cursor: "pointer",
                            }}
                        >
                            <option value="all">Semua Tahun</option>

                            {[2025, 2026].map((y) => (
                                <option key={y} value={String(y)}>
                                    {y}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Stat summary */}
                {topUserData && (
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0,1fr))", gap: 8, marginBottom: 12 }}>
                        {[
                            { label: "Total pengguna", value: topUserData.totalUsers },
                            { label: "Tertinggi", value: topUserData.users?.[0]?.total ?? 0 },
                            {
                                label: "Rata-rata",
                                value: topUserData.users?.length
                                    ? Math.round(topUserData.users.reduce((a, b) => a + parseInt(b.total), 0) / topUserData.users.length)
                                    : 0,
                            },
                            {
                                label: "Total entri",
                                value: topUserData.users?.reduce((a, b) => a + parseInt(b.total), 0) ?? 0,
                            },
                        ].map((s) => (
                            <div key={s.label} style={{ background: "#f8f8f6", borderRadius: 8, padding: "10px 12px" }}>
                                <div style={{ fontSize: 18, fontWeight: 500, lineHeight: 1 }}>{s.value}</div>
                                <div style={{ fontSize: 11, color: "#888780", marginTop: 4 }}>{s.label}</div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Search */}
                <div style={{ position: "relative", marginBottom: 10 }}>
                    <span style={{
                        position: "absolute", left: 10, top: "50%",
                        transform: "translateY(-50%)", fontSize: 12, color: "#888780", pointerEvents: "none",
                    }}>🔍</span>
                    <input
                        type="text"
                        placeholder="Cari nama pengguna..."
                        value={topUserSearch}
                        onChange={(e) => { setTopUserSearch(e.target.value); setTopUserPage(1); }}
                        style={{
                            width: "100%", padding: "7px 12px 7px 30px", fontSize: 12,
                            borderRadius: 6, border: "0.5px solid rgba(0,0,0,0.15)",
                            background: "#f8f8f6", color: "#2C2C2A", outline: "none", boxSizing: "border-box",
                        }}
                    />
                </div>

                {/* Table */}
                {topUserLoading ? (
                    <div style={{ textAlign: "center", padding: "2rem", color: "#888780", fontSize: 13 }}>
                        Memuat data...
                    </div>
                ) : topFiltered.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "1.5rem", color: "#888780", fontSize: 13 }}>
                        Tidak ada data ditemukan
                    </div>
                ) : (
                    <>
                        {/* Table header */}
                        <div style={{
                            border: "0.5px solid rgba(0,0,0,0.08)", borderRadius: 8, overflow: "hidden", marginBottom: 10,
                        }}>
                            <div style={{
                                display: "grid", gridTemplateColumns: "36px 1fr 160px 56px",
                                gap: 8, padding: "7px 12px",
                                background: "#f8f8f6", borderBottom: "0.5px solid rgba(0,0,0,0.08)",
                                fontSize: 10, fontWeight: 500, color: "#888780",
                                textTransform: "uppercase", letterSpacing: "0.05em",
                            }}>
                                <span>#</span>
                                <span>Nama</span>
                                <span>Aktivitas</span>
                                <span style={{ textAlign: "right" }}>Total</span>
                            </div>

                            {topPaged.map((u, i) => {
                                const rank = (topUserPage - 1) * TOP_USER_PER_PAGE + i + 1;
                                const pct = Math.round((parseInt(u.total) / topMaxVal) * 100);
                                const rankIcon = rank === 1 ? "🥇" : rank === 2 ? "🥈" : rank === 3 ? "🥉" : rank;
                                const initials = u.created_by.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();

                                return (
                                    <div
                                        key={u.created_by}
                                        style={{
                                            display: "grid", gridTemplateColumns: "36px 1fr 160px 56px",
                                            gap: 8, alignItems: "center", padding: "8px 12px",
                                            borderBottom: "0.5px solid rgba(0,0,0,0.06)", fontSize: 13,
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.background = "#f8f8f6"}
                                        onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                                    >
                                        <span style={{ fontSize: 11, color: "#888780" }}>{rankIcon}</span>
                                        <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
                                            <div style={{
                                                width: 26, height: 26, borderRadius: "50%",
                                                background: "#E6F1FB", color: "#185FA5",
                                                display: "flex", alignItems: "center", justifyContent: "center",
                                                fontSize: 10, fontWeight: 500, flexShrink: 0,
                                            }}>{initials}</div>
                                            <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                                {u.created_by}
                                            </span>
                                        </div>
                                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                            <div style={{
                                                flex: 1, background: "#f1efe8", borderRadius: 3, height: 6, overflow: "hidden",
                                            }}>
                                                <div style={{
                                                    width: `${pct}%`, height: "100%",
                                                    background: topColor, borderRadius: 3, transition: "width 0.4s ease",
                                                }} />
                                            </div>
                                        </div>
                                        <span style={{ textAlign: "right", fontWeight: 500 }}>{u.total}</span>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Pagination */}
                        {topTotalPages > 1 && (
                            <div style={{
                                display: "flex", alignItems: "center", justifyContent: "space-between",
                                fontSize: 12, color: "#888780",
                            }}>
                                <span>
                                    {(topUserPage - 1) * TOP_USER_PER_PAGE + 1}–
                                    {Math.min(topUserPage * TOP_USER_PER_PAGE, topFiltered.length)} dari {topFiltered.length} pengguna
                                </span>
                                <div style={{ display: "flex", gap: 4 }}>
                                    <button
                                        disabled={topUserPage === 1}
                                        onClick={() => setTopUserPage((p) => p - 1)}
                                        style={{
                                            padding: "4px 10px", fontSize: 12, borderRadius: 6,
                                            border: "0.5px solid rgba(0,0,0,0.15)", background: "transparent",
                                            cursor: topUserPage === 1 ? "default" : "pointer",
                                            opacity: topUserPage === 1 ? 0.35 : 1, color: "#5F5E5A",
                                        }}
                                    >‹</button>

                                    {Array.from({ length: topTotalPages }, (_, idx) => idx + 1)
                                        .filter((p) => p === 1 || p === topTotalPages || Math.abs(p - topUserPage) <= 1)
                                        .reduce((acc, p, i, arr) => {
                                            if (i > 0 && p - arr[i - 1] > 1) acc.push("...");
                                            acc.push(p);
                                            return acc;
                                        }, [])
                                        .map((p, i) =>
                                            p === "..." ? (
                                                <span key={`e-${i}`} style={{ padding: "4px 2px", fontSize: 12, color: "#888780" }}>…</span>
                                            ) : (
                                                <button
                                                    key={p}
                                                    onClick={() => setTopUserPage(p)}
                                                    style={{
                                                        padding: "4px 9px", fontSize: 12, borderRadius: 6,
                                                        border: "0.5px solid rgba(0,0,0,0.15)",
                                                        background: topUserPage === p ? "#f1efe8" : "transparent",
                                                        fontWeight: topUserPage === p ? 500 : 400,
                                                        color: "#2C2C2A", cursor: "pointer",
                                                    }}
                                                >{p}</button>
                                            )
                                        )}

                                    <button
                                        disabled={topUserPage === topTotalPages}
                                        onClick={() => setTopUserPage((p) => p + 1)}
                                        style={{
                                            padding: "4px 10px", fontSize: 12, borderRadius: 6,
                                            border: "0.5px solid rgba(0,0,0,0.15)", background: "transparent",
                                            cursor: topUserPage === topTotalPages ? "default" : "pointer",
                                            opacity: topUserPage === topTotalPages ? 0.35 : 1, color: "#5F5E5A",
                                        }}
                                    >›</button>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </Card>

            {/* ── Pie Charts ── */}
            {/* <SectionTitle>Distribusi Pie</SectionTitle>
            <div style={{ ...row(12), marginBottom: "1.5rem" }}>
                <Card title="Penempatan Lokasi Kerja">
                    <ResponsiveContainer width="100%" height={220}>
                        <PieChart>
                            <Pie
                                data={userByLocation.map((u) => ({ name: u.work_location || "Tidak diketahui", value: u.total }))}
                                dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={75}
                                label={({ name, percent }) => `${name} ${Math.round(percent * 100)}%`} labelLine={false}
                            >
                                {userByLocation.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                            </Pie>
                            <Tooltip formatter={(v) => [v, "Pengguna"]} />
                        </PieChart>
                    </ResponsiveContainer>
                </Card>
            </div> */}

        </div>
    );
}

export default SuperHome;