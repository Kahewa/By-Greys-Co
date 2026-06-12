/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Instagram, 
  Music, 
  Linkedin, 
  Github,
  Mail,
  ShoppingBag, 
  Palette, 
  Video, 
  Layout, 
  ArrowRight,
  ExternalLink,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Youtube,
  Twitch,
  Tag
} from 'lucide-react';

// --- Types ---

type Tab = 'home' | 'shop' | 'services' | 'rates';
type ServiceTab = 'graphic' | 'video' | 'ui';

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  link: string;
  description?: string;
  features?: string[];
}

interface PortfolioItem {
  id: number;
  title: string;
  category: ServiceTab;
  thumbnail: string;
  link: string;
  type: 'image' | 'video';
}

// --- Mock Data ---

const RATES: Record<string, any[]> = {
  graphics: [
    {
      title: "Graphic Design Services",
      items: [
        { service: "Basic Creative", desc: "Simple design structures - Single product ads | Name tags | ETC", price: "60.00" },
        { service: "Thumbnails", desc: "TikTok | IG Reels | Reel Shorts | YouTube | IG Story take-over covers", price: "130.00" },
        { service: "Invitations and Letters", desc: "Graduation | Wedding | Party | Love letters | ETC", price: "150.00" },
        { service: "Advanced Creative", desc: "Product/Service ads | Pricelists | Book covers | Info posts | Event Posters | ETC", price: "180.00" },
        { service: "Logo Design", desc: "New Designs | Old logo refinement", price: "200.00" },
      ]
    },
    {
      title: "PDF Documents (Invitations/Catalogues/Business Profiles)",
      items: [
        { service: "One Page", desc: "A4 size - Includes: Consultation | Active Links | Professional Design tailored to client needs", price: "200.00" },
        { service: "Two Pages", desc: "A4 size - Includes: Consultation | Active Links | Professional Design tailored to client needs", price: "380.00" },
        { service: "Three Pages", desc: "A4 size - Includes: Consultation | Active Links | Professional Design tailored to client needs", price: "550.00" },
        { service: "More Pages", desc: "Over 4 pages - Consultation needed", price: "Quote based" },
      ]
    },
    {
      title: "Graphic Design Packages",
      items: [
        { service: "Logo Design Pack", desc: "Logo (Light+Dark Mode) + Business Cards + Email Banner", price: "550.00" },
        { service: "Party Pack", desc: "2 Page PDF Invitation + 1 Page PDF Wishlist + GRWM reel", price: "650.00" },
        { service: "Start-up Business Pack", desc: "Logo Design Pack + x2 Advanced Creatives + 3 Page PDF Catalogue", price: "1000.00" },
        { service: "Wedding Pack", desc: "3 Page PDF Invitation + Bridesmaid/Groomsman cards + 5 day Countdown", price: "1,300.00" },
        { service: "Business Pack", desc: "Logo Design Pack | 2 Page Company CI Doc | 5 Page Company Profile", price: "2,250.00" },
      ]
    }
  ],
  video: [
    {
      title: "Video Editing Services",
      items: [
        { service: "1 MINUTE", desc: "End results restricted to 10sec to 1Min30sec", price: "200.00", rawText: "If raw content is over 5min = N$300" },
        { service: "2-5 MINUTES", desc: "End results restricted to 1Min30sec to 5Min", price: "390.00", rawText: "If raw content is over 10min = N$490" },
        { service: "6-10 MINUTES", desc: "End results restricted to 6Min to 10 Min", price: "500.00", rawText: "If raw content is over 20min = N$600" },
        { service: "11-15 MINUTES", desc: "End results restricted to 11Min to 15 Min", price: "650.00", rawText: "If raw content is over 25min = N$750" },
        { service: "16-20 MINUTES", desc: "End results restricted to 16Min to 20 Min", price: "750.00", rawText: "If raw content is over 40min = N$850" },
        { service: "21-45 MINUTES", desc: "End results restricted to 21Min to 45Min", price: "900.00", rawText: "If raw content is over 1hr = N$1050" },
        { service: "YouTube Mini", desc: "16-20 min + trailer + thumbnail", price: "950.00", rawText: "If raw content is over 40min = N$1050" },
        { service: "YouTube Max", desc: "21-45 min + trailer + thumbmail", price: "1200.00", rawText: "If raw content is over 1hr = N$1350" },
      ]
    }
  ],
  web: [
    {
      title: "Web Development & Design",
      items: [
        { service: "Web Based Personal Profile and Portfolio", desc: "Aesthetic single-page profile, digital CV, or custom portfolio site", price: "Starting Price - N$1500.00" },
        { service: "User Interface Design For Web and Mobile Applications", desc: "High-fidelity, modern UI design tailored for web or mobile apps", price: "Starting Price - N$1800.00" },
        { service: "Full-Stack Website Development", desc: "Complete web application with frontend, backend integration, and database features", price: "Starting Price - N$4500" }
      ]
    }
  ]
};

const HAVEN_PRODUCTS: Product[] = [
  { 
    id: 101, 
    name: "Haven By Greys", 
    price: "N$0.00", 
    image: "https://res.cloudinary.com/dllugr1kc/image/upload/v1773451390/Modern_Formal_Invoice_for_Business_Consultant_cmhqgf.png", 
    link: "https://wa.me/264818093531",
    description: "Our core Christian-themed stationery brand. Discover beautiful, high-quality resources created to help you cultivate a peace-filled routine and elevate your personal study times.",
    features: [
      "Custom stationery curation",
      "Faith-centered design guidelines",
      "Designed to inspire reflection"
    ]
  },
 // { 
 //   id: 102, 
//    name: "Bible Verse Poster (Demo)", 
 //   price: "N$120.00", 
  //  image: "https://res.cloudinary.com/dllugr1kc/image/upload/v1773451390/Modern_Formal_Invoice_for_Business_Consultant_cmhqgf.png", 
  //  link: "https://wa.me/264818093531",
   // description: "Transform your home, workspace, or study room with a custom-designed minimalist Bible verse poster. Printed on premium matte archival paper to add a touch of spiritual encouragement to your walls.",
   // features: [
   //   "Sizes: A4, A3, and custom options",
   //   "Printed on premium 250gsm card stock",
   //   "Custom minimalist typography designs",
   //   "Frames not included (fits standard frames)"
   // ]
 // },
]

const CROWNED_PRODUCTS: Product[] = [
  { 
    id: 201, 
    name: "Cloud Butter (100g)", 
    price: "N$95.00", 
    image: "https://res.cloudinary.com/dllugr1kc/image/upload/v1781294798/cloud_viqimd.jpg", 
    link: "https://wa.me/264818093531",
    description: "This is a blend of organic oil based products which aid in hair growth, hair thickening, repairing of dry and damaged hair, preventing split ends, adding natural shine to strands and serves as a natural sunscreen, protecting hair from the harsh UV rays of the sun.",
    features: [
      "Ingredients: Shea butter, Avocado butter, Olive oil, Castor oil, Grapeseed oil.",
      "Use: Massage on scalp regularly."
    ]
  },
 // { 
  //  id: 202, 
   // name: "Silk Scrunchies Pack (Demo)", 
   // price: "N$60.00", 
   // image: "https://res.cloudinary.com/dllugr1kc/image/upload/v1773451390/Modern_Formal_Invoice_for_Business_Consultant_cmhqgf.png", 
   // link: "https://wa.me/264818093531",
   // description: "Gentle ties designed to protect your hair. These elegant scrunchies slide out effortlessly without snagging, preventing traditional ponytails split ends, breakage, and tension pressure.",
   // features: [
   //   "Set of 3 aesthetic earth-toned colors",
   ///   "Super soft surface prevents creasing",
   //   "Strong inner elastic holds hair securely",
   //   "Ideal for high buns, puffs, and sleeping"
   // ]
 //},

];

