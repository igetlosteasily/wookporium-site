/**
 * Privacy Policy Page
 * Simple, honest privacy policy for a small handmade business
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import MotionReveal from '@/components/MotionReveal'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Wookporium Privacy Policy - How we protect your information',
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-deep-bg">
      <section className="section-container">
        <div className="max-w-4xl mx-auto">
          <Link 
            href="/"
            className="text-accent drop-shadow-[0_0_8px_rgba(176,38,255,0.4)] hover:text-accent drop-shadow-[0_0_8px_rgba(176,38,255,0.4)]/80 hover:underline mb-6 inline-block transition-colors"
          >
            ← Back to Home
          </Link>
          
          <MotionReveal>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary drop-shadow-[0_0_8px_rgba(0,240,255,0.4)] mb-4">
              Privacy Policy
            </h1>

            <p className="text-lg text-warm-white/80 mb-8">
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </MotionReveal>

          <div className="bg-surface-dark/80 backdrop-blur-md border border-white/10 glass-shadow-lg rounded-2xl shadow-lg p-8 md:p-12 space-y-8">

            {/* Intro */}
            <MotionReveal className="prose prose-lg max-w-none">
              <p className="text-lg leading-relaxed text-warm-white/90">
                Hey there! This is a small, handmade business run by real people who care about your privacy.
                This privacy policy explains how we handle your information when you shop with us. We're keeping
                it straightforward and honest.
              </p>
            </MotionReveal>

            {/* Our Promise */}
            <MotionReveal delay={0.00}>
            <section className="bg-accent/10 border border-accent/20 rounded-xl p-6 border-l-4 border-accent">
              <h2 className="text-2xl font-serif font-bold text-primary drop-shadow-[0_0_8px_rgba(0,240,255,0.4)] mb-4">
                Our Promise to You
              </h2>
              <div className="space-y-3 text-warm-white/90">
                <p className="flex items-start gap-3">
                  <span className="text-accent drop-shadow-[0_0_8px_rgba(176,38,255,0.4)] text-xl">✓</span>
                  <span><strong>We will never sell your data.</strong> Ever. Not to advertisers, not to anyone.</span>
                </p>
                <p className="flex items-start gap-3">
                  <span className="text-accent drop-shadow-[0_0_8px_rgba(176,38,255,0.4)] text-xl">✓</span>
                  <span><strong>We will never misuse your information.</strong> Your data is only used to fulfill your orders and communicate with you about your purchase.</span>
                </p>
                <p className="flex items-start gap-3">
                  <span className="text-accent drop-shadow-[0_0_8px_rgba(176,38,255,0.4)] text-xl">✓</span>
                  <span><strong>We keep things simple.</strong> We're a small business, not a data-harvesting corporation.</span>
                </p>
              </div>
            </section>
            </MotionReveal>

            {/* What We Collect */}
            <MotionReveal delay={0.05}>
            <section>
              <h2 className="text-2xl font-serif font-bold text-primary drop-shadow-[0_0_8px_rgba(0,240,255,0.4)] mb-4">
                What Information We Collect
              </h2>
              <div className="prose prose-lg max-w-none text-warm-white/90">
                <p>
                  When you place an order, we collect the information needed to get your handmade goodies to you:
                </p>
                <ul className="space-y-2 ml-6 list-disc">
                  <li>Your name</li>
                  <li>Email address</li>
                  <li>Shipping address</li>
                  <li>Billing address (if different from shipping)</li>
                  <li>Payment information (processed securely by Snipcart, see below)</li>
                </ul>
                <p className="mt-4">
                  We may also collect information about how you use our website (like which pages you visit) 
                  to help us improve the site experience.
                </p>
              </div>
            </section>
            </MotionReveal>

            {/* How We Use It */}
            <MotionReveal delay={0.10}>
            <section>
              <h2 className="text-2xl font-serif font-bold text-primary drop-shadow-[0_0_8px_rgba(0,240,255,0.4)] mb-4">
                How We Use Your Information
              </h2>
              <div className="prose prose-lg max-w-none text-warm-white/90">
                <p>
                  Your information is used for one main purpose: <strong>fulfilling your order.</strong>
                </p>
                <p>
                  Specifically, we use your info to:
                </p>
                <ul className="space-y-2 ml-6 list-disc">
                  <li>Process and ship your order</li>
                  <li>Send you order confirmations and shipping updates</li>
                  <li>Answer questions about your order</li>
                  <li>Comply with legal obligations (like tax requirements)</li>
                </ul>
                <p className="mt-4">
                  That's it. We don't use your information for advertising, profiling, or anything else.
                </p>
              </div>
            </section>
            </MotionReveal>

            {/* Third Party Services */}
            <MotionReveal delay={0.15}>
            <section>
              <h2 className="text-2xl font-serif font-bold text-primary drop-shadow-[0_0_8px_rgba(0,240,255,0.4)] mb-4">
                Third-Party Services
              </h2>
              <div className="prose prose-lg max-w-none text-warm-white/90">
                <p>
                  To run this website and process orders, we use some third-party services. Here's what you should know:
                </p>
                
                <div className="bg-sage/5 rounded-lg p-4 my-4 border-l-4 border-sage">
                  <h3 className="text-lg font-semibold text-primary drop-shadow-[0_0_8px_rgba(0,240,255,0.4)] mb-2">Snipcart (Payment Processing)</h3>
                  <p className="text-sm">
                    We use Snipcart to handle shopping cart and payment processing. Your payment information 
                    is processed securely by Snipcart and never stored on our servers. Snipcart complies with 
                    PCI-DSS requirements and takes security seriously.
                  </p>
                </div>

                <div className="bg-sage/5 rounded-lg p-4 my-4 border-l-4 border-sage">
                  <h3 className="text-lg font-semibold text-primary drop-shadow-[0_0_8px_rgba(0,240,255,0.4)] mb-2">Cloudflare (Website Hosting & Performance)</h3>
                  <p className="text-sm">
                    Our website is hosted on Cloudflare Pages, which means some data passes through their 
                    infrastructure to make the site fast and reliable. Cloudflare has its own privacy policy 
                    that governs their handling of data.
                  </p>
                </div>

                <div className="bg-sage/5 rounded-lg p-4 my-4 border-l-4 border-sage">
                  <h3 className="text-lg font-semibold text-primary drop-shadow-[0_0_8px_rgba(0,240,255,0.4)] mb-2">Sanity (Content Management)</h3>
                  <p className="text-sm">
                    We use Sanity CMS to manage product information and site content. This doesn't involve 
                    your personal data—just our product listings and images.
                  </p>
                </div>

                <p className="mt-4 italic text-warm-white/80">
                  <strong>Full transparency:</strong> These services may use dependencies or sub-processors that 
                  we don't have complete visibility into. However, we've chosen reputable, security-focused companies, 
                  and our promise remains the same: <strong>we will never intentionally sell or misuse your data.</strong>
                </p>
              </div>
            </section>
            </MotionReveal>

            {/* Data Security */}
            <MotionReveal delay={0.20}>
            <section>
              <h2 className="text-2xl font-serif font-bold text-primary drop-shadow-[0_0_8px_rgba(0,240,255,0.4)] mb-4">
                How We Protect Your Information
              </h2>
              <div className="prose prose-lg max-w-none text-warm-white/90">
                <p>
                  We take reasonable precautions to protect your information:
                </p>
                <ul className="space-y-2 ml-6 list-disc">
                  <li>Our website uses HTTPS encryption (that little lock icon in your browser)</li>
                  <li>Payment information is handled by Snipcart's secure, PCI-compliant system</li>
                  <li>We don't store your credit card details on our servers</li>
                  <li>Access to customer data is limited to what's necessary for order fulfillment</li>
                </ul>
                <p className="mt-4">
                  No security system is 100% perfect, but we do our best to keep your information safe.
                </p>
              </div>
            </section>
            </MotionReveal>

            {/* Your Rights */}
            <MotionReveal delay={0.25}>
            <section>
              <h2 className="text-2xl font-serif font-bold text-primary drop-shadow-[0_0_8px_rgba(0,240,255,0.4)] mb-4">
                Your Rights
              </h2>
              <div className="prose prose-lg max-w-none text-warm-white/90">
                <p>
                  You have rights when it comes to your personal information:
                </p>
                <ul className="space-y-2 ml-6 list-disc">
                  <li><strong>Access:</strong> You can ask to see what data we have about you</li>
                  <li><strong>Correction:</strong> If something's wrong, we'll fix it</li>
                  <li><strong>Deletion:</strong> You can request that we delete your information (with some exceptions for legal/tax requirements)</li>
                  <li><strong>Opt-out:</strong> You can unsubscribe from emails at any time</li>
                </ul>
                <p className="mt-4">
                  To exercise any of these rights, just reach out to us directly. We'll do our best to help.
                </p>
              </div>
            </section>
            </MotionReveal>

            {/* Cookies */}
            <MotionReveal delay={0.30}>
            <section>
              <h2 className="text-2xl font-serif font-bold text-primary drop-shadow-[0_0_8px_rgba(0,240,255,0.4)] mb-4">
                Cookies & Tracking
              </h2>
              <div className="prose prose-lg max-w-none text-warm-white/90">
                <p>
                  Like most websites, we use cookies to make the site work properly. These are small files 
                  stored on your device that help with things like:
                </p>
                <ul className="space-y-2 ml-6 list-disc">
                  <li>Keeping items in your shopping cart</li>
                  <li>Remembering your preferences</li>
                  <li>Making the site function correctly</li>
                </ul>
                <p className="mt-4">
                  We don't use cookies for tracking you across the internet or building advertising profiles. 
                  If you want to disable cookies, you can do so in your browser settings, but some parts of 
                  the site might not work properly.
                </p>
              </div>
            </section>
            </MotionReveal>

            {/* Changes to Policy */}
            <MotionReveal delay={0.35}>
            <section>
              <h2 className="text-2xl font-serif font-bold text-primary drop-shadow-[0_0_8px_rgba(0,240,255,0.4)] mb-4">
                Changes to This Policy
              </h2>
              <div className="prose prose-lg max-w-none text-warm-white/90">
                <p>
                  We may update this privacy policy from time to time. If we make significant changes, 
                  we'll update the "Last updated" date at the top of this page. We recommend checking 
                  back occasionally.
                </p>
              </div>
            </section>
            </MotionReveal>

            {/* Contact */}
            <MotionReveal delay={0.40}>
            <section className="bg-gradient-to-br from-terracotta/5 to-sage/5 rounded-xl p-6">
              <h2 className="text-2xl font-serif font-bold text-primary drop-shadow-[0_0_8px_rgba(0,240,255,0.4)] mb-4">
                Questions or Concerns?
              </h2>
              <div className="prose prose-lg max-w-none text-warm-white/90">
                <p>
                  This is a small business run by real people. If you have any questions about how we 
                  handle your information, or if you want to exercise your privacy rights, please don't 
                  hesitate to reach out.
                </p>
                <p className="mt-4">
                  You can contact us through:
                </p>
                <ul className="space-y-2 ml-6 list-disc">
                  <li>Instagram (check our footer for the link)</li>
                  <li>Email (if you have it from your order confirmation)</li>
                  <li>Our contact page</li>
                </ul>
                <p className="mt-4 font-semibold">
                  We'll get back to you as soon as we can—usually within a day or two!
                </p>
              </div>
            </section>
            </MotionReveal>

            {/* Bottom Note */}
            <div className="border-t pt-6 mt-8">
              <p className="text-sm text-warm-white/80 italic">
                Thank you for trusting us with your information. We're a small handmade business that truly 
                cares about our customers and your privacy. We promise to treat your data with the same care 
                and respect we put into every piece we create. 💚
              </p>
            </div>

          </div>
        </div>
      </section>
    </main>
  )
}
