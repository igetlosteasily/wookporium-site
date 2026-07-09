/**
 * PortableText Component
 * Renders Sanity's Portable Text (rich text) content using @portabletext/react
 * Includes custom styling for all block types, marks, and lists
 */

import { PortableText as PortableTextReact } from '@portabletext/react'
import Link from 'next/link'
import Image from 'next/image'

interface PortableTextProps {
 content: any[]
 className?: string
}

/**
 * Custom components for rich text rendering
 * Applies Desert Dust design system styling
 */
const components = {
 // Block-level elements
 block: {
 // Headings
 h1: ({ children }: { children?: React.ReactNode }) => (
 <h1 className="text-4xl md:text-5xl font-bold mb-6 font-serif leading-tight">
 {children}
 </h1>
 ),
 h2: ({ children }: { children?: React.ReactNode }) => (
 <h2 className="text-3xl md:text-4xl font-bold mb-5 font-serif leading-tight">
 {children}
 </h2>
 ),
 h3: ({ children }: { children?: React.ReactNode }) => (
 <h3 className="text-2xl md:text-3xl font-semibold mb-4 font-serif leading-snug">
 {children}
 </h3>
 ),
 h4: ({ children }: { children?: React.ReactNode }) => (
 <h4 className="text-xl md:text-2xl font-semibold mb-3 leading-snug">
 {children}
 </h4>
 ),
 h5: ({ children }: { children?: React.ReactNode }) => (
 <h5 className="text-lg md:text-xl font-semibold mb-2 leading-snug">
 {children}
 </h5>
 ),
 h6: ({ children }: { children?: React.ReactNode }) => (
 <h6 className="text-base md:text-lg font-semibold mb-2 leading-snug">
 {children}
 </h6>
 ),

 // Paragraph
 normal: ({ children }: { children?: React.ReactNode }) => (
 <p className="mb-4 leading-relaxed text-base md:text-lg">
 {children}
 </p>
 ),

 // Blockquote
 blockquote: ({ children }: { children?: React.ReactNode }) => (
 <blockquote className="border-l-4 border-primary pl-6 py-2 my-6 italic text-lg md:text-xl bg-primary/10 border border-primary/20 backdrop-blur-sm rounded-r-lg">
 {children}
 </blockquote>
 ),
 },

 // List elements
 list: {
 // Bullet list
 bullet: ({ children }: { children?: React.ReactNode }) => (
 <ul className="mb-6 space-y-2 list-disc list-inside text-base md:text-lg">
 {children}
 </ul>
 ),
 // Numbered list
 number: ({ children }: { children?: React.ReactNode }) => (
 <ol className="mb-6 space-y-2 list-decimal list-inside text-base md:text-lg">
 {children}
 </ol>
 ),
 },

 // List item
 listItem: {
 // Bullet list item
 bullet: ({ children }: { children?: React.ReactNode }) => (
 <li className="leading-relaxed ml-4">
 <span className="text-primary mr-2">•</span>
 {children}
 </li>
 ),
 // Numbered list item
 number: ({ children }: { children?: React.ReactNode }) => (
 <li className="leading-relaxed ml-4">{children}</li>
 ),
 },

 // Inline marks (text formatting)
 marks: {
 // Strong (bold)
 strong: ({ children }: { children?: React.ReactNode }) => (
 <strong className="font-bold ">{children}</strong>
 ),

 // Emphasis (italic)
 em: ({ children }: { children?: React.ReactNode }) => (
 <em className="italic">{children}</em>
 ),

 // Underline
 underline: ({ children }: { children?: React.ReactNode }) => (
 <span className="underline decoration-primary decoration-2 underline-offset-2">
 {children}
 </span>
 ),

 // Strike-through
 'strike-through': ({ children }: { children?: React.ReactNode }) => (
 <span className="line-through opacity-70">{children}</span>
 ),

 // Code (inline)
 code: ({ children }: { children?: React.ReactNode }) => (
 <code className="bg-secondary/20 border border-secondary/30 px-2 py-1 rounded font-mono text-sm">
 {children}
 </code>
 ),

 // Links - both internal and external
 link: ({ 
 value, 
 children 
 }: { 
 value?: { href?: string; blank?: boolean }
 children?: React.ReactNode 
 }) => {
 const href = value?.href || '#'
 const isInternal = href.startsWith('/')
 const target = value?.blank ? '_blank' : undefined
 const rel = value?.blank ? 'noopener noreferrer' : undefined

 if (isInternal) {
 return (
 <Link
 href={href}
 className="text-primary hover:text-primary/80 underline decoration-2 underline-offset-2 transition-colors font-semibold"
 >
 {children}
 </Link>
 )
 }

 return (
 <a
 href={href}
 target={target}
 rel={rel}
 className="text-primary hover:text-primary/80 underline decoration-2 underline-offset-2 transition-colors font-semibold"
 >
 {children}
 </a>
 )
 },
 },

 // Custom types (if you add them later)
 types: {
 // Image block
 image: ({ 
 value 
 }: { 
 value?: { 
 asset?: { url?: string }
 alt?: string
 caption?: string
 } 
 }) => {
 if (!value?.asset?.url) return null

 return (
 <figure className="my-8">
 <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg">
 <Image
 src={value.asset.url}
 alt={value.alt || 'Image'}
 fill
 className="object-cover"
 sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
 />
 </div>
 {value.caption && (
 <figcaption className="mt-3 text-sm italic text-center">
 {value.caption}
 </figcaption>
 )}
 </figure>
 )
 },

 // Code block
 code: ({ 
 value 
 }: { 
 value?: { 
 code?: string
 language?: string
 filename?: string
 } 
 }) => {
 if (!value?.code) return null

 return (
 <div className="my-6">
 {value.filename && (
 <div className="bg-sage/10 px-4 py-2 rounded-t-lg border-b border-sage/20 text-sm font-mono ">
 {value.filename}
 </div>
 )}
 <pre className="bg-dark-brown text-cream-light p-4 rounded-b-lg overflow-x-auto">
 <code className={`language-${value.language || 'text'}`}>
 {value.code}
 </code>
 </pre>
 </div>
 )
 },
 },
}

/**
 * PortableText Component
 * 
 * @param content - Array of Portable Text blocks from Sanity
 * @param className - Optional CSS classes for container
 */
export default function PortableText({ content, className = '' }: PortableTextProps) {
 if (!content || content.length === 0) {
 return null
 }

 return (
 <div className={`prose prose-lg max-w-none ${className}`}>
 <PortableTextReact 
 value={content} 
 components={components}
 />
 </div>
 )
}