const PORTFOLIO: PortfolioItem[] = [
  // Graphic Design
  { id: 1, title: "PDF Document", category: 'graphic', thumbnail: "https://res.cloudinary.com/dllugr1kc/image/upload/v1772726336/Company_Profile_cover_knnvmc.png", link: "#", type: 'image' },
  { id: 2, title: "Basic Design", category: 'graphic', thumbnail: "https://res.cloudinary.com/dllugr1kc/image/upload/v1772364319/NameTag_xk7uth.png", link: "#", type: 'image' },
  { id: 3, title: "Business Card", category: 'graphic', thumbnail: "https://res.cloudinary.com/dllugr1kc/image/upload/v1772364406/namib_cp5wqq.png", link: "#", type: 'image' },
  { id: 4, title: "Logo Design", category: 'graphic', thumbnail: "https://res.cloudinary.com/dllugr1kc/image/upload/v1772364323/NamibNest_Logo_bok2wq.png", link: "#", type: 'image' },
  { id: 5, title: "Business Card", category: 'graphic', thumbnail: "https://res.cloudinary.com/dllugr1kc/image/upload/v1773448658/FRONT_iyjhfx.png", link: "#", type: 'image' },
  { id: 6, title: "Logo Design", category: 'graphic', thumbnail: "https://res.cloudinary.com/dllugr1kc/image/upload/v1773448605/Black_hylkt9.png", link: "#", type: 'image' },
  { id: 7, title: "Advanced Ad", category: 'graphic', thumbnail: "https://res.cloudinary.com/dllugr1kc/image/upload/v1772364338/Beige_Professional_Self_Employed_Business_Services_Pitch_Flyer_A4_zhm7ny.png", link: "#", type: 'image' },
  { id: 8, title: "Advanced Ad", category: 'graphic', thumbnail: "https://res.cloudinary.com/dllugr1kc/image/upload/v1773448588/model_ujimaw.png", link: "#", type: 'image' },
  { id: 9, title: "Advanced Ad", category: 'graphic', thumbnail: "https://res.cloudinary.com/dllugr1kc/image/upload/v1772364372/STA_DESSERTS_b2tolf.png", link: "#", type: 'image' },
  { id: 10, title: "Advanced Ad", category: 'graphic', thumbnail: "https://res.cloudinary.com/dllugr1kc/image/upload/v1772364320/25_Nov_Agenda_Drop_gdkwyi.png", link: "#", type: 'image' },
  { id: 11, title: "Basic Design", category: 'graphic', thumbnail: "https://res.cloudinary.com/dllugr1kc/image/upload/v1772364385/White_Minimal_Skincare_Ingredient_Overview_Instagram_Post_omihtw.png", link: "#", type: 'image' },
  { id: 12, title: "Invitations", category: 'graphic', thumbnail: "https://res.cloudinary.com/dllugr1kc/image/upload/v1773448512/Yellow_and_Pink_Watercolour_Pets_Kitty_Party_Invitation_sruupa.png", link: "#", type: 'image' },
  { id: 13, title: "Thumnails", category: 'graphic', thumbnail: "https://res.cloudinary.com/dllugr1kc/image/upload/v1772364294/Modern_Daily_Podcast_YouTube_Thumbnail_eloeom.png", link: "#", type: 'image' },
  { id: 14, title: "Thumbnails", category: 'graphic', thumbnail: "https://res.cloudinary.com/dllugr1kc/image/upload/v1772364366/Simple_Minimalist_Clean_Lifestyle_Vlog_YouTube_Thumbnail_c3jjab.png", link: "#", type: 'image' },
  { id: 15, title: "Thumbnails", category: 'graphic', thumbnail: "https://res.cloudinary.com/dllugr1kc/image/upload/v1772364361/Beige_White_and_Blue_Scrapbook_Style_Personal_Desktop_Wallpaper_t0it74.png", link: "#", type: 'image' },

  // Video
    { id: 16, title: "WRC Collective", category: 'video', thumbnail: "https://res.cloudinary.com/dllugr1kc/image/upload/v1776989031/3_jivvyf.png", link: "https://www.instagram.com/reel/DXbyVdADBlA/?igsh=b3hjeXdkZ2F1d3d3", type: 'video' },
  { id: 17, title: "Life Update", category: 'video', thumbnail: "https://res.cloudinary.com/dllugr1kc/image/upload/v1776632055/WhatsApp_Image_2026-04-19_at_22.53.22_pkc4nj.jpg", link: "https://www.instagram.com/reel/DWRQAnIAhhd/?igsh=MXI5YnA4aG1wOGlsZw==", type: 'video' },
  { id: 18, title: "Short Vlog", category: 'video', thumbnail: "https://res.cloudinary.com/dllugr1kc/image/upload/v1776632056/WhatsApp_Image_2026-04-19_at_22.53.23_bztk0q.jpg", link: "https://www.instagram.com/reel/DXJMI-Sgsqb/?igsh=aTA3eGYwaDVmMnc3", type: 'video' },

  // UI Design
  { id: 19, title: "ByGreysCo", category: 'ui', thumbnail: "https://res.cloudinary.com/dllugr1kc/image/upload/v1776989010/image_2026-04-24_020325870_gn3bhv.png", link: "https://bygreysco.netlify.app", type: 'image' },
  //{ id: 16, title: "Wellness Dashboard", category: 'ui', thumbnail: "https://picsum.photos/seed/ui2/800/600", link: "#", type: 'image' },
];

const TESTIMONIALS = [
  {
    id: 1,
    username: "Tea Laboratories",
    handle: "www.tea-labs.com",
    message: "I had gotten the By Greys Co. number from a mutual contact. I reached out to her to help me with a project, and her service from the beginning was amazing. She is very creative, her outlook on the project gave me the inspiration I did not know I needed. She is a professional, always providing timely updates and I was not left wondering what happened or if there was progress. Overall, very kind and very nice to work with. I would highly recommend getting work done by Grace. ☺️✨",
    avatar: "https://res.cloudinary.com/dllugr1kc/image/upload/v1776631921/Screenshot_2026-04-19_224257_wzwysf.png"
  },
  {
    id: 2,
    username: "STA Desserts",
    handle: "@sta.desserts",
    message: "Working with this designer for my business, STA Desserts, was such a refreshing experience. She created Valentine’s special price list posters for me, and I genuinely couldn’t have asked for better results. The designs were not only visually beautiful, but they also felt intentional, thoughtful, and truly human. In a time where so much design feels automated or AI-generated, her work stood out in the best way. Every detail reflected creativity, care, and a clear understanding of my brand. She was able to take my ideas and turn them into something elegant, eye-catching, and perfectly suited for my business. I highly recommend her to anyone looking for authentic, high-quality design work that actually feels personal and unique.",
    avatar: "https://res.cloudinary.com/dllugr1kc/image/upload/v1776632045/WhatsApp_Image_2026-04-19_at_22.43.12_zy6efs.jpg"
  },
  
];

// --- Components ---

