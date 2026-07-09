import { Metadata } from 'next'
import { getBusinessInfo } from '@/lib/sanity'
import ParallaxSection from '@/components/ParallaxSection'

export const metadata: Metadata = {
    title: 'Contact & Commissions',
    description: 'Get in touch for custom festival wear, commissions, or general inquiries.',
}

export default async function ContactPage() {
    const business = await getBusinessInfo()

    return (
        <main className="min-h-screen">
            {/* Hero Section */}
            <ParallaxSection
                backgroundImage="/images/backgrounds/forest-stage.jpg" // Fallback if no specific image
                height="min-h-[40vh] md:min-h-[50vh]"
                overlayOpacity={0.5}
            >
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-serif drop-shadow-xl">
                        Let's Connect
                    </h1>
                    <p className="text-xl md:text-2xl text-white/90 mb-8 drop-shadow-md font-light">
                        Commissions, collaborations, or just saying hello
                    </p>
                </div>
            </ParallaxSection>

            <section className="py-16 md:py-24 bg-warm-white relative">
                {/* Background Elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-[10%] left-[-10%] w-[40%] h-[40%] bg-terracotta/5 rounded-full blur-[100px]" />
                    <div className="absolute bottom-[10%] right-[-10%] w-[40%] h-[40%] bg-sage/5 rounded-full blur-[100px]" />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-20">

                        {/* Contact Info Column */}
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-3xl font-bold text-brown-warm mb-4 font-serif">
                                    Get in Touch
                                </h2>
                                <p className="text-lg text-gray-700 leading-relaxed">
                                    Have a vision for a custom piece? Need help with an order?
                                    We love hearing from the festival family. Drop us a line and
                                    we'll get back to you as soon as we're out of the woods.
                                </p>
                            </div>

                            <div className="glass-light glass-shadow rounded-2xl p-8 space-y-6">
                                <div>
                                    <h3 className="font-bold text-terracotta mb-2 uppercase tracking-wide text-sm">
                                        Email Us
                                    </h3>
                                    <a
                                        href={`mailto:${business?.email || 'hello@wookporium.com'}`}
                                        className="text-xl text-dark-brown hover:text-primary transition-colors font-medium"
                                    >
                                        {business?.email || 'hello@wookporium.com'}
                                    </a>
                                </div>

                                <div>
                                    <h3 className="font-bold text-terracotta mb-2 uppercase tracking-wide text-sm">
                                        Socials
                                    </h3>
                                    <div className="flex gap-4">
                                        {business?.instagramHandle && (
                                            <a
                                                href={`https://instagram.com/${business.instagramHandle}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-dark-brown hover:text-primary transition-colors"
                                            >
                                                Instagram
                                            </a>
                                        )}
                                        {business?.facebookUrl && (
                                            <a
                                                href={business.facebookUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-dark-brown hover:text-primary transition-colors"
                                            >
                                                Facebook
                                            </a>
                                        )}
                                        {business?.tiktokHandle && (
                                            <a
                                                href={`https://tiktok.com/@${business.tiktokHandle}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-dark-brown hover:text-primary transition-colors"
                                            >
                                                TikTok
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="bg-primary/5 border border-primary/10 rounded-2xl p-8">
                                <h3 className="font-bold text-primary mb-2">
                                    Commission Status: <span className="text-green-600">OPEN</span>
                                </h3>
                                <p className="text-gray-700 text-sm">
                                    We are currently accepting custom orders for the upcoming festival season.
                                    Turnaround time is typically 3-4 weeks.
                                </p>
                            </div>
                        </div>

                        {/* Form Column */}
                        <div className="glass-white glass-shadow-xl rounded-2xl p-8 md:p-10 border border-white/50">
                            <h2 className="text-2xl font-bold text-brown-warm mb-6 font-serif">
                                Send a Message
                            </h2>

                            <form className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="text-sm font-semibold text-gray-700">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            className="w-full px-4 py-3 rounded-lg bg-white/50 border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-gray-400"
                                            placeholder="Your name"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-sm font-semibold text-gray-700">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            className="w-full px-4 py-3 rounded-lg bg-white/50 border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-gray-400"
                                            placeholder="you@email.com"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="subject" className="text-sm font-semibold text-gray-700">
                                        Subject
                                    </label>
                                    <select
                                        id="subject"
                                        className="w-full px-4 py-3 rounded-lg bg-white/50 border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-gray-700"
                                    >
                                        <option value="general">General Inquiry</option>
                                        <option value="commission">Custom Commission Request</option>
                                        <option value="order">Order Help</option>
                                        <option value="collaboration">Collaboration</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-semibold text-gray-700">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        rows={6}
                                        className="w-full px-4 py-3 rounded-lg bg-white/50 border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-gray-400 resize-none"
                                        placeholder="Tell us what's on your mind... (For commissions, please include size, desired colors, and vibe)"
                                    />
                                </div>

                                <button
                                    type="button"
                                    className="w-full btn-primary py-4 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                                >
                                    Send Message 🌿
                                </button>
                            </form>
                        </div>

                    </div>
                </div>
            </section>
        </main>
    )
}
