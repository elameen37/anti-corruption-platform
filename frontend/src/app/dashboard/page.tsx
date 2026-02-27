"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import './Dashboard.css';

const API_BASE = 'http://localhost:3001/api/v1';

interface AuditLog {
    id: string;
    time: string;
    event: string;
    actor: string;
    severity: string;
}

interface ActiveCase {
    id: string;
    title: string;
    status: string;
    priority: string;
    assignedAgency: string;
    lastUpdate: string;
}

interface AgencyMetric {
    agency: string;
    casesResolved: number;
    activeInvestigations: number;
    complianceScore: number;
}

interface DashboardData {
    activeIntercepts: number;
    pendingNominations: number;
    systemIntegrity: number;
    activeSessions: number;
    threatLevel: string;
    recentAuditLogs: AuditLog[];
    activeCases: ActiveCase[];
    agencyMetrics: AgencyMetric[];
}

export default function DashboardPage() {
    const router = useRouter();
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('sice_token');
        if (!token) {
            router.push('/login');
            return;
        }

        const fetchDashboard = async () => {
            try {
                const res = await fetch(`${API_BASE}/intelligence/dashboard`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (res.status === 401) {
                    localStorage.removeItem('sice_token');
                    localStorage.removeItem('sice_user');
                    router.push('/login');
                    return;
                }

                if (!res.ok) {
                    throw new Error('Failed to retrieve intelligence data.');
                }

                const result = await res.json();
                setData(result.data);
            } catch (err: unknown) {
                const message = err instanceof Error ? err.message : 'Failed to load dashboard data.';
                setError(message);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboard();
    }, [router]);

    if (loading) {
        return (
            <div className="dashboard-container">
                <div className="loading-state">
                    <div className="loading-spinner"></div>
                    <p>Decrypting intelligence feed...</p>
                    <span className="loading-sub">Establishing secure data pipeline</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="dashboard-container">
                <div className="error-state">
                    <span className="error-icon-large">⚠</span>
                    <h2>Intelligence Feed Disrupted</h2>
                    <p>{error}</p>
                    <button className="btn-retry" onClick={() => window.location.reload()}>
                        Re-establish Connection
                    </button>
                </div>
            </div>
        );
    }

    if (!data) return null;

    const getSeverityClass = (severity: string) => {
        switch (severity) {
            case 'CRITICAL': return 'severity-critical';
            case 'WARNING': return 'severity-warning';
            default: return 'severity-info';
        }
    };

    const getPriorityClass = (priority: string) => {
        switch (priority) {
            case 'CRITICAL': return 'priority-critical';
            case 'HIGH': return 'priority-high';
            default: return 'priority-medium';
        }
    };

    const getStatusLabel = (status: string) => {
        return status.replace(/_/g, ' ');
    };

    const formatTime = (isoString: string) => {
        return isoString.split('T')[1]?.substring(0, 8) || isoString;
    };

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <div>
                    <h1>Executive Intelligence Overview</h1>
                    <p className="subtitle">Real-time threat monitoring and structured intelligence</p>
                </div>
                <div className="threat-badge">
                    <span className="pulse-dot"></span>
                    THREATCON: {data.threatLevel}
                </div>
            </header>

            <div className="metrics-grid">
                <div className="metric-card danger">
                    <h3>Active Intercepts</h3>
                    <div className="metric-value">{data.activeIntercepts}</div>
                    <div className="metric-footer">Monitored in real-time</div>
                </div>
                <div className="metric-card warning">
                    <h3>Pending Nominations</h3>
                    <div className="metric-value">{data.pendingNominations}</div>
                    <div className="metric-footer">Across all agencies</div>
                </div>
                <div className="metric-card success">
                    <h3>System Integrity</h3>
                    <div className="metric-value">{data.systemIntegrity}%</div>
                    <div className="metric-footer">0 anomalies detected</div>
                </div>
                <div className="metric-card neutral">
                    <h3>Active Sessions</h3>
                    <div className="metric-value">{data.activeSessions}</div>
                    <div className="metric-footer">Hardware keys verified</div>
                </div>
            </div>

            <div className="dashboard-content">
                <div className="content-panel timeline-panel">
                    <div className="panel-header">
                        <h2>Immutable Audit Ledger</h2>
                        <span className="panel-badge">{data.recentAuditLogs.length} entries</span>
                    </div>
                    <ul className="audit-timeline">
                        {data.recentAuditLogs.map((log) => (
                            <li key={log.id}>
                                <span className="time">{formatTime(log.time)}</span>
                                <span className="event">{log.event}</span>
                                <span className={`severity-badge ${getSeverityClass(log.severity)}`}>
                                    {log.severity}
                                </span>
                                <span className="actor">{log.actor}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="content-panel cases-panel">
                    <div className="panel-header">
                        <h2>Active Cases</h2>
                        <span className="panel-badge">{data.activeCases.length} cases</span>
                    </div>
                    <div className="cases-list">
                        {data.activeCases.map((c) => (
                            <div key={c.id} className="case-item">
                                <div className="case-header">
                                    <span className="case-id">{c.id}</span>
                                    <span className={`priority-badge ${getPriorityClass(c.priority)}`}>
                                        {c.priority}
                                    </span>
                                </div>
                                <div className="case-title">{c.title}</div>
                                <div className="case-meta">
                                    <span className="case-status">{getStatusLabel(c.status)}</span>
                                    <span className="case-agency">{c.assignedAgency}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="agency-metrics-section">
                <div className="content-panel">
                    <div className="panel-header">
                        <h2>Agency Performance Matrix</h2>
                    </div>
                    <table className="metrics-table">
                        <thead>
                            <tr>
                                <th>Agency</th>
                                <th>Cases Resolved</th>
                                <th>Active Investigations</th>
                                <th>Compliance Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.agencyMetrics.map((m) => (
                                <tr key={m.agency}>
                                    <td className="agency-name">{m.agency}</td>
                                    <td className="metric-cell">{m.casesResolved}</td>
                                    <td className="metric-cell">{m.activeInvestigations}</td>
                                    <td>
                                        <div className="compliance-bar-container">
                                            <div
                                                className="compliance-bar"
                                                style={{ width: `${m.complianceScore}%` }}
                                            ></div>
                                            <span className="compliance-value">{m.complianceScore}%</span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