const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  message, 
  confirmLabel, 
  onConfirm 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  title: string; 
  message: string; 
  confirmLabel: string; 
  onConfirm: () => void; 
}) => (
  <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative bg-primary border border-black p-8 max-w-md w-full rounded-2xl shadow-2xl"
        >
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-accent-pink/20 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
          <h3 className="text-2xl font-serif mb-4">{title}</h3>
          <p className="text-black/70 mb-8 leading-relaxed">{message}</p>
          <div className="flex flex-col gap-3">
            <button
              onClick={onConfirm}
              className="w-full py-4 bg-black text-white rounded-full font-bold uppercase tracking-widest text-xs hover:bg-accent-green transition-colors"
            >
              {confirmLabel}
            </button>
            <button
              onClick={onClose}
              className="w-full py-4 border border-black rounded-full font-bold uppercase tracking-widest text-xs hover:bg-accent-pink transition-colors"
            >
              Continue Viewing
            </button>
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

// Terms & Conditions Modal component
const TermsModal = ({ 
  isOpen, 
  onClose 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
}) => (
  <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-x-0 inset-y-0 bg-black/60 backdrop-blur-sm"
        />
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative bg-[#FDFCF8] border border-black/10 p-6 md:p-10 max-w-2xl w-full rounded-[25px] md:rounded-[40px] shadow-2xl overflow-hidden flex flex-col max-h-[85vh] text-left"
        >
          <button 
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 md:top-6 md:right-6 p-2 text-black/50 hover:text-black hover:bg-black/5 rounded-full transition-colors z-10"
          >
            <X size={20} />
          </button>
          
          <div className="border-b border-black/5 pb-4 mb-4">
            <span className="text-[10px] md:text-sm font-bold text-accent-green uppercase tracking-widest block mb-1">Company Guidelines</span>
            <h3 className="text-2xl md:text-4xl font-serif text-black font-light leading-tight">Terms & Conditions</h3>
          </div>
          
          <div className="flex-1 overflow-y-auto pr-1 space-y-6 md:space-y-8 scrollbar-thin">
            <div className="space-y-4">
              <h4 className="font-serif text-lg font-bold text-black border-l-2 border-accent-green pl-2">Ethical & Faith-Based Integrity Clause</h4>
              <ol className="list-decimal pl-4 space-y-3 text-xs md:text-sm text-black/80 font-light leading-relaxed">
                <li>
                  <strong className="text-black font-semibold block mb-0.5">Faith-Based Values</strong>
                  The service provider operates on a foundation of Christian faith and Biblical principles. All work is conducted with integrity, honesty, excellence, and a commitment to honouring God in both conduct and output.
                </li>
                <li>
                  <strong className="text-black font-semibold block mb-0.5">Moral Alignment of Projects</strong>
                  The service provider reserves the right to decline, discontinue, or withdraw from any project that conflicts with Biblical values or encourages content, products, or services that are deemed unethical or inconsistent with Christian principles.
                </li>
                <li>
                  <strong className="text-black font-semibold block mb-0.5">Professional Conduct</strong>
                  All engagements will be handled with respect, fairness, and transparency. The service provider seeks to maintain relationships that reflect Christ-like character, including accountability, diligence, and integrity in communication and delivery.
                </li>
                <li>
                  <strong className="text-black font-semibold block mb-0.5">Right of Refusal</strong>
                  The service provider maintains full discretion to refuse work that compromises personal faith convictions or moral standards, without obligation to justify beyond ethical boundaries.
                </li>
              </ol>
            </div>

            <div className="space-y-4 pt-4 border-t border-black/5">
              <h4 className="font-serif text-lg font-bold text-black border-l-2 border-accent-green pl-2">Investment & Payment Terms</h4>
              <ol className="list-decimal pl-4 space-y-3 text-xs md:text-sm text-black/80 font-light leading-relaxed">
                <li>
                  <strong className="text-black font-semibold block mb-0.5">Consultation</strong>
                  An initial consultation may be required prior to the commencement of the project. First-time clients may qualify for a complimentary consultation at the discretion of the service provider.
                </li>
                <li>
                  <strong className="text-black font-semibold block mb-0.5">Project Commencement</strong>
                  A deposit/setup fee is required before work on the project can begin. This fee secures the project booking, covers initial planning, and confirms commitment from both parties.
                </li>
                <li>
                  <strong className="text-black font-semibold block mb-0.5">Final Payment</strong>
                  The remaining balance is payable upon completion of the project and prior to final handover, launch, or transfer of project ownership and associated files.
                </li>
                <li>
                  <strong className="text-black font-semibold block mb-0.5">Domain Registration & Renewal</strong>
                  Domain registration for the first year may be included as part of the website package, depending on the agreed scope of work. Domain renewal fees thereafter are the responsibility of the client and are billed annually. Renewal costs may vary depending on the selected domain name and provider rates.
                </li>
              </ol>
            </div>

            <div className="space-y-4 pt-4 border-t border-black/5">
              <h4 className="font-serif text-lg font-bold text-black border-l-2 border-accent-pink pl-2">Refund & Cancellation Policy</h4>
              <ol className="list-decimal pl-4 space-y-3 text-xs md:text-sm text-black/80 font-light leading-relaxed">
                <li>
                  <strong className="text-black font-semibold block mb-0.5">Project Cancellation</strong>
                  In the event of project cancellation after commencement, a portion of the deposit/setup fee may be retained to cover work already completed, administrative costs, and resources allocated to the project.
                </li>
                <li>
                  <strong className="text-black font-semibold block mb-0.5">Late-Stage Cancellation</strong>
                  No setup fee refunds will be issued for projects cancelled during the final stages of development or nearing completion.
                </li>
                <li>
                  <strong className="text-black font-semibold block mb-0.5">Completed Projects</strong>
                  No refunds will be issued for projects that have been completed, approved, and fully paid for.
                </li>
                <li>
                  <strong className="text-black font-semibold block mb-0.5">Work Already Rendered</strong>
                  Any work completed prior to cancellation remains the intellectual property of the service provider until full payment has been made.
                </li>
              </ol>
            </div>
            
            <div className="pt-4 text-black/60 italic text-right text-xs">
              Regards.
            </div>
          </div>

          <div className="pt-4 border-t border-black/5 flex justify-end mt-4">
            <button
              onClick={onClose}
              type="button"
              className="px-8 py-3 bg-black text-white rounded-full font-bold uppercase tracking-widest text-[10px] md:text-xs hover:bg-accent-green transition-colors"
            >
              Close Terms
            </button>
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

// Privacy Policy Modal component
const PrivacyModal = ({ 
  isOpen, 
  onClose 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
}) => (
  <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-x-0 inset-y-0 bg-black/60 backdrop-blur-sm"
        />
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative bg-[#FDFCF8] border border-black/10 p-6 md:p-10 max-w-2xl w-full rounded-[25px] md:rounded-[40px] shadow-2xl overflow-hidden flex flex-col max-h-[85vh] text-left"
        >
          <button 
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 md:top-6 md:right-6 p-2 text-black/50 hover:text-black hover:bg-black/5 rounded-full transition-colors z-10"
          >
            <X size={20} />
          </button>
          
          <div className="border-b border-black/5 pb-4 mb-4">
            <span className="text-[10px] md:text-sm font-bold text-accent-green uppercase tracking-widest block mb-1">Company Guidelines</span>
            <h3 className="text-2xl md:text-4xl font-serif text-black font-light leading-tight">Privacy Policy</h3>
          </div>
          
          <div className="flex-1 overflow-y-auto pr-1 space-y-6 md:space-y-8 scrollbar-thin">
            <p className="text-xs md:text-sm text-black/80 font-light leading-relaxed">
              At By Greys Co, we value the privacy and confidentiality of our clients. This Privacy Policy explains how personal and business information is collected, used, stored, and protected during the delivery of our services.
            </p>

            <div className="space-y-6">
              <div className="space-y-2">
                <h4 className="font-serif text-base font-bold text-black border-l-2 border-accent-green pl-2">1. Collection of Information</h4>
                <p className="text-xs md:text-sm text-black/80 font-light leading-relaxed">
                  We may collect relevant personal and business information necessary to provide our services, including but not limited to:
                </p>
                <ul className="list-disc pl-5 text-xs md:text-sm text-black/80 font-light space-y-1">
                  <li>Full name and contact details</li>
                  <li>Business information and branding materials</li>
                  <li>Website content, images, logos, and documents provided by the client</li>
                  <li>Project-related and billing information</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-serif text-base font-bold text-black border-l-2 border-accent-green pl-2">2. Use of Information</h4>
                <p className="text-xs md:text-sm text-black/80 font-light leading-relaxed">
                  All collected information is used strictly for service delivery purposes, including:
                </p>
                <ul className="list-disc pl-5 text-xs md:text-sm text-black/80 font-light space-y-1">
                  <li>Completing requested digital services and projects</li>
                  <li>Communicating project updates and requirements</li>
                  <li>Setting up websites, domains, hosting, and related services</li>
                  <li>Improving service quality and client experience</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-serif text-base font-bold text-black border-l-2 border-accent-green pl-2">3. Confidentiality</h4>
                <p className="text-xs md:text-sm text-black/80 font-light leading-relaxed">
                  All client information, documents, and project materials shared with By Greys Co are treated as strictly confidential and will not be shared, sold, or disclosed to any third party without prior consent, unless required by law.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-serif text-base font-bold text-black border-l-2 border-accent-green pl-2">4. Data Protection</h4>
                <p className="text-xs md:text-sm text-black/80 font-light leading-relaxed">
                  Reasonable measures are taken to safeguard client information against unauthorized access, misuse, loss, or disclosure. However, while we strive to maintain secure systems, no digital storage or transmission method can be guaranteed as 100% secure.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-serif text-base font-bold text-black border-l-2 border-accent-green pl-2">5. Access Credentials</h4>
                <p className="text-xs md:text-sm text-black/80 font-light leading-relaxed">
                  Clients are responsible for maintaining secure access credentials. By Greys Co will not be held liable for any loss, breach, or damage resulting from compromised login details after project handover.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-serif text-base font-bold text-black border-l-2 border-accent-green pl-2">6. Third-Party Services</h4>
                <p className="text-xs md:text-sm text-black/80 font-light leading-relaxed">
                  Some services may rely on third-party platforms such as domain registrars, hosting providers, plugins, or integrations. By Greys Co is not responsible for the privacy practices, policies, or performance of these third-party providers.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-serif text-base font-bold text-black border-l-2 border-accent-green pl-2">7. Ownership of Data</h4>
                <p className="text-xs md:text-sm text-black/80 font-light leading-relaxed">
                  All client-provided content remains the property of the client. Upon full project completion and final payment, ownership of the completed website and deliverables is transferred to the client unless otherwise agreed in writing.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-serif text-base font-bold text-black border-l-2 border-accent-green pl-2">8. Policy Updates</h4>
                <p className="text-xs md:text-sm text-black/80 font-light leading-relaxed">
                  By Greys Co reserves the right to update or modify this Privacy Policy at any time. Clients will be informed where significant changes may affect ongoing services.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-serif text-base font-bold text-black border-l-2 border-accent-green pl-2">9. Contact</h4>
                <p className="text-xs md:text-sm text-black/80 font-light leading-relaxed">
                  For any questions or concerns regarding this Privacy Policy or the handling of personal data, clients may contact By Greys Co directly.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-black/5 flex justify-end mt-4">
            <button
              onClick={onClose}
              type="button"
              className="px-8 py-3 bg-black text-white rounded-full font-bold uppercase tracking-widest text-[10px] md:text-xs hover:bg-accent-green transition-colors"
            >
              Close Privacy Policy
            </button>
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

const ProductDetailModal = ({
  isOpen,
  onClose,
  product
}: {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}) => {
  if (!product) return null;

  const isDemo = product.name.includes('(Demo)');
  const displayName = product.name.replace(' (Demo)', '');
  
  const handlePlaceOrder = () => {
    const text = encodeURIComponent(`Hi Grace, I am interested in placing an order for "${displayName}" from your shop!`);
    const chatLink = `https://wa.me/264818093531?text=${text}`;
    window.open(chatLink, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-x-0 inset-y-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative bg-[#FDFCF8] border border-black/10 p-6 md:p-8 max-w-md w-full rounded-[25px] md:rounded-[30px] shadow-2xl overflow-hidden flex flex-col max-h-[85vh] text-left"
          >
            {/* Close button */}
            <button 
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-black/50 hover:text-black hover:bg-black/5 rounded-full transition-colors z-20"
            >
              <X size={20} />
            </button>

            {/* Content Container (Scrollable) */}
            <div className="flex-1 overflow-y-auto pr-1 scrollbar-thin mt-6">
              <div className="space-y-5">
                
                {/* Product Info Panel */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] md:text-xs font-bold text-accent-green uppercase tracking-widest">
                      {product.id < 200 ? "Haven By Greys" : "Crowned By Greys"}
                    </span>
                    {isDemo && (
                      <span className="bg-[#db6b86] text-white text-[8px] tracking-widest uppercase font-bold px-2 py-0.5 rounded-full border border-white/20 shadow-sm">
                        Showcase
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-serif text-black leading-tight mb-2">
                    {displayName}
                  </h3>
                  
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-2xl font-bold text-accent-green">{product.price}</span>
                  </div>
                  
                  <div className="border-t border-black/5 pt-4 mb-4">
                    <h4 className="text-[10px] uppercase tracking-widest text-[#db6b86] font-bold mb-2">About Product</h4>
                    <p className="text-xs md:text-sm text-black/85 font-light leading-relaxed">
                      {product.description || ""}
                    </p>
                  </div>

                  {product.features && product.features.length > 0 && (
                    <div className="border-t border-black/5 pt-4">
                      <h4 className="text-[10px] uppercase tracking-widest text-[#db6b86] font-bold mb-2.5">More Info</h4>
                      <ul className="space-y-2 text-xs text-black/75 font-light">
                        {product.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-accent-pink font-bold mt-0.5">•</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

              </div>
            </div>

            {/* Bottom Actions Row */}
            <div className="pt-5 border-t border-black/5 flex flex-col gap-3 mt-6">
              <button
                onClick={handlePlaceOrder}
                type="button"
                className="w-full py-3.5 bg-black text-white hover:bg-[#db6b86] rounded-full font-bold uppercase tracking-widest text-xs transition-colors text-center cursor-pointer"
              >
                Place Order via WhatsApp
              </button>
              <button
                onClick={onClose}
                type="button"
                className="w-full py-3.5 border border-black/10 hover:bg-[#db6b86]/10 text-black/70 hover:text-black rounded-full font-bold uppercase tracking-widest text-xs transition-colors text-center cursor-pointer"
              >
                Continue Viewing
              </button>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const Lightbox = ({ 
  isOpen, 
  onClose, 
  items, 
  currentIndex, 
  onPrev, 
  onNext 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  items: PortfolioItem[]; 
  currentIndex: number; 
  onPrev: () => void; 
  onNext: () => void; 
}) => (
  <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0"
          onClick={onClose}
        />
        
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-[110] p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
        >
          <X size={24} />
        </button>

        <button 
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-6 z-[110] p-4 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
        >
          <ChevronLeft size={32} />
        </button>

        <button 
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-6 z-[110] p-4 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
        >
          <ChevronRight size={32} />
        </button>

        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="relative z-[105] max-w-[90vw] max-h-[85vh] flex flex-col items-center"
        >
          <img 
            src={items[currentIndex].thumbnail} 
            alt={items[currentIndex].title}
            className="max-w-full max-h-[75vh] object-contain border border-white/20"
            referrerPolicy="no-referrer"
          />
          <div className="mt-6 text-center">
            <h3 className="text-white text-2xl font-serif">{items[currentIndex].title}</h3>
            <p className="text-white/50 text-sm uppercase tracking-widest mt-2">
              {currentIndex + 1} / {items.length}
            </p>
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

const Navbar = ({ activeTab, setActiveTab }: { activeTab: Tab, setActiveTab: (t: Tab) => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems: { id: Tab, label: string }[] = [
    { id: 'home', label: 'About' },
    { id: 'services', label: 'Portfolio' },
    { id: 'rates', label: 'Rates' },
    { id: 'shop', label: 'Shop' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-primary/80 backdrop-blur-md border-b border-black/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div 
          className="text-2xl font-sans font-bold text-accent-green cursor-pointer" 
          onClick={() => setActiveTab('home')}
        >
          By Greys Co.
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-12">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`text-sm uppercase tracking-widest transition-colors hover:text-accent-pink ${
                activeTab === item.id ? 'font-bold border-b border-black' : 'font-medium'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 left-0 w-full bg-primary border-b border-black/10 flex flex-col items-center py-8 gap-6 md:hidden"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsOpen(false);
                }}
                className={`text-lg uppercase tracking-widest ${
                  activeTab === item.id ? 'text-accent-pink font-bold' : 'font-medium'
                }`}
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const SocialLinks = () => (
  <div className="flex gap-6 mt-8">
    <a href="https://www.instagram.com/iisgreys/" className="p-2 border border-black rounded-full hover:bg-accent-pink transition-colors">
      <Instagram size={20} />
    </a>
    <a href="https://www.tiktok.com/@kahewa_" className="p-2 border border-black rounded-full hover:bg-accent-pink transition-colors">
      <Music size={20} />
    </a>
    <a href="https://www.linkedin.com/in/graceshuuya/" className="p-2 border border-black rounded-full hover:bg-accent-pink transition-colors">
      <Linkedin size={20} />
    </a>
    <a href="https://github.com/Kahewa" className="p-2 border border-black rounded-full hover:bg-accent-pink transition-colors">
      <Github size={20} />
    </a>
  </div>
);

interface HomeViewProps {
  setActiveTab: (t: Tab) => void;
}

const HomeView: React.FC<HomeViewProps> = ({ setActiveTab }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="pt-36 md:pt-32 pb-20 px-3 md:px-6 max-w-7xl mx-auto relative overflow-hidden"
  >
    {/* Decorative background elements */}
    <div className="absolute top-20 right-0 w-64 h-64 bg-accent-pink/10 blur-3xl rounded-full -z-10" />
    <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-green/5 blur-3xl rounded-full -z-10" />
 
    {/* Bento Grid Layout */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-6 auto-rows-auto">
      
      {/* Left Column containing Introduction and Rates */}
      <div className="col-span-1 md:col-span-3 flex flex-col gap-2 md:gap-6">
        {/* Introduction Block */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white border border-black/10 rounded-[25px] md:rounded-[40px] p-5 md:p-10 flex flex-col justify-center flex-1"
        >
          <motion.h1 
            className="text-2xl md:text-7xl font-serif mb-4 md:mb-8 leading-[1.1] tracking-tight"
          >
            Creative <br />
            <span className="italic text-accent-green">Executive</span> <br />
            <span className="hidden md:inline">& Founder</span>
          </motion.h1>
          <p className="text-xs md:text-lg text-black/80 max-w-2xl leading-relaxed font-light">
            Hi, I'm <span className="font-bold text-accent-green">Grace Shuuya</span>. A Namibian-based Software Development Degree holder, who is passionate about producing aesthetic experiences that reflect my skill and faith. I specialize in UI Design, Web Development, Canva Creation and Videography, overseen by a strategic eye for creative direction.
          </p>
        </motion.div>

        {/* View Rates Button */}
        <motion.div 
          whileHover={{ y: -5 }}
          onClick={() => setActiveTab('rates')}
          className="bg-accent-pink/20 hover:bg-accent-pink/30 border border-accent-pink/40 rounded-[20px] md:rounded-[30px] p-3 md:p-4 flex items-center justify-between cursor-pointer group transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="bg-[#db6b86] text-white p-2 rounded-lg shadow-sm">
              <Tag size={18} className="md:w-5 md:h-5" />
            </div>
            <div className="text-left">
              <div className="text-[10px] md:text-sm font-bold leading-none text-black">Service Rates</div>
              <div className="text-[6.5px] md:text-[8.5px] uppercase tracking-wider text-black/60 mt-1.5 leading-none">pricelists of my creative services</div>
            </div>
          </div>
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform text-[#db6b86]" />
        </motion.div>
      </div>

      {/* Right Column containing Photo & LinkedIn */}
      <div className="col-span-1 md:col-span-1 flex flex-col gap-2 md:gap-6">
        {/* Main Photo Block */}
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-accent-pink/10 border border-black/10 rounded-[25px] md:rounded-[40px] overflow-hidden group relative aspect-square md:aspect-auto flex-1 h-full"
        >
          <img 
            src="https://res.cloudinary.com/dllugr1kc/image/upload/v1772275124/o_p9ksap.jpg" 
            alt="Grace Shuuya" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        {/* LinkedIn Block */}
        <motion.a 
          href="https://www.linkedin.com/in/graceshuuya/" 
          target="_blank"
          whileHover={{ y: -5 }}
          className="bg-[#0077b5] text-white rounded-[20px] md:rounded-[30px] p-3 md:p-4 flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <Linkedin size={18} className="md:w-5 md:h-5" />
            </div>
            <div className="text-left">
              <div className="text-[10px] md:text-sm font-bold leading-none">Connect</div>
              <div className="text-[8px] md:text-[10px] uppercase tracking-widest text-white/80 mt-1">LinkedIn</div>
            </div>
          </div>
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </motion.a>
      </div>

      {/* Portfolio Block */}
      <motion.div 
        whileHover={{ y: -5 }}
        onClick={() => setActiveTab('services')}
        className="col-span-1 md:col-span-2 bg-white border border-black/10 rounded-[25px] md:rounded-[30px] p-5 md:p-8 cursor-pointer relative overflow-hidden group min-h-[180px] md:min-h-[300px] flex flex-col justify-end"
      >
        <div className="absolute top-0 left-0 w-full h-full z-0 opacity-40 group-hover:opacity-60 transition-opacity">
          <img src="https://res.cloudinary.com/dllugr1kc/image/upload/v1772726336/Company_Profile_cover_knnvmc.png" className="w-full h-full object-cover" alt="Portfolio Preview" />
        </div>
        <div className="relative z-10 bg-white/80 backdrop-blur-md p-3 md:p-6 rounded-xl border border-black/5">
          <Palette className="text-accent-green mb-2 md:mb-4" size={24} />
          <h3 className="text-lg md:text-2xl font-serif mb-1">Portfolio</h3>
          <div className="hidden md:block text-xs text-black/60 mb-4">View my work in Design & UI.</div>
          <div className="flex items-center gap-1 text-accent-green font-bold text-[8px] md:text-xs uppercase tracking-widest">
            Enter <ArrowRight size={10} />
          </div>
        </div>
      </motion.div>

      {/* Shop Block */}
      <motion.div 
        whileHover={{ y: -5 }}
        onClick={() => setActiveTab('shop')}
        className="col-span-1 md:col-span-2 bg-accent-pink/20 border border-black/10 rounded-[25px] md:rounded-[30px] p-5 md:p-8 cursor-pointer relative overflow-hidden group min-h-[180px] md:min-h-[300px] flex flex-col justify-end"
      >
        <div className="absolute top-0 left-0 w-full h-full z-0 opacity-40 group-hover:opacity-60 transition-opacity">
          <img src="https://res.cloudinary.com/dllugr1kc/image/upload/v1773451390/Modern_Formal_Invoice_for_Business_Consultant_cmhqgf.png" className="w-full h-full object-cover" alt="Shop Preview" />
        </div>
        <div className="relative z-10 bg-white/80 backdrop-blur-md p-3 md:p-6 rounded-xl border border-black/5">
          <ShoppingBag className="text-accent-pink mb-2 md:mb-4" size={24} />
          <h3 className="text-lg md:text-2xl font-serif mb-1">Shop</h3>
          <div className="hidden md:block text-xs text-black/60 mb-4">Faith-based aesthetics.</div>
          <div className="flex items-center gap-1 text-accent-pink font-bold text-[8px] md:text-xs uppercase tracking-widest">
            Shop <ArrowRight size={10} />
          </div>
        </div>
      </motion.div>

      {/* Christian Community Block */}
      <motion.div 
        whileHover={{ y: -5 }}
        className="col-span-2 md:col-span-3 bg-accent-green text-white border border-black/10 rounded-[30px] p-6 md:p-10 relative overflow-hidden group"
      >
        <div className="md:flex gap-10 items-center">
          <div className="space-y-4 md:space-y-6 flex-1">
            <h3 className="text-2xl md:text-4xl font-serif">Jesus Unites</h3>
            <p className="text-white/80 leading-relaxed font-light italic text-xs md:text-base">
              "My faith is the foundation of everything I do. I've started 'Jesus Unites' as a wholesome, loving Christ-centered community. We host online Bible study, game nights and events. Don't miss the next one!"
            </p>
            <div className="grid grid-cols-2 gap-2 md:gap-4 pt-2 md:pt-4">
              <a href="https://whatsapp.com/channel/0029Vb618yW4SpkJAOFqQw0X" target="_blank" className="bg-white/10 hover:bg-white/20 px-3 py-2 rounded-full text-[8px] md:text-xs uppercase tracking-widest font-bold transition-all border border-white/20 text-center flex items-center justify-center">
                WhatsApp Channel
              </a>
              <a href="https://chat.whatsapp.com/FniXtxlkwzgDLXEBZjVE6W?mode=gi_t" target="_blank" className="bg-white text-accent-green px-3 py-2 rounded-full text-[8px] md:text-xs uppercase tracking-widest font-bold transition-all text-center flex items-center justify-center">
                WhatsApp Group
              </a>
              <a href="https://discord.gg/dQkcmKyrq" target="_blank" className="bg-white text-accent-green px-3 py-2 rounded-full text-[8px] md:text-xs uppercase tracking-widest font-bold transition-all text-center flex items-center justify-center">
                Discord Channel
              </a>
              <a href="https://www.tiktok.com/@jesus.unites" target="_blank" className="bg-white/10 hover:bg-white/20 px-3 py-2 rounded-full text-[8px] md:text-xs uppercase tracking-widest font-bold transition-all border border-white/20 text-center flex items-center justify-center">
                TikTok Page
              </a>
            </div>
          </div>
          <div className="hidden md:block w-1/3">
            <div className="aspect-square bg-white/10 rounded-[40px] flex items-center justify-center border border-white/20 p-8">
              <div className="text-center">
                <span className="block text-5xl font-serif mb-2">2k+</span>
                <span className="text-[10px] uppercase tracking-[0.2em] opacity-60">WhastApp Followers</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Social Media Blocks */}
      <div className="col-span-2 md:col-span-1 grid grid-cols-4 md:grid-cols-2 gap-2 md:gap-4">
        {[
          { icon: <Music size={16} />, url: "https://www.tiktok.com/@kahewa_", handle: "@kahewa_", color: "bg-accent-pink/30" },
          { icon: <Instagram size={16} />, url: "https://www.instagram.com/iisgreys", handle: "@iisgreys", color: "bg-accent-pink/10" },
          { icon: <Youtube size={16} />, url: "https://www.youtube.com/@kahewagrace", handle: "@kahewagrace", color: "bg-red-500/10" },
          { icon: <Twitch size={16} />, url: "https://www.twitch.tv/flah0723", handle: "flah0723", color: "bg-purple-500/10" },
        ].map((social, i) => (
          <motion.a
            key={i}
            href={social.url}
            target="_blank"
            whileHover={{ scale: 1.05 }}
            className={`${social.color} border border-black/5 rounded-xl p-2 md:p-4 flex flex-col items-center justify-center text-center gap-1 overflow-hidden`}
          >
            {social.icon}
            <div className="text-[8px] md:text-[10px] font-bold leading-none truncate w-full px-1">{social.handle}</div>
          </motion.a>
        ))}
      </div>

      {/* GitHub & TikTok Small Blocks */}
      <motion.a 
        href="https://github.com/Kahewa" 
        target="_blank"
        whileHover={{ y: -5 }}
        className="col-span-1 md:col-span-2 bg-black text-white rounded-[25px] md:rounded-[30px] p-5 md:p-8 flex flex-col md:flex-row items-center md:justify-between gap-3 text-center md:text-left"
      >
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6">
          <Github size={30} />
          <div>
            <h4 className="text-lg md:text-xl font-serif">GitHub</h4>
            <p className="hidden md:block text-white/60 text-sm italic">My dev side.</p>
          </div>
        </div>
        <ArrowRight size={20} className="text-accent-pink hidden md:block" />
      </motion.a>

      <motion.a 
        href="https://www.instagram.com/createdbygreys" 
        target="_blank"
        whileHover={{ y: -5 }}
        className="col-span-1 md:col-span-2 border border-black rounded-[25px] md:rounded-[30px] p-5 md:p-8 flex flex-col md:flex-row items-center md:justify-between bg-white gap-3 text-center md:text-left"
      >
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6">
          <Instagram size={30} />
          <div>
            <h4 className="text-lg md:text-xl font-serif">Business Instagram</h4>
            <p className="hidden md:block text-black/60 text-sm italic tracking-tight">@createdbygreys</p>
          </div>
        </div>
        <ArrowRight size={20} className="text-black hidden md:block" />
      </motion.a>

    </div>

    {/* Testimonials */}
    <div className="mt-24">
      <h3 className="text-accent-green font-bold tracking-[0.3em] uppercase text-xs mb-12 border-l-2 border-accent-green pl-4">
        Testimonials
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {TESTIMONIALS.map((testimonial, index) => (
          <motion.div
            key={testimonial.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            className="bg-white border border-black/10 p-8 rounded-[30px] shadow-sm hover:shadow-md transition-shadow relative"
          >
            <div className="flex items-center gap-4 mb-6">
              <img 
                src={testimonial.avatar} 
                alt={testimonial.username} 
                className="w-12 h-12 rounded-full border border-accent-green/20"
                referrerPolicy="no-referrer"
              />
              <div>
                <div className="text-sm font-bold">{testimonial.username}</div>
                <div className="text-xs text-accent-green">{testimonial.handle}</div>
              </div>
            </div>
            <p className="text-sm text-black/70 leading-relaxed italic">
              "{testimonial.message}"
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.div>
);

const ServicesView = () => {
  const [activeService, setActiveService] = useState<ServiceTab>('graphic');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const filteredItems = PORTFOLIO.filter(item => item.category === activeService);
  const graphicItems = PORTFOLIO.filter(item => item.category === 'graphic');

  const handleItemClick = (item: PortfolioItem) => {
    if (item.category === 'graphic') {
      const index = graphicItems.findIndex(i => i.id === item.id);
      setLightboxIndex(index);
      setIsLightboxOpen(true);
    } else {
      setSelectedItem(item);
      setIsModalOpen(true);
    }
  };

  const getModalConfig = () => {
    if (!selectedItem) return { title: '', message: '', confirmLabel: '', onConfirm: () => {} };
    
    if (selectedItem.category === 'video') {
      return {
        title: 'Watch Video',
        message: 'You are about to leave this site to watch a reel/youtube video. Would you like to proceed?',
        confirmLabel: 'Watch Video',
        onConfirm: () => window.open(selectedItem.link, '_blank')
      };
    }
    
    return {
      title: 'View Website',
      message: 'You are about to leave this site to view the project website. Would you like to proceed?',
      confirmLabel: 'View Website',
      onConfirm: () => window.open(selectedItem.link, '_blank')
    };
  };

  const modalConfig = getModalConfig();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pt-36 md:pt-32 pb-20 px-6 max-w-7xl mx-auto"
    >
      <div className="text-center mb-10 md:mb-12">
        <h2 className="text-4xl font-serif mb-4">Created By Greys</h2>
        <p className="text-black/60">A curated selection of my creative work.</p>
      </div>

      <div className="flex justify-center gap-3 md:gap-4 mb-8 flex-wrap">
        {([
          { id: 'graphic', label: 'Graphic' },
          { id: 'video', label: 'Video' },
          { id: 'ui', label: 'Web Development' }
        ] as { id: ServiceTab, label: string }[]).map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveService(tab.id)}
            className={`px-5 py-2 rounded-full border border-black text-xs uppercase tracking-widest transition-all ${
              activeService === tab.id 
                ? 'bg-black text-white border-accent-pink/50 shadow-[0_0_10px_rgba(255,194,232,0.2)]' 
                : 'hover:bg-accent-pink'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className={`grid gap-3 md:gap-4 ${
        activeService === 'graphic'
          ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'
          : activeService === 'video'
          ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'
          : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3'
      }`}>
        <AnimatePresence mode="wait">
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              onClick={() => handleItemClick(item)}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`group relative overflow-hidden border border-black bg-white cursor-pointer ${
                item.category === 'video' ? 'aspect-[9/16]' : item.category === 'ui' ? 'aspect-video' : 'aspect-square'
              }`}
            >
              <img 
                src={item.thumbnail} 
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white p-3 md:p-4 text-center border border-accent-pink/30">
                <h3 className="text-sm md:text-base font-serif mb-1.5 leading-tight line-clamp-2 px-1">{item.title}</h3>
                <div className="flex items-center gap-1 text-[10px] md:text-xs uppercase tracking-widest text-accent-pink">
                  <span>{item.category === 'graphic' ? 'Expand' : item.category === 'video' ? 'Watch' : 'View'}</span> <ExternalLink size={11} />
                </div>
              </div>
              {item.type === 'video' && (
                <div className="absolute top-2 right-2 bg-white/90 p-1.5 rounded-full border border-black">
                  <Video size={13} />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <Modal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        {...modalConfig}
      />

      <Lightbox 
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        items={graphicItems}
        currentIndex={lightboxIndex}
        onPrev={() => setLightboxIndex((prev) => (prev - 1 + graphicItems.length) % graphicItems.length)}
        onNext={() => setLightboxIndex((prev) => (prev + 1) % graphicItems.length)}
      />
    </motion.div>
  );
};

const RatesView: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'graphics' | 'video' | 'web'>('graphics');

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pt-36 md:pt-32 pb-20 px-6 max-w-7xl mx-auto"
    >
      <div className="text-center mb-10 md:mb-12">
        <h2 className="text-4xl font-serif mb-4">Service Rates</h2>
        <p className="text-black/60">Quality work tailored to your vision</p>
      </div>

      <div className="flex justify-center gap-3 md:gap-4 mb-8 flex-wrap">
        {[
          { id: 'graphics', label: 'Graphic' },
          { id: 'video', label: 'Video' },
          { id: 'web', label: 'Web Development' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSection(tab.id as any)}
            className={`px-5 py-2 rounded-full border border-black text-xs uppercase tracking-widest transition-all ${
              activeSection === tab.id 
                ? 'bg-black text-white border-accent-pink/50 shadow-[0_0_10px_rgba(255,194,232,0.2)]' 
                : 'hover:bg-accent-pink'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-white border border-black/10 rounded-[30px] overflow-hidden shadow-sm">
        <div className="p-8 border-b border-black/5 bg-accent-green/5 flex justify-between items-start">
          <div>
            <h3 className="text-2xl font-serif capitalize">
              {activeSection === 'web' ? 'Web Development Services' : activeSection === 'graphics' ? 'Graphic Services' : activeSection + ' Services'}
            </h3>
            <p className="text-xs text-black/40 mt-1">
              Consultation: {activeSection === 'web' ? 'N$150' : 'N$80'}
            </p>
            {activeSection === 'video' && (
              <div className="mt-4 p-4 bg-white/50 rounded-xl border border-black/5 text-[10px] space-y-1 text-black/60">
                <p className="font-bold text-black uppercase tracking-widest">For filming content for the client:</p>
                <p>• Callout Fee: N$80.00/hr + Price of preferred duration</p>
                <p>• Equipment: DJI Osmo Nano</p>
              </div>
            )}
          </div>
          <Tag className="text-accent-green opacity-20" size={40} />
        </div>
        
        <div className="w-full">
          {RATES[activeSection].map((group, gIdx) => (
            <div key={gIdx}>
              <div className="bg-black/[0.03] px-6 md:px-8 py-3 text-[10px] uppercase tracking-widest font-bold text-black/40 border-y border-black/5">
                {group.title}
              </div>
              
              {/* Mobile List View */}
              <div className="md:hidden divide-y divide-black/5">
                {group.items.map((item: any, idx: number) => (
                  <div key={idx} className="p-6 space-y-2 hover:bg-accent-green/[0.02] transition-colors">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-1 sm:gap-4">
                      <h4 className="font-serif text-lg leading-tight">{item.service}</h4>
                      <div className="text-left sm:text-right">
                        <div className="font-bold text-accent-green sm:whitespace-nowrap">
                          {item.price.includes('N$') || item.price.includes('Consultation') || item.price.includes('Quote') ? item.price : `N$${item.price}`}
                        </div>
                        {activeSection === 'video' && (item.rawText || item.raw) && (
                          <span className="block text-[9px] text-black/30 font-normal mt-1 uppercase tracking-tighter sm:text-right">
                            {item.rawText || `Raw: N$${item.raw}`}
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-black/60 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>

              {/* Desktop Table View */}
              <table className="hidden md:table w-full text-left">
                <tbody className="divide-y divide-black/5">
                  {group.items.map((item: any, idx: number) => (
                    <tr key={idx} className="hover:bg-accent-green/[0.02] transition-colors">
                      <td className="px-8 py-5 font-serif text-lg leading-tight w-1/3">{item.service}</td>
                      <td className="px-8 py-5 text-sm text-black/60">{item.desc}</td>
                      <td className="px-8 py-5 text-right font-bold text-accent-green whitespace-nowrap">
                        {item.price.includes('N$') || item.price.includes('Consultation') || item.price.includes('Quote') ? item.price : `N$${item.price}`}
                        {activeSection === 'video' && (item.rawText || item.raw) && (
                          <span className="block text-[10px] text-black/30 font-normal">
                            {item.rawText || `Raw Content: N$${item.raw}`}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-6 bg-accent-pink/5 rounded-2xl text-[10px] space-y-2 text-black/60 border border-black/5">
          <span className="font-bold text-black uppercase tracking-widest block mb-2">Payment Agreement</span>
          {activeSection === 'web' ? (
            <p>• A N$800.00 set up fee is required prior to starting the project, and the rest is paid upon project completion.</p>
          ) : (
            <>
              <p>• Under N$400: To be paid in full before starting the project.</p>
              <p>• Over N$400: 50% deposit before starting, and final 50% upon delivery.</p>
            </>
          )}
          <p>• Time-Frame: Reliant on project specification.</p>
        </div>
        <div className="p-6 bg-accent-green/5 rounded-2xl text-[10px] space-y-2 text-black/60 border border-black/5">
          <span className="font-bold text-black uppercase tracking-widest block mb-2">Policy</span>
          <p>• 30% is charged on deposit/setup fee if a started project cancellation is underway.</p>
          <p>• No deposit/setup fee refunds for project cancelation nearing completion.</p>
          <p>• No refunds after final projects that are fully paid for.</p>
        </div>
      </div>
    </motion.div>
  );
};

const ShopView = () => {
  const [activeShop, setActiveShop] = useState<'haven' | 'crowned'>('haven');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentProducts = activeShop === 'haven' ? HAVEN_PRODUCTS : CROWNED_PRODUCTS;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pt-36 md:pt-32 pb-20 px-6 max-w-7xl mx-auto"
    >
      <div className="text-center mb-10 md:mb-12">
        <h2 className="text-4xl font-serif mb-4">By Greys Products</h2>
        <p className="text-black/60">A curated collection of faith-focused and beauty aesthetics.</p>
      </div>

      <div className="flex justify-center gap-3 md:gap-4 mb-12">
        {[
          { id: 'haven', label: 'Haven By Greys' },
          { id: 'crowned', label: 'Crowned By Greys' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveShop(tab.id as any)}
            className={`px-5 py-2 rounded-full border border-black text-xs uppercase tracking-widest transition-all ${
              activeShop === tab.id 
                ? 'bg-black text-white border-accent-pink/50 shadow-[0_0_10px_rgba(255,194,232,0.2)]' 
                : 'hover:bg-accent-pink font-light'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="border-b border-black/10 pb-6 mb-8">
        <div>
          <span className="text-accent-green font-bold uppercase tracking-widest text-xs">
            {activeShop === 'haven' ? 'Matthew 9 : 37-38' : 'Psalm 139 : 14'}
          </span>
          <h3 className="text-xl md:text-2xl font-serif mt-1">
            {activeShop === 'haven' ? 'Haven By Greys' : 'Crowned By Greys'}
          </h3>
          <p className="text-xs text-black/50 mt-1 uppercase tracking-wider font-semibold">
            {activeShop === 'haven' ? 'Christian Themed Aesthetics & Stationery' : 'Organic Hair Care and Accessories'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
        {currentProducts.map((product) => (
          <motion.div 
            key={product.id}
            whileHover={{ y: -5 }}
            className="group cursor-pointer bg-white border border-black/10 p-2.5 rounded-2xl flex flex-col justify-between"
            onClick={() => {
              setSelectedProduct(product);
              setIsModalOpen(true);
            }}
          >
            <div>
              <div className="aspect-[4/5] overflow-hidden rounded-xl border border-black/5 mb-3 relative bg-black/[0.02]">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                {product.name.includes('(Demo)') && (
                  <span className="absolute top-2 left-2 bg-accent-pink text-[8px] tracking-widest uppercase font-extrabold px-1.5 py-0.5 rounded border border-black/10 backdrop-blur-sm">
                    Demo
                  </span>
                )}
              </div>
              <h4 className="font-serif text-xs md:text-sm text-black/80 font-medium leading-snug line-clamp-2 mb-1 px-0.5">
                {product.name}
              </h4>
            </div>
            <div className="flex justify-between items-center mt-2 px-0.5">
              <p className="text-accent-green font-bold text-xs md:text-sm">{product.price}</p>
              <button 
                className="p-1.5 bg-black text-white rounded-full hover:bg-accent-pink hover:text-black transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedProduct(product);
                  setIsModalOpen(true);
                }}
              >
                <ShoppingBag size={12} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <ProductDetailModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={selectedProduct}
      />
    </motion.div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  return (
    <div className="min-h-screen selection:bg-accent-pink/30">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main>
        <AnimatePresence mode="wait">
          {activeTab === 'home' && <HomeView key="home" setActiveTab={setActiveTab} />}
          {activeTab === 'services' && <ServicesView key="services" />}
          {activeTab === 'shop' && <ShopView key="shop" />}
          {activeTab === 'rates' && <RatesView key="rates" />}
        </AnimatePresence>
      </main>

      <footer className="relative z-10 bg-primary border-t border-black/10 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-xl font-sans font-bold text-accent-green">By Greys Co.</div>
          <div className="flex gap-8 text-xs uppercase tracking-widest font-medium">
            <button 
              onClick={(e) => {
                e.preventDefault();
                setIsPrivacyOpen(true);
              }}
              className="hover:text-accent-pink cursor-pointer font-medium text-xs uppercase tracking-widest bg-transparent border-0 p-0"
            >
              Privacy
            </button>
            <button 
              onClick={(e) => {
                e.preventDefault();
                setIsTermsOpen(true);
              }}
              className="hover:text-accent-pink cursor-pointer font-medium text-xs uppercase tracking-widest bg-transparent border-0 p-0"
            >
              Terms
            </button>
            <a href="https://wa.me/message/3MVQAVJC5DYNC1" className="hover:text-accent-pink">Contact</a>
          </div>
          <p className="text-[10px] uppercase tracking-widest text-black/40">
            © 2026 By Greys Company. All rights reserved.
          </p>
        </div>
      </footer>

      <TermsModal isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} />
      <PrivacyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
    </div>
  );
}

