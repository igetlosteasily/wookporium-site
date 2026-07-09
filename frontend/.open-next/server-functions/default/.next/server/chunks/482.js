exports.id=482,exports.ids=[482],exports.modules={18966:(e,t,r)=>{Promise.resolve().then(r.t.bind(r,59607,23)),Promise.resolve().then(r.bind(r,19031)),Promise.resolve().then(r.bind(r,53491)),Promise.resolve().then(r.bind(r,88976))},14238:(e,t,r)=>{Promise.resolve().then(r.t.bind(r,28531,23)),Promise.resolve().then(r.bind(r,55611)),Promise.resolve().then(r.bind(r,47071)),Promise.resolve().then(r.bind(r,25516))},7260:(e,t,r)=>{Promise.resolve().then(r.t.bind(r,13219,23)),Promise.resolve().then(r.t.bind(r,34863,23)),Promise.resolve().then(r.t.bind(r,25155,23)),Promise.resolve().then(r.t.bind(r,40802,23)),Promise.resolve().then(r.t.bind(r,9350,23)),Promise.resolve().then(r.t.bind(r,48530,23)),Promise.resolve().then(r.t.bind(r,88921,23))},65404:(e,t,r)=>{Promise.resolve().then(r.t.bind(r,66959,23)),Promise.resolve().then(r.t.bind(r,33875,23)),Promise.resolve().then(r.t.bind(r,88903,23)),Promise.resolve().then(r.t.bind(r,57174,23)),Promise.resolve().then(r.t.bind(r,84178,23)),Promise.resolve().then(r.t.bind(r,87190,23)),Promise.resolve().then(r.t.bind(r,61365,23))},55611:(e,t,r)=>{"use strict";r.d(t,{default:()=>c});var a=r(45512),s=r(58009),o=r(55740),i=r(28531),n=r.n(i),l=r(79334);function c({className:e=""}){let[t,r]=(0,s.useState)(!1),[i,c]=(0,s.useState)(!1),[f,x]=(0,s.useState)(0),[g,b]=(0,s.useState)(!1),v=(0,l.usePathname)();(0,s.useCallback)(()=>{},[]);let w=[{href:"/",label:"Home"},{href:"/collections",label:"Collections"},{href:"/about",label:"About"}],y=[{href:"/products",label:"All Products"},{href:"/products?category=tops",label:"Tops"},{href:"/products?category=bottoms",label:"Bottoms"},{href:"/products?category=outerwear",label:"Outerwear"},{href:"/products?category=headwear",label:"Headwear"},{href:"/products?category=jewelry",label:"Jewelry"},{href:"/products?category=accessories",label:"Accessories"},{href:"/products?category=knick-knacks",label:"Knick-knacks"}];return(0,a.jsx)("header",{className:`sticky top-0 z-50 glass-light glass-shadow transition-all duration-300 ${e}`,children:(0,a.jsxs)("nav",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8","aria-label":"Main navigation",children:[(0,a.jsxs)("div",{className:"flex items-center justify-between h-16",children:[(0,a.jsx)(n(),{href:"/",className:"flex items-center space-x-2 focus-visible-ring rounded-lg",children:(0,a.jsx)("span",{className:"text-2xl sm:text-3xl font-header font-bold text-primary",children:"Wookporium"})}),(0,a.jsxs)("div",{className:"hidden lg:flex lg:items-center lg:space-x-8",children:[w.map(e=>(0,a.jsx)(n(),{href:e.href,className:`
                  text-lg font-semibold transition-colors duration-200
                  focus-visible-ring rounded-lg px-3 py-2
                  ${v===e.href?"text-primary":"text-dark-brown hover:text-primary"}
                `,children:e.label},e.href)),(0,a.jsxs)("div",{className:"relative",onBlur:e=>{e.currentTarget.contains(e.relatedTarget)||c(!1)},children:[(0,a.jsxs)("button",{onClick:()=>c(!i),className:`
                  text-lg font-semibold transition-colors duration-200
                  focus-visible-ring rounded-lg px-3 py-2 flex items-center gap-1
                  ${v.startsWith("/products")?"text-primary":"text-dark-brown hover:text-primary"}
                `,"aria-expanded":i,"aria-haspopup":"true",children:["Shop",(0,a.jsx)("svg",{className:"w-4 h-4",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,a.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M19 9l-7 7-7-7"})})]}),i&&(0,a.jsx)("div",{className:"absolute top-full left-0 mt-2 w-48 glass-light rounded-lg glass-shadow border-white/20 py-2 z-50",children:y.map(e=>(0,a.jsx)(n(),{href:e.href,className:"block px-4 py-2 text-dark-brown hover:bg-cream hover:text-primary transition-colors",onClick:()=>c(!1),children:e.label},e.href))})]}),(0,a.jsxs)("button",{onClick:()=>{},className:"btn-primary relative min-w-[44px] min-h-[44px] flex items-center gap-2","aria-label":`Shopping cart with ${f} items`,children:[(0,a.jsx)(u,{}),f>0&&(0,a.jsx)("span",{className:"absolute -top-2 -right-2 bg-accent text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center","aria-live":"polite",children:f}),(0,a.jsx)("span",{className:"hidden sm:inline",children:"Cart"})]})]}),(0,a.jsxs)("div",{className:"flex items-center gap-2 lg:hidden",children:[(0,a.jsxs)("button",{onClick:()=>{},className:"relative p-2 text-primary hover:bg-cream rounded-lg transition-colors min-w-[44px] min-h-[44px]","aria-label":`Shopping cart with ${f} items`,children:[(0,a.jsx)(u,{}),f>0&&(0,a.jsx)("span",{className:"absolute -top-1 -right-1 bg-accent text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center","aria-live":"polite",children:f})]}),(0,a.jsx)("button",{onClick:()=>{r(!t)},className:"p-2 text-dark-brown hover:bg-cream rounded-lg transition-colors min-w-[44px] min-h-[44px]","aria-label":t?"Close menu":"Open menu","aria-expanded":t,"aria-controls":"mobile-menu",children:t?(0,a.jsx)(m,{}):(0,a.jsx)(d,{})})]})]}),t&&g&&(0,o.createPortal)((0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("div",{className:"fixed inset-0 bg-black/50 lg:hidden animate-fade-in z-[60]",onClick:()=>r(!1),"aria-hidden":"true"}),(0,a.jsx)("div",{id:"mobile-menu",className:"fixed top-16 left-0 right-0 bottom-0 bg-dark-brown/95 backdrop-blur-xl lg:hidden overflow-y-auto animate-slide-up z-[60]",children:(0,a.jsxs)("div",{className:"px-4 pt-6 pb-8 space-y-4",children:[w.map(e=>(0,a.jsx)(n(),{href:e.href,className:`
                      block text-xl font-semibold py-3 px-4 rounded-lg transition-colors
                      focus-visible-ring
                      ${v===e.href?"bg-cream text-primary":"text-warm-white hover:bg-cream hover:text-primary"}
                    `,onClick:()=>r(!1),children:e.label},e.href)),(0,a.jsxs)("div",{className:"pt-4 border-t border-secondary/20",children:[(0,a.jsx)("p",{className:"text-sm font-semibold text-warm-white/70 uppercase tracking-wide mb-3 px-4",children:"Shop by Category"}),y.map(e=>(0,a.jsx)(n(),{href:e.href,className:`
                        block text-lg font-semibold py-3 px-4 rounded-lg transition-colors
                        focus-visible-ring
                        ${v===e.href?"bg-cream text-primary":"text-warm-white hover:bg-cream hover:text-primary"}
                      `,onClick:()=>r(!1),children:e.label},e.href))]}),(0,a.jsxs)("div",{className:"pt-8 mt-8 border-t border-secondary/20",children:[(0,a.jsx)("p",{className:"text-sm font-semibold text-warm-white/70 uppercase tracking-wide mb-4",children:"Connect With Us"}),(0,a.jsxs)("div",{className:"flex gap-4",children:[(0,a.jsx)("a",{href:"https://instagram.com/wookporium",target:"_blank",rel:"noopener noreferrer",className:"p-3 bg-cream text-primary hover:bg-primary hover:text-white rounded-lg transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center","aria-label":"Follow us on Instagram",children:(0,a.jsx)(h,{})}),(0,a.jsx)("a",{href:"https://facebook.com/wookporium",target:"_blank",rel:"noopener noreferrer",className:"p-3 bg-cream text-primary hover:bg-primary hover:text-white rounded-lg transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center","aria-label":"Follow us on Facebook",children:(0,a.jsx)(p,{})})]})]})]})})]}),document.body)]})})}function d(){return(0,a.jsx)("svg",{className:"w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24","aria-hidden":"true",children:(0,a.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M4 6h16M4 12h16M4 18h16"})})}function m(){return(0,a.jsx)("svg",{className:"w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24","aria-hidden":"true",children:(0,a.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M6 18L18 6M6 6l12 12"})})}function u(){return(0,a.jsx)("svg",{className:"w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24","aria-hidden":"true",children:(0,a.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"})})}function h(){return(0,a.jsx)("svg",{className:"w-6 h-6",fill:"currentColor",viewBox:"0 0 24 24","aria-hidden":"true",children:(0,a.jsx)("path",{d:"M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"})})}function p(){return(0,a.jsx)("svg",{className:"w-6 h-6",fill:"currentColor",viewBox:"0 0 24 24","aria-hidden":"true",children:(0,a.jsx)("path",{d:"M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"})})}},47071:(e,t,r)=>{"use strict";r.d(t,{default:()=>o});var a=r(45512),s=r(67338);function o({children:e}){return(0,a.jsx)(s.zE,{children:e})}},25516:(e,t,r)=>{"use strict";function a(){return null}r.d(t,{default:()=>a}),r(45512),r(58009)},7752:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>f,metadata:()=>p});var a=r(62740);r(35692);var s=r(88976),o=r(19031),i=r(59607),n=r.n(i),l=r(25738);async function c(){let e=await (0,l.By)(),t=new Date().getFullYear();return(0,a.jsxs)("footer",{className:"relative mt-20",children:[(0,a.jsx)("div",{className:"absolute inset-0 bg-gradient-to-t from-[#2c1810] via-[#3d2e29] to-transparent opacity-90 -z-10"}),(0,a.jsxs)("div",{className:"glass-dark glass-shadow-xl border-t border-white/10 backdrop-blur-xl",children:[(0,a.jsx)("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16",children:(0,a.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8",children:[(0,a.jsxs)("div",{className:"space-y-4",children:[(0,a.jsx)("h3",{className:"text-2xl font-header font-bold text-primary",children:"Wookporium"}),(0,a.jsx)("p",{className:"text-warm-white/80 text-sm leading-relaxed",children:e?.tagline||"Handcrafted festival apparel and natural jewelry for your journey"}),(0,a.jsxs)("div",{className:"flex gap-4 pt-2",children:[e?.instagramHandle&&(0,a.jsx)("a",{href:`https://instagram.com/${e.instagramHandle}`,target:"_blank",rel:"noopener noreferrer",className:"text-warm-white hover:text-primary transition-colors p-2 hover:bg-warm-white/10 rounded-lg","aria-label":"Follow us on Instagram",children:(0,a.jsx)(d,{})}),e?.facebookUrl&&(0,a.jsx)("a",{href:e.facebookUrl,target:"_blank",rel:"noopener noreferrer",className:"text-warm-white hover:text-primary transition-colors p-2 hover:bg-warm-white/10 rounded-lg","aria-label":"Follow us on Facebook",children:(0,a.jsx)(m,{})}),e?.tiktokHandle&&(0,a.jsx)("a",{href:`https://tiktok.com/@${e.tiktokHandle}`,target:"_blank",rel:"noopener noreferrer",className:"text-warm-white hover:text-primary transition-colors p-2 hover:bg-warm-white/10 rounded-lg","aria-label":"Follow us on TikTok",children:(0,a.jsx)(u,{})})]})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("h4",{className:"text-lg font-semibold mb-4 text-primary",children:"Shop"}),(0,a.jsx)("ul",{className:"space-y-2",children:[{href:"/products",label:"All Products"},{href:"/products?category=tops",label:"Tops"},{href:"/products?category=bottoms",label:"Bottoms"},{href:"/products?category=outerwear",label:"Outerwear"},{href:"/products?category=headwear",label:"Headwear"},{href:"/products?category=jewelry",label:"Jewelry"},{href:"/products?category=accessories",label:"Accessories"},{href:"/products?category=knick-knacks",label:"Knick-knacks"}].map(e=>(0,a.jsx)("li",{children:(0,a.jsx)(n(),{href:e.href,className:"text-warm-white/80 hover:text-primary transition-colors text-sm",children:e.label})},e.href))})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("h4",{className:"text-lg font-semibold mb-4 text-primary",children:"Info"}),(0,a.jsx)("ul",{className:"space-y-2",children:[{href:"/about",label:"About Us"},{href:"/contact",label:"Contact"},{href:"/faq",label:"FAQ"},{href:"/shipping-returns",label:"Shipping & Returns"}].map(e=>(0,a.jsx)("li",{children:(0,a.jsx)(n(),{href:e.href,className:"text-warm-white/80 hover:text-primary transition-colors text-sm",children:e.label})},e.href))})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("h4",{className:"text-lg font-semibold mb-4 text-primary",children:"Stay Connected"}),(0,a.jsx)("p",{className:"text-warm-white/80 text-sm mb-4",children:"Follow us on social media for new drops, festival updates, and behind-the-scenes!"}),e?.email&&(0,a.jsx)("a",{href:`mailto:${e.email}`,className:"text-primary hover:text-primary-light transition-colors text-sm font-semibold inline-block",children:"Get in Touch →"})]})]})}),(0,a.jsx)("div",{className:"border-t border-warm-white/20",children:(0,a.jsx)("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6",children:(0,a.jsxs)("div",{className:"flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-warm-white/60",children:[(0,a.jsxs)("p",{children:["\xa9 ",t," Wookporium. All rights reserved. Made with \uD83D\uDC9A"]}),(0,a.jsxs)("div",{className:"flex gap-6",children:[(0,a.jsx)(n(),{href:"/privacy",className:"hover:text-primary transition-colors",children:"Privacy Policy"}),(0,a.jsx)(n(),{href:"/terms",className:"hover:text-primary transition-colors",children:"Terms of Service"})]})]})})})]})]})}function d(){return(0,a.jsx)("svg",{className:"w-6 h-6",fill:"currentColor",viewBox:"0 0 24 24","aria-hidden":"true",children:(0,a.jsx)("path",{d:"M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"})})}function m(){return(0,a.jsx)("svg",{className:"w-6 h-6",fill:"currentColor",viewBox:"0 0 24 24","aria-hidden":"true",children:(0,a.jsx)("path",{d:"M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"})})}function u(){return(0,a.jsx)("svg",{className:"w-6 h-6",fill:"currentColor",viewBox:"0 0 24 24","aria-hidden":"true",children:(0,a.jsx)("path",{d:"M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"})})}var h=r(53491);let p={metadataBase:new URL("https://wookporium.com"),title:{default:"Wookporium | Handmade Festival Fashion & Natural Jewelry",template:"%s | Wookporium"},description:"Unique handmade festival clothing, crochet apparel, and natural jewelry. Sustainable, comfortable, and designed for the festival community. One-of-a-kind pieces crafted with love.",keywords:["festival fashion","handmade clothing","festival jewelry","crochet apparel","natural jewelry","sustainable fashion","bohemian clothing","rave wear","festival accessories","handcrafted jewelry"],authors:[{name:"Wookporium"}],creator:"Wookporium",openGraph:{type:"website",locale:"en_US",url:"https://wookporium.com",siteName:"Wookporium",title:"Wookporium | Handmade Festival Fashion & Natural Jewelry",description:"Unique handmade festival clothing and natural jewelry. Sustainable, comfortable, and designed for the festival community.",images:[{url:"/og-image.jpg",width:1200,height:630,alt:"Wookporium - Handmade Festival Fashion"}]},twitter:{card:"summary_large_image",title:"Wookporium | Handmade Festival Fashion",description:"Unique handmade festival clothing and natural jewelry crafted with love.",images:["/og-image.jpg"]},robots:{index:!0,follow:!0,googleBot:{index:!0,follow:!0,"max-video-preview":-1,"max-image-preview":"large","max-snippet":-1}},verification:{google:"your-google-verification-code"},manifest:"/manifest.json",appleWebApp:{capable:!0,statusBarStyle:"default",title:"Wookporium"},formatDetection:{telephone:!1},icons:{icon:[{url:"/icons/icon-192x192.png",sizes:"192x192",type:"image/png"},{url:"/icons/icon-512x512.png",sizes:"512x512",type:"image/png"}],apple:[{url:"/icons/icon-152x152.png",sizes:"152x152",type:"image/png"},{url:"/icons/icon-192x192.png",sizes:"192x192",type:"image/png"}]}};function f({children:e}){return(0,a.jsxs)("html",{lang:"en",className:"scroll-smooth",children:[(0,a.jsxs)("head",{children:[(0,a.jsx)("link",{rel:"preconnect",href:"https://cdn.snipcart.com",crossOrigin:"anonymous"}),(0,a.jsx)("link",{rel:"stylesheet",href:"https://cdn.snipcart.com/themes/v3.4.1/default/snipcart.css"})]}),(0,a.jsxs)("body",{className:"min-h-screen bg-deep-bg text-warm-white antialiased selection:bg-secondary selection:text-white",children:[(0,a.jsxs)(h.default,{children:[(0,a.jsx)(o.default,{}),(0,a.jsx)("main",{className:"flex-grow",children:e}),(0,a.jsx)(c,{})]}),(0,a.jsx)(s.default,{})]})]})}},19031:(e,t,r)=>{"use strict";r.d(t,{default:()=>a});let a=(0,r(46760).registerClientReference)(function(){throw Error("Attempted to call the default export of \"/home/submariner/projects/wookporium-ecommerce/frontend/src/components/Navigation.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"/home/submariner/projects/wookporium-ecommerce/frontend/src/components/Navigation.tsx","default")},53491:(e,t,r)=>{"use strict";r.d(t,{default:()=>a});let a=(0,r(46760).registerClientReference)(function(){throw Error("Attempted to call the default export of \"/home/submariner/projects/wookporium-ecommerce/frontend/src/components/Providers.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"/home/submariner/projects/wookporium-ecommerce/frontend/src/components/Providers.tsx","default")},88976:(e,t,r)=>{"use strict";r.d(t,{default:()=>a});let a=(0,r(46760).registerClientReference)(function(){throw Error("Attempted to call the default export of \"/home/submariner/projects/wookporium-ecommerce/frontend/src/components/SnipcartProvider.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"/home/submariner/projects/wookporium-ecommerce/frontend/src/components/SnipcartProvider.tsx","default")},25738:(e,t,r)=>{"use strict";r.d(t,{By:()=>i,Fk:()=>b,Sn:()=>o,Sz:()=>v,ZC:()=>x,bA:()=>h,d$:()=>n,lw:()=>f,oo:()=>c,pL:()=>p,sm:()=>g,zQ:()=>m,zc:()=>u});var a=r(668),s=r(96408);let o=(0,a.UU)({projectId:"7iiji3rf",dataset:"production",apiVersion:"2023-05-03",useCdn:!0});async function i(){try{return await o.fetch(`*[_type == "business"][0] {
        _id,
        brandName,
        tagline,
        logo {
          asset-> {
            url
          }
        },
        brandStory,
        heroTitle,
        heroSubtitle,
        heroImage {
          asset-> {
            url
          }
        },
        homepageIntro,
        instagramHandle,
        facebookUrl,
        tiktokHandle,
        email,
        seoDescription,
        seoKeywords
      }`)||null}catch(e){return console.error("Failed to fetch business info:",e),null}}async function n(){try{return await o.fetch(`*[_type == "product" && isAvailable == true] | order(_createdAt desc) {
        _id,
        _updatedAt,
        title,
        slug,
        price,
        "mainImageUrl": mainImage.asset->url,
        category,
        featured,
        isOneOfAKind,
        festivalAttribution
      }`)||[]}catch(e){return console.error("Failed to fetch products:",e),[]}}async function l(){try{return await o.fetch(`*[_type == "product" && isAvailable == true && featured == true] | order(_createdAt desc) {
        _id,
        _updatedAt,
        title,
        slug,
        price,
        "mainImageUrl": mainImage.asset->url,
        category,
        featured,
        isOneOfAKind,
        festivalAttribution
      }`)||[]}catch(e){return console.error("Failed to fetch featured products:",e),[]}}async function c(e){try{return await o.fetch(`*[_type == "product" && slug.current == $slug][0] {
        _id,
        title,
        slug,
        description,
        price,
        compareAtPrice,
        inventory,
        isAvailable,
        mainImage {
          asset-> {
            url
          }
        },
        gallery[] {
          asset-> {
            url
          }
        },
        category,
        tags,
        festivalAttribution,
        featured,
        isOneOfAKind,
        materials,
        careInstructions,
        weight,
        hasVariants,
        variants[] {
          variantName,
          sku,
          priceAdjustment,
          inventory,
          variantImage {
            asset-> {
              url
            }
          }
        },
        seoTitle,
        seoDescription
      }`,{slug:e})||null}catch(t){return console.error(`Failed to fetch product with slug ${e}:`,t),null}}async function d(){try{return await o.fetch(`*[_type == "review" && featured == true] | order(reviewDate desc) {
        _id,
        customerName,
        reviewText,
        rating,
        "customerPhotoUrl": customerPhoto.asset->url,
        festivalContext
      }`)||[]}catch(e){return console.error("Failed to fetch featured reviews:",e),[]}}async function m(e){try{return await o.fetch(`*[_type == "review" && product._ref == $productId] | order(reviewDate desc) {
        _id,
        customerName,
        reviewText,
        rating,
        customerPhoto {
          asset-> {
            url
          }
        },
        reviewDate,
        featured,
        verified,
        festivalContext
      }`,{productId:e})||[]}catch(t){return console.error(`Failed to fetch reviews for product ${e}:`,t),[]}}async function u(e,t){try{let r=[...await o.fetch(`*[_type == "product" && isAvailable == true && category == $category && _id != $currentProductId] | order(_createdAt desc) {
        _id,
        _updatedAt,
        title,
        slug,
        price,
        "mainImageUrl": mainImage.asset->url,
        category,
        featured,
        isOneOfAKind,
        festivalAttribution
      }`,{category:t,currentProductId:e})||[]];for(let e=r.length-1;e>0;e--){let t=Math.floor(Math.random()*(e+1));[r[e],r[t]]=[r[t],r[e]]}if(r.length>=4)return r.slice(0,4);let a=await o.fetch(`*[_type == "product" && isAvailable == true && featured == true && _id != $currentProductId] | order(_createdAt desc) {
        _id,
        _updatedAt,
        title,
        slug,
        price,
        "mainImageUrl": mainImage.asset->url,
        category,
        featured,
        isOneOfAKind,
        festivalAttribution
      }`,{currentProductId:e}),s=[...r],i=new Set(r.map(e=>e._id));for(let e of a||[])!i.has(e._id)&&s.length<4&&(s.push(e),i.add(e._id));return s.slice(0,4)}catch(e){return console.error("Failed to fetch related products:",e),[]}}async function h(){try{let[e,t,r]=await Promise.all([i(),l(),d()]);return{business:e,featuredProducts:t,featuredReviews:r}}catch(e){return console.error("Failed to fetch homepage data:",e),{business:null,featuredProducts:[],featuredReviews:[]}}}async function p(){try{let e=`*[_type == "aboutPage"][0] {
      _id,
      heroHeading,
      heroSubheading,
      heroImage {
        asset-> {
          url
        }
      },
      storyHeading,
      storyContent,
      storyImage {
        asset-> {
          url
        }
      },
      missionHeading,
      missionPoints[] {
        icon,
        heading,
        description
      },
      processHeading,
      processContent,
      processImages[] {
        asset-> {
          url
        }
      },
      contactHeading,
      contactText,
      showSocialLinks,
      seoTitle,
      seoDescription
    }`;return await o.fetch(e)||null}catch(e){return console.error("Failed to fetch about page:",e),null}}async function f(){try{return await o.fetch(`*[_type == "heroSlide" && isActive == true] | order(order asc) {
        _id,
        title,
        subtitle,
        backgroundImage {
          asset-> {
            url
          }
        },
        primaryButton,
        secondaryButton,
        order,
        isActive
      }`)||[]}catch(e){return console.error("Failed to fetch hero slides:",e),[]}}async function x(){try{return await o.fetch(`*[_type == "featuredCollection" && isActive == true] | order(isFeatured desc, eventStartDate asc)[0] {
        _id,
        name,
        slug,
        festivalTag,
        vibeDescription,
        customHeroImage {
          asset-> {
            url
          }
        },
        eventStartDate,
        eventEndDate,
        isFeatured
      }`)||null}catch(e){return console.error("Failed to fetch homepage featured collection:",e),null}}async function g(){try{return await o.fetch(`*[_type == "featuredCollection" && isActive == true] | order(order asc) {
        _id,
        name,
        slug,
        festivalTag,
        vibeDescription,
        customHeroImage {
          asset-> {
            url
          }
        },
        eventStartDate,
        eventEndDate,
        isActive,
        isFeatured,
        order
      }`)||[]}catch(e){return console.error("Failed to fetch featured collections:",e),[]}}async function b(e){try{return await o.fetch(`*[_type == "featuredCollection" && slug.current == $slug && isActive == true][0] {
        _id,
        name,
        slug,
        festivalTag,
        curatorsNote,
        vibeDescription,
        officialUrl,
        eventStartDate,
        eventEndDate,
        customHeroImage {
          asset-> {
            url
          }
        },
        marinasPicks[]-> {
          _id,
          title,
          slug,
          price,
          mainImage {
            asset-> {
              url
            }
          }
        },
        festivalTips[] {
          tip,
          icon
        },
        hashtags,
        themeColor,
        isActive,
        isFeatured,
        order,
        seoTitle,
        seoDescription
      }`,{slug:e})||null}catch(t){return console.error(`Failed to fetch collection with slug ${e}:`,t),null}}async function v(e){try{return await o.fetch(`*[_type == "product" && isAvailable == true && festivalAttribution == $tag] | order(_createdAt desc) {
        _id,
        _updatedAt,
        title,
        slug,
        price,
        "mainImageUrl": mainImage.asset->url,
        category,
        featured,
        isOneOfAKind,
        festivalAttribution
      }`,{tag:e})||[]}catch(t){return console.error(`Failed to fetch products for festival tag ${e}:`,t),[]}}(0,s.OX)(o)},35692:()=>{}};