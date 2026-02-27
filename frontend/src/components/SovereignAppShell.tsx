"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ClassificationBanner from './ClassificationBanner';
import './SovereignAppShell.css';

interface UserProfile {
    id: string;
    fullName: string;
    role: string;
    clearanceLevel: string;
    agency: string;
    division: string;
}

export default function SovereignAppShell({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [user, setUser] = useState<UserProfile | null>(null);
    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        const userData = localStorage.getItem('sice_user');
        if (userData) {
            try {
                setUser(JSON.parse(userData));
            } catch {
                // invalid user data
            }
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('sice_token');
        localStorage.removeItem('sice_user');
        router.push('/login');
    };

    return (
        <div className="app-shell">
            <ClassificationBanner />
            <header className="app-header">
                <div className="app-logo">
                    <span className="logo-text">ICPC SICE</span>
                </div>
                <nav className="app-nav">
                    <span className="nav-item status-text">System Status: SECURE</span>
                    {user && (
                        <div className="user-menu-wrapper">
                            <button
                                className="user-menu-trigger"
                                onClick={() => setShowMenu(!showMenu)}
                            >
                                <div className="user-avatar">
                                    {user.fullName.charAt(0)}
                                </div>
                                <span className="user-name">{user.fullName}</span>
                                <span className="user-clearance">{user.clearanceLevel}</span>
                            </button>
                            {showMenu && (
                                <div className="user-dropdown">
                                    <div className="dropdown-header">
                                        <div className="dropdown-name">{user.fullName}</div>
                                        <div className="dropdown-role">{user.role.replace(/_/g, ' ')}</div>
                                        <div className="dropdown-division">{user.division}</div>
                                    </div>
                                    <div className="dropdown-divider"></div>
                                    <button className="dropdown-item logout-btn" onClick={handleLogout}>
                                        <span>⏻</span> Terminate Session
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </nav>
            </header>
            <main className="app-main">
                {children}
            </main>
        </div>
    );
}
