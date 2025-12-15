import Link from 'next/link';
import Image from 'next/image';

import { Layout } from '@/components/Layout';
import { FaArrowRight, FaStar, FaShieldHalved, FaMagnifyingGlass } from 'react-icons/fa6';
import TextType from '@/components/TextType';


export default function Welcome() {
    return (
        <Layout title="Welcome to Atsen Property | Find Your Dream Home">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 min-h-[calc(100vh-140px)]">
                {/* Text Content */}
                <div className="flex-1 space-y-8 animate-in slide-in-from-left-4 fade-in duration-700">
                    <div className="space-y-4">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary-dark font-semibold text-sm tracking-wide">
                            PREMIUM REAL ESTATE
                        </span>
                        <h1 className="text-5xl lg:text-7xl font-bold text-charcoal-gray leading-tight">
                            Discover Your <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-primary-dark">
                                <TextType
                                    text={["Dream Space"]}
                                    typingSpeed={150}
                                    cursorCharacter=""
                                    loop={false}
                                    showCursor={false}
                                    as="span"
                                    className="inline bg-clip-text"
                                />
                            </span> with Atsen.
                        </h1>
                        <p className="text-lg text-gray-500 max-w-xl leading-relaxed">
                            Experience the future of property hunting. Curated listings, trusted agents, and a seamless journey to your new home.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <Link
                            href="/browse"
                            className="group flex items-center gap-3 px-8 py-4 bg-white/10 border border-white/20 backdrop-blur-sm text-white rounded-full font-bold text-lg hover:bg-white/20 transition-all shadow-sm"
                        >
                            Get Started
                            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link href="/about" className="px-8 py-4 bg-white/5 border border-white/10 backdrop-blur-sm text-gray-300 rounded-full font-bold text-lg hover:bg-white/10 hover:text-white transition-colors flex items-center justify-center">
                            Learn More
                        </Link>
                    </div>

                    <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10">
                        <div className="flex flex-col gap-1">
                            <h3 className="text-3xl font-bold text-white">2k+</h3>
                            <p className="text-sm text-gray-400 font-medium">Verified Listings</p>
                        </div>
                        <div className="flex flex-col gap-1">
                            <h3 className="text-3xl font-bold text-white">500+</h3>
                            <p className="text-sm text-gray-400 font-medium">Trusted Agents</p>
                        </div>
                        <div className="flex flex-col gap-1">
                            <h3 className="text-3xl font-bold text-white">4.9</h3>
                            <div className="flex items-center gap-1 text-yellow-400">
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaStar />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Visual Content */}
                <div className="flex-1 relative w-full aspect-4/3 lg:aspect-square animate-in slide-in-from-right-4 fade-in duration-1000">
                    <div className="absolute inset-0 bg-primary/20 rounded-4xl transform rotate-3 scale-95 blur-3xl opacity-40"></div>
                    <div className="relative h-full w-full rounded-4xl overflow-hidden shadow-2xl border-4 border-white/10 bg-white/5 backdrop-blur-sm">
                        <Image
                            src="/images/hero-modern-home.png"
                            alt="Modern Architectural Home"
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-700"
                            priority
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        <div className="absolute bottom-6 left-6 right-6 bg-black/60 backdrop-blur-md p-4 rounded-xl shadow-lg flex items-center gap-4 border border-white/10">
                            <div className="p-3 bg-primary/20 rounded-lg text-primary">
                                <FaShieldHalved className="text-xl" />
                            </div>
                            <div>
                                <p className="font-bold text-white">Verified Property</p>
                                <p className="text-xs text-gray-400">Inspected for Quality & Authenticity</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Featurettes */}
            <div className="mt-24 grid md:grid-cols-3 gap-8">
                {[
                    {
                        icon: FaMagnifyingGlass,
                        title: "Smart Search",
                        desc: "Find exactly what you need with our advanced filters and map view."
                    },
                    {
                        icon: FaShieldHalved,
                        title: "Secure & Trusted",
                        desc: "Every listing is verified to ensure a safe and secure transaction."
                    },
                    {
                        icon: FaStar,
                        title: "Premium Experience",
                        desc: "Enjoy a seamless, ad-free experience designed for clarity and ease."
                    }
                ].map((feature, idx) => (
                    <div key={idx} className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl shadow-sm border border-white/10 hover:bg-white/10 transition-colors group">
                        <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-colors mb-4">
                            <feature.icon className="text-xl" />
                        </div>
                        <h3 className="font-bold text-lg text-white mb-2">{feature.title}</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
                    </div>
                ))}
            </div>
        </Layout>
    );
}
