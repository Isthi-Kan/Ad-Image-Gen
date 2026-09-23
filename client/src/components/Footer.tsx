import { assets } from '../assets/assets';
import { footerLinks } from '../assets/dummy-data';
import { motion } from 'framer-motion';

export default function Footer() {

    return (
        <motion.footer className="border-t border-emerald-400/10 pt-10 bg-emerald-950/20 text-emerald-100/70"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", duration: 0.5 }}
        >
            <div className="max-w-6xl mx-auto px-6">
                <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-emerald-400/10">
                    <div>
                        <img src={assets.logo1} alt="logo" className="h-8" />
                        <p className="max-w-[410px] mt-6 text-sm leading-relaxed text-emerald-100/70">
                            We are an AI-powered platform that generates high-impact ads and visuals—helping brands create, design, and scale engaging digital content effortlessly.
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-5">
                        {footerLinks.map((section, index) => (
                            <div key={index}>
                                <h3 className="font-semibold text-base md:mb-5 mb-2 text-white">
                                    {section.title}
                                </h3>
                                <ul className="text-sm space-y-1">
                                    {section.links.map(
                                        (link: { name: string; url: string }, i) => (
                                            <li key={i}>
                                                <a
                                                    href={link.url}
                                                    className="hover:text-white transition-colors"
                                                >
                                                    {link.name}
                                                </a>
                                            </li>
                                        )
                                    )}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                <p className="py-4 text-center text-sm text-emerald-100/55">
                    © {new Date().getFullYear()} {' '}
                    <a href="https://my-portfolio-one-ecru-75.vercel.app/">
                        IsthiDev
                    </a>
                    . All rights reserved.
                </p>
            </div>
        </motion.footer>
    );
};