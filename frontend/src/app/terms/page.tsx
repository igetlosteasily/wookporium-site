/**
 * Terms of Service Page
 * Legal agreement for Wookporium customers
 */

import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Wookporium Terms of Service - The rules of the road for our handmade shop',
}

export default function TermsPage() {
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

          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary drop-shadow-[0_0_8px_rgba(0,240,255,0.4)] mb-4">
            Terms of Service
          </h1>

          <p className="text-lg text-warm-white/80 mb-8">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>

          <div className="bg-surface-dark/80 backdrop-blur-md border border-white/10 glass-shadow-lg rounded-2xl shadow-lg p-8 md:p-12 space-y-8">

            {/* Intro */}
            <div className="prose prose-lg max-w-none text-warm-white/90">
              <p className="lead text-xl">
                Welcome to Wookporium! By visiting our site and/or purchasing something from us, you engage in our "Service"
                and agree to be bound by the following terms and conditions.
              </p>
              <p>
                These Terms of Service apply to all users of the site, including without limitation users who are browsers,
                vendors, customers, merchants, and/or contributors of content.
              </p>
            </div>

            {/* General Conditions */}
            <section>
              <h2 className="text-2xl font-serif font-bold text-primary drop-shadow-[0_0_8px_rgba(0,240,255,0.4)] mb-4">
                1. General Conditions
              </h2>
              <div className="prose prose-lg max-w-none text-warm-white/90">
                <p>
                  We reserve the right to refuse service to anyone for any reason at any time. You understand that your content
                  (not including credit card information), may be transferred unencrypted and involve transmissions over various networks.
                </p>
                <p>
                  You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of the Service, use of the Service,
                  or access to the Service or any contact on the website through which the service is provided, without express
                  written permission by us.
                </p>
              </div>
            </section>

            {/* Products & Services */}
            <section className="bg-accent/10 border border-accent/20 rounded-xl p-6 border-l-4 border-accent">
              <h2 className="text-2xl font-serif font-bold text-primary drop-shadow-[0_0_8px_rgba(0,240,255,0.4)] mb-4">
                2. Handmade Products
              </h2>
              <div className="prose prose-lg max-w-none text-warm-white/90">
                <p>
                  <strong>Please Note:</strong> Key aspect of our business!
                </p>
                <p>
                  Every item at Wookporium is handcrafted. This means:
                </p>
                <ul className="list-disc ml-6 mt-2 space-y-2">
                  <li>Small variations in color, texture, and size should be expected and celebrated.</li>
                  <li>These are not factory-made defects, but rather the charm of handmade goods.</li>
                  <li>We have made every effort to display as accurately as possible the colors and images of our products.</li>
                  <li>We cannot guarantee that your computer monitor's display of any color will be accurate.</li>
                </ul>
              </div>
            </section>

            {/* Modifications */}
            <section>
              <h2 className="text-2xl font-serif font-bold text-primary drop-shadow-[0_0_8px_rgba(0,240,255,0.4)] mb-4">
                3. Modifications to the Service and Prices
              </h2>
              <div className="prose prose-lg max-w-none text-warm-white/90">
                <p>
                  Prices for our products are subject to change without notice. We reserve the right at any time to modify or
                  discontinue the Service (or any part or content thereof) without notice at any time.
                </p>
                <p>
                  We shall not be liable to you or to any third-party for any modification, price change, suspension, or
                  discontinuance of the Service.
                </p>
              </div>
            </section>

            {/* Billing */}
            <section>
              <h2 className="text-2xl font-serif font-bold text-primary drop-shadow-[0_0_8px_rgba(0,240,255,0.4)] mb-4">
                4. Billing and Account Information
              </h2>
              <div className="prose prose-lg max-w-none text-warm-white/90">
                <p>
                  We reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or cancel
                  quantities purchased per person, per household or per order.
                </p>
                <p>
                  You agree to provide current, complete, and accurate purchase and account information for all purchases made
                  at our store. You agree to promptly update your account and other information, including your email address
                  and credit card numbers and expiration dates, so that we can complete your transactions and contact you as needed.
                </p>
              </div>
            </section>

            {/* Returns & Refunds */}
            <section>
              <h2 className="text-2xl font-serif font-bold text-primary drop-shadow-[0_0_8px_rgba(0,240,255,0.4)] mb-4">
                5. Returns & Refunds
              </h2>
              <div className="prose prose-lg max-w-none text-warm-white/90">
                <p>
                  Because of the handmade nature of our items, we handle returns on a case-by-case basis.
                </p>
                <ul className="list-disc ml-6 mt-2 space-y-2">
                  <li><strong>Custom Orders:</strong> Generally non-refundable unless there is a defect in crafting.</li>
                  <li><strong>Standard Items:</strong> May be returned within 14 days of receipt for store credit or exchange only.</li>
                  <li>Items must be unworn, unwashed, and in original condition.</li>
                  <li>Buyer is responsible for return shipping costs.</li>
                </ul>
              </div>
            </section>

            {/* Third-Party Links */}
            <section>
              <h2 className="text-2xl font-serif font-bold text-primary drop-shadow-[0_0_8px_rgba(0,240,255,0.4)] mb-4">
                6. Third-Party Links
              </h2>
              <div className="prose prose-lg max-w-none text-warm-white/90">
                <p>
                  Certain content, products and services available via our Service may include materials from third-parties.
                  Third-party links on this site may direct you to third-party websites that are not affiliated with us.
                  We are not responsible for examining or evaluating the content or accuracy and we do not warrant and will
                  not have any liability or responsibility for any third-party materials or websites.
                </p>
              </div>
            </section>

            {/* Personal Info */}
            <section>
              <h2 className="text-2xl font-serif font-bold text-primary drop-shadow-[0_0_8px_rgba(0,240,255,0.4)] mb-4">
                7. Personal Information
              </h2>
              <div className="prose prose-lg max-w-none text-warm-white/90">
                <p>
                  Your submission of personal information through the store is governed by our Privacy Policy.
                  <Link href="/privacy" className="text-accent drop-shadow-[0_0_8px_rgba(176,38,255,0.4)] hover:underline ml-1">
                    View our Privacy Policy.
                  </Link>
                </p>
              </div>
            </section>

            {/* Governing Law */}
            <section>
              <h2 className="text-2xl font-serif font-bold text-primary drop-shadow-[0_0_8px_rgba(0,240,255,0.4)] mb-4">
                8. Governing Law
              </h2>
              <div className="prose prose-lg max-w-none text-warm-white/90">
                <p>
                  These Terms of Service and any separate agreements whereby we provide you Services shall be governed by and
                  construed in accordance with the laws of the United States.
                </p>
              </div>
            </section>

            {/* Changes to Terms */}
            <section>
              <h2 className="text-2xl font-serif font-bold text-primary drop-shadow-[0_0_8px_rgba(0,240,255,0.4)] mb-4">
                9. Changes to Terms of Service
              </h2>
              <div className="prose prose-lg max-w-none text-warm-white/90">
                <p>
                  You can review the most current version of the Terms of Service at any time at this page.
                  We reserve the right, at our sole discretion, to update, change or replace any part of these Terms of Service
                  by posting updates and changes to our website. It is your responsibility to check our website periodically for changes.
                </p>
              </div>
            </section>

            {/* Contact Info */}
            <section className="bg-sage/5 rounded-xl p-6 mt-8">
              <h2 className="text-2xl font-serif font-bold text-primary drop-shadow-[0_0_8px_rgba(0,240,255,0.4)] mb-4">
                Contact Information
              </h2>
              <div className="prose prose-lg max-w-none text-warm-white/90">
                <p>
                  Questions about the Terms of Service should be sent to us.
                </p>
                <div className="mt-4">
                  <Link href="/about#contact" className="btn-primary inline-block">
                    Contact Us
                  </Link>
                </div>
              </div>
            </section>

          </div>
        </div>
      </section>
    </main>
  )
}
