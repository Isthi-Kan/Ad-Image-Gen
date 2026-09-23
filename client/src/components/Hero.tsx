import { ArrowRightIcon, PlayIcon, ZapIcon, CheckIcon } from 'lucide-react';
import { PrimaryButton, GhostButton } from './Buttons';
import { motion } from 'framer-motion';
import { assets } from '../assets/assets';

export default function Hero() {

    const trustedUserImages = [
        'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=50',
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50',
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop'
    ];

    const galleryStripImages = [
        assets.galery4,
        assets.galery2,
        assets.galery3,
    ];

    const trustedLogosText = [
        'Adobe',
        'Figma',
        'Canva',
        'Shopify',
        'Webflow'
    ];

    return (
        <>
            <section id="home" className="relative z-10">
                <div className="max-w-6xl mx-auto px-4 min-h-screen max-md:w-screen max-md:overflow-hidden pt-32 md:pt-26 flex items-center justify-center">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                        <div className="text-left">
                            <motion.a href="https://prebuiltui.com/tailwind-templates?ref=pixel-forge" className="inline-flex items-center gap-3 pl-3 pr-4 py-1.5 rounded-full mb-6 justify-start border border-emerald-400/10 bg-emerald-950/45"
                                initial={{ y: 60, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1 }}
                            >
                                <div className="flex -space-x-2">
                                    {trustedUserImages.map((src, i) => (
                                        <img
                                            key={i}
                                            src={src}
                                            alt={`Client ${i + 1}`}
                                            className="size-6 rounded-full border border-[#7CFF4D]/40"
                                            width={40}
                                            height={40}
                                        />
                                    ))}
                                </div>
                                <span className="text-xs text-emerald-50/90">
                                    Trusted by 10,000+ creators
                                </span>
                            </motion.a>

                            <motion.h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 max-w-xl text-white"
                                initial={{ y: 60, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1, delay: 0.1 }}
                            >
                                We build & generate <br />
                                <span className="bg-clip-text text-transparent bg-linear-to-r from-[#d4ffe5] via-[#7CFF4D] to-[#53db2f]">
                                    high-converting AI ad content
                                </span>
                            </motion.h1>

                            <motion.p className="max-w-lg mb-8 text-emerald-50/75 leading-7"
                                initial={{ y: 60, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1, delay: 0.2 }}
                            >
                                A creative AI platform helping startups and businesses grow through
                                high-impact ad videos, smart visuals and performance-driven AI content.
                            </motion.p>

                            <motion.div className="flex flex-col sm:flex-row items-center gap-4 mb-8"
                                initial={{ y: 60, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1, delay: 0.3 }}
                            >
                                <a href="/" className="w-full sm:w-auto">
                                    <PrimaryButton className="max-sm:w-full py-3 px-7">
                                        Start generating - Free
                                        <ArrowRightIcon className="size-4" />
                                    </PrimaryButton>
                                </a>

                                <GhostButton className="max-sm:w-full max-sm:justify-center py-3 px-5">
                                    <PlayIcon className="size-4" />
                                    See AI Demo
                                </GhostButton>
                            </motion.div>

                            <motion.div className="flex sm:inline-flex overflow-hidden items-center max-sm:justify-center text-sm rounded border border-emerald-400/10 text-emerald-50 bg-emerald-950/35"
                                initial={{ y: 60, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1, delay: 0.1 }}
                            >
                                <div className="flex items-center gap-2 p-2 px-3 sm:px-6.5 transition-colors hover:bg-emerald-900/30">
                                    <ZapIcon className="size-4 text-[#7CFF4D]" />
                                    <div>
                                        <div> Smart ad generation </div>
                                        <div className="text-xs text-emerald-100/55">
                                            idea to high-impact AI content
                                        </div>
                                    </div>
                                </div>

                                <div className="hidden sm:block h-6 w-px bg-emerald-400/10" />

                                <div className="flex items-center gap-2 p-2 px-3 sm:px-6.5 transition-colors hover:bg-emerald-900/30">
                                    <CheckIcon className="size-4 text-[#7CFF4D]" />
                                    <div>
                                        <div>Plug  &  play AI</div>
                                        <div className="text-xs text-emerald-100/55">
                                            No setup, just create
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Right: modern mockup card */}
                        <motion.div className="mx-auto w-full max-w-lg"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1, delay: 0.5 }}
                        >
                            <motion.div className="rounded-3xl overflow-hidden border border-emerald-400/10 shadow-2xl bg-linear-to-b from-emerald-950/55 to-transparent">
                                <div className="relative aspect-16/10 bg-[#081009]">
                                    <img
                                        src={assets.banner2}
                                        alt="agency-work-preview"
                                        className="w-full h-full object-cover object-center"
                                    />

                                    <div className="absolute left-4 top-4 px-3 py-1 rounded-full backdrop-blur-sm text-xs border border-emerald-400/10 bg-black/20 text-emerald-50">
                                        Platform-ready • 9:16 & 16:9
                                    </div>

                                    <div className="absolute right-4 bottom-4">
                                        <button className="inline-flex items-center gap-2 rounded-full px-4 py-2 backdrop-blur-sm transition focus:outline-none border border-emerald-400/10 bg-emerald-950/50 hover:bg-emerald-900/55 text-emerald-50">
                                            <PlayIcon className="size-4" />
                                            <span className="text-xs">Preview</span>
                                        </button>
                                    </div>
                                </div>
                            </motion.div>

                            <div className="mt-4 flex gap-3 items-center justify-start">
                                {galleryStripImages.map((src, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ y: 20, opacity: 0 }}
                                        whileInView={{ y: 0, opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1, delay: 0.1 + i * 0.1 }}
                                        className="w-14 h-10 rounded-lg overflow-hidden border border-emerald-400/10"
                                    >
                                        <img
                                            src={src}
                                            alt="project-thumbnail"
                                            className="w-full h-full object-cover"
                                        />
                                    </motion.div>
                                ))}
                                <motion.div className="text-sm ml-2 flex items-center gap-2 text-emerald-100/55"
                                    initial={{ y: 60, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1, delay: 0.2 }}
                                >
                                    <div className="relative flex h-3.5 w-3.5 items-center justify-center">
                                        <span className="absolute inline-flex h-full w-full rounded-full bg-[#7CFF4D] opacity-75 animate-ping duration-300" />

                                        <span className="relative inline-flex size-2 rounded-full bg-[#53db2f]" />
                                    </div>
                                    +25 more
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* LOGO MARQUEE */}
            <motion.section className="border-y border-emerald-400/10 max-md:mt-10 bg-emerald-950/15"
                initial={{ y: 60, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1 }}
            >
                <div className="max-w-6xl mx-auto px-6">
                    <div className="w-full overflow-hidden py-6">
                        <div className="flex gap-14 items-center justify-center animate-marquee whitespace-nowrap">
                            {trustedLogosText.concat(trustedLogosText).map((logo, i) => (
                                <span
                                    key={i}
                                    className="mx-6 text-sm md:text-base font-semibold tracking-wide transition-colors text-emerald-100/50 hover:text-emerald-100/70"
                                >
                                    {logo}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.section>
        </>
    );
};