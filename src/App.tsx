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

import { Tab, ServiceTab, PortfolioItem, Testimonial, RateGroup, RateItem, PortfolioSettings } from './types';
import { DEFAULT_SETTINGS } from './data';
import { db, isFirebaseReady } from './firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { AdminView } from './components/AdminView';


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
              At By Grace Co, we value the privacy and confidentiality of our clients. This Privacy Policy explains how personal and business information is collected, used, stored, and protected during the delivery of our services.
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
                  All client information, documents, and project materials shared with By Grace Co are treated as strictly confidential and will not be shared, sold, or disclosed to any third party without prior consent, unless required by law.
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
                  Clients are responsible for maintaining secure access credentials. By Grace Co will not be held liable for any loss, breach, or damage resulting from compromised login details after project handover.
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
                  By Grace Co reserves the right to update or modify this Privacy Policy at any time. Clients will be informed where significant changes may affect ongoing services.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-serif text-base font-bold text-black border-l-2 border-accent-green pl-2">9. Contact</h4>
                <p className="text-xs md:text-sm text-black/80 font-light leading-relaxed">
                  For any questions or concerns regarding this Privacy Policy or the handling of personal data, clients may contact By Grace Co directly.
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
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-primary/80 backdrop-blur-md border-b border-black/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div 
          className="text-2xl font-sans font-bold text-accent-green cursor-pointer" 
          onClick={() => setActiveTab('home')}
        >
          By Grace Co.
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

const SocialLinks = ({ socials }: { socials: PortfolioSettings['socials'] }) => (
  <div className="flex gap-6 mt-8">
    <a href={socials.instagram} target="_blank" rel="noopener noreferrer" className="p-2 border border-black rounded-full hover:bg-accent-pink transition-colors">
      <Instagram size={20} />
    </a>
    <a href={socials.tiktok} target="_blank" rel="noopener noreferrer" className="p-2 border border-black rounded-full hover:bg-accent-pink transition-colors">
      <Music size={20} />
    </a>
    <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 border border-black rounded-full hover:bg-accent-pink transition-colors">
      <Linkedin size={20} />
    </a>
    <a href={socials.github} target="_blank" rel="noopener noreferrer" className="p-2 border border-black rounded-full hover:bg-accent-pink transition-colors">
      <Github size={20} />
    </a>
  </div>
);

interface HomeViewProps {
  setActiveTab: (t: Tab) => void;
  settings: PortfolioSettings;
}

