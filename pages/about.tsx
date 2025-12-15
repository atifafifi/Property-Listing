import { Layout } from '@/components/Layout';
import Link from 'next/link';
import Image from 'next/image';
import { FaShieldHalved, FaUsers, FaHandshake } from 'react-icons/fa6';

export default function About() {
    return (
        <Layout title="About Us | Atsen Property">
            <div className="max-w-4xl mx-auto py-12 lg:py-20">
                {/* Hero Section */}
                <div className="text-center mb-16 space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <h1 className="text-4xl lg:text-6xl font-bold text-white">
                        Redefining <span className="text-primary">Real Estate</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        At Atsen Property, we believe finding your dream home should be an inspiring journey, not a chore. We combine technology with human expertise to deliver the best experience.
                    </p>
                </div>

                {/* Values Grid */}
                <div className="grid md:grid-cols-3 gap-8 mb-20">
                    {[
                        {
                            icon: FaShieldHalved,
                            title: "Trusted & Verified",
                            desc: "Every listing on our platform is vetted to ensure authenticity and quality."
                        },
                        {
                            icon: FaUsers,
                            title: "Client Centric",
                            desc: "Your needs come first. We provide personalized support every step of the way."
                        },
                        {
                            icon: FaHandshake,
                            title: "Transparent Deals",
                            desc: "No hidden fees, no surprises. Just honest, clear communication."
                        }
                    ].map((feature, idx) => (
                        <div key={idx} className="p-8 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
                            <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center text-primary text-2xl mb-6">
                                <feature.icon />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                            <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Story Section */}
                <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 lg:p-12 shadow-xl border border-white/10 flex flex-col md:flex-row gap-12 items-center">
                    <div className="flex-1 space-y-6">
                        <h2 className="text-3xl font-bold text-white">Our Story</h2>
                        <p className="text-gray-400 leading-relaxed">
                            Founded in 2024, Atsen Property started with a simple mission: to clean up the noise in the property market. We saw a landscape filled with outdated listings, blurry photos, and unverified agents. We knew there had to be a better way.
                        </p>
                        <p className="text-gray-400 leading-relaxed">
                            Today, we connect thousands of luxury home seekers with the finest properties Malaysia has to offer, all through a platform designed for clarity, beauty, and trust.
                        </p>
                        <div className="pt-4">
                            <Link href="/browse" className="inline-block px-8 py-3 bg-white/10 border border-white/20 backdrop-blur-sm text-white font-bold rounded-full shadow-lg hover:bg-white/20 transition-colors">
                                Browse Listings
                            </Link>
                        </div>
                    </div>
                    <div className="flex-1 relative w-full aspect-square rounded-2xl overflow-hidden shadow-inner">
                        <Image
                            src="/images/about-office.png"
                            alt="Atsen Property Office"
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-700"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>
                </div>
            </div>
        </Layout>
    );
}
