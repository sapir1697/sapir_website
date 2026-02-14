import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import './Hero.css';

const Hero = () => {
    return (
        <header id="home" className="hero">
            <div className="container hero-container">
                <div className="hero-text-side">
                    <motion.h1
                        className="hero-title"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        DESIGNS <br />
                        THAT <span className="text-gradient">SPEAK</span>
                    </motion.h1>

                    <motion.p
                        className="hero-subtitle"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                    >
                        פתרונות פשוטים למחיה מתוחכמת. מאז 2010 אנחנו מגדירים מחדש את קו הרקיע של ישראל.
                    </motion.p>

                    <motion.div
                        className="hero-cta"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                    >
                        <a href="#projects" className="btn btn-primary">
                            לפרויקטים שלנו <ArrowLeft size={20} />
                        </a>
                    </motion.div>
                </div>

                <motion.div
                    className="hero-image-side"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                >
                    <img
                        src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000"
                        alt="מגדל זכוכית מודרני מביט מלמטה"
                        className="hero-img"
                    />
                </motion.div>
            </div>
        </header>
    );
};

export default Hero;
