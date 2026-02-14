import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Facebook, Instagram, Linkedin } from 'lucide-react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'אודות', href: '#about' },
        { name: 'פרויקטים', href: '#projects' },
        { name: 'צור קשר', href: '#contact' },
    ];

    const handleNavClick = (e, href) => {
        e.preventDefault();
        setIsOpen(false);

        const targetId = href.replace('#', '');

        // If we're already on that hash, manually scroll because navigate might not trigger
        if (location.pathname === '/' && location.hash === href) {
            const element = document.getElementById(targetId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            // Otherwise let navigate + ScrollToHash handle it
            navigate(`/${href}`);
        }
    };

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="container nav-container">
                <Link to="/" className="logo-link">
                    <img src="/logo.svg" alt="ספיר טל" className="nav-logo" />
                </Link>

                {/* Desktop Menu */}
                <div className="desktop-menu">
                    <ul className="nav-list">
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <a
                                    href={link.href}
                                    className="nav-link"
                                    onClick={(e) => handleNavClick(e, link.href)}
                                >
                                    {link.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <a href="tel:031234567" className="nav-phone">
                        03-1234567 <Phone size={18} />
                    </a>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="mobile-toggle"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Mobile Menu Dropdown */}
                <AnimatePresence>
                    {isOpen && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="mobile-menu-overlay"
                                onClick={() => setIsOpen(false)}
                            />
                            <motion.div
                                initial={{ x: '100%' }}
                                animate={{ x: 0 }}
                                exit={{ x: '100%' }}
                                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                                className="mobile-menu"
                            >
                                <ul>
                                    {navLinks.map((link, index) => (
                                        <motion.li
                                            key={link.name}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.1 * index }}
                                        >
                                            <a
                                                href={link.href}
                                                className="mobile-link"
                                                onClick={(e) => handleNavClick(e, link.href)}
                                            >
                                                {link.name}
                                            </a>
                                        </motion.li>
                                    ))}
                                </ul>

                                <div className="mobile-contact-info">
                                    <a href="tel:031234567" className="nav-phone">
                                        03-1234567 <Phone size={20} />
                                    </a>
                                    <div className="mobile-socials">
                                        <a href="#" className="social-icon-link"><Facebook size={20} /></a>
                                        <a href="#" className="social-icon-link"><Instagram size={20} /></a>
                                        <a href="#" className="social-icon-link"><Linkedin size={20} /></a>
                                    </div>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
};

export default Navbar;