const HomeView: React.FC<HomeViewProps> = ({ setActiveTab, settings }) => (
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
            {settings.bio}
          </p>
        </motion.div>

        {/* View Rates Button */}
        <motion.div 
          whileHover={{ y: -5 }}
          onClick={() => setActiveTab('rates')}
          className="bg-accent-pink/45 hover:bg-accent-pink/55 border border-accent-pink/60 rounded-[25px] md:rounded-[30px] p-4 md:p-6 flex items-center justify-between cursor-pointer group transition-colors"
        >
          <div className="flex items-center gap-4">
            <div className="bg-[#db6b86] text-white p-3 rounded-xl shadow-sm">
              <Tag size={22} className="md:w-6 md:h-6" />
            </div>
            <div className="text-left">
              <div className="text-lg md:text-2xl font-bold font-serif text-black leading-tight">Service Rates</div>
              <div className="text-[8px] md:text-xs font-bold uppercase tracking-wider text-black/60 mt-1.5 leading-none">Pricelists of my creative services</div>
            </div>
          </div>
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform text-[#db6b86]" />
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
            src={settings.profilePhoto} 
            alt="Grace Shuuya" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        {/* LinkedIn Block */}
        <motion.a 
          href={settings.socials.linkedin} 
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
        className="col-span-2 md:col-span-2 bg-white border border-black/10 rounded-[25px] md:rounded-[30px] p-5 md:p-8 cursor-pointer relative overflow-hidden group min-h-[180px] md:min-h-[300px] flex flex-col justify-end"
      >
        <div className="absolute top-0 left-0 w-full h-full z-0 opacity-40 group-hover:opacity-60 transition-opacity">
          <img src="https://res.cloudinary.com/dllugr1kc/image/upload/v1784118773/image_2026-07-15_143251063_moctdf.png" className="w-full h-full object-cover" alt="Portfolio Preview" />
        </div>
        <div className="relative z-10 bg-white/80 backdrop-blur-md p-3 md:p-6 rounded-xl border border-black/5">
          <Palette className="text-accent-green mb-2 md:mb-4" size={24} />
          <h3 className="text-xl md:text-3xl font-bold font-serif mb-1">Portfolio</h3>
          <div className="hidden md:block text-xs font-bold text-black/90 mb-4">View my work in Design, Video and Web Dev.</div>
          <div className="flex items-center gap-1 text-accent-green font-bold text-[8px] md:text-xs uppercase tracking-widest">
            Enter <ArrowRight size={10} />
          </div>
        </div>
      </motion.div>

      {/* Instagram Block */}
      <motion.a 
        href={settings.socials.instagram}
        target="_blank"
        whileHover={{ y: -5 }}
        className="col-span-1 md:col-span-1 bg-white border border-[#FD1D1D]/20 rounded-[25px] md:rounded-[30px] p-4 md:p-6 cursor-pointer relative overflow-hidden group min-h-[180px] md:min-h-[300px] flex flex-col justify-between shadow-sm"
      >
        <div className="absolute top-0 left-0 w-full h-full z-0 opacity-40 group-hover:opacity-60 transition-opacity">
          <img 
            src="https://res.cloudinary.com/dllugr1kc/image/upload/v1784118621/2_gdkq6x.jpg" 
            className="w-full h-full object-cover" 
            alt="Instagram Background" 
            referrerPolicy="no-referrer"
          />
        </div>
        {/* Subtle gradient overlay to guarantee excellent text readability */}
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-white/95 via-white/40 to-white/10 group-hover:from-white/90 group-hover:via-white/30 transition-all" />
        
        <div className="relative z-10 w-full h-full flex flex-col justify-between">
          <div className="bg-white/90 backdrop-blur-sm w-10 h-10 rounded-xl flex items-center justify-center border border-black/5 shadow-sm">
            <Instagram className="text-[#cd486b]" size={20} />
          </div>
          <div>
            <h3 className="text-base md:text-xl font-serif font-bold mb-1 leading-tight text-black">Instagram</h3>
            <div className="text-[10px] md:text-xs font-semibold text-black/80 mb-2">@{settings.socials.instagram.split('instagram.com/')[1]?.replace('/', '') || 'iisgreys'}</div>
            <div className="flex items-center gap-1 text-[#cd486b] font-bold text-[8px] md:text-[10px] uppercase tracking-widest">
              Follow <ArrowRight size={10} />
            </div>
          </div>
        </div>
      </motion.a>

      {/* TikTok Block */}
      <motion.a 
        href={settings.socials.tiktok}
        target="_blank"
        whileHover={{ y: -5 }}
        className="col-span-1 md:col-span-1 bg-white border border-black/10 rounded-[25px] md:rounded-[30px] p-4 md:p-6 cursor-pointer relative overflow-hidden group min-h-[180px] md:min-h-[300px] flex flex-col justify-between shadow-sm"
      >
        <div className="absolute top-0 left-0 w-full h-full z-0 opacity-40 group-hover:opacity-60 transition-opacity">
          <img 
            src="https://res.cloudinary.com/dllugr1kc/image/upload/v1784118620/1_s1fwuq.jpg" 
            className="w-full h-full object-cover" 
            alt="TikTok Background" 
            referrerPolicy="no-referrer"
          />
        </div>
        {/* Subtle gradient overlay to guarantee excellent text readability */}
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-white/95 via-white/40 to-white/10 group-hover:from-white/90 group-hover:via-white/30 transition-all" />
        
        <div className="relative z-10 w-full h-full flex flex-col justify-between">
          <div className="bg-white/90 backdrop-blur-sm w-10 h-10 rounded-xl flex items-center justify-center border border-black/5 shadow-sm">
            <Music className="text-black" size={20} />
          </div>
          <div>
            <h3 className="text-base md:text-xl font-serif font-bold mb-1 leading-tight text-black">TikTok</h3>
            <div className="text-[10px] md:text-xs font-semibold text-black/80 mb-2">@{settings.socials.tiktok.split('tiktok.com/@')[1]?.replace('/', '') || 'kahewa_'}</div>
            <div className="flex items-center gap-1 text-black font-bold text-[8px] md:text-[10px] uppercase tracking-widest">
              Watch <ArrowRight size={10} />
            </div>
          </div>
        </div>
      </motion.a>

      {/* GitHub & TikTok Small Blocks */}
      <motion.a 
        href={settings.socials.github} 
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
        href={settings.socials.freelanceInstagram} 
        target="_blank"
        whileHover={{ y: -5 }}
        className="col-span-1 md:col-span-2 border border-black rounded-[25px] md:rounded-[30px] p-5 md:p-8 flex flex-col md:flex-row items-center md:justify-between bg-white gap-3 text-center md:text-left"
      >
        <div className="flex flex-col md:flex-row items-center gap-3 md:gap-6">
          <img 
            src="https://res.cloudinary.com/dllugr1kc/image/upload/v1784118897/STOCK_aogohn.png"
            alt="Freelance Instagram Profile"
            className="w-10 h-10 rounded-full object-cover border border-black/10 shadow-sm shrink-0"
            referrerPolicy="no-referrer"
          />
          <div>
            <h4 className="text-lg md:text-xl font-serif">Freelance Instagram</h4>
            <p className="hidden md:block text-black/60 text-sm italic tracking-tight">@{settings.socials.freelanceInstagram.split('instagram.com/')[1]?.replace('/', '') || 'contented.bg'}</p>
          </div>
        </div>
        <ArrowRight size={20} className="text-black hidden md:block" />
      </motion.a>

      {/* Christian Community Block */}
      <motion.div 
        whileHover={{ y: -5 }}
        className="col-span-2 md:col-span-4 bg-accent-green text-white border border-black/10 rounded-[30px] p-6 md:p-10 relative overflow-hidden group"
      >
        <div className="md:flex gap-10 items-center">
          <div className="space-y-4 md:space-y-6 flex-1">
            <h3 className="text-2xl md:text-4xl font-serif">Jesus Unites</h3>
            <p className="text-white/80 leading-relaxed font-light italic text-xs md:text-base">
              "{settings.jesusUnite.description}"
            </p>
            <div className="grid grid-cols-2 gap-2 md:gap-4 pt-2 md:pt-4">
              <a href={settings.jesusUnite.whatsappChannel} target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white/20 px-3 py-2 rounded-full text-[8px] md:text-xs uppercase tracking-widest font-bold transition-all border border-white/20 text-center flex items-center justify-center">
                WhatsApp Channel
              </a>
              <a href={settings.jesusUnite.whatsappGroup} target="_blank" rel="noopener noreferrer" className="bg-white text-accent-green px-3 py-2 rounded-full text-[8px] md:text-xs uppercase tracking-widest font-bold transition-all text-center flex items-center justify-center">
                WhatsApp Group
              </a>
              <a href={settings.jesusUnite.discordChannel} target="_blank" rel="noopener noreferrer" className="bg-white text-accent-green px-3 py-2 rounded-full text-[8px] md:text-xs uppercase tracking-widest font-bold transition-all text-center flex items-center justify-center">
                Discord Channel
              </a>
              <a href={settings.jesusUnite.tiktokPage} target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white/20 px-3 py-2 rounded-full text-[8px] md:text-xs uppercase tracking-widest font-bold transition-all border border-white/20 text-center flex items-center justify-center">
                TikTok Page
              </a>
            </div>
          </div>
          <div className="hidden md:block w-1/3">
            <div className="aspect-square bg-white/10 rounded-[40px] flex items-center justify-center border border-white/20 p-8">
              <div className="text-center">
                <span className="block text-5xl font-serif mb-2">{settings.jesusUnite.followersCount}</span>
                <span className="text-[10px] uppercase tracking-[0.2em] opacity-60">WhastApp Followers</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

    </div>

    {/* Testimonials */}
    <div className="mt-24">
      <h3 className="text-accent-green font-bold tracking-[0.3em] uppercase text-xs mb-12 border-l-2 border-accent-green pl-4">
        Testimonials
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {settings.testimonials.map((testimonial, index) => (
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

const ServicesView = ({ portfolioItems }: { portfolioItems: PortfolioItem[] }) => {
  const [activeService, setActiveService] = useState<ServiceTab>('graphic');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const filteredItems = portfolioItems.filter(item => item.category === activeService);
  const graphicItems = portfolioItems.filter(item => item.category === 'graphic');

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
        <h2 className="text-4xl font-serif mb-4">Created By Grace</h2>
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

const RatesView: React.FC<{ settings: PortfolioSettings }> = ({ settings }) => {
  const { rates } = settings;
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
            {activeSection === 'web' && (
              <p className="text-xs text-black/40 mt-1">
                Consultation: N$150
              </p>
            )}
          </div>
          <Tag className="text-accent-green opacity-20" size={40} />
        </div>
        
        <div className="w-full">
          {rates[activeSection]?.map((group, gIdx) => (
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



export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [settings, setSettings] = useState<PortfolioSettings>(DEFAULT_SETTINGS);
  const [isLoading, setIsLoading] = useState(true);

  // Secret 4-click trigger state tracking
  const [adminClickCount, setAdminClickCount] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(0);

  const handleAdminTriggerClick = () => {
    const now = Date.now();
    if (now - lastClickTime > 2000) {
      setAdminClickCount(1);
    } else {
      const nextCount = adminClickCount + 1;
      if (nextCount >= 4) {
        setActiveTab('admin');
        setAdminClickCount(0);
      } else {
        setAdminClickCount(nextCount);
      }
    }
    setLastClickTime(now);
  };

  // Keyboard shortcut listener for secret admin login (Ctrl + Shift + A)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        setActiveTab('admin');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Load custom settings
  useEffect(() => {
    async function loadSettings() {
      let isLoaded = false;

      // 1. Try to load from centralized server API first
      try {
        const response = await fetch('/api/settings');
        if (response.ok) {
          const data = await response.json();
          setSettings(data);
          isLoaded = true;
          console.log("Settings loaded from server API.");
        }
      } catch (e) {
        console.error("Server API load failed, trying fallbacks:", e);
      }

      // 2. Load from Firestore if initialized and ready (as an additional cloud backup if needed)
      if (!isLoaded && isFirebaseReady && db) {
        try {
          const docRef = doc(db, 'settings', 'portfolio');
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setSettings(docSnap.data() as PortfolioSettings);
            isLoaded = true;
          } else {
            // Seed defaults
            await setDoc(docRef, DEFAULT_SETTINGS);
            console.log("Seeded database with default settings.");
          }
        } catch (e) {
          console.error("Firestore settings load failed, using local fallback:", e);
        }
      }

      // 3. Load from LocalStorage if not already loaded
      if (!isLoaded) {
        try {
          const localVal = localStorage.getItem('portfolio_settings');
          if (localVal) {
            setSettings(JSON.parse(localVal));
          }
        } catch (e) {
          console.error("Local storage load failed:", e);
        }
      }

      setIsLoading(false);
    }

    loadSettings();
  }, []);

  const handleSaveSettings = async (updated: PortfolioSettings) => {
    setSettings(updated);
    
    // Save locally
    try {
      localStorage.setItem('portfolio_settings', JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to save to local storage:", e);
    }

    // Save to server API
    try {
      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updated),
      });
      if (!response.ok) {
        throw new Error('Failed to save to server');
      }
      console.log("Settings saved to server API.");
    } catch (e) {
      console.error("Server API save failed:", e);
    }

    // Save to Firestore if connected
    if (isFirebaseReady && db) {
      try {
        const docRef = doc(db, 'settings', 'portfolio');
        await setDoc(docRef, updated);
      } catch (e) {
        console.error("Firestore save failed:", e);
      }
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-10 h-10 border-2 border-accent-green border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs uppercase tracking-widest text-black/40 font-bold">Configuring Creative Space...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen selection:bg-accent-pink/30">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main>
        <AnimatePresence mode="wait">
          {activeTab === 'home' && <HomeView key="home" setActiveTab={setActiveTab} settings={settings} />}
          {activeTab === 'services' && <ServicesView key="services" portfolioItems={settings.portfolioItems} />}
          {activeTab === 'rates' && <RatesView key="rates" settings={settings} />}
          {activeTab === 'admin' && <AdminView key="admin" settings={settings} onSave={handleSaveSettings} onClose={() => setActiveTab('home')} />}
        </AnimatePresence>
      </main>

      <footer className="relative z-10 bg-primary border-t border-black/10 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-xl font-sans font-bold text-accent-green">By Grace Co.</div>
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
          <p 
            id="secret-admin-trigger"
            className="text-[10px] uppercase tracking-widest text-black/40 cursor-pointer select-none"
            onClick={handleAdminTriggerClick}
            title="Click 4 times to access settings console"
          >
            © 2026 By Grace Company. All rights reserved.
          </p>
        </div>
      </footer>

      <TermsModal isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} />
      <PrivacyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
    </div>
  );
}

