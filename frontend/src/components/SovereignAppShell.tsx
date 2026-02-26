import React from 'react';
import ClassificationBanner from './ClassificationBanner';
import './SovereignAppShell.css';

export default function SovereignAppShell({ children }: { children: React.ReactNode }) {
    return (
        <div className="app-shell">
            <ClassificationBanner />
            <header className="app-header">
                <div className="app-logo">
                    <span className="logo-text">ICPC SICE</span>
                </div>
                <nav className="app-nav">
                    <span className="nav-item status-text">System Status: SECURE</span>
                </nav>
            </header>
            <main className="app-main">
                {children}
            </main>
        </div>
    );
}
