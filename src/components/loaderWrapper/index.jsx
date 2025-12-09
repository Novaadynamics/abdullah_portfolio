"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from '../../../public/background/logo.png'
import Image from "next/image";

export default function LeaderWrapper({ children }) {
    const [progress, setProgress] = useState(0);
    const [showLoader, setShowLoader] = useState(true);
    const [showStartBtn, setShowStartBtn] = useState(false);

    useEffect(() => {
        // Check if loader was already shown
        const hasSeen = localStorage.getItem("loaderSeen");
        const fromSameSite =
            document.referrer.includes(window.location.hostname);

        if (hasSeen && fromSameSite) {
            setShowLoader(false);
            return;
        }

        // Start progress animation
        let interval = setInterval(() => {
            setProgress((p) => {
                if (p >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setShowStartBtn(true), 300);
                    return 100;
                }
                return p + 2; // 5 seconds = 100/2 * 100ms
            });
        }, 100);

        return () => clearInterval(interval);
    }, []);

    const handleStart = () => {
        localStorage.setItem("loaderSeen", "true");
        setShowLoader(false);
    };

    return (
        <>
            <AnimatePresence>
                {showLoader && (
                    <motion.div
                        className="fixed inset-0 bg-black flex flex-col items-center justify-center z-[9999]"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* Circular progress */}
                        <div className="relative w-44 h-44 flex items-center justify-center">
                            {/* animated progress circle */}
                            {!showStartBtn && <svg className="absolute w-full h-full rotate-[-90deg]">
                                <circle
                                    cx="50%"
                                    cy="50%"
                                    r="80"
                                    stroke="#ff6d05"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    fill="none"
                                    strokeDasharray={2 * Math.PI * 80}
                                    strokeDashoffset={
                                        2 * Math.PI * 80 * (1 - progress / 100)
                                    }
                                    style={{ transition: "stroke-dashoffset 0.1s linear" }}
                                />
                            </svg>}

                            {/* LOGO */}
                            <div className="w-20 h-20 rounded-full flex items-center justify-center">
                                <Image
                                    alt="logo"
                                    width={1000} height={1000}
                                    src={logo}
                                    className="w-20 h-20 object-contain"
                                />
                            </div>
                        </div>

                        {/* % text */}
                        {!showStartBtn && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-[#ff6d05] text-base mt-4"
                            >
                                {progress}%
                            </motion.div>
                        )}

                        {/* Start Button */}
                        {showStartBtn && (
                            <motion.button
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                onClick={handleStart}
                                className="mt-6 px-6 py-3 border border-[#ff6d05] text-[#ff6d05] hover:bg-[#ff6d05] hover:text-black rounded-xl text-lg font-bold transition"
                            >
                                Start
                            </motion.button>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Render actual website */}
            {!showLoader && children}
        </>
    );
}
