export type FeaturedItem = {
  name: string;
  plain: string;
  slug?: string;
};

export type Service = {
  slug: string;
  title: string;
  short: string;
  benefit: string;
  intro: string;
  featured: FeaturedItem[];
  groups: { title: string; description: string; items: string[] }[];
};

export const services: Service[] = [
  {
    slug: 'ai-automation',
    title: 'AI & Automation',
    short: 'Spend less time on repetitive work and respond to customers more consistently.',
    benefit: 'Make routine tasks easier to manage, from first enquiry to follow-up.',
    intro: 'We look at the tasks that slow your team down and build practical automations around how you already work. You stay in control; the system takes care of the repeatable parts.',
    featured: [
      { name: 'WhatsApp automation', plain: 'Reply to common questions and guide new enquiries.', slug: 'whatsapp-automation' },
      { name: 'Customer support chatbots', plain: 'Help visitors find answers when your team is busy.', slug: 'customer-support-automation' },
      { name: 'Workflow automation', plain: 'Connect steps that your team repeats each day.', slug: 'workflow-automation' },
      { name: 'Custom AI solutions', plain: 'Build focused automations around how your business works.', slug: 'custom-ai-solutions' }
    ],
    groups: [
      {
        title: 'Customer conversations',
        description: 'Make it easier for people to get answers and for your team to follow up.',
        items: [
          'WhatsApp Automation',
          'Customer Support Automation',
          'AI Chatbots',
          'Website Chatbots',
          'Appointment & Reminder Automation'
        ]
      },
      {
        title: 'Everyday operations',
        description: 'Reduce the manual handoffs between tools and tasks.',
        items: [
          'Business Process Automation',
          'CRM Automation',
          'Workflow Automation'
        ]
      },
      {
        title: 'Content and custom work',
        description: 'Build focused automations for the channels your business uses.',
        items: [
          'Email Automation',
          'YouTube Automation',
          'Custom AI Solutions'
        ]
      }
    ]
  },
  {
    slug: 'social-media-content',
    title: 'Social Media & Content',
    short: 'Show up consistently with content that reflects your business.',
    benefit: 'Give customers a clearer reason to notice, understand and remember your business.',
    intro: 'From planning posts to preparing visuals and captions, we help you maintain a useful, recognizable presence without asking you to handle every detail alone.',
    featured: [
      { name: 'Social media management', plain: 'Plan and publish your content more consistently.', slug: 'social-media-management' },
      { name: 'Post design', plain: 'Create clear visuals for your products and updates.', slug: 'post-designing' },
      { name: 'Captions and copy', plain: 'Explain what you offer in words customers understand.', slug: 'caption-and-copy-creation' },
      { name: 'Content strategy', plain: 'Decide what to share and why it matters.', slug: 'brand-content-strategy' }
    ],
    groups: [
      {
        title: 'Planning and management',
        description: 'A more organized way to communicate with your audience.',
        items: ['Social Media Management', 'Brand Content Strategy', 'Caption & Copy Creation']
      },
      {
        title: 'Content production',
        description: 'Simple, recognizable content for your channels.',
        items: [
          'Post Designing',
          'Video Editing',
          'Short-form Video Editing',
          'AI Video Generation',
          'Thumbnail Creative Design'
        ]
      }
    ]
  },
  {
    slug: 'video-editing-production',
    title: 'Video Editing & Production',
    short: 'Turn product footage and ideas into videos people can understand quickly.',
    benefit: 'Show what your product or service does with clear, well-edited video.',
    intro: 'We shape your footage and message into videos suited to the place people will see them, whether that is a short reel, an ad or a longer explanation.',
    featured: [
      { name: 'Product & explainer videos', plain: 'Show what your product or service does with clear, high-converting video.', slug: 'product-and-explainer-videos' },
      { name: 'Instagram reels', plain: 'Fast-paced, hook-driven vertical videos crafted for engagement.', slug: 'instagram-reels' },
      { name: 'Promotional AI video', plain: 'High-impact promotional visuals and generative video production.', slug: 'promotional-ai-video' },
      { name: 'Brand logo reveals', plain: 'Signature motion design that gives your brand a memorable entrance.', slug: 'brand-logo-reveals' }
    ],
    groups: [
      {
        title: 'Commercial & Explainer Videos',
        description: 'Focused stories for discovery, products, and campaigns.',
        items: [
          'Product & Explainer Videos',
          'Instagram Reels',
          'YouTube Intro & Outro Design'
        ]
      },
      {
        title: 'Promotional & AI Video',
        description: 'High-impact promotional visuals and generative video production.',
        items: [
          'Promotional AI Video',
          'Product Advertisement Animation',
          'Promotional Video Effects'
        ]
      },
      {
        title: 'Motion Graphics & Animation',
        description: 'Enhance your brand identity with expressive motion and typography.',
        items: [
          'Animated Social Media Posts',
          'Brand Logo Reveals',
          'Animated Typography'
        ]
      }
    ]
  },
  {
    slug: 'marketing-advertising',
    title: 'Marketing & Advertising',
    short: 'Reach people who are more likely to need what you offer.',
    benefit: 'Put your offer in front of the right audience and learn what works.',
    intro: 'We plan campaigns around your goal, prepare the creative, launch on suitable channels and review what the numbers actually tell us. No platform should be chosen before the audience and offer are clear.',
    featured: [
      { name: 'Meta ads', plain: 'Reach potential customers on Facebook and Instagram.', slug: 'meta-ads' },
      { name: 'Google ads', plain: 'Appear when people search for relevant services.', slug: 'google-ads' },
      { name: 'AI ad generation', plain: 'Create high-performing ads with intelligent creative tools.', slug: 'ai-ad-generation' },
      { name: 'Video ads', plain: 'Engage audience with targeted motion and video promotions.', slug: 'video-ads' }
    ],
    groups: [
      {
        title: 'Campaigns and channels',
        description: 'Choose where to advertise based on how customers look for you.',
        items: [
          'Meta Ads',
          'Google Ads'
        ]
      },
      {
        title: 'Ad creative production',
        description: 'Make the words and visuals people see in the campaign.',
        items: [
          'AI Ad Generation',
          'Video Ads',
          'Image Ads',
          'Social Media Ads',
          'Product Ads',
          'Promotional Videos',
          'Ad Copywriting',
          'Product Video Generation'
        ]
      }
    ]
  },
  {
    slug: 'website-development',
    title: 'Website Development',
    short: 'Give customers a clear place to learn, trust and contact your business.',
    benefit: 'A website that helps people understand what you do and take the next step.',
    intro: 'We build websites around the information your customers need first. The right structure, readable content and simple enquiry paths matter as much as how the site looks.',
    featured: [
      { name: 'Business websites', plain: 'Explain your offer and make it easy to contact you.', slug: 'business-websites' },
      { name: 'Landing pages', plain: 'Focus one page on one campaign or action.', slug: 'landing-pages' },
      { name: 'Online stores', plain: 'Show products and support an easier buying journey.', slug: 'e-commerce-websites' },
      { name: 'Website redesign', plain: 'Make an existing website clearer and easier to use.', slug: 'website-redesign' }
    ],
    groups: [
      {
        title: 'Websites for your business',
        description: 'The right format for your products, services and audience.',
        items: [
          'Custom Website Development',
          'Business Websites',
          'Corporate Websites',
          'Portfolio Websites',
          'Service Websites',
          'E-commerce Websites',
          'Landing Pages'
        ]
      },
      {
        title: 'Improvement and upkeep',
        description: 'Keep a site useful as your business changes.',
        items: ['Website Redesign', 'Website Maintenance', 'SEO-ready Development']
      },
      {
        title: 'Useful connections',
        description: 'Help the website work with your existing tools.',
        items: ['API Integration', 'Payment Gateway Integration', 'WhatsApp Integration']
      }
    ]
  },
  {
    slug: 'custom-software-development',
    title: 'Custom Software Development',
    short: 'Organize the work that spreadsheets and disconnected tools make difficult.',
    benefit: 'Build a system around the way your team actually works.',
    intro: 'When an off-the-shelf tool does not fit, we design software for your real workflow, from billing and inventory to customer records and dashboards.',
    featured: [
      { name: 'Billing and invoices', plain: 'Create and track payments and documents.', slug: 'billing-software' },
      { name: 'Inventory systems', plain: 'Know what stock you have and what has changed.', slug: 'inventory-management-systems' },
      { name: 'Customer systems', plain: 'Keep enquiries and customer details in one place.', slug: 'customer-management-systems' },
      { name: 'Operations dashboards', plain: 'See the information your team needs to act.', slug: 'reporting-dashboards' }
    ],
    groups: [
      {
        title: 'Business operations',
        description: 'Bring essential day-to-day work into one clear system.',
        items: [
          'Billing Software',
          'Invoice Management Systems',
          'Inventory Management Systems',
          'Order Management Systems',
          'Expense Management Systems'
        ]
      },
      {
        title: 'People and customers',
        description: 'Keep relationships and team workflows organized.',
        items: [
          'CRM Systems',
          'ERP Solutions',
          'Employee Management Systems',
          'Attendance Management Systems',
          'Appointment Management Systems',
          'Customer Management Systems'
        ]
      },
      {
        title: 'Visibility and control',
        description: 'Make information easier to find and use.',
        items: ['Reporting Dashboards', 'Admin Dashboards']
      }
    ]
  },
  {
    slug: 'ui-ux-product-design',
    title: 'UI/UX & Product Design',
    short: 'Make digital products easier for real people to use.',
    benefit: 'Help customers and teams complete tasks with less confusion.',
    intro: 'We plan the flow of a product before polishing screens. The result should feel clear to a new user and practical for the people who use it every day.',
    featured: [
      { name: 'Website design', plain: 'Make your website easier to scan and navigate.', slug: 'website-ui-ux' },
      { name: 'App interfaces', plain: 'Plan straightforward screens and interactions.', slug: 'mobile-app-ui-ux' },
      { name: 'Wireframing', plain: 'Plan clear user paths and workflows before building.', slug: 'wireframing' },
      { name: 'Product redesign', plain: 'Improve a confusing existing experience.', slug: 'existing-product-redesign' }
    ],
    groups: [
      {
        title: 'Research and structure',
        description: 'Understand users and give the product a clear path.',
        items: ['User Flow Design', 'Wireframing', 'Product Experience Design']
      },
      {
        title: 'Interface design',
        description: 'Design coherent screens for the right devices.',
        items: [
          'UI Design',
          'UX Design',
          'Website UI/UX',
          'Software UI/UX',
          'Mobile App UI/UX',
          'Responsive Interface Design'
        ]
      },
      {
        title: 'Systems and testing',
        description: 'Help teams build consistent products and review ideas early.',
        items: ['Design Systems', 'Interactive Prototypes', 'Existing Product Redesign']
      }
    ]
  }
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);
