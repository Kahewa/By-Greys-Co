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
      title: "Services",
      items: [
        { service: "Basic Designs", desc: "Simple design structures - Single product ads, Name tags, etc.", price: "60" },
        { service: "Thumbnails", desc: "TikTok, IG Reels, Reel Shorts, YouTube, IG Story take-over covers", price: "130" },
        { service: "Advanced Advert", desc: "Product/Service ads, Pricelists, Book covers, Info posts, Event posters, etc.", price: "150" },
        { service: "Invitations and Letters", desc: "Graduation, Wedding, Party, Love letters, etc.", price: "150" },
        { service: "Startup Logo Design", desc: "New designs, Old logo refinement", price: "150" },
      ]
    },
    {
      title: "PDF Documents (Invitations / Catalogues / Business Profiles)",
      items: [
        { service: "One Page", desc: "A4 size - Includes consultation, active links, professional design", price: "200" },
        { service: "Two Pages", desc: "A4 size - Includes consultation, active links, professional design", price: "380" },
        { service: "Three Pages", desc: "A4 size - Includes consultation, active links, professional design", price: "550" },
        { service: "More Pages", desc: "A4 size - Includes consultation, active links, professional design", price: "Consultation needed" },
      ]
    },
    {
      title: "Start Up Graphic Design Packages",
      items: [
        { service: "Logo Design Pack", desc: "Logo (Light + Dark Mode) + Business Cards + Email Banner", price: "300" },
        { service: "Party Pack", desc: "2 Page PDF Invitation + 1 Page PDF Wishlist + GRWM reel", price: "650" },
        { service: "Start-up Business Pack", desc: "Logo Design Pack + x2 Advanced Adverts + 3 Page PDF Catalogue", price: "1000" },
      ]
    },
    {
      title: "Corporate Graphic Design Packages",
      items: [
        { service: "Logo Design Pack (Old logo refinement)", desc: "Logo (Light + Dark Mode) + Business Card Design + Email Banner", price: "600" },
        { service: "Wedding Pack", desc: "3 Page PDF Invitation + 5 day Countdown", price: "1,300" },
        { service: "Business Pack", desc: "Logo Design Pack + 2 Page Company CI Doc + 5 Page Company Profile", price: "2,250" },
      ]
    }
  ],
  video: [
    {
      title: "Own Content Prices",
      items: [
        { service: "1-2 min", desc: "End result 1-2 min only", price: "200", raw: "300" },
        { service: "3-5 min", desc: "End result 3-5 min only", price: "490", raw: "590" },
        { service: "6-10 min", desc: "End result 6-10 min only", price: "700", raw: "800" },
        { service: "11-15 min", desc: "End result 11-15 min only", price: "850", raw: "950" },
        { service: "16-20 min", desc: "End result 16-20 min only", price: "1000", raw: "1100" },
        { service: "21-45 min", desc: "End result 21-45 min only", price: "1300", raw: "1400" },
        { service: "YouTube Mini", desc: "16-20 min + trailer + thumbnail", price: "1330", raw: "1430" },
        { service: "YouTube Max", desc: "21-45 min + trailer + thumbnail", price: "1630", raw: "1730" },
      ]
    }
  ],
  web: [
    {
      title: "Web Development",
      items: [
        { service: "Basic Portfolio", desc: "Profile, introduction, and social links only", price: "1,500" },
        { service: "Intermediate Portfolio", desc: "Profile, intro, social links, services, and testimonials", price: "2,800" },
        { service: "Advanced Portfolio", desc: "Everything including past work gallery", price: "4,500" },
      ]
    },
    {
      title: "UI Design",
      items: [
        { service: "Company Page Design", desc: "Corporate info, team, contact sections", price: "2,000" },
        { service: "E-commerce Design", desc: "Product pages, cart, checkout UI", price: "3,500" },
        { service: "Software Application Design", desc: "Dashboard, user flows, complex UI", price: "3,500" },
      ]
    },
    {
      title: "Frontend Development",
      items: [
        { service: "Consultation required", desc: "Custom features and logic implementation", price: "Quote base" },
      ]
    }
  ]
};

