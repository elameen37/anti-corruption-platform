"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import './Login.css';

export default function LoginPage() {
    const router = useRouter();
    const [step, setStep] = useState<1 | 2>(1);
    const [loading, setLoading] = useState(false);

    const handleIdentitySubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate network checking environment & identity
        setTimeout(() => {
            setLoading(false);
            setStep(2);
        }, 1200);
    };

    const handleHardwareKeySimulation = () => {
        setLoading(true);
        // Simulate hardware key challenge-response
        setTimeout(() => {
            router.push('/dashboard');
        }, 1500);
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <div className="login-header">
                    <div className="seal">
                        {/* Visual representation of an institutional seal */}
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

                {step === 1 ? (
                    <form className="login-form" onSubmit={handleIdentitySubmit}>
                        <div className="form-group">
                            <label>Agency ID / Nomencalture</label>
                            <input type="text" placeholder="e.g. ICPC-INT-8902" required autoFocus />
                        </div>
                        <div className="form-group">
                            <label>Cryptographic Passphrase</label>
                            <input type="password" required />
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
