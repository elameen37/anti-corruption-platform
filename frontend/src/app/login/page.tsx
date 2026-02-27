"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import './Login.css';

const API_BASE = 'http://localhost:3001/api/v1';

export default function LoginPage() {
    const router = useRouter();
    const [step, setStep] = useState<1 | 2>(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [agencyId, setAgencyId] = useState('');
    const [passphrase, setPassphrase] = useState('');

    const handleIdentitySubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        // Simulate environment verification before MFA step
        setTimeout(() => {
            setLoading(false);
            setStep(2);
        }, 1200);
    };

    const handleHardwareKeySimulation = async () => {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(`${API_BASE}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ agencyId, passphrase }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Authentication failed.');
            }

            // Store auth data
            localStorage.setItem('sice_token', data.access_token);
            localStorage.setItem('sice_user', JSON.stringify(data.user));

            // Redirect to dashboard
            router.push('/dashboard');
        } catch (err: unknown) {
            setLoading(false);
            const message = err instanceof Error ? err.message : 'Authentication failed. Please verify your credentials.';
            setError(message);
            setStep(1);
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <div className="login-header">
                    <div className="seal">
                        <svg viewBox="0 0 100 100" fill="none" stroke="var(--gold)" strokeWidth="4">
                            <circle cx="50" cy="50" r="45" />
                            <path d="M50 20 L80 80 L20 80 Z" />
                        </svg>
                    </div>
                    <h1>ICPC Sovereign Gateway</h1>
                    <p className="subtitle">Secure Inter-Agency Collaboration Ecosystem</p>
                    <div className="threat-level">
                        <span className="dot"></span> THREATCON: ELEVATED
                    </div>
                </div>

                {error && (
                    <div className="error-banner">
                        <span className="error-icon">⚠</span>
                        <span>{error}</span>
                    </div>
                )}

                {step === 1 ? (
                    <form className="login-form" onSubmit={handleIdentitySubmit}>
                        <div className="form-group">
                            <label>Agency ID / Nomenclature</label>
                            <input
                                type="text"
                                placeholder="e.g. ICPC-INT-8902"
                                required
                                autoFocus
                                value={agencyId}
                                onChange={(e) => setAgencyId(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Cryptographic Passphrase</label>
                            <input
                                type="password"
                                required
                                value={passphrase}
                                onChange={(e) => setPassphrase(e.target.value)}
                            />
                        </div>
                        <button type="submit" disabled={loading} className="btn-primary">
                            {loading ? 'Verifying Identity...' : 'Initialize Secure Session'}
                        </button>
                    </form>
                ) : (
                    <div className="mfa-section">
                        <p className="mfa-instructions">Identity confirmed. Please insert your FIDO2 Hardware Key and tap the sensor to complete cryptographic binding.</p>
                        <button
                            onClick={handleHardwareKeySimulation}
                            disabled={loading}
                            className="btn-mfa"
                        >
                            {loading ? 'Authenticating...' : 'Simulate YubiKey Tap'}
                        </button>
                    </div>
                )}

                <div className="login-footer">
                    <p>
                        UNAUTHORIZED ACCESS IS STRICTLY PROHIBITED. <br />
                        All cryptographic handshakes and device fingerprints are logged to an immutable WORM ledger.
                    </p>
                </div>
            </div>
        </div>
    );
}