const PRODUCTS: Product[] = [
  { id: 1, name: "Haven By Greys", price: "N$0.00", image: "https://res.cloudinary.com/dllugr1kc/image/upload/v1773451390/Modern_Formal_Invoice_for_Business_Consultant_cmhqgf.png", link: "https://wa.me/264818093531" },
  //{ id: 2, name: "Minimalist Planner", price: "$28.00", image: "https://picsum.photos/seed/planner/400/500", link: "#" },
  //{ id: 3, name: "Handcrafted Candle", price: "$32.00", image: "https://picsum.photos/seed/candle/400/500", link: "#" },
  //{ id: 4, name: "Gold Hoop Earrings", price: "$55.00", image: "https://picsum.photos/seed/earrings/400/500", link: "#" },
  //{ id: 5, name: "Gold Hoop Earrings", price: "$55.00", image: "https://picsum.photos/seed/earrings/400/500", link: "#" },
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
      
      {/* Introduction Block */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="col-span-1 md:col-span-3 bg-white border border-black/10 rounded-[25px] md:rounded-[40px] p-5 md:p-10 flex flex-col justify-center"
      >
        <motion.h1 
          className="text-2xl md:text-7xl font-serif mb-4 md:mb-8 leading-[1.1] tracking-tight"
        >
          Creative <br />
          <span className="italic text-accent-green">Executive</span> <br />
          <span className="hidden md:inline">& Founder</span>
        </motion.h1>
        <p className="text-xs md:text-lg text-black/80 max-w-2xl leading-relaxed font-light">
          Hi, I'm <span className="font-bold text-accent-green">Grace Shuuya</span>. A Namibian-based creative producing aesthetic experiences that reflect my skill and faith. I am passionate about UI Design, Frontend Development, Graphic Design and Videography, overseen by a strategic eye for creative direction.
        </p>
      </motion.div>

      {/* Photo & LinkedIn Sidebar */}
      <div className="col-span-1 md:col-span-1 flex flex-col gap-3 md:gap-4">
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
          className="bg-[#0077b5] text-white rounded-[20px] md:rounded-[30px] p-4 flex items-center justify-between group"
        >
          <Linkedin size={24} />
          <div className="text-right">
            <div className="text-[10px] md:text-sm font-bold leading-none">Connect</div>
            <div className="text-[8px] md:text-[10px] uppercase tracking-widest opacity-80">LinkedIn</div>
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

      <motion.div 
        whileHover={{ y: -5 }}
        onClick={() => setActiveTab('rates')}
        className="col-span-2 md:col-span-4 bg-accent-green/10 border border-black/10 rounded-[25px] md:rounded-[30px] p-5 md:p-6 flex items-center justify-between cursor-pointer group"
      >
        <div className="flex items-center gap-4">
          <div className="bg-accent-green text-white p-3 rounded-xl">
             <Tag size={20} />
          </div>
          <div>
            <h4 className="text-lg md:text-xl font-serif">View Rates</h4>
            <p className="text-black/60 text-[10px] md:text-xs">Transparent pricing for all creative services.</p>
          </div>
        </div>
        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
      </motion.div>

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
      <div className="text-center mb-16">
        <h2 className="text-4xl font-serif mb-4">Created By Greys</h2>
        <p className="text-black/60">A curated selection of my creative work.</p>
      </div>

      <div className="flex justify-center gap-4 md:gap-8 mb-12">
        {([
          { id: 'graphic', label: 'Graphic' },
          { id: 'video', label: 'Video' },
          { id: 'ui', label: 'UI Design' }
        ] as { id: ServiceTab, label: string }[]).map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveService(tab.id)}
            className={`px-6 py-2 rounded-full border border-black text-sm uppercase tracking-widest transition-all ${
              activeService === tab.id 
                ? 'bg-black text-white border-accent-pink/50 shadow-[0_0_10px_rgba(255,194,232,0.2)]' 
                : 'hover:bg-accent-pink'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className={`grid gap-8 ${
        activeService === 'ui' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
      }`}>
        <AnimatePresence mode="wait">
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              onClick={() => handleItemClick(item)}
              initial={{ opacity: 0, y: 20 }}
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
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white p-6 text-center border-2 border-accent-pink/30">
                <h3 className="text-xl font-serif mb-2">{item.title}</h3>
                <div className="flex items-center gap-2 text-sm uppercase tracking-widest text-accent-pink">
                  {item.category === 'graphic' ? 'Expand Image' : item.category === 'video' ? 'Watch Video' : 'View Website'} <ExternalLink size={14} />
                </div>
              </div>
              {item.type === 'video' && (
                <div className="absolute top-4 right-4 bg-white/90 p-2 rounded-full border border-black">
                  <Video size={16} />
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
      <div className="text-center mb-16">
        <h2 className="text-4xl font-serif mb-4">Service Rates</h2>
        <p className="text-black/60">Quality work tailored to your vision</p>
      </div>

      <div className="flex justify-center gap-4 md:gap-8 mb-12 flex-wrap">
        {[
          { id: 'graphics', label: 'Graphic' },
          { id: 'video', label: 'Video' },
          { id: 'web', label: 'UI Design' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSection(tab.id as any)}
            className={`px-6 py-2 rounded-full border border-black text-sm uppercase tracking-widest transition-all ${
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
              {activeSection === 'web' ? 'Web Development & UI' : activeSection + ' Services'}
            </h3>
            <p className="text-xs text-black/40 mt-1">
              Consultation: {activeSection === 'web' ? 'N$150' : 'N$80'}
            </p>
            {activeSection === 'video' && (
              <div className="mt-4 p-4 bg-white/50 rounded-xl border border-black/5 text-[10px] space-y-1 text-black/60">
                <p className="font-bold text-black uppercase tracking-widest">For filming content for the client:</p>
                <p>• Callout Fee: N$80/hr + Price of preferred duration</p>
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
                    <div className="flex justify-between items-start gap-4">
                      <h4 className="font-serif text-lg leading-tight">{item.service}</h4>
                      <div className="text-right">
                        <div className="font-bold text-accent-green whitespace-nowrap">
                          {item.price.includes('N$') || item.price.includes('Consultation') || item.price.includes('Quote') ? item.price : `N$${item.price}`}
                        </div>
                        {activeSection === 'video' && item.raw && (
                          <span className="block text-[9px] text-black/30 font-normal mt-1 uppercase tracking-tighter">
                            Raw: N${item.raw}
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
                        {activeSection === 'video' && item.raw && (
                          <span className="block text-[10px] text-black/30 font-normal">
                            Raw Content: N${item.raw}
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
            <p>• A N$600 set-up fee is required for all Development services.</p>
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
          <p>• Refund: 30% is charged on {activeSection === 'web' ? 'setup' : 'all'} refunds.</p>
          <p>• No refunds for finished projects or after service is delivered and paid for.</p>
        </div>
      </div>
    </motion.div>
  );
};

const ShopView = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pt-36 md:pt-32 pb-20 px-6 max-w-7xl mx-auto"
    >
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <div>
          <span className="text-accent-green font-bold uppercase tracking-widest text-xs">Matthew 9 : 37-38</span>
          <h2 className="text-5xl font-serif mt-2">Haven By Greys</h2>
        </div>
        <p className="max-w-xs text-black/60 italic">
          Welcome to my shop! This is my Range of Christian Themed Aestheics. Happy Shopping!
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {PRODUCTS.map((product) => (
          <motion.div 
            key={product.id}
            whileHover={{ y: -10 }}
            className="group cursor-pointer"
            onClick={() => {
              setSelectedProduct(product);
              setIsModalOpen(true);
            }}
          >
            <div className="aspect-[4/5] overflow-hidden border border-black mb-4 relative">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-lg">{product.name}</h3>
                <p className="text-accent-green font-bold">{product.price}</p>
              </div>
              <button 
                className="p-3 bg-black text-white rounded-full hover:bg-accent-pink hover:text-black transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedProduct(product);
                  setIsModalOpen(true);
                }}
              >
                <ShoppingBag size={20} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <Modal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Continue to Chat"
        message="You are about to go to my WhatsApp to inquire about this product. Would you like to proceed?"
        confirmLabel="Continue to Chat"
        onConfirm={() => selectedProduct && window.open(selectedProduct.link, '_blank')}
      />
    </motion.div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-primary selection:bg-accent-pink/30">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main>
        <AnimatePresence mode="wait">
          {activeTab === 'home' && <HomeView key="home" setActiveTab={setActiveTab} />}
          {activeTab === 'services' && <ServicesView key="services" />}
          {activeTab === 'shop' && <ShopView key="shop" />}
          {activeTab === 'rates' && <RatesView key="rates" />}
        </AnimatePresence>
      </main>

      <footer className="border-t border-black/10 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-xl font-sans font-bold text-accent-green">By Greys Co.</div>
          <div className="flex gap-8 text-xs uppercase tracking-widest font-medium">
            <a href="#" className="hover:text-accent-pink">Privacy</a>
            <a href="#" className="hover:text-accent-pink">Terms</a>
            <a href="https://wa.me/message/3MVQAVJC5DYNC1" className="hover:text-accent-pink">Contact</a>
          </div>
          <p className="text-[10px] uppercase tracking-widest text-black/40">
            © 2026 By Greys Company. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

