import { motion, useInView, AnimatePresence } from "framer-motion";
import React, { useRef, useEffect, useState } from "react";

export default function LanguagesCard({ data, isUpdated }) {
    const cardRef = useRef(null);
    const isInView = useInView(cardRef, { once: false, margin: "-50px" });

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="p-5 w-full relative overflow-hidden"
        >
            {/* 🔥 Animated Banner */}
            <AnimatePresence>
                {isUpdated && (
                    <motion.div
                        key="banner"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="absolute inset-0 flex items-center justify-center bg-orange-500/80 backdrop-blur-xl text-white font-medium text-lg md:text-xl rounded-lg z-10"
                    >
                        <span className="">
                            This table has been updated
                        </span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Section content */}
            <h2 className="text-xl md:text-2xl text-left w-full capitalize text-shadow-neon-orange mb-2">
                Most Used Languages
            </h2>

            <div className="space-y-4">
                {data.map((lang, idx) => (
                    <AnimatedLangBar
                        key={idx}
                        lang={lang.language}
                        color={lang.color}
                        percentage={lang.percentage}
                        delay={idx * 0.15}
                        isInView={isInView}
                    />
                ))}
            </div>
        </motion.div>
    );
}

function AnimatedLangBar({ lang, color, percentage, delay, isInView }) {
    const [displayPercent, setDisplayPercent] = useState(0);
    const target = parseFloat(percentage);

    useEffect(() => {
        if (isInView) {
            let startTime;
            const duration = 1000; // ms

            const animate = (timestamp) => {
                if (!startTime) startTime = timestamp;
                const progress = Math.min((timestamp - startTime) / duration, 1);
                setDisplayPercent((target * progress).toFixed(2));
                if (progress < 1) requestAnimationFrame(animate);
            };

            const timeout = setTimeout(() => requestAnimationFrame(animate), delay * 1000);
            return () => clearTimeout(timeout);
        }
    }, [isInView, target, delay]);

    return (
        <div>
            <div className="flex justify-between items-center mb-1">
                <span
                    style={{ textShadow: "none" }}
                    className="font-light text-xs md:text-base text-shadow-neon-light-orange"
                >
                    {lang}
                </span>
                <span
                    style={{ textShadow: "none" }}
                    className="font-light text-xs md:text-base text-shadow-neon-light-orange"
                >
                    {displayPercent}%
                </span>
            </div>

            <div className="w-full h-2 rounded-full bg-gray-700/30 overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${percentage}%` } : { width: 0 }}
                    transition={{
                        duration: 1,
                        ease: "easeOut",
                        delay: delay,
                    }}
                    style={{
                        backgroundColor: color,
                        boxShadow: `0 0 8px ${color}`,
                    }}
                    className="h-2 rounded-full"
                />
            </div>
        </div>
    );
}
