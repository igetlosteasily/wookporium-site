'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface FAQItem {
    question: string
    answer: string
}

interface FAQAccordionProps {
    items: FAQItem[]
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(0)

    return (
        <div className="space-y-4">
            {items.map((item, index) => (
                <div
                    key={index}
                    className="glass-light glass-shadow rounded-xl overflow-hidden transition-all duration-300 border border-white/20"
                >
                    <button
                        onClick={() => setOpenIndex(openIndex === index ? null : index)}
                        className="w-full px-6 py-5 flex items-center justify-between text-left group"
                        aria-expanded={openIndex === index}
                    >
                        <span className="text-lg font-semibold text-dark-brown group-hover:text-primary transition-colors">
                            {item.question}
                        </span>
                        <span className={`text-2xl text-primary transition-transform duration-300 ${openIndex === index ? 'rotate-45' : 'rotate-0'}`}>
                            +
                        </span>
                    </button>

                    <AnimatePresence>
                        {openIndex === index && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                            >
                                <div className="px-6 pb-6 text-gray-700 leading-relaxed border-t border-black/5 pt-4">
                                    {item.answer}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}
        </div>
    )
}
