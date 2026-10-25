import React, { useState, useEffect, useRef } from 'react';
import './Index.css';

export default function Index() {
    // 1. Loading screen state (3-second timer or click to dismiss)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    // 2. Mobile navigation toggle state
    const [menuActive, setMenuActive] = useState(false);
    const navRef = useRef(null);

    const toggleMenu = () => {
        setMenuActive((prev) => !prev);
    };

    const closeMenu = () => {
        setMenuActive(false);
    };

    // Close menu when clicking outside or pressing Escape
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuActive && navRef.current && !navRef.current.contains(e.target)) {
                setMenuActive(false);
            }
        };

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                if (menuActive) setMenuActive(false);
                if (sosModalOpen) setSosModalOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [menuActive]);

    // 3. Emergency SOS Modal State
    const [sosModalOpen, setSosModalOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const showToast = (msg) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(''), 3000);
    };

    const copyToClipboard = (text, label) => {
        navigator.clipboard.writeText(text).then(
            () => showToast(`Copied ${label} (${text}) to clipboard!`),
            () => showToast(`Number: ${text}`)
        );
    };

    return (
        <div className="civicshield-app">
            {/* FLOATING SOS BUTTON ON EVERY PAGE */}
            <button
                type="button"
                className="floating-sos"
                title="Emergency SOS - Click for Immediate Help"
                onClick={() => setSosModalOpen(true)}
                aria-label="Emergency SOS"
            >
                SOS
            </button>

            {/* EMERGENCY SOS QUICK MODAL */}
            {sosModalOpen && (
                <div className="sos-modal-overlay" onClick={() => setSosModalOpen(false)}>
                    <div className="sos-modal-content" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
                        <div className="sos-modal-header">
                            <span className="sos-icon-badge">!</span>
                            <h3>EMERGENCY HELPLINES</h3>
                            <button
                                type="button"
                                className="sos-modal-close"
                                onClick={() => setSosModalOpen(false)}
                                aria-label="Close Emergency Dialog"
                            >
                                &times;
                            </button>
                        </div>
                        <p className="sos-modal-desc">
                            If you or someone around you is in immediate life-threatening danger, dial directly:
                        </p>
                        <div className="sos-quick-grid">
                            <div className="sos-quick-item featured">
                                <div>
                                    <strong>Police Emergency</strong>
                                    <span>Dial 100 / 911</span>
                                </div>
                                <div className="sos-quick-actions">
                                    <a href="tel:100" className="btn-call-direct">Call 100</a>
                                    <button
                                        type="button"
                                        className="btn-copy-num"
                                        onClick={() => copyToClipboard('100', 'Police Number')}
                                        title="Copy number"
                                    >
                                        Copy
                                    </button>
                                </div>
                            </div>

                            <div className="sos-quick-item">
                                <div>
                                    <strong>Ambulance</strong>
                                    <span>Dial 102</span>
                                </div>
                                <div className="sos-quick-actions">
                                    <a href="tel:102" className="btn-call-direct">Call 102</a>
                                    <button
                                        type="button"
                                        className="btn-copy-num"
                                        onClick={() => copyToClipboard('102', 'Ambulance Number')}
                                        title="Copy number"
                                    >
                                        Copy
                                    </button>
                                </div>
                            </div>

                            <div className="sos-quick-item">
                                <div>
                                    <strong>Women Helpline</strong>
                                    <span>Dial 1091</span>
                                </div>
                                <div className="sos-quick-actions">
                                    <a href="tel:1091" className="btn-call-direct">Call 1091</a>
                                    <button
                                        type="button"
                                        className="btn-copy-num"
                                        onClick={() => copyToClipboard('1091', 'Women Helpline')}
                                        title="Copy number"
                                    >
                                        Copy
                                    </button>
                                </div>
                            </div>

                            <div className="sos-quick-item">
                                <div>
                                    <strong>Unified National Helpline</strong>
                                    <span>Dial 112</span>
                                </div>
                                <div className="sos-quick-actions">
                                    <a href="tel:112" className="btn-call-direct">Call 112</a>
                                    <button
                                        type="button"
                                        className="btn-copy-num"
                                        onClick={() => copyToClipboard('112', 'National Helpline')}
                                        title="Copy number"
                                    >
                                        Copy
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="sos-modal-footer">
                            <a href="emergency.html" className="btn-view-all-emergency" onClick={closeMenu}>
                                View All Emergency Contacts &rarr;
                            </a>
                        </div>
                    </div>
                </div>
            )}

            {/* TOAST FEEDBACK NOTIFICATION */}
            {toastMessage && (
                <div className="civic-toast" role="alert">
                    <span>{toastMessage}</span>
                </div>
            )}

            {/* 1. LOADING SCREEN WITH VISIBLE BACKGROUND IMAGE */}
            {loading && (
                <div
                    id="loading-screen"
                    onClick={() => setLoading(false)}
                    style={{ cursor: 'pointer' }}
                    title="Click to dismiss loader"
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') setLoading(false);
                    }}
                >
                    <div className="loader"></div>
                    <p className="loader-text">
                        Loading <span style={{ color: '#ffd000' }}>CivicShield</span>...
                    </p>
                    <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '12px', marginTop: '10px' }}>
                        Click anywhere to open immediately
                    </span>
                </div>
            )}

            {/* 2. NAVIGATION BAR */}
            <header className="navbar" ref={navRef}>
                <a href="index.html" className="logo" onClick={closeMenu}>
                    <span className="logo-box">CS</span>
                    CivicShield
                </a>

                {/* Hamburger button for mobile screens */}
                <button
                    className="hamburger"
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                    aria-expanded={menuActive}
                    type="button"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                {/* Menu Links */}
                <nav className={`nav-links ${menuActive ? 'active' : ''}`} id="nav-links">
                    <a href="index.html" className="active" onClick={closeMenu}>Home</a>
                    <a href="report.html" onClick={closeMenu}>Report</a>
                    <a href="track.html" onClick={closeMenu}>Track</a>
                    <a href="safety-tips.html" onClick={closeMenu}>Safety Tips</a>
                    <a href="nearby-services.html" onClick={closeMenu}>Nearby Services</a>
                    <a href="emergency.html" onClick={closeMenu}>Emergency</a>
                    <a href="about.html" onClick={closeMenu}>About</a>
                </nav>
            </header>

            {/* 3. HOMEPAGE / HERO SECTION WITH CRIME BACKGROUND & LOOPING VIDEO */}
            <section className="hero">
                {/* Background Video for Hero Section */}
                <video className="hero-bg-video" autoPlay muted loop playsInline poster="/images/crime-loading-bg.jpg">
                    <source src="/images/crime-hero-bg.webm" type="video/webm" />
                </video>
                <div className="hero-overlay"></div>

                <div className="hero-container">
                    {/* Left Text Content */}
                    <div className="hero-text">
                        <span className="badge">Community Safety Network</span>
                        <h1>Crime Reporting Made Easy</h1>
                        <p>
                            Report incidents quickly, protect your community, and track the status of your reports in real-time. CivicShield provides a simple and secure way to report crimes.
                        </p>
                        <div className="hero-buttons">
                            <a href="report.html" className="btn-red">Report Crime &rarr;</a>
                            <a href="track.html" className="btn-outline">Track Report</a>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. FEATURES & COMMUNITY SAFETY CARDS (4 CARDS) */}
            <section className="features-section" id="features">
                <div className="section-heading">
                    <span className="badge">Platform Highlights</span>
                    <h2>Our Core Safety Features</h2>
                    <p>Simple and effective tools built to protect communities and accelerate incident response.</p>
                </div>

                <div className="features-grid">
                    {/* Card 1: Simple Reporting */}
                    <div className="feature-box featured">
                        <div className="feature-icon">!</div>
                        <h3>Simple Reporting</h3>
                        <p>
                            Easily submit incident details through an intuitive form. Provide the crime type, location, date, and description in just a few clicks.
                        </p>
                        <a href="report.html">Report Incident &rarr;</a>
                    </div>

                    {/* Card 2: Easy Tracking */}
                    <div className="feature-box">
                        <div className="feature-icon">#</div>
                        <h3>Easy Tracking</h3>
                        <p>
                            Stay updated on your complaint. Enter your unique report reference ID at any time to monitor the progress of your investigation.
                        </p>
                        <a href="track.html">Track Progress &rarr;</a>
                    </div>

                    {/* Card 3: Emergency Support */}
                    <div className="feature-box featured">
                        <div className="feature-icon">+</div>
                        <h3>Emergency Support</h3>
                        <p>
                            Get instant access to vital emergency contact numbers, including Police, Ambulance, and Women Safety Helplines when urgent help is needed.
                        </p>
                        <a href="emergency.html">Get Emergency Help &rarr;</a>
                    </div>

                    {/* Card 4: Safety Tips & Guidelines */}
                    <div className="feature-box">
                        <div className="feature-icon">&#128737;</div>
                        <h3>Safety Tips &amp; Guides</h3>
                        <p>
                            Learn best practices for street awareness, digital scam prevention, home deadbolt security, and family emergency preparedness.
                        </p>
                        <a href="safety-tips.html">Read Safety Guides &rarr;</a>
                    </div>
                </div>
            </section>

            {/* 5. ABOUT SECTION */}
            <section className="about-section" id="about">
                <div className="about-box">
                    <h3>About CivicShield</h3>
                    <p>
                        CivicShield is a web-based Crime Reporting Platform designed to help citizens report incidents, track complaints, access emergency assistance, and stay informed through safety tips. The platform provides a simple and responsive interface with features such as Report Crime, Track Report, Emergency SOS, and Nearby Services.
                    </p>
                    <p>
                        Developed using HTML, CSS, and JavaScript, CivicShield aims to demonstrate how technology can make crime reporting more accessible, transparent, and user-friendly while promoting public safety and awareness.
                    </p>
                </div>
            </section>

            {/* 6. EXPANDED SIMPLE FOOTER */}
            <footer>
                <div className="footer-grid">
                    {/* Col 1: Brand & Desc */}
                    <div className="footer-col">
                        <h4>CivicShield</h4>
                        <p>
                            A digital community safety and crime reporting portal concept designed as a college academic demonstration project.
                        </p>
                    </div>

                    {/* Col 2: Navigation Links */}
                    <div className="footer-col">
                        <h4>Quick Navigation</h4>
                        <ul>
                            <li><a href="index.html">Home</a></li>
                            <li><a href="report.html">Report Incident</a></li>
                            <li><a href="track.html">Track Complaint</a></li>
                            <li><a href="safety-tips.html">Safety Tips</a></li>
                            <li><a href="nearby-services.html">Nearby Services</a></li>
                            <li><a href="emergency.html">Emergency Helplines</a></li>
                            <li><a href="about.html">About Project</a></li>
                        </ul>
                    </div>

                    {/* Col 3: Direct Helplines */}
                    <div className="footer-col">
                        <h4>Emergency Numbers</h4>
                        <ul>
                            <li><a href="tel:100">Police: 100 / 911</a></li>
                            <li><a href="tel:102">Ambulance: 102</a></li>
                            <li><a href="tel:1091">Women Helpline: 1091</a></li>
                            <li><a href="tel:112">National Helpline: 112</a></li>
                        </ul>
                    </div>

                    {/* Col 4: Project Disclaimer */}
                    <div className="footer-col">
                        <h4>Safety Notice</h4>
                        <p>
                            For life-threatening situations, crimes in progress, or urgent ambulance needs, always dial official emergency services immediately.
                        </p>
                    </div>
                </div>

                <p className="copyright">
                    &copy; 2026 CivicShield | Student Project. All rights reserved.
                </p>
            </footer>
        </div>
    );
}
