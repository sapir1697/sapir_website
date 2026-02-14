import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { ProjectsProvider } from './context/ProjectsContext';
import Login from './components/Admin/Login';
import AdminDashboard from './components/Admin/AdminDashboard';

import { useNavigate, useLocation } from 'react-router-dom';
import ProjectDetails from './components/ProjectDetails';
import WhatsAppButton from './components/WhatsAppButton';
import Accessibility from './components/Accessibility';
import CookieConsent from './components/CookieConsent';
import PrivacyPolicy from './components/PrivacyPolicy';
import AccessibilityStatement from './components/AccessibilityStatement';

// ScrollToHash component to handle #hash navigation across pages
const ScrollToHash = () => {
    const { hash, pathname } = useLocation();

    React.useEffect(() => {
        if (hash) {
            const id = hash.replace('#', '');
            const element = document.getElementById(id);
            if (element) {
                // Wait for any potential layout shifts or page transitions
                const timer = setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
                return () => clearTimeout(timer);
            }
        } else if (pathname === '/') {
            // Only scroll to top if we are truly at "/" without a hash
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [hash, pathname]);

    return null;
};

function MainSite() {
    return (
        <>
            <Navbar />
            <Hero />
            <About />
            <Projects />
            <Contact />
            <Footer />
        </>
    );
}

function App() {
    return (
        <ProjectsProvider>
            <Router>
                <ScrollToHash />
                <div className="app" dir="rtl">
                    <div className="accessibility-content-layer">
                        <Routes>
                            <Route path="/" element={<MainSite />} />
                            <Route path="/project/:id" element={<ProjectDetails />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/admin/dashboard" element={<AdminDashboard />} />
                            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                            <Route path="/accessibility-statement" element={<AccessibilityStatement />} />
                        </Routes>
                        <WhatsAppButton />
                    </div>
                    <Accessibility />
                    <CookieConsent />
                </div>
            </Router>
        </ProjectsProvider>
    );
}

export default App;
