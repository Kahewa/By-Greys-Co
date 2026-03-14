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
  ChevronRight
} from 'lucide-react';

// --- Types ---

type Tab = 'home' | 'shop' | 'services';
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
  { id: 16, title: "Click Here", category: 'video', thumbnail: "https://res.cloudinary.com/dllugr1kc/image/upload/v1773451044/13_rmzxjx.png", link: "https://youtu.be/u8Fl_CTStnQ?si=4zhQ99-LFkW_Jr_D", type: 'video' },
 // { id: 14, title: "Product Launch Teaser", category: 'video', thumbnail: "https://picsum.photos/seed/video2/1920/1080", link: "#", type: 'video' },
  // UI Design
  { id: 17, title: "Click Here", category: 'ui', thumbnail: "https://res.cloudinary.com/dllugr1kc/image/upload/v1773451029/14_jsjsxw.png", link: "https://bygreysco.netlify.app", type: 'image' },
  //{ id: 16, title: "Wellness Dashboard", category: 'ui', thumbnail: "https://picsum.photos/seed/ui2/800/600", link: "#", type: 'image' },
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
    className="pt-32 pb-20 px-6 max-w-7xl mx-auto relative overflow-hidden"
  >
    {/* Decorative background elements for aesthetic feel */}
    <div className="absolute top-20 right-0 w-64 h-64 bg-accent-pink/10 blur-3xl rounded-full -z-10" />
    <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-green/5 blur-3xl rounded-full -z-10" />

    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
      {/* Mobile-only: Creative Executive & Founder above the image */}
      <div className="md:hidden mb-4">
        <motion.span 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-accent-green font-medium tracking-[0.2em] uppercase text-[10px] border-b border-accent-green/30 pb-1"
        >
          
        </motion.span>
      </div>

      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="order-1 md:order-2 relative"
      >
        <div className="relative z-10 aspect-[4/5] bg-accent-pink/10 rounded-t-[120px] rounded-b-[20px] overflow-hidden border border-black/20 shadow-2xl shadow-accent-pink/5">
          <img 
            src="https://res.cloudinary.com/dllugr1kc/image/upload/v1772803817/DSCF4447_otsxpk.jpg" 
            alt="About Me" 
            referrerPolicy="no-referrer"
          />
        </div>
        {/* Decorative frame element */}
        <div className="absolute -inset-4 border border-accent-green/20 rounded-t-[140px] rounded-b-[40px] -z-10 translate-x-2 translate-y-2" />
        
        <motion.div 
          initial={{ rotate: 0 }}
          animate={{ rotate: 12 }}
          className="absolute -bottom-8 -left-8 w-36 h-36 bg-accent-green rounded-full flex items-center justify-center border border-black shadow-lg z-20"
        >
          <div className="flex flex-col items-center">
            <span className="text-white font-serif font-bold  text-xl leading-none">Grace</span>
            <span className="text-white font-serif font-bold text-xl">Shuuya</span>
          </div>
        </motion.div>
      </motion.div>

      <div className="order-2 md:order-1">
        {/* Desktop-only:  */}
        <div className="hidden md:block mb-6">
          <motion.span 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-accent-green font-medium tracking-[0.3em] uppercase text-xs inline-block border-l-2 border-accent-green pl-4"
          >
         
          </motion.span>
        </div>

        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-5xl md:text-7xl font-serif mt-4 mb-10 leading-[1.1] tracking-tight"
        >
          Creative <br />
          <span className="italic text-accent-green">Executive</span> <br />
          & Founder.
        </motion.h1>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-base md:text-lg text-black/80 max-w-md leading-relaxed whitespace-pre-line mb-12 font-light"
        >
          Hi, I'm Grace Shuuya.
          
          I'm a 24-year-old Namibian creative, born and raised in Windhoek. I have a Bachelor's degree in Software Development, with a passion for the visual side of communication.
          
          At my core, I am a Content Creator with a strategic eye for overseeing creative processes, developing concepts, and driving visual or narrative direction within industries like advertising and digital media.
          
          My work isn't just aesthetics though! My faith is the foundation of everything I do. As a Christian, my creativity is an extension of my worship. So take a minute to visit my shop - a space where faith and design come together.
          
          I've brought all my work under one brand called By Greys Company. It is the home for everything I create, from service provision to product outlets.
          
          Thanks for stopping by.
        </motion.div>

        <div className="flex flex-wrap gap-6 mb-12">
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab('services')}
            className="group px-10 py-5 bg-black text-white rounded-full border border-accent-pink/30 flex items-center gap-3 hover:shadow-xl hover:shadow-accent-pink/10 transition-all duration-300"
          >
            <span className="tracking-widest uppercase text-xs font-bold">View Portfolio</span>
            <ArrowRight size={18} className="text-accent-pink group-hover:translate-x-1 transition-transform" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab('shop')}
            className="px-10 py-5 border border-black rounded-full flex items-center gap-3 hover:bg-accent-pink/20 transition-all duration-300"
          >
            <span className="tracking-widest uppercase text-xs font-bold">Visit Shop</span>
            <ShoppingBag size={18} className="text-accent-green" />
          </motion.button>
        </div>

        <SocialLinks />
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
      className="pt-32 pb-20 px-6 max-w-7xl mx-auto"
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="wait">
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              onClick={() => handleItemClick(item)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`group relative overflow-hidden border border-black bg-white cursor-pointer ${
                item.category === 'video' ? 'aspect-[9/16]' : 'aspect-square'
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

const ShopView = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pt-32 pb-20 px-6 max-w-7xl mx-auto"
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

