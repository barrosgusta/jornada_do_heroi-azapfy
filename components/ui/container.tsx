"use client"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { ThemeToggle } from "./theme-toggle"

type ContainerProps = {
    children: React.ReactNode
    className?: string
}

export default function Container({ children, className }: ContainerProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1  }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            exit={{ opacity: 0, scale: 0.97 }}
            className={cn("relative mx-auto max-w-7xl p-10 md:rounded-xl md:border h-full min-h-[90vh] shadow-xl", className)}
        >
            <div className="absolute top-0 right-0 m-6">
                <ThemeToggle />
            </div>
            {children}
        </motion.div>
    )
}