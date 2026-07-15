/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Tab = 'home' | 'services' | 'rates' | 'admin';
export type ServiceTab = 'graphic' | 'video' | 'ui';

export interface PortfolioItem {
  id: number;
  title: string;
  category: ServiceTab;
  thumbnail: string;
  link: string;
  type: 'image' | 'video';
}

export interface Testimonial {
  id: number;
  username: string;
  handle: string;
  message: string;
  avatar: string;
}

export interface RateItem {
  service: string;
  desc: string;
  price: string;
  rawText?: string;
}

export interface RateGroup {
  title: string;
  items: RateItem[];
}

export interface PortfolioSettings {
  bio: string;
  profilePhoto: string;
  socials: {
    linkedin: string;
    instagram: string;
    tiktok: string;
    freelanceInstagram: string;
    github: string;
  };
  jesusUnite: {
    description: string;
    whatsappChannel: string;
    whatsappGroup: string;
    discordChannel: string;
    tiktokPage: string;
    followersCount: string;
  };
  testimonials: Testimonial[];
  portfolioItems: PortfolioItem[];
  rates: Record<string, RateGroup[]>;
}
