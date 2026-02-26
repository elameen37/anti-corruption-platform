import React from 'react';
import './Dashboard.css';

export default function DashboardPage() {
    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>Executive Intelligence Overview</h1>
                <p className="subtitle">Real-time threat monitoring and structured intelligence</p>
            </header>

            <div className="metrics-grid">
                <div className="metric-card danger">
                    <h3>Active Intercepts</h3>
                    <div className="metric-value">12</div>
                    <div className="metric-footer">+2 in the last hour</div>
                </div>
                <div className="metric-card warning">
                    <h3>Pending Nominations</h3>
                    <div className="metric-value">47</div>
                    <div className="metric-footer">Across 8 agencies</div>
                </div>
                <div className="metric-card success">
                    <h3>System Integrity</h3>
                    <div className="metric-value">100%</div>
                    <div className="metric-footer">0 anomalies detected</div>
                </div>
                <div className="metric-card neutral">
                    <h3>Active Sessions</h3>
                    <div className="metric-value">342</div>
                    <div className="metric-footer">Hardware keys verified</div>
                </div>
            </div>

            <div className="dashboard-content">
                <div className="content-panel timeline-panel">
                    <div className="panel-header">
                        <h2>Immutable Audit Ledger</h2>
                    </div>
                    <ul className="audit-timeline">
                        <li>
                            <span className="time">10:42:01Z</span>
                            <span className="event">OIDC Token Exchanged via hardware-key (YubiKey 5 NFC)</span>
                            <span className="actor">ACTOR: 9812-B</span>
                        </li>
                        <li>
                            <span className="time">10:38:15Z</span>
                            <span className="event">Vault Access Requested: Dossier [CLASSIFIED]</span>
                            <span className="actor">ACTOR: 4410-X</span>
                        </li>
                        <li>
                            <span className="time">10:15:33Z</span>
                            <span className="event">Failed auth attempt from UNKNOWN origin (Sinkholed by BGP)</span>
                            <span className="actor">IP: REDACTED</span>
                        </li>
                    </ul>
                </div>

                <div className="content-panel comms-panel">
                    <div className="panel-header">
                        <h2>Agency Communications (E2EE)</h2>
                    </div>
                    <div className="comms-placeholder">
                        <div className="lock-icon">🔒</div>
                        <p>End-to-End Encrypted channel active. Messaging requires manual PKI handshake.</p>
                        <button className="btn-secondary">Initialize Handshake</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
