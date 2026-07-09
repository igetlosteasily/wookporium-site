"use strict";(()=>{var e={};e.id=475,e.ids=[475],e.modules={10846:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},44870:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},3295:e=>{e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},29294:e=>{e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},63033:e=>{e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},55511:e=>{e.exports=require("crypto")},94735:e=>{e.exports=require("events")},81630:e=>{e.exports=require("http")},55591:e=>{e.exports=require("https")},79551:e=>{e.exports=require("url")},28354:e=>{e.exports=require("util")},89263:(e,t,r)=>{r.r(t),r.d(t,{patchFetch:()=>_,routeModule:()=>h,serverHooks:()=>v,workAsyncStorage:()=>y,workUnitAsyncStorage:()=>g});var a={};r.r(a),r.d(a,{default:()=>d,dynamic:()=>l});var i={};r.r(i),r.d(i,{GET:()=>m,dynamic:()=>l});var o=r(42706),s=r(28203),n=r(45994),c=r(39187),u=r(25738);let l="force-static";async function d(){let e="https://wookporium.com",t=(await (0,u.d$)()).map(t=>({url:`${e}/products/${t.slug.current}`,lastModified:new Date(t._updatedAt),changeFrequency:"weekly",priority:.8}));return[{url:e,lastModified:new Date,changeFrequency:"daily",priority:1},{url:`${e}/about`,lastModified:new Date,changeFrequency:"monthly",priority:.8},{url:`${e}/products`,lastModified:new Date,changeFrequency:"daily",priority:.9},{url:`${e}/privacy`,lastModified:new Date,changeFrequency:"yearly",priority:.5},{url:`${e}/terms`,lastModified:new Date,changeFrequency:"yearly",priority:.5},...t]}var p=r(13192);let f={...a}.default;if("function"!=typeof f)throw Error('Default export is missing in "/home/submariner/projects/wookporium-ecommerce/frontend/src/app/sitemap.ts"');async function m(e,t){let{__metadata_id__:r,...a}=await t.params||{},i=!!r&&r.endsWith(".xml");if(r&&!i)return new c.NextResponse("Not Found",{status:404});let o=r&&i?r.slice(0,-4):void 0,s=await f({id:o}),n=(0,p.resolveRouteData)(s,"sitemap");return new c.NextResponse(n,{headers:{"Content-Type":"application/xml","Cache-Control":"public, max-age=0, must-revalidate"}})}let h=new o.AppRouteRouteModule({definition:{kind:s.RouteKind.APP_ROUTE,page:"/sitemap.xml/route",pathname:"/sitemap.xml",filename:"sitemap",bundlePath:"app/sitemap.xml/route"},resolvedPagePath:"next-metadata-route-loader?filePath=%2Fhome%2Fsubmariner%2Fprojects%2Fwookporium-ecommerce%2Ffrontend%2Fsrc%2Fapp%2Fsitemap.ts&isDynamicRouteExtension=1!?__next_metadata_route__",nextConfigOutput:"standalone",userland:i}),{workAsyncStorage:y,workUnitAsyncStorage:g,serverHooks:v}=h;function _(){return(0,n.patchFetch)({workAsyncStorage:y,workUnitAsyncStorage:g})}},25738:(e,t,r)=>{r.d(t,{By:()=>s,Fk:()=>v,Sn:()=>o,Sz:()=>_,ZC:()=>y,bA:()=>f,d$:()=>n,lw:()=>h,oo:()=>u,pL:()=>m,sm:()=>g,zQ:()=>d,zc:()=>p});var a=r(668),i=r(96408);let o=(0,a.UU)({projectId:"7iiji3rf",dataset:"production",apiVersion:"2023-05-03",useCdn:!0});async function s(){try{return await o.fetch(`*[_type == "business"][0] {
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
      }`)||[]}catch(e){return console.error("Failed to fetch products:",e),[]}}async function c(){try{return await o.fetch(`*[_type == "product" && isAvailable == true && featured == true] | order(_createdAt desc) {
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
      }`)||[]}catch(e){return console.error("Failed to fetch featured products:",e),[]}}async function u(e){try{return await o.fetch(`*[_type == "product" && slug.current == $slug][0] {
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
      }`,{slug:e})||null}catch(t){return console.error(`Failed to fetch product with slug ${e}:`,t),null}}async function l(){try{return await o.fetch(`*[_type == "review" && featured == true] | order(reviewDate desc) {
        _id,
        customerName,
        reviewText,
        rating,
        "customerPhotoUrl": customerPhoto.asset->url,
        festivalContext
      }`)||[]}catch(e){return console.error("Failed to fetch featured reviews:",e),[]}}async function d(e){try{return await o.fetch(`*[_type == "review" && product._ref == $productId] | order(reviewDate desc) {
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
      }`,{productId:e})||[]}catch(t){return console.error(`Failed to fetch reviews for product ${e}:`,t),[]}}async function p(e,t){try{let r=[...await o.fetch(`*[_type == "product" && isAvailable == true && category == $category && _id != $currentProductId] | order(_createdAt desc) {
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
      }`,{currentProductId:e}),i=[...r],s=new Set(r.map(e=>e._id));for(let e of a||[])!s.has(e._id)&&i.length<4&&(i.push(e),s.add(e._id));return i.slice(0,4)}catch(e){return console.error("Failed to fetch related products:",e),[]}}async function f(){try{let[e,t,r]=await Promise.all([s(),c(),l()]);return{business:e,featuredProducts:t,featuredReviews:r}}catch(e){return console.error("Failed to fetch homepage data:",e),{business:null,featuredProducts:[],featuredReviews:[]}}}async function m(){try{let e=`*[_type == "aboutPage"][0] {
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
    }`;return await o.fetch(e)||null}catch(e){return console.error("Failed to fetch about page:",e),null}}async function h(){try{return await o.fetch(`*[_type == "heroSlide" && isActive == true] | order(order asc) {
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
      }`)||[]}catch(e){return console.error("Failed to fetch hero slides:",e),[]}}async function y(){try{return await o.fetch(`*[_type == "featuredCollection" && isActive == true] | order(isFeatured desc, eventStartDate asc)[0] {
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
      }`)||[]}catch(e){return console.error("Failed to fetch featured collections:",e),[]}}async function v(e){try{return await o.fetch(`*[_type == "featuredCollection" && slug.current == $slug && isActive == true][0] {
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
      }`,{slug:e})||null}catch(t){return console.error(`Failed to fetch collection with slug ${e}:`,t),null}}async function _(e){try{return await o.fetch(`*[_type == "product" && isAvailable == true && festivalAttribution == $tag] | order(_createdAt desc) {
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
      }`,{tag:e})||[]}catch(t){return console.error(`Failed to fetch products for festival tag ${e}:`,t),[]}}(0,i.OX)(o)}};var t=require("../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),a=t.X(0,[733,913,297],()=>r(89263));module.exports=a})();