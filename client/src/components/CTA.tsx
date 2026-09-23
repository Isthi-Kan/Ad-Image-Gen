import { ArrowRightIcon } from 'lucide-react';
import { GhostButton } from './Buttons';
import { motion } from 'framer-motion';

export default function CTA() {

    return (
        <section className="relative py-24 2xl:py-32 px-4">
            <div className="container mx-auto max-w-4xl">
                <div className="rounded-[2rem] border border-emerald-300/15 p-10 sm:p-12 md:p-16 text-center relative overflow-hidden shadow-[0_30px_90px_-30px_rgba(16,185,129,0.35)] backdrop-blur-md bg-linear-to-b from-emerald-950/55 via-emerald-950/35 to-slate-950/80">
                    <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-12 mix-blend-soft-light" />
                    <div className="absolute -left-24 top-0 h-64 w-64 rounded-full bg-emerald-400/10 blur-3xl" />
                    <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
                    <div className="relative z-10">
                        <motion.h2 className="mx-auto max-w-2xl text-3xl sm:text-5xl font-semibold tracking-tight text-balance mb-6 text-white"
                            initial={{ y: 60, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1 }}
                        >
                            Ready to Transform Your Content?
                        </motion.h2>
                        <motion.p className="max-sm:text-sm text-base sm:text-lg leading-8 mb-10 max-w-2xl mx-auto text-emerald-100/72"
                            initial={{ y: 60, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1, delay: 0.2 }}
                        >
                            Partner with our agency to design, build and scale digital products that deliver real business results.
                        </motion.p>
                        <motion.div
                            initial={{ y: 60, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1, delay: 0.3 }}
                        >
                            <GhostButton className="px-8 py-3.5 gap-2 rounded-full border shadow-lg shadow-emerald-500/10 transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-200/40">
                                Start Creating Now <ArrowRightIcon size={20} />
                            </GhostButton>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};