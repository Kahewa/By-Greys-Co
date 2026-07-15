/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  KeyRound, 
  Save, 
  Plus, 
  Trash2, 
  ArrowLeft, 
  Globe, 
  Image as ImageIcon, 
  Video as VideoIcon, 
  Layers, 
  CheckCircle, 
  Lock,
  User,
  Heart,
  Share2,
  FileText,
  DollarSign
} from 'lucide-react';
import { PortfolioSettings, Testimonial, PortfolioItem, RateGroup, RateItem, ServiceTab } from '../types';

interface AdminViewProps {
  settings: PortfolioSettings;
  onSave: (updated: PortfolioSettings) => Promise<void> | void;
  onClose: () => void;
}

async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

export const AdminView: React.FC<AdminViewProps> = ({ settings, onSave, onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('admin_auth') === 'true';
  });
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeSubTab, setActiveSubTab] = useState<'dashboard' | 'socials' | 'jesus' | 'testimonials' | 'portfolio' | 'rates'>('dashboard');
  const [localSettings, setLocalSettings] = useState<PortfolioSettings>({ ...settings });
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');

  // New item form states
  const [newTestimonial, setNewTestimonial] = useState<Omit<Testimonial, 'id'>>({
    username: '',
    handle: '',
    message: '',
    avatar: ''
  });

  const [newPortfolio, setNewPortfolio] = useState<Omit<PortfolioItem, 'id'>>({
    title: '',
    category: 'graphic',
    thumbnail: '',
    link: '#',
    type: 'image'
  });

  const [selectedRateCategory, setSelectedRateCategory] = useState<'graphics' | 'video' | 'web'>('graphics');
  const [newRateGroupTitle, setNewRateGroupTitle] = useState('');
  const [newRateItem, setNewRateItem] = useState<{
    groupIndex: number;
    service: string;
    desc: string;
    price: string;
    rawText: string;
  }>({
    groupIndex: 0,
    service: '',
    desc: '',
    price: '',
    rawText: ''
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const hashedPassword = await sha256(password);
    // Secure predetermined password hash for '07232001'
    if (hashedPassword === '601aa73a0cdb6a5becceee9f70142d29f5b2ef2ffc17a2cfe74b7eb13ce0fa33') {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_auth', 'true');
    } else {
      setLoginError('Incorrect password. Please try again.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('admin_auth');
  };

  const triggerSave = async (updated: PortfolioSettings) => {
    setSaveStatus('saving');
    try {
      await onSave(updated);
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (e) {
      console.error(e);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 5000);
    }
  };

  const handleSaveDashboard = () => {
    triggerSave(localSettings);
  };

  // Socials Change handler
  const handleSocialChange = (key: keyof PortfolioSettings['socials'], value: string) => {
    const updated = {
      ...localSettings,
      socials: {
        ...localSettings.socials,
        [key]: value
      }
    };
    setLocalSettings(updated);
  };

  // Jesus Unite Change handler
  const handleJesusChange = (key: keyof PortfolioSettings['jesusUnite'], value: string) => {
    const updated = {
      ...localSettings,
      jesusUnite: {
        ...localSettings.jesusUnite,
        [key]: value
      }
    };
    setLocalSettings(updated);
  };

  // Testimonials handlers
  const handleAddTestimonial = () => {
    if (!newTestimonial.username || !newTestimonial.message) {
      alert('Please fill in at least the company/person name and the review message.');
      return;
    }
    const added: Testimonial = {
      id: Date.now(),
      username: newTestimonial.username,
      handle: newTestimonial.handle || '@client',
      message: newTestimonial.message,
      avatar: newTestimonial.avatar || 'https://res.cloudinary.com/dllugr1kc/image/upload/v1784118897/STOCK_aogohn.png'
    };
    const updated = {
      ...localSettings,
      testimonials: [...localSettings.testimonials, added]
    };
    setLocalSettings(updated);
    triggerSave(updated);
    setNewTestimonial({ username: '', handle: '', message: '', avatar: '' });
  };

  const handleDeleteTestimonial = (id: number) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;
    const updated = {
      ...localSettings,
      testimonials: localSettings.testimonials.filter(t => t.id !== id)
    };
    setLocalSettings(updated);
    triggerSave(updated);
  };

  // Portfolio handlers
  const handleAddPortfolio = () => {
    if (!newPortfolio.title || !newPortfolio.thumbnail) {
      alert('Please fill in the project title and thumbnail image URL.');
      return;
    }
    const added: PortfolioItem = {
      id: Date.now(),
      title: newPortfolio.title,
      category: newPortfolio.category,
      thumbnail: newPortfolio.thumbnail,
      link: newPortfolio.link || '#',
      type: newPortfolio.type
    };
    const updated = {
      ...localSettings,
      portfolioItems: [...localSettings.portfolioItems, added]
    };
    setLocalSettings(updated);
    triggerSave(updated);
    setNewPortfolio({
      title: '',
      category: 'graphic',
      thumbnail: '',
      link: '#',
      type: 'image'
    });
  };

  const handleDeletePortfolio = (id: number) => {
    if (!confirm('Are you sure you want to delete this portfolio item?')) return;
    const updated = {
      ...localSettings,
      portfolioItems: localSettings.portfolioItems.filter(p => p.id !== id)
    };
    setLocalSettings(updated);
    triggerSave(updated);
  };

  // Rates handlers
  const handleAddRateGroup = () => {
    if (!newRateGroupTitle) return;
    const newGroup: RateGroup = {
      title: newRateGroupTitle,
      items: []
    };
    const updatedCategoryRates = [...(localSettings.rates[selectedRateCategory] || []), newGroup];
    const updated = {
      ...localSettings,
      rates: {
        ...localSettings.rates,
        [selectedRateCategory]: updatedCategoryRates
      }
    };
    setLocalSettings(updated);
    triggerSave(updated);
    setNewRateGroupTitle('');
  };

  const handleDeleteRateGroup = (groupIndex: number) => {
    if (!confirm('Are you sure you want to delete this entire rate category group and all its services?')) return;
    const updatedCategoryRates = localSettings.rates[selectedRateCategory].filter((_, i) => i !== groupIndex);
    const updated = {
      ...localSettings,
      rates: {
        ...localSettings.rates,
        [selectedRateCategory]: updatedCategoryRates
      }
    };
    setLocalSettings(updated);
    triggerSave(updated);
  };

  const handleAddRateItem = (groupIdx: number) => {
    const item = newRateItem;
    if (!item.service || !item.price) {
      alert('Please provide a service name and price.');
      return;
    }
    const newItem: RateItem = {
      service: item.service,
      desc: item.desc,
      price: item.price,
      ...(item.rawText ? { rawText: item.rawText } : {})
    };
    const updatedRates = { ...localSettings.rates };
    const group = { ...updatedRates[selectedRateCategory][groupIdx] };
    group.items = [...group.items, newItem];
    updatedRates[selectedRateCategory][groupIdx] = group;

    const updated = {
      ...localSettings,
      rates: updatedRates
    };
    setLocalSettings(updated);
    triggerSave(updated);
    setNewRateItem({
      groupIndex: 0,
      service: '',
      desc: '',
      price: '',
      rawText: ''
    });
  };

  const handleDeleteRateItem = (groupIdx: number, itemIdx: number) => {
    if (!confirm('Are you sure you want to delete this pricing item?')) return;
    const updatedRates = { ...localSettings.rates };
    const group = { ...updatedRates[selectedRateCategory][groupIdx] };
    group.items = group.items.filter((_, i) => i !== itemIdx);
    updatedRates[selectedRateCategory][groupIdx] = group;

    const updated = {
      ...localSettings,
      rates: updatedRates
    };
    setLocalSettings(updated);
    triggerSave(updated);
  };

  // Unauthenticated view
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-36 pb-20 px-6 flex items-center justify-center bg-primary">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-black/10 rounded-[30px] p-8 max-w-md w-full shadow-lg"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-accent-pink/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-accent-pink/20">
              <Lock className="text-accent-pink" size={28} />
            </div>
            <h2 className="text-2xl font-serif text-black">Admin Access Portal</h2>
            <p className="text-black/50 text-xs mt-2 uppercase tracking-widest">Authorized Personnel Only</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs uppercase tracking-widest text-black/60 font-semibold mb-2">Password</label>
              <div className="relative">
                <input 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-5 py-3 rounded-xl border border-black/10 focus:border-accent-pink focus:ring-1 focus:ring-accent-pink outline-none bg-primary/20 text-sm"
                  required
                />
                <KeyRound size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-black/30" />
              </div>
            </div>

            {loginError && (
              <p className="text-xs text-red-500 font-medium text-center">{loginError}</p>
            )}

            <button
              type="submit"
              className="w-full bg-black text-white hover:bg-accent-pink hover:text-black py-3.5 rounded-xl text-xs uppercase tracking-widest font-bold transition-all border border-black"
            >
              Authenticate
            </button>
          </form>

          <button 
            onClick={onClose}
            className="w-full mt-4 bg-transparent hover:underline text-black/50 text-xs uppercase tracking-widest"
          >
            Back to Portfolio
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-3 md:px-6 max-w-7xl mx-auto bg-primary">
      {/* Admin Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-black/5 pb-6">
        <div>
          <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-accent-green">By Grace Co. Console</span>
          <h1 className="text-4xl font-serif mt-1">Management Hub</h1>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-full border border-black/15 bg-white text-xs uppercase tracking-widest font-bold hover:bg-black hover:text-white transition-all flex items-center gap-2"
          >
            <ArrowLeft size={14} /> Back to Site
          </button>
          <button
            onClick={handleLogout}
            className="px-5 py-2.5 rounded-full border border-red-500/30 text-red-500 text-xs uppercase tracking-widest font-bold hover:bg-red-500 hover:text-white transition-all"
          >
            Lock Terminal
          </button>
        </div>
      </div>

      {/* Floating Status Indicator */}
      <AnimatePresence>
        {saveStatus !== 'idle' && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 right-6 z-50 px-6 py-4 rounded-2xl shadow-xl flex items-center gap-3 border text-xs uppercase tracking-widest font-bold bg-white text-black"
            style={{
              borderColor: saveStatus === 'success' ? '#10b981' : saveStatus === 'error' ? '#ef4444' : '#db6b86'
            }}
          >
            {saveStatus === 'saving' && <span className="animate-pulse text-accent-pink">Saving Changes...</span>}
            {saveStatus === 'success' && <span className="text-emerald-500 flex items-center gap-1.5"><CheckCircle size={14} /> Settings Saved Globally!</span>}
            {saveStatus === 'error' && <span className="text-red-500">Error Saving to Cloud.</span>}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Nav */}
        <div className="space-y-1.5">
          {[
            { id: 'dashboard', label: 'Dashboard Intro', icon: User },
            { id: 'socials', label: 'Social Media Links', icon: Share2 },
            { id: 'jesus', label: 'Jesus Unites Section', icon: Heart },
            { id: 'testimonials', label: 'Testimonials', icon: CheckCircle },
            { id: 'portfolio', label: 'Portfolio Items', icon: Layers },
            { id: 'rates', label: 'Rates & Pricing', icon: DollarSign },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSubTab(item.id as any)}
                className={`w-full px-5 py-4 rounded-2xl border text-left text-xs uppercase tracking-widest font-bold transition-all flex items-center gap-3 ${
                  activeSubTab === item.id 
                    ? 'bg-black text-white border-black shadow-md' 
                    : 'bg-white text-black/60 border-black/5 hover:border-black/10 hover:bg-black/5'
                }`}
              >
                <Icon size={16} />
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Form Container */}
        <div className="lg:col-span-3 bg-white border border-black/10 rounded-[30px] p-6 md:p-8 shadow-sm">
          {/* TAB: DASHBOARD */}
          {activeSubTab === 'dashboard' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-serif text-black">Dashboard Details</h3>
                <p className="text-black/50 text-xs mt-1">Edit your primary display information on the homepage</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-black/60 font-semibold mb-2">My Biography / Description</label>
                  <textarea
                    value={localSettings.bio}
                    onChange={(e) => setLocalSettings({ ...localSettings, bio: e.target.value })}
                    rows={6}
                    className="w-full px-5 py-4 rounded-xl border border-black/10 focus:border-accent-green focus:ring-1 focus:ring-accent-green outline-none bg-primary/10 text-sm leading-relaxed"
                    placeholder="Enter bio..."
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-black/60 font-semibold mb-2">Profile Photo URL</label>
                  <input
                    type="text"
                    value={localSettings.profilePhoto}
                    onChange={(e) => setLocalSettings({ ...localSettings, profilePhoto: e.target.value })}
                    className="w-full px-5 py-3 rounded-xl border border-black/10 focus:border-accent-green focus:ring-1 focus:ring-accent-green outline-none bg-primary/10 text-sm"
                    placeholder="https://res.cloudinary.com/..."
                  />
                  <div className="mt-4 flex items-center gap-4 p-3 bg-primary/35 rounded-xl border border-black/5">
                    <img 
                      src={localSettings.profilePhoto} 
                      alt="Preview" 
                      className="w-12 h-12 rounded-full object-cover border border-black/10"
                      onError={(e) => {
                        // fallback image
                        (e.target as HTMLImageElement).src = 'https://res.cloudinary.com/dllugr1kc/image/upload/v1784118897/STOCK_aogohn.png';
                      }}
                    />
                    <div className="text-[10px] uppercase tracking-widest text-black/40">Profile Image Preview</div>
                  </div>
                </div>
              </div>

              <button
                onClick={handleSaveDashboard}
                className="bg-accent-green hover:bg-black hover:text-white text-white px-6 py-3.5 rounded-full text-xs uppercase tracking-widest font-bold transition-all flex items-center gap-2 mt-4"
              >
                <Save size={14} /> Save Biography Details
              </button>
            </div>
          )}

          {/* TAB: SOCIAL LINKS */}
          {activeSubTab === 'socials' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-serif text-black">Social Media Containers</h3>
                <p className="text-black/50 text-xs mt-1">Configure all active external link buttons on your portfolio homepage</p>
              </div>

              <div className="space-y-4">
                {[
                  { key: 'linkedin', label: 'LinkedIn Connection Link', placeholder: 'https://linkedin.com/in/...' },
                  { key: 'instagram', label: 'Primary Instagram Link', placeholder: 'https://instagram.com/...' },
                  { key: 'tiktok', label: 'TikTok Account Link', placeholder: 'https://tiktok.com/@...' },
                  { key: 'freelanceInstagram', label: 'Freelance Instagram Link (@contented.bg)', placeholder: 'https://instagram.com/contented.bg' },
                  { key: 'github', label: 'GitHub Profile Link', placeholder: 'https://github.com/...' },
                ].map((item) => (
                  <div key={item.key}>
                    <label className="block text-xs uppercase tracking-widest text-black/60 font-semibold mb-2">{item.label}</label>
                    <input
                      type="text"
                      value={localSettings.socials[item.key as keyof PortfolioSettings['socials']]}
                      onChange={(e) => handleSocialChange(item.key as any, e.target.value)}
                      className="w-full px-5 py-3 rounded-xl border border-black/10 focus:border-accent-green focus:ring-1 focus:ring-accent-green outline-none bg-primary/10 text-sm"
                      placeholder={item.placeholder}
                    />
                  </div>
                ))}
              </div>

              <button
                onClick={() => triggerSave(localSettings)}
                className="bg-accent-green hover:bg-black hover:text-white text-white px-6 py-3.5 rounded-full text-xs uppercase tracking-widest font-bold transition-all flex items-center gap-2 mt-4"
              >
                <Save size={14} /> Save Social Connections
              </button>
            </div>
          )}

          {/* TAB: JESUS UNITE */}
          {activeSubTab === 'jesus' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-serif text-black">Jesus Unites Section</h3>
                <p className="text-black/50 text-xs mt-1">Manage the content, links, and follower telemetry for your community card</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-black/60 font-semibold mb-2">Jesus Unites Description</label>
                  <textarea
                    value={localSettings.jesusUnite.description}
                    onChange={(e) => handleJesusChange('description', e.target.value)}
                    rows={4}
                    className="w-full px-5 py-4 rounded-xl border border-black/10 focus:border-accent-green focus:ring-1 focus:ring-accent-green outline-none bg-primary/10 text-sm"
                    placeholder="Enter faith description..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-black/60 font-semibold mb-2">WhatsApp Channel Link</label>
                    <input
                      type="text"
                      value={localSettings.jesusUnite.whatsappChannel}
                      onChange={(e) => handleJesusChange('whatsappChannel', e.target.value)}
                      className="w-full px-5 py-3 rounded-xl border border-black/10 focus:border-accent-green focus:ring-1 focus:ring-accent-green outline-none bg-primary/10 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-black/60 font-semibold mb-2">WhatsApp Group Link</label>
                    <input
                      type="text"
                      value={localSettings.jesusUnite.whatsappGroup}
                      onChange={(e) => handleJesusChange('whatsappGroup', e.target.value)}
                      className="w-full px-5 py-3 rounded-xl border border-black/10 focus:border-accent-green focus:ring-1 focus:ring-accent-green outline-none bg-primary/10 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-black/60 font-semibold mb-2">Discord Channel Link</label>
                    <input
                      type="text"
                      value={localSettings.jesusUnite.discordChannel}
                      onChange={(e) => handleJesusChange('discordChannel', e.target.value)}
                      className="w-full px-5 py-3 rounded-xl border border-black/10 focus:border-accent-green focus:ring-1 focus:ring-accent-green outline-none bg-primary/10 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-black/60 font-semibold mb-2">TikTok Community Page Link</label>
                    <input
                      type="text"
                      value={localSettings.jesusUnite.tiktokPage}
                      onChange={(e) => handleJesusChange('tiktokPage', e.target.value)}
                      className="w-full px-5 py-3 rounded-xl border border-black/10 focus:border-accent-green focus:ring-1 focus:ring-accent-green outline-none bg-primary/10 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-black/60 font-semibold mb-2">WhatsApp Followers Metric (Manually Changed)</label>
                  <input
                    type="text"
                    value={localSettings.jesusUnite.followersCount}
                    onChange={(e) => handleJesusChange('followersCount', e.target.value)}
                    className="w-full px-5 py-3 rounded-xl border border-black/10 focus:border-accent-green focus:ring-1 focus:ring-accent-green outline-none bg-primary/10 text-sm"
                    placeholder="e.g. 2k+"
                  />
                </div>
              </div>

              <button
                onClick={() => triggerSave(localSettings)}
                className="bg-accent-green hover:bg-black hover:text-white text-white px-6 py-3.5 rounded-full text-xs uppercase tracking-widest font-bold transition-all flex items-center gap-2 mt-4"
              >
                <Save size={14} /> Save Community details
              </button>
            </div>
          )}

          {/* TAB: TESTIMONIALS */}
          {activeSubTab === 'testimonials' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-serif text-black">Client Testimonials</h3>
                <p className="text-black/50 text-xs mt-1">Review, append, or delete authentic peer endorsements</p>
              </div>

              {/* Add New Testimonial Form */}
              <div className="bg-primary/30 border border-black/5 rounded-2xl p-5 space-y-4">
                <span className="font-bold text-[10px] uppercase tracking-widest text-black/50 block">Append New Testimonial</span>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-black/60 font-semibold mb-1">Company/Client Name</label>
                    <input
                      type="text"
                      value={newTestimonial.username}
                      onChange={(e) => setNewTestimonial({ ...newTestimonial, username: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-black/10 bg-white text-xs outline-none focus:border-accent-green"
                      placeholder="e.g. STA Desserts"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-black/60 font-semibold mb-1">Social Handle or Website</label>
                    <input
                      type="text"
                      value={newTestimonial.handle}
                      onChange={(e) => setNewTestimonial({ ...newTestimonial, handle: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-black/10 bg-white text-xs outline-none focus:border-accent-green"
                      placeholder="e.g. @sta.desserts or www.client.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-black/60 font-semibold mb-1">Profile Photo / Avatar Image URL</label>
                  <input
                    type="text"
                    value={newTestimonial.avatar}
                    onChange={(e) => setNewTestimonial({ ...newTestimonial, avatar: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-black/10 bg-white text-xs outline-none focus:border-accent-green"
                    placeholder="https://res.cloudinary.com/..."
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-black/60 font-semibold mb-1">Review Message</label>
                  <textarea
                    value={newTestimonial.message}
                    onChange={(e) => setNewTestimonial({ ...newTestimonial, message: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-black/10 bg-white text-xs outline-none focus:border-accent-green"
                    placeholder="Paste review message..."
                  />
                </div>

                <button
                  onClick={handleAddTestimonial}
                  className="bg-black hover:bg-accent-green hover:text-white text-white px-5 py-2.5 rounded-full text-[10px] uppercase tracking-widest font-bold transition-all flex items-center gap-1.5"
                >
                  <Plus size={12} /> Add and Save Testimonial
                </button>
              </div>

              {/* Current Testimonials List */}
              <div className="space-y-3">
                <span className="font-bold text-[10px] uppercase tracking-widest text-black/50 block">Active Testimonials ({localSettings.testimonials.length})</span>
                <div className="divide-y divide-black/5 bg-primary/20 rounded-2xl border border-black/5 overflow-hidden">
                  {localSettings.testimonials.map((t) => (
                    <div key={t.id} className="p-4 flex items-start justify-between gap-4">
                      <div className="flex gap-3">
                        <img 
                          src={t.avatar} 
                          alt={t.username} 
                          className="w-10 h-10 rounded-full object-cover shrink-0 border border-black/10" 
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://res.cloudinary.com/dllugr1kc/image/upload/v1784118897/STOCK_aogohn.png';
                          }}
                        />
                        <div>
                          <div className="text-xs font-bold text-black">{t.username} <span className="text-[10px] text-accent-green font-normal">({t.handle})</span></div>
                          <p className="text-[11px] text-black/60 italic mt-1 line-clamp-2">"{t.message}"</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteTestimonial(t.id)}
                        className="text-red-500 hover:bg-red-500 hover:text-white p-2 rounded-xl transition-all border border-red-500/10 shrink-0"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))}
                  {localSettings.testimonials.length === 0 && (
                    <div className="p-8 text-center text-xs text-black/40">No testimonials configured. Add one above!</div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB: PORTFOLIO */}
          {activeSubTab === 'portfolio' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-serif text-black">Portfolio Creations</h3>
                <p className="text-black/50 text-xs mt-1">Manage graphic design items, video thumbnails, and website design links</p>
              </div>

              {/* Add New Portfolio Item Form */}
              <div className="bg-primary/30 border border-black/5 rounded-2xl p-5 space-y-4">
                <span className="font-bold text-[10px] uppercase tracking-widest text-black/50 block">Append New Creation</span>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-black/60 font-semibold mb-1">Creation Category</label>
                    <select
                      value={newPortfolio.category}
                      onChange={(e) => setNewPortfolio({ ...newPortfolio, category: e.target.value as ServiceTab })}
                      className="w-full px-4 py-2.5 rounded-xl border border-black/10 bg-white text-xs outline-none focus:border-accent-green"
                    >
                      <option value="graphic">Graphic Design</option>
                      <option value="video">Video Production</option>
                      <option value="ui">Web Development & UI</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-black/60 font-semibold mb-1">Creation Media Type</label>
                    <select
                      value={newPortfolio.type}
                      onChange={(e) => setNewPortfolio({ ...newPortfolio, type: e.target.value as 'image' | 'video' })}
                      className="w-full px-4 py-2.5 rounded-xl border border-black/10 bg-white text-xs outline-none focus:border-accent-green"
                    >
                      <option value="image">Static Image</option>
                      <option value="video">Interactive Video Link</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-black/60 font-semibold mb-1">Project/Item Title</label>
                    <input
                      type="text"
                      value={newPortfolio.title}
                      onChange={(e) => setNewPortfolio({ ...newPortfolio, title: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-black/10 bg-white text-xs outline-none focus:border-accent-green"
                      placeholder="e.g. ByGraceCo or Valentin's List"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-black/60 font-semibold mb-1">Action Link (Redirect URL)</label>
                    <input
                      type="text"
                      value={newPortfolio.link}
                      onChange={(e) => setNewPortfolio({ ...newPortfolio, link: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-black/10 bg-white text-xs outline-none focus:border-accent-green"
                      placeholder="e.g. https://www.instagram.com/p/..."
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-black/60 font-semibold mb-1">Thumbnail / Picture Cloudinary URL</label>
                  <input
                    type="text"
                    value={newPortfolio.thumbnail}
                    onChange={(e) => setNewPortfolio({ ...newPortfolio, thumbnail: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-black/10 bg-white text-xs outline-none focus:border-accent-green"
                    placeholder="https://res.cloudinary.com/..."
                  />
                </div>

                <button
                  onClick={handleAddPortfolio}
                  className="bg-black hover:bg-accent-green hover:text-white text-white px-5 py-2.5 rounded-full text-[10px] uppercase tracking-widest font-bold transition-all flex items-center gap-1.5"
                >
                  <Plus size={12} /> Add Creation to Portfolio
                </button>
              </div>

              {/* Current Portfolio Items List by Tab */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-[10px] uppercase tracking-widest text-black/50 block">Active Items ({localSettings.portfolioItems.length})</span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[350px] overflow-y-auto p-1 border border-black/5 bg-primary/20 rounded-2xl">
                  {localSettings.portfolioItems.map((item) => (
                    <div key={item.id} className="p-3 bg-white border border-black/5 rounded-xl flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img 
                          src={item.thumbnail} 
                          alt={item.title} 
                          className="w-12 h-12 rounded object-cover border border-black/5 shrink-0" 
                        />
                        <div className="min-w-0">
                          <div className="text-xs font-bold truncate text-black">{item.title}</div>
                          <div className="text-[9px] uppercase tracking-wider text-black/40 mt-0.5">{item.category} • {item.type}</div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeletePortfolio(item.id)}
                        className="text-red-500 hover:bg-red-500 hover:text-white p-2 rounded-xl transition-all border border-red-500/10 shrink-0"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB: RATES */}
          {activeSubTab === 'rates' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-serif text-black">Service Rates</h3>
                <p className="text-black/50 text-xs mt-1">Configure pricing schedules, add new rate sections, or delete service items</p>
              </div>

              <div className="flex justify-center border-b border-black/5 pb-4 gap-3">
                {[
                  { id: 'graphics', label: 'Graphic Pricing' },
                  { id: 'video', label: 'Video Pricing' },
                  { id: 'web', label: 'Web Pricing' },
                ].map((sec) => (
                  <button
                    key={sec.id}
                    onClick={() => setSelectedRateCategory(sec.id as any)}
                    className={`px-4 py-1.5 rounded-full text-[10px] uppercase tracking-widest font-bold transition-all border ${
                      selectedRateCategory === sec.id 
                        ? 'bg-black text-white border-black' 
                        : 'bg-white text-black/50 border-black/5 hover:border-black/10'
                    }`}
                  >
                    {sec.label}
                  </button>
                ))}
              </div>

              {/* Add New Rate Group Title */}
              <div className="bg-primary/30 border border-black/5 rounded-2xl p-4 space-y-3">
                <span className="font-bold text-[10px] uppercase tracking-widest text-black/50 block">Create Pricing Category Group</span>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newRateGroupTitle}
                    onChange={(e) => setNewRateGroupTitle(e.target.value)}
                    className="flex-1 px-4 py-2.5 rounded-xl border border-black/10 bg-white text-xs outline-none focus:border-accent-green"
                    placeholder="e.g. Logo Design Packages or Filming Rates"
                  />
                  <button
                    onClick={handleAddRateGroup}
                    className="bg-black text-white hover:bg-accent-green hover:text-white px-5 rounded-xl text-[10px] uppercase tracking-widest font-bold transition-all flex items-center gap-1 shrink-0 border border-black"
                  >
                    <Plus size={12} /> Create Group
                  </button>
                </div>
              </div>

              {/* Rate Groups List */}
              <div className="space-y-5">
                {localSettings.rates[selectedRateCategory]?.map((group, groupIdx) => (
                  <div key={groupIdx} className="border border-black/10 rounded-2xl overflow-hidden bg-white shadow-sm">
                    {/* Group Header */}
                    <div className="bg-primary/45 px-5 py-3 border-b border-black/10 flex justify-between items-center">
                      <span className="font-bold text-[10px] uppercase tracking-widest text-black/60">{group.title}</span>
                      <button
                        onClick={() => handleDeleteRateGroup(groupIdx)}
                        className="text-red-500 hover:underline text-[9px] uppercase tracking-widest font-bold flex items-center gap-1"
                      >
                        <Trash2 size={10} /> Delete Group
                      </button>
                    </div>

                    {/* Group Items */}
                    <div className="divide-y divide-black/5">
                      {group.items.map((item, itemIdx) => (
                        <div key={itemIdx} className="p-4 flex justify-between items-start gap-4">
                          <div className="min-w-0">
                            <h4 className="text-xs font-bold text-black">{item.service} <span className="text-accent-green font-semibold ml-2">N${item.price}</span></h4>
                            <p className="text-[10px] text-black/50 mt-1">{item.desc}</p>
                            {item.rawText && <p className="text-[9px] text-accent-pink font-semibold uppercase mt-0.5">{item.rawText}</p>}
                          </div>
                          <button
                            onClick={() => handleDeleteRateItem(groupIdx, itemIdx)}
                            className="text-red-500 hover:bg-red-500/10 p-1.5 rounded-lg transition-all"
                          >
                            <Trash2 size={11} />
                          </button>
                        </div>
                      ))}

                      {/* Add Item form inside this group */}
                      <div className="p-4 bg-accent-green/5 space-y-3">
                        <span className="font-bold text-[9px] uppercase tracking-[0.15em] text-accent-green block">Append Pricing Item to group</span>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <input
                            type="text"
                            placeholder="Service Name (e.g. Logo Refinement)"
                            value={newRateItem.groupIndex === groupIdx ? newRateItem.service : ''}
                            onChange={(e) => setNewRateItem({ ...newRateItem, groupIndex: groupIdx, service: e.target.value })}
                            className="px-3 py-2 rounded-lg border border-black/10 bg-white text-xs outline-none focus:border-accent-green"
                          />
                          <input
                            type="text"
                            placeholder="Price (e.g. 150.00 or Quote)"
                            value={newRateItem.groupIndex === groupIdx ? newRateItem.price : ''}
                            onChange={(e) => setNewRateItem({ ...newRateItem, groupIndex: groupIdx, price: e.target.value })}
                            className="px-3 py-2 rounded-lg border border-black/10 bg-white text-xs outline-none focus:border-accent-green"
                          />
                          <input
                            type="text"
                            placeholder="Raw/Details Text (optional)"
                            value={newRateItem.groupIndex === groupIdx ? newRateItem.rawText : ''}
                            onChange={(e) => setNewRateItem({ ...newRateItem, groupIndex: groupIdx, rawText: e.target.value })}
                            className="px-3 py-2 rounded-lg border border-black/10 bg-white text-xs outline-none focus:border-accent-green"
                          />
                        </div>

                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Service Description details..."
                            value={newRateItem.groupIndex === groupIdx ? newRateItem.desc : ''}
                            onChange={(e) => setNewRateItem({ ...newRateItem, groupIndex: groupIdx, desc: e.target.value })}
                            className="flex-1 px-3 py-2 rounded-lg border border-black/10 bg-white text-xs outline-none focus:border-accent-green"
                          />
                          <button
                            onClick={() => handleAddRateItem(groupIdx)}
                            className="bg-accent-green hover:bg-black text-white hover:text-white px-4 py-2 rounded-lg text-[9px] uppercase tracking-widest font-bold transition-all shrink-0 flex items-center gap-1"
                          >
                            <Plus size={10} /> Add Item
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {(!localSettings.rates[selectedRateCategory] || localSettings.rates[selectedRateCategory].length === 0) && (
                  <div className="p-12 text-center text-xs text-black/40 bg-primary/10 rounded-2xl border border-black/5">No groups configured for this pricing category. Create one above!</div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
