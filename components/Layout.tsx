import Head from 'next/head';
import Link from 'next/link';
import { ReactNode } from 'react';
import DarkVeil from './DarkVeil';
import { Logo } from './Logo';

interface Props {
    children: ReactNode;
    title?: string;
    navAction?: {
        label: string;
        href: string;
        icon?: React.ReactNode;
    };
}

export const Layout = ({ children, title = "Atsen Property Listing", navAction }: Props) => {
    return (
        <div className="min-h-screen flex flex-col font-sans text-charcoal-gray relative overflow-hidden">
            <div className="fixed inset-0 -z-10 bg-black">
                <DarkVeil hueShift={270} speed={0.2} noiseIntensity={0.1} />
            </div>
            <Head>
                <title>{title}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="description" content="Find your dream property with Atsen Property." />
            </Head>

            {/* Floating Glass Navbar */}
            <div className="sticky top-6 z-50 px-4 mb-8">
                <nav className="max-w-7xl mx-auto rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 shadow-2xl shadow-primary/5 transition-all duration-300 hover:bg-black/70 hover:shadow-primary/10 hover:border-white/20">
                    <div className="px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-20 items-center">
                            {/* Logo Section */}
                            <div className="shrink-0 flex items-center gap-2">
                                <Link href="/" className="hover:opacity-80 transition-opacity">
                                    <div className="h-10 w-64 flex items-center">
                                        <Logo className="h-full w-full" />
                                    </div>
                                </Link>
                            </div>

                            {/* Center Navigation */}
                            <div className="hidden md:flex items-center gap-8 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                                {[
                                    { name: 'Discover', href: '/browse' },
                                    { name: 'Company', href: '/about' },
                                    { name: 'Support', href: 'mailto:atifafifi16@gmail.com' }
                                ].map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className="relative px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors group"
                                    >
                                        {item.name}
                                        <span className="absolute inset-x-0 -bottom-1 h-px bg-linear-to-r from-transparent via-primary to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                                    </Link>
                                ))}
                            </div>

                            {/* Right Actions */}
                            <div className="flex items-center gap-4">
                                {navAction ? (
                                    <Link
                                        href={navAction.href}
                                        className="px-6 py-2.5 rounded-full bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 hover:border-primary/50 hover:shadow-[0_0_15px_rgba(217,70,239,0.3)] transition-all duration-300 shadow-sm text-sm flex items-center gap-2 backdrop-blur-sm group"
                                    >
                                        <span className="group-hover:-translate-x-1 transition-transform">{navAction.icon}</span>
                                        <span>{navAction.label}</span>
                                    </Link>
                                ) : (
                                    <Link href="/browse" className="px-6 py-2.5 rounded-full bg-primary/20 border border-primary/50 text-white font-semibold hover:bg-primary/30 hover:shadow-[0_0_20px_rgba(217,70,239,0.4)] transition-all duration-300 shadow-sm text-sm backdrop-blur-sm">
                                        Get Started
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>
            </div>

            <main className="grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full z-10">
                {children}
            </main>

            <footer className="bg-black/40 border-t border-white/10 py-8 mt-auto backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 text-center text-gray-400 text-sm">
                    &copy; {new Date().getFullYear()} Atsen Property. All rights reserved.
                </div>
            </footer>
        </div>
    );
};
