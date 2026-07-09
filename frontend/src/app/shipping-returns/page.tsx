import { Metadata } from 'next'
import Link from 'next/link'
import MotionReveal from '@/components/MotionReveal'

export const metadata: Metadata = {
    title: 'Shipping & Returns Policy',
    description: 'Information about shipping times, international delivery, and our return policy.',
}

export default function ShippingReturnsPage() {
    return (
        <main className="min-h-screen bg-deep-bg py-16 md:py-24">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">

                    <MotionReveal className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold text-primary drop-shadow-[0_0_8px_rgba(0,240,255,0.4)] mb-4 font-serif">
                            Shipping & Returns
                        </h1>
                        <p className="text-lg text-warm-white/80">
                            Getting your gear from our studio to your doorstep
                        </p>
                    </MotionReveal>

                    <div className="space-y-12">
                        {/* Shipping Policy */}
                        <MotionReveal delay={0.00}>
                        <section className="glass-dark glass-shadow rounded-2xl p-8 md:p-12 border border-white/20">
                            <h2 className="text-2xl font-bold text-accent drop-shadow-[0_0_8px_rgba(176,38,255,0.4)] mb-6 flex items-center gap-3">
                                <span className="text-3xl">📦</span> Shipping Policy
                            </h2>

                            <div className="space-y-6 text-warm-white/90 leading-relaxed">
                                <div>
                                    <h3 className="font-bold text-warm-white mb-2">Processing Time</h3>
                                    <p>
                                        <strong>Ready-to-Ship:</strong> Items labeled "Ready to Ship" will be packed and sent within 1-3 business days.
                                    </p>
                                    <p className="mt-2">
                                        <strong>Made-to-Order:</strong> Custom or made-to-order items require creation time. Please allow 3-4 weeks for us to craft your piece before it ships.
                                    </p>
                                </div>

                                <div className="border-t border-white/10 pt-4">
                                    <h3 className="font-bold text-warm-white mb-2">Domestic Shipping (USA)</h3>
                                    <p>
                                        We ship via USPS or UPS. Standard shipping typically takes 3-5 business days. You will receive a tracking number via email as soon as your label is created.
                                    </p>
                                </div>

                                <div className="border-t border-white/10 pt-4">
                                    <h3 className="font-bold text-warm-white mb-2">International Shipping</h3>
                                    <p>
                                        We ship worldwide! International packages typically arrive within 2-4 weeks, depending on customs processing.
                                    </p>
                                    <div className="bg-secondary/10 border border-secondary/30 rounded-lg p-4 mt-3 text-sm text-secondary font-bold">
                                        <strong>Please Note:</strong> International customers are responsible for any customs duties, VAT, or import taxes required by their country. These fees are not included in our shipping costs.
                                    </div>
                                </div>
                            </div>
                        </section>
                        </MotionReveal>

                        {/* Returns Policy */}
                        <MotionReveal delay={0.05}>
                        <section className="glass-dark glass-shadow rounded-2xl p-8 md:p-12 border border-white/20">
                            <h2 className="text-2xl font-bold text-accent drop-shadow-[0_0_8px_rgba(176,38,255,0.4)] mb-6 flex items-center gap-3">
                                <span className="text-3xl">↺</span> Return & Exchange Policy
                            </h2>

                            <div className="space-y-6 text-warm-white/90 leading-relaxed">
                                <p>
                                    We want you to feel amazing in your Wookporium gear! If something doesn't fit quite right, we're here to help.
                                </p>

                                <div>
                                    <h3 className="font-bold text-warm-white mb-2">Return Window</h3>
                                    <p>
                                        We accept returns on <strong>unworn, unwashed items with tags attached</strong> within 14 days of delivery.
                                    </p>
                                </div>

                                <div className="border-t border-white/10 pt-4">
                                    <h3 className="font-bold text-warm-white mb-2">How to Initiate a Return</h3>
                                    <ol className="list-decimal pl-5 space-y-2">
                                        <li>Contact us at <a href="mailto:hello@wookporium.com" className="text-primary hover:underline">hello@wookporium.com</a> with your order number.</li>
                                        <li>We will provide you with a return authorization.</li>
                                        <li>Pack your item securely and ship it back to us.</li>
                                        <li>Once received and inspected, we will issue a refund to your original payment method (minus original shipping costs).</li>
                                    </ol>
                                </div>

                                <div className="bg-red-50 border border-red-100 rounded-lg p-4 mt-6">
                                    <h3 className="font-bold text-red-800 mb-1">Non-Returnable Items</h3>
                                    <ul className="list-disc pl-5 text-sm text-red-700 space-y-1">
                                        <li>Custom commissions / Made-to-order items</li>
                                        <li>Sale / Clearance items</li>
                                        <li>Intimate items (bodysuits/swimwear) if the hygiene liner has been removed</li>
                                    </ul>
                                </div>
                            </div>
                        </section>
                        </MotionReveal>

                        {/* Help CTA */}
                        <MotionReveal delay={0.1} className="text-center pt-8">
                            <p className="text-warm-white/80 mb-4">Have specific questions about your order?</p>
                            <Link href="/contact" className="text-primary font-bold hover:underline text-lg">
                                Contact Support →
                            </Link>
                        </MotionReveal>

                    </div>
                </div>
            </div>
        </main>
    )
}
