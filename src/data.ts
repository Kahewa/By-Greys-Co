/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PortfolioSettings } from './types';

export const DEFAULT_SETTINGS: PortfolioSettings = {
  bio: "Hi, I'm Grace Shuuya. A Namibian-based Software Development Degree holder, who is passionate about producing aesthetic experiences that reflect my skill and faith. I specialize in UI Design, Web Development, Canva Creation and Videography, overseen by a strategic eye for creative direction.",
  profilePhoto: "https://res.cloudinary.com/dllugr1kc/image/upload/v1772275124/o_p9ksap.jpg",
  socials: {
    instagram: "https://www.instagram.com/iisgreys/",
    tiktok: "https://www.tiktok.com/@kahewa_",
    linkedin: "https://www.linkedin.com/in/graceshuuya/",
    github: "https://github.com/Kahewa",
    freelanceInstagram: "https://www.instagram.com/contented.bg"
  },
  jesusUnite: {
    description: "My faith is the foundation of everything I do. I've started 'Jesus Unites' as a wholesome, loving Christ-centered community. We host online Bible study, game nights and events. Don't miss the next one!",
    whatsappChannel: "https://whatsapp.com/channel/0029Vb618yW4SpkJAOFqQw0X",
    whatsappGroup: "https://chat.whatsapp.com/FniXtxlkwzgDLXEBZjVE6W?mode=gi_t",
    discordChannel: "https://discord.gg/dQkcmKyrq",
    tiktokPage: "https://www.tiktok.com/@jesus.unites",
    followersCount: "3k+"
  },
  testimonials: [
    {
      id: 1,
      username: "Tea Laboratories",
      handle: "www.tea-labs.com",
      message: "I had gotten the By Grace Co. number from a mutual contact. I reached out to her to help me with a project, and her service from the beginning was amazing. She is very creative, her outlook on the project gave me the inspiration I did not know I needed. She is a professional, always providing timely updates and I was not left wondering what happened or if there was progress. Overall, very kind and very nice to work with. I would highly recommend getting work done by Grace. ☺️✨",
      avatar: "https://res.cloudinary.com/dllugr1kc/image/upload/v1776631921/Screenshot_2026-04-19_224257_wzwysf.png"
    },
    {
      id: 2,
      username: "STA Desserts",
      handle: "@sta.desserts",
      message: "Working with this designer for my business, STA Desserts, was such a refreshing experience. She created Valentine’s special price list posters for me, and I genuinely couldn’t have asked for better results. The designs were not only visually beautiful, but they also felt intentional, thoughtful, and truly human. In a time where so much design feels automated or AI-generated, her work stood out in the best way. Every detail reflected creativity, care, and a clear understanding of my brand. She was able to take my ideas and turn them into something elegant, eye-catching, and perfectly suited for my business. I highly recommend her to anyone looking for authentic, high-quality design work that actually feels personal and unique.",
      avatar: "https://res.cloudinary.com/dllugr1kc/image/upload/v1776632045/WhatsApp_Image_2026-04-19_at_22.43.12_zy6efs.jpg"
    }
  ],
  portfolioItems: [
    // Graphic Design
    { id: 1, title: "PDF Document", category: 'graphic', thumbnail: "https://res.cloudinary.com/dllugr1kc/image/upload/v1772726336/Company_Profile_cover_knnvmc.png", link: "#", type: 'image' },
    { id: 2, title: "Basic Design", category: 'graphic', thumbnail: "https://res.cloudinary.com/dllugr1kc/image/upload/v1772364319/NameTag_xk7uth.png", link: "#", type: 'image' },
    { id: 3, title: "Business Card", category: 'graphic', thumbnail: "https://res.cloudinary.com/dllugr1kc/image/upload/v1772364406/namib_cp5wqq.png", link: "#", type: 'image' },
    { id: 4, title: "Logo Design", category: 'graphic', thumbnail: "https://res.cloudinary.com/dllugr1kc/image/upload/v1772364323/NamibNest_Logo_bok2wq.png", link: "#", type: 'image' },
    { id: 5, title: "Business Card", category: 'graphic', thumbnail: "https://res.cloudinary.com/dllugr1kc/image/upload/v1773448658/FRONT_iyjhfx.png", link: "#", type: 'image' },
    { id: 6, title: "Logo Design", category: 'graphic', thumbnail: "https://res.cloudinary.com/dllugr1kc/image/upload/v1773448605/Black_hylkt9.png", link: "#", type: 'image' },
    { id: 7, title: "Advanced Ad", category: 'graphic', thumbnail: "https://res.cloudinary.com/dllugr1kc/image/upload/v1772364338/Beige_Professional_Self_Employed_Business_Services_Pitch_Flyer_A4_zhm7ny.png", link: "#", type: 'image' },
    { id: 8, title: "Advanced Ad", category: 'graphic', thumbnail: "https://res.cloudinary.com/dllugr1kc/image/upload/v1773448588/model_ujimaw.png", link: "#", type: 'image' },
    { id: 9, title: "Advanced Ad", category: 'graphic', thumbnail: "https://res.cloudinary.com/dllugr1kc/image/upload/v1773448512/Yellow_and_Pink_Watercolour_Pets_Kitty_Party_Invitation_sruupa.png", link: "#", type: 'image' },
    { id: 10, title: "Advanced Ad", category: 'graphic', thumbnail: "https://res.cloudinary.com/dllugr1kc/image/upload/v1772364320/25_Nov_Agenda_Drop_gdkwyi.png", link: "#", type: 'image' },
    { id: 11, title: "Basic Design", category: 'graphic', thumbnail: "https://res.cloudinary.com/dllugr1kc/image/upload/v1772364385/White_Minimal_Skincare_Ingredient_Overview_Instagram_Post_omihtw.png", link: "#", type: 'image' },
    { id: 13, title: "Thumbnails", category: 'graphic', thumbnail: "https://res.cloudinary.com/dllugr1kc/image/upload/v1772364294/Modern_Daily_Podcast_YouTube_Thumbnail_eloeom.png", link: "#", type: 'image' },
    { id: 14, title: "Thumbnails", category: 'graphic', thumbnail: "https://res.cloudinary.com/dllugr1kc/image/upload/v1772364366/Simple_Minimalist_Clean_Lifestyle_Vlog_YouTube_Thumbnail_c3jjab.png", link: "#", type: 'image' },
    { id: 15, title: "Thumbnails", category: 'graphic', thumbnail: "https://res.cloudinary.com/dllugr1kc/image/upload/v1772364361/Beige_White_and_Blue_Scrapbook_Style_Personal_Desktop_Wallpaper_t0it74.png", link: "#", type: 'image' },

    // Video
    { id: 16, title: "WRC Collective", category: 'video', thumbnail: "https://res.cloudinary.com/dllugr1kc/image/upload/v1776989031/3_jivvyf.png", link: "https://www.instagram.com/reel/DXbyVdADBlA/?igsh=b3hjeXdkZ2F1d3d3", type: 'video' },
    { id: 17, title: "WRC Collective", category: 'video', thumbnail: "https://res.cloudinary.com/dllugr1kc/image/upload/v1786129763/6_yyk6kr.jpg", link: "https://www.instagram.com/reel/DYR7S9gIqYd/?igsh=ZGVycGRuaTRxbzZm", type: 'video' },
    { id: 18, title: "WRC Collective", category: 'video', thumbnail: "https://res.cloudinary.com/dllugr1kc/image/upload/v1786129770/5_rurw0d.jpg", link: "https://www.instagram.com/reel/DZYFiErI6Id/?igsh=MWE0Znl0eDd5ZXBmMg==", type: 'video' },
    { id: 19, title: "Silk Streeet Atelier", category: 'video', thumbnail: "https://res.cloudinary.com/dllugr1kc/image/upload/v1786129812/9_qt4m0v.jpg", link: "https://www.instagram.com/reel/DYg8sxaMQbh/?igsh=MXRudm4ydTA0NjMwaQ==", type: 'video' },
    { id: 20, title: "Every Nation Dorado", category: 'video', thumbnail: "https://res.cloudinary.com/dllugr1kc/image/upload/v1786129750/11_pcbchx.jpg", link: "https://www.instagram.com/reel/DbKRJc_I9pj/?igsh=cDVlb2tkZHpmMnUy", type: 'video' },
    { id: 21, title: "Every Nation Dorado", category: 'video', thumbnail: "https://res.cloudinary.com/dllugr1kc/image/upload/v1786129768/10_mgu3wf.jpg", link: "https://www.instagram.com/reel/Da4jCLVoeug/?igsh=MW45M2twNmFwaDRnbg==", type: 'video' },
    { id: 22, title: "Every Nation Dorado", category: 'video', thumbnail: "https://res.cloudinary.com/dllugr1kc/image/upload/v1786129769/8_zus8br.jpg", link: "https://www.instagram.com/reel/DbDMcxNoPdh/?igsh=MXRvcGx5MGhvdHRzMQ==", type: 'video' },
    { id: 23, title: "Every Nation Dorado", category: 'video', thumbnail: "https://res.cloudinary.com/dllugr1kc/image/upload/v1786129800/12_xw3hqg.jpg", link: "https://vt.tiktok.com/ZS44VqhkE/", type: 'video' },
    { id: 24, title: "Every Nation Dorado", category: 'video', thumbnail: "https://res.cloudinary.com/dllugr1kc/image/upload/v1786129760/7_uunmjd.jpg", link: "https://www.instagram.com/reel/DaoHb-9xc5_/?igsh=Y2l6cWp5YnF4N3cy", type: 'video' },
    
    // UI Design (Web Development)
    { id: 25, title: "ByGraceCo", category: 'ui', thumbnail: "https://res.cloudinary.com/dllugr1kc/image/upload/v1776989010/image_2026-04-24_020325870_gn3bhv.png", link: "www.bygreys.co", type: 'image' }
  ],
  rates: {
    graphics: [
      {
        title: "Graphic Design Services",
        items: [
          { service: "Basic Creative", desc: "Simple design structures - Single product ads | Name tags | ETC", price: "50.00" },
          { service: "Thumbnails", desc: "TikTok | IG Reels | Reel Shorts | YouTube | IG Story take-over covers", price: "75.00" },
          { service: "Invitations and Letters", desc: "Graduation | Wedding | Party | Love letters | ETC", price: "100.00" },
          { service: "Advanced Creative", desc: "Product/Service ads | Pricelists | Book covers | Info posts | Event Posters | ETC", price: "150.00" },
          { service: "Logo Design", desc: "New Designs | Old logo refinement", price: "200.00" }
        ]
      },
      {
        title: "PDF Documents (Invitations/Catalogues/Business Profiles)",
        items: [
          { service: "One Page", desc: "A4 size - Includes: Consultation | Active Links | Professional Design tailored to client needs", price: "75.00" },
          { service: "Two Pages", desc: "A4 size - Includes: Consultation | Active Links | Professional Design tailored to client needs", price: "140.00" },
          { service: "Three Pages", desc: "A4 size - Includes: Consultation | Active Links | Professional Design tailored to client needs", price: "200.00" },
          { service: "More Pages", desc: "Over 4 pages - Consultation needed", price: "Quote based" }
        ]
      },
      {
        title: "Graphic Design Packages",
        items: [
          { service: "Party Pack", desc: "2 Page PDF Invitation (party details, wishlist, theme breakdown, etc) + RSVP Link", price: "180.00" },
          { service: "Logo Design Pack", desc: "Logo (Light+Dark Mode) + Business Cards + Email Banner", price: "475.00" },
          { service: "Small Business Pack", desc: "Logo Design Pack + x2 Advanced Creatives + 3 Page PDF Catalogue", price: "645.00" },
          { service: "Business Pack", desc: "2 Page Company Corporate Identity Doc | 5 Page Company Profile", price: "1000.00" },
          { service: "Wedding Pack", desc: "3 Page PDF Invitation + RSVP Link + will you be Bridesmaid/Groomsman cards(printed) + 5 day Countdown", price: "1365.00" }
        ]
      }
    ],
    video: [
      {
        title: "Motion Graphics",
        items: [
          { service: "1 MINUTE", desc: "End results restricted to 10sec to 1Min", price: "100/hr" }
        ]
      },
      {
        title: "Video Editing Services",
        items: [
          { service: "1 MINUTE", desc: "End results restricted to 10sec to 1Min30sec", price: "95", rawText: "If raw content is over 5min = $145" },
          { service: "2-5 MINUTES", desc: "End results restricted to 1Min30sec to 5Min", price: "250", rawText: "If raw content is over 10min = $300" },
          { service: "6-10 MINUTES", desc: "End results restricted to 6Min to 10 Min", price: "375", rawText: "If raw content is over 20min = $425" },
          { service: "11-15 MINUTES", desc: "End results restricted to 11Min to 15 Min", price: "700", rawText: "If raw content is over 25min = $750" },
          { service: "16-20 MINUTES", desc: "End results restricted to 16Min to 20 Min", price: "1000", rawText: "If raw content is over 40min = $1100" },
          { service: "21-45 MINUTES", desc: "End results restricted to 21Min to 45Min", price: "1500", rawText: "If raw content is over 1hr = $1600" },
          { service: "YouTube Mini", desc: "16-20 min + trailer + thumbnail", price: "1145", rawText: "If raw content is over 40min = $1245" },
          { service: "YouTube Max", desc: "21-45 min + trailer + thumbmail", price: "1645", rawText: "If raw content is over 1hr = $1745" }
        ]
      }
    ],
    web: [
      {
        title: "Web Development & Design",
        items: [
          { service: "Web Based Personal Profile and Portfolio", desc: "Aesthetic single-page profile, digital CV, or custom portfolio site", price: "500 - Starting Price" },
          { service: "User Interface Design For Web and Mobile Applications", desc: "High-fidelity, modern UI design tailored for web or mobile apps", price: "1500 - Starting Price" },
          { service: "Full-Stack Website Development", desc: "Complete web application with frontend, backend integration, and database features", price: "4000 - Starting Price" }
        ]
      }
    ]
  },
  lastUpdated: 0
};