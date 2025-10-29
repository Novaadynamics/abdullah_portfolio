"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import InfinityLoader from "../InfinityLoader"

export default function LoaderWrapper({ children }) {
    const pathname = usePathname()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Initial load delay for smooth entry
        const timer = setTimeout(() => setLoading(false), 1000)
        return () => clearTimeout(timer)
    }, [])

    useEffect(() => {
        // Show loader on route change
        const handleStart = () => setLoading(true)
        const handleEnd = () => {
            const timeout = setTimeout(() => setLoading(false), 500)
            return () => clearTimeout(timeout)
        }

        // We can simulate route events using router events in `next/navigation`
        // Since App Router doesn’t expose them directly, we detect via pathname change
        handleStart()
        const timeout = setTimeout(handleEnd, 700)
        return () => clearTimeout(timeout)
    }, [pathname])

    return (
        <>
            <AnimatePresence mode="wait">
                {loading && (
                    <motion.div
                        key="page-loader"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="fixed inset-0 z-[9999]"
                    >
                        <InfinityLoader />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Render the actual page */}
            <div className={`${loading ? "opacity-0" : "opacity-100"} transition-opacity duration-500`}>
                {children}
            </div>
        </>
    )
}
