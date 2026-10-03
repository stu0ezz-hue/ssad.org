// ============================================================
// English dictionary — القاموس الإنجليزي
// Mirror of the Arabic dictionary (src/data/i18n/ar.ts).
// ============================================================
import { healthcareProgram } from "../content-config";

export const en = {
  siteName: "Shababna Sanad",
  siteTagline: "Shababna Sanad Association for Development and Support",

  nav: {
    home: "Home",
    about: "About Us",
    areas: "Areas of Work",
    impact: "Our Impact",
    programs: "Programs",
    news: "News",
    contact: "Contact",
    donate: "Donate Now",
  },

  hero: {
    headline: "Together We Create Impact... Together We Build a Better Future",
    sub: "Shababna Sanad Association for Development and Support is dedicated to empowering youth, supporting communities, and creating real opportunities toward a fairer, more sustainable future.",
    ctaPrimary: "Discover Our Mission",
    ctaSecondary: "Contribute With Us",
    badge: "Shababna Sanad Association for Development and Support",
    brandSpan: "Shababna Sanad",
    stats: {
      beneficiaries: "Beneficiaries",
      initiatives: "Initiatives",
      volunteers: "Volunteers",
      regions: "Regions Reached",
    },
  },

  about: {
    title: "Who We Are",
    eyebrow: "The Association",
    paragraphs: [
      "Shababna Sanad Association for Development and Support is a humanitarian and development association that believes people are at the heart of every change, and that youth are the energy and fuel of society toward the future.",
      "We work on empowering youth and supporting communities through development programs and humanitarian initiatives that create lasting impact and strengthen values of volunteering, partnership, and collaboration.",
    ],
    cta: "Learn More About Us",
    imageAlt: "Youth learning and developing skills",
    floatingStat: "Active volunteers",
    values: [
      { title: "Integrity", desc: "We commit to transparency in everything we do." },
      { title: "Sustainability", desc: "Impact that lasts beyond every initiative." },
      { title: "Partnership", desc: "Building bridges of collaboration with the community." },
      { title: "Empowerment", desc: "We believe in people's potential and opportunity." },
    ],
  },

  mission: {
    title: "Our Mission",
    text: "We work for a stronger, more cohesive community by empowering youth, supporting those most in need, and implementing development and humanitarian initiatives that create lasting impact.",
  },

  vision: {
    title: "Our Vision",
    text: "A community capable of uplifting its members, and youth who possess the knowledge, opportunities, and ability to drive change.",
  },

  areas: {
    title: "Areas of Work",
    eyebrow: "Work Pillars",
    items: [
      {
        key: "youth",
        title: "Youth Support",
        desc: "Empowering youth and developing their abilities and skills to face future challenges.",
        icon: "Users",
      },
      {
        key: "education",
        title: "Education",
        desc: "Supporting access to education and building sustainable learning opportunities for all.",
        icon: "GraduationCap",
      },
      {
        key: "community",
        title: "Community Development",
        desc: "Implementing initiatives that improve the lives of local communities.",
        icon: "Building2",
      },
      {
        key: "humanitarian",
        title: "Humanitarian Support",
        desc: "Responding to humanitarian needs and supporting the most vulnerable.",
        icon: "HeartHandshake",
      },
      {
        key: "economic",
        title: "Economic Empowerment",
        desc: "Creating opportunities and developing skills that help individuals build a better future.",
        icon: "TrendingUp",
      },
      {
        key: "volunteering",
        title: "Volunteering & Engagement",
        desc: "Engaging youth and volunteers in creating community impact.",
        icon: "HandHeart",
      },
    ],
  },

  programs: {
    title: "Programs & Initiatives",
    eyebrow: "Our Programs",
    items: [
      {
        image: "/images/program1.jpg",
        title: "Youth Empowerment Program",
        desc: "We provide youth with the knowledge, skills, and opportunities to build their future.",
        metric: "+500 Beneficiaries",
        cta: "Read More",
      },
      {
        image: "/images/program2.jpg",
        title: "Education For All Initiative",
        desc: "We support educational opportunities and provide learning tools to those in need.",
        metric: "+300 Students",
        cta: "Read More",
      },
      {
        image: "/images/program3.jpg",
        title: "Entrepreneurship Program",
        desc: "We accompany youth in turning their ideas into real projects with impact.",
        metric: "+120 Projects",
        cta: "Read More",
      },
      healthcareProgram.en,
    ],
  },

  impact: {
    title: "Our Impact in Numbers",
    eyebrow: "Impact",
    items: [
      { value: 1000, suffix: "+", label: "Beneficiaries" },
      { value: 25, suffix: "+", label: "Initiatives" },
      { value: 100, suffix: "+", label: "Volunteers" },
      { value: 10, suffix: "+", label: "Partnerships" },
    ],
  },

  stories: {
    title: "Stories That Make a Difference",
    eyebrow: "Human Stories",
    readStory: "Read Story",
    items: [
      {
        image: "/images/story1.jpg",
        name: "Ahmed, 23",
        program: "Youth Empowerment Program",
        quote: "The program gave me the skills and confidence I needed to start my own business, and today I can support my family.",
      },
      {
        image: "/images/story2.jpg",
        name: "Layla, University Student",
        program: "Education For All Initiative",
        quote: "Thanks to the support I received, I was able to complete my university studies and achieve my dream of becoming a teacher.",
      },
      {
        image: "/images/story3.jpg",
        name: "Local Volunteer Team",
        program: "Community Development",
        quote: "Volunteering with the association changed our view of giving, and we became part of a real movement making a difference in our community.",
      },
    ],
  },

  partners: {
    title: "Our Partners",
    eyebrow: "Partners in Impact",
    note: "Official partner announcement coming soon. Contact us to inquire about partnership opportunities.",
    items: ["Partner A", "Partner B", "Partner C", "Partner D", "Partner E", "Partner F"],
  },

  cta: {
    title: "Be Part of the Impact",
    text: "Your support, time, and expertise can make a real difference in someone's life.",
    donate: "Contribute",
    volunteer: "Volunteer",
    contact: "Contact Us",
  },

  contact: {
    title: "Get in Touch",
    text: "We'd love to hear from you. Our team responds within business days.",
    follow: "Follow Us",
    email: { label: "Email", value: "info@shababnasand.org" },
    phone: { label: "Phone", value: "+000 000 000 000" },
    address: { label: "Address", value: "Headquarters — to be announced soon" },
    form: {
      name: "Full Name",
      email: "Email",
      phone: "Phone",
      subject: "Subject",
      message: "Message",
      messagePlaceholder: "Write your message here...",
      send: "Send Message",
      success: "Your message has been sent. We'll get back to you soon.",
      error: "Something went wrong. Please try again.",
      validationSummary: "Please correct the highlighted fields before submitting.",
      errors: {
        nameRequired: "Name is required",
        nameInvalid: "Please enter a valid name using 2 to 100 letters and spaces only.",
        email: "Please enter a valid email address",
        phone: "Please enter a valid phone number",
        subjectRequired: "Subject is required",
        subjectInvalid: "Subject must be 150 characters or fewer.",
        message: "Message must be between 10 and 3000 characters",
      },
    },
  },

  footer: {
    description: "Shababna Sanad Association for Development and Support — a humanitarian and development association dedicated to empowering youth, supporting communities, and creating sustainable impact.",
    navTitle: "Quick Links",
    supportTitle: "Support Us",
    support: {
      donate: "Donate",
      volunteer: "Volunteer",
      partner: "Partner With Us",
    },
    legal: {
      privacy: "Privacy Policy",
      terms: "Terms & Conditions",
    },
    copyright: "© 2026 Shababna Sanad Association for Development and Support. All Rights Reserved.",
  },

  seo: {
    title: "Shababna Sanad Association for Development and Support — Humanitarian and Development Association",
    description: "Shababna Sanad Association for Development and Support is a humanitarian and development association empowering youth, supporting communities, and creating real opportunities for a fairer, more sustainable future.",
    socialTitle: "Shababna Sanad Association for Development and Support",
    socialDescription: "A humanitarian and development association dedicated to empowering youth, supporting communities, and creating sustainable impact.",
    keywords: "Shababna Sanad, association, NGO, nonprofit, empowerment, youth, community, humanitarian",
    locale: "en_US",
  },

  a11y: {
    skipToContent: "Skip to content",
    logo: "Home",
    mainNav: "Main navigation",
    mobileNav: "Mobile navigation",
    languageGroup: "Language",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    closeDialog: "Close dialog",
    viewDetails: "View details",
    backToProgram: "Back to program",
    downloadFile: "Download file",
    fileUnavailable: "Details for this project will be available soon.",
    programServices: "Services and achievements",
    previousProgram: "Previous program",
    nextProgram: "Next program",
    goToProgram: "Go to program",
    programPagination: "Program pagination",
    swipePrograms: "Swipe to explore programs",
    heroLabel: "Main content",
    scrollToContent: "Scroll to content",
  },
};