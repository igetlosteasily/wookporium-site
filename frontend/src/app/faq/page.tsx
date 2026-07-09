import { Metadata } from 'next'
import ParallaxSection from '@/components/ParallaxSection'
import FAQAccordion from '@/components/FAQAccordion'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'FAQ - Festival Knowledge Base',
    description: 'Common questions about shipping, care instructions, and custom orders.',
}

export default function FAQPage() {
    const faqs = [
        {
            question: "How long does shipping take?",
            answer: "We ship all ready-to-wear items within 1-3 business days. Domestic US shipping usually takes 3-5 days. For custom commissions, please allow 3-4 weeks for creation plus shipping time. If you need something for a specific festival date, please let us know in your order notes!"
        },
        {
            question: "Do you ship internationally?",
            answer: "Yes! We ship worldwide. International shipping times vary by country but typically take 2-4 weeks. Please note that customers are responsible for any customs fees or import taxes."
        },
        {
            question: "How do I care for my crochet pieces?",
            answer: "Most of our crochet items are made with 100% cotton or bamboo blend yarn. We recommend hand washing in cold water with mild detergent and laying flat to dry. Do not hang wet crochet as it may stretch. For hat brims, you can spot clean."
        },
        {
            question: "What is your return policy?",
            answer: "We accept returns on unworn, ready-to-wear items within 14 days of delivery. Custom commissions and sale items are final sale. Please verify your sizing before ordering custom pieces!"
        },
        {
            question: "Do you take custom commissions?",
            answer: "We open commission slots seasonally! Check our 'Contact' page to see if commissions are currently open. We love bringing your custom festival vision to life."
        },
        {
            question: "Are your materials sustainable?",
            answer: "We strive to use natural, biodegradable fibers like cotton, bamboo, and hemp whenever possible. We also use upcycled embellishments for our one-of-a-kind pieces to minimize waste."
        }
    ]

    return (
        <main className="min-h-screen bg-warm-white">
            {/* Hero Section */}
            <ParallaxSection
                backgroundImage="/images/backgrounds/festival-crowd-lights.png"
                height="min-h-[40vh]"
                overlayOpacity={0.6}
            >
                <div className="text-center max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 font-serif drop-shadow-xl">
                        Knowledge Base
                    </h1>
                    <p className="text-xl text-white/90 font-light">
                        Answers to common questions from the fam
                    </p>
                </div>
            </ParallaxSection>

            <section className="py-16 md:py-24 px-4 container mx-auto">
                <div className="max-w-3xl mx-auto">
                    <FAQAccordion items={faqs} />

                    <div className="mt-12 text-center p-8 bg-terracotta/5 rounded-2xl border border-terracotta/10">
                        <h3 className="text-xl font-bold text-brown-warm mb-2">Still relyin' on guessing?</h3>
                        <p className="text-gray-600 mb-6">
                            If we didn't answer your question, just shoot us a message.
                        </p>
                        <Link
                            href="/contact"
                            className="btn-primary inline-block"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    )
}
