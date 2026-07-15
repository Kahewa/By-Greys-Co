import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag } from 'lucide-react';

// --- TYPES ---
export interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  link: string;
  description?: string;
  features?: string[];
}

// --- PRODUCT DATA ---
export const HAVEN_PRODUCTS: Product[] = [
  { 
    id: 101, 
    name: "Haven By Grace", 
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
  //   name: "Bible Verse Poster (Demo)", 
  //   price: "N$120.00", 
  //   image: "https://res.cloudinary.com/dllugr1kc/image/upload/v1773451390/Modern_Formal_Invoice_for_Business_Consultant_cmhqgf.png", 
  //   link: "https://wa.me/264818093531",
  //   description: "Transform your home, workspace, or study room with a custom-designed minimalist Bible verse poster. Printed on premium matte archival paper to add a touch of spiritual encouragement to your walls.",
  //   features: [
  //     "Sizes: A4, A3, and custom options",
  //     "Printed on premium 250gsm card stock",
  //     "Custom minimalist typography designs",
  //     "Frames not included (fits standard frames)"
  //   ]
  // },
];

export const CROWNED_PRODUCTS: Product[] = [
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
  //  name: "Silk Scrunchies Pack (Demo)", 
  //  price: "N$60.00", 
  //  image: "https://res.cloudinary.com/dllugr1kc/image/upload/v1773451390/Modern_Formal_Invoice_for_Business_Consultant_cmhqgf.png", 
  //  link: "https://wa.me/264818093531",
  //  description: "Gentle ties designed to protect your hair. These elegant scrunchies slide out effortlessly without snagging, preventing traditional ponytails split ends, breakage, and tension pressure.",
  //  features: [
  //    "Set of 3 aesthetic earth-toned colors",
  //    "Super soft surface prevents creasing",
  //    "Strong inner elastic holds hair securely",
  //    "Ideal for high buns, puffs, and sleeping"
  //  ]
  // },
];

// --- PRODUCT DETAIL MODAL COMPONENT ---
export const ProductDetailModal = ({
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
                    <span className="text-[10px] md:text-xs font-bold text-[#83a076] uppercase tracking-widest">
                      {product.id < 200 ? "Haven By Grace" : "Crowned By Grace"}
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
                    <span className="text-2xl font-bold text-[#83a076]">{product.price}</span>
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
                            <span className="text-[#db6b86] font-bold mt-0.5">•</span>
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

// --- SHOP VIEW COMPONENT ---
export const ShopView = () => {
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
        <h2 className="text-4xl font-serif mb-4">By Grace Products</h2>
        <p className="text-black/60">A curated collection of faith-focused and beauty aesthetics.</p>
      </div>

      <div className="flex justify-center gap-3 md:gap-4 mb-12">
        {[
          { id: 'haven', label: 'Haven By Grace' },
          { id: 'crowned', label: 'Crowned By Grace' },
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
          <span className="text-[#83a076] font-bold uppercase tracking-widest text-xs">
            {activeShop === 'haven' ? 'Matthew 9 : 37-38' : 'Psalm 139 : 14'}
          </span>
          <h3 className="text-xl md:text-2xl font-serif mt-1">
            {activeShop === 'haven' ? 'Haven By Grace' : 'Crowned By Grace'}
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
                  <span className="absolute top-2 left-2 bg-[#db6b86] text-white text-[8px] tracking-widest uppercase font-extrabold px-1.5 py-0.5 rounded border border-black/10 backdrop-blur-sm">
                    Demo
                  </span>
                )}
              </div>
              <h4 className="font-serif text-xs md:text-sm text-black/80 font-medium leading-snug line-clamp-2 mb-1 px-0.5">
                {product.name}
              </h4>
            </div>
            <div className="flex justify-between items-center mt-2 px-0.5">
              <p className="text-[#83a076] font-bold text-xs md:text-sm">{product.price}</p>
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
