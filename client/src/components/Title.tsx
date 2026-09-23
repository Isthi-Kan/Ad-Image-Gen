import { motion } from 'framer-motion';

interface TitleProps {
    title?: string;
    heading?: string;
    description?: string;
}

export default function Title({ title, heading, description }: TitleProps) {

    return (
        <div className="text-center mb-8 md:mb-10">
            {title && (
                <motion.p
                    initial={{ y: 60, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1 }}
                    className="text-sm font-medium text-[#7CFF4D] uppercase tracking-[0.22em] mb-3"
                >
                    {title}
                </motion.p>
            )}
            {heading && (
                <motion.h2 className="text-2xl md:text-4xl font-semibold tracking-tight text-white"
                    initial={{ y: 60, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1, delay: 0.1 }}
                >
                    {heading}
                </motion.h2>
            )}
            {description && (
                <motion.p className="max-w-2xl mx-auto text-sm my-3 leading-relaxed text-emerald-100/55"
                    initial={{ y: 60, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1, delay: 0.2 }}
                >
                    {description}
                </motion.p>
            )}
        </div>
    )
}