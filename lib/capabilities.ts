import { services, serviceBySlug } from "./services";

export interface CapabilityDetail {
  slug: string;
  name: string;
  serviceSlug: string;
  serviceTitle: string;
  groupTitle: string;
  tagline: string;
  simpleSummary: string; // The core plain-English explanation
  whatItDoesForYou: { title: string; description: string; icon?: string }[];
  before: { problem: string; detail: string }[];
  after: { solution: string; detail: string }[];
  howItWorks: { step: string; title: string; description: string }[];
  quickStats: { label: string; value: string }[];
  targetAudience: string;
  relatedItems: { name: string; slug: string }[];
}

export function toItemSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Specific rich knowledge base for top capabilities across all service categories
const customCapabilityData: Record<string, Partial<CapabilityDetail>> = {
  // AI & Automation - Customer Conversations
  "whatsapp-automation": {
    tagline: "Reply to customers instantly on WhatsApp 24/7 without being glued to your phone.",
    simpleSummary:
      "When a customer messages your WhatsApp, this system answers them in seconds. It provides pricing, answers common questions, sends catalogs or booking links, and collects their details so you never miss a lead while you are busy or sleeping.",
    whatItDoesForYou: [
      {
        title: "Instant 5-Second Replies",
        description: "Answers incoming inquiries immediately, so customers never leave to check a competitor."
      },
      {
        title: "Automatic Catalog & Info Sharing",
        description: "Sends PDF brochures, price lists, service menus, or locations right when requested."
      },
      {
        title: "Lead Qualification & Capture",
        description: "Asks 2-3 qualifying questions (name, need, budget) and stores them neatly in your CRM or spreadsheet."
      },
      {
        title: "Hands-off Appointment Booking",
        description: "Guides clients to pick available time slots and automatically confirms their booking."
      },
      {
        title: "Smart Escalation to Humans",
        description: "Notifies you immediately when a customer has a custom request or is ready to make a payment."
      }
    ],
    before: [
      { problem: "Slow Replies", detail: "Customers wait 3-4 hours for an answer and often buy elsewhere." },
      { problem: "Repetitive Typing", detail: "You waste hours typing the exact same price list and answers every single day." },
      { problem: "Missed Night Leads", detail: "Inquiries coming in after 8 PM go unattended until the next morning." }
    ],
    after: [
      { solution: "100% Instant Coverage", detail: "Every inquiry receives an immediate, helpful response at any hour of the day or night." },
      { solution: "Hours Saved Each Week", detail: "Routine chats happen on autopilot, freeing you to focus on fulfilling orders and serving clients." },
      { solution: "Higher Conversion Rate", detail: "Quick replies keep hot leads engaged and dramatically improve deal closing rates." }
    ],
    howItWorks: [
      { step: "01", title: "Map Common Inquiries", description: "We identify your most frequent questions, pricing, and the ideal conversation steps." },
      { step: "02", title: "Connect WhatsApp Business", description: "We integrate the automation directly with your official WhatsApp number safely." },
      { step: "03", title: "Go Live & Autopilot", description: "The system starts handling conversations immediately, notifying you only when needed." }
    ],
    quickStats: [
      { label: "Average Response Time", value: "< 5 sec" },
      { label: "Hours Saved Weekly", value: "12+ hrs" },
      { label: "Message Coverage", value: "24/7" },
      { label: "Setup Time", value: "3-5 days" }
    ],
    targetAudience: "Businesses getting 5+ customer WhatsApp messages daily who want fast replies without hiring extra support staff."
  },

  "customer-support-automation": {
    tagline: "Resolve common customer questions automatically and escalate complex issues gracefully.",
    simpleSummary:
      "Instead of answering the same 10 support queries over and over, support automation solves routine problems (order status, refund policy, office hours, logins) instantly so your team only spends time on genuine priority issues.",
    whatItDoesForYou: [
      { title: "24/7 First-Line Support", description: "Customers get immediate help even on weekends and holidays." },
      { title: "Ticket Triaging & Routing", description: "Directs incoming requests to the right person with all the context attached." },
      { title: "Order & Status Lookups", description: "Customers can check delivery status or service updates using their phone number or ID." },
      { title: "Customer Satisfaction Tracking", description: "Gathers feedback automatically after every resolution to keep quality high." }
    ],
    before: [
      { problem: "Overwhelmed Team", detail: "Staff spends 70% of their workday answering basic, repetitive questions." },
      { problem: "Frustrated Customers", detail: "Waiting on hold or in queue for hours just to get a simple status update." }
    ],
    after: [
      { solution: "Instant Self-Service", detail: "80% of routine questions resolved in under 30 seconds." },
      { solution: "Focused Support Staff", detail: "Your team only handles high-priority, high-value client needs." }
    ],
    howItWorks: [
      { step: "01", title: "Audit FAQ & Issues", description: "We collect your most frequent inquiries and ideal resolutions." },
      { step: "02", title: "Build Knowledge & Logic", description: "We configure the automated flows to answer accurately in your brand's voice." },
      { step: "03", title: "Deploy Across Channels", description: "We connect it to your website, email, or chat apps seamlessly." }
    ],
    quickStats: [
      { label: "Ticket Deflection", value: "65-80%" },
      { label: "Resolution Speed", value: "Instant" },
      { label: "Availability", value: "365 days" },
      { label: "CSAT Improvement", value: "+35%" }
    ],
    targetAudience: "Growing businesses handling support via email, phone, or chat that want faster resolutions and lower operational overhead."
  },

  "ai-chatbots": {
    tagline: "Smart conversational assistants that understand your business and guide visitors to take action.",
    simpleSummary:
      "An AI chatbot trained specifically on your business information that talks naturally with visitors, answers nuanced questions, explains your products or services, and guides people directly to book a call or purchase.",
    whatItDoesForYou: [
      { title: "Natural Human-like Conversations", description: "Understands user intent and nuances rather than giving robotic broken replies." },
      { title: "Trained on Your Content", description: "Learns your website pages, product catalogs, brochures, and company policies." },
      { title: "Lead Magnet & Conversion", description: "Engages browsing visitors before they bounce and turns them into warm contacts." },
      { title: "Multi-Language Support", description: "Can communicate effortlessly in multiple languages for diverse customers." }
    ],
    before: [
      { problem: "Passive Visitors", detail: "95% of website visitors leave without reaching out because they couldn't find quick answers." },
      { problem: "Rigid Old Bots", detail: "Traditional rule bots get stuck whenever a customer phrases something slightly differently." }
    ],
    after: [
      { solution: "Proactive Engagement", detail: "Greets visitors, answers complex queries accurately, and asks for the sale or booking." },
      { solution: "True Intelligence", detail: "Handles typos, slang, and detailed technical questions smoothly." }
    ],
    howItWorks: [
      { step: "01", title: "Knowledge Ingestion", description: "We feed your documentation, pricing, and company FAQs into the AI model." },
      { step: "02", title: "Tone & Safety Guardrails", description: "We configure strict boundaries so the bot never makes up fake information." },
      { step: "03", title: "Embed & Monitor", description: "We launch it on your site with a live analytics dashboard showing visitor questions." }
    ],
    quickStats: [
      { label: "Query Accuracy", value: "98%+" },
      { label: "Visitor Engagement", value: "3x higher" },
      { label: "Languages", value: "50+" },
      { label: "Launch Time", value: "4-7 days" }
    ],
    targetAudience: "Companies with detailed services, e-commerce stores, or SaaS products wanting a 24/7 sales consultant on their site."
  },

  "website-chatbots": {
    tagline: "An interactive website widget that turns curious visitors into booked clients.",
    simpleSummary:
      "A sleek widget sitting in the corner of your website that catches visitors before they leave, answers questions about what you do, and collects their email or phone number directly so you can close the deal.",
    whatItDoesForYou: [
      { title: "Captures Bouncing Visitors", description: "Offers a friendly greeting when someone spends 15 seconds on a pricing or product page." },
      { title: "Direct Contact Form Replacement", description: "People prefer quick chatting over filling long intimidating forms." },
      { title: "Instant Notification", description: "Sends you an SMS, WhatsApp, or Slack ping the moment a hot lead enters their contact info." },
      { title: "Matches Site Design", description: "Styled to look like a natural, polished part of your existing website." }
    ],
    before: [
      { problem: "Low Form Submissions", detail: "Visitors hate long forms and leave your site without leaving contact information." }
    ],
    after: [
      { solution: "High Conversion Chat", detail: "Conversational lead collection yields 2-4x more contact inquiries." }
    ],
    howItWorks: [
      { step: "01", title: "Design Custom Widget", description: "Match your company branding, logo, colors, and welcome prompts." },
      { step: "02", title: "Set Lead Routing", description: "Choose where captured contacts get sent (email, CRM, WhatsApp)." },
      { step: "03", title: "One-Line Installation", description: "Simple script snippet added to your website in 5 minutes." }
    ],
    quickStats: [
      { label: "Conversion Lift", value: "+120%" },
      { label: "Installation Time", value: "5 mins" },
      { label: "Mobile Optimized", value: "100%" },
      { label: "Lead Notification", value: "Instant" }
    ],
    targetAudience: "Any website owner who wants more leads from the visitors they already get."
  },

  "lead-follow-up-automation": {
    tagline: "Automatically follow up with every new lead so no potential sale goes cold.",
    simpleSummary:
      "When someone fills out a form, sends a message, or downloads a brochure, this automation follows up across WhatsApp, email, or SMS at the perfect intervals until they schedule a call or purchase.",
    whatItDoesForYou: [
      { title: "Zero Forgotten Leads", description: "Ensures every single person who showed interest receives timely follow-ups." },
      { title: "Multi-Touch Sequences", description: "Sends warm, natural check-in messages over 3 to 14 days automatically." },
      { title: "Stops When They Reply", description: "Automatically pauses the automated sequence the second the lead responds to a human." },
      { title: "Revives Cold Contacts", description: "Re-engages leads from months ago with targeted offers and updates." }
    ],
    before: [
      { problem: "Leads Fall Through Cracks", detail: "Sales reps get busy and forget to follow up with 40% of promising inquiries." },
      { problem: "One-and-Done Outreach", detail: "Giving up after a single phone call or email means leaving 80% of sales behind." }
    ],
    after: [
      { solution: "Persistent & Consistent", detail: "Every lead receives structured, polite follow-ups without manual tracking." },
      { solution: "Doubled Close Rates", detail: "Consistently being the first to follow up wins you the customer's trust and business." }
    ],
    howItWorks: [
      { step: "01", title: "Define Follow-up Cadence", description: "Plan message timing (e.g. Day 1, Day 3, Day 7) and tailored messaging." },
      { step: "02", title: "Integrate Lead Sources", description: "Connect your Facebook ads, website forms, and WhatsApp inquiries." },
      { step: "03", title: "Automate Outreach", description: "System triggers personalized sequences and hands off only when replied." }
    ],
    quickStats: [
      { label: "Lead Response Rate", value: "+45%" },
      { label: "Lost Inquiries", value: "0%" },
      { label: "Sales Lift", value: "+28%" },
      { label: "Manual Effort", value: "Zero" }
    ],
    targetAudience: "Agencies, real estate, consultants, clinics, and service providers who rely on closing inbound leads."
  },

  "appointment-reminder-automation": {
    tagline: "Cut client no-shows to near zero with automated reminders and easy rescheduling.",
    simpleSummary:
      "Automatically sends booking confirmations, calendar invites, and WhatsApp/SMS reminders before consultations or appointments so clients show up prepared and on time.",
    whatItDoesForYou: [
      { title: "Instant Calendar Confirmation", description: "Sends confirmation with date, time, address, or video link immediately upon booking." },
      { title: "Timed WhatsApp / SMS Alerts", description: "Pings clients 24 hours and 2 hours prior with a one-tap confirmation button." },
      { title: "Self-Service Rescheduling", description: "Lets clients reschedule on their own if something comes up, preventing a lost slot." },
      { title: "Prep Instructions & Checklists", description: "Sends pre-meeting requirements so clients arrive ready for productive discussions." }
    ],
    before: [
      { problem: "Costly No-Shows", detail: "Clients forget their appointments, leaving your team with wasted empty calendar slots." },
      { problem: "Manual Calling", detail: "Staff spends hours calling patients or clients every morning to confirm tomorrow's slots." }
    ],
    after: [
      { solution: "90%+ Attendance", detail: "Timely reminders ensure clients remember and prioritize their scheduled session." },
      { solution: "Zero Calling Time", detail: "Confirmations happen via WhatsApp or SMS automatically while your staff does real work." }
    ],
    howItWorks: [
      { step: "01", title: "Connect Calendar", description: "Link Google Calendar, Calendly, or your custom booking system." },
      { step: "02", title: "Set Reminder Schedule", description: "Configure WhatsApp, SMS, or email templates with dynamic time and place." },
      { step: "03", title: "Automate Confirmations", description: "Watch no-shows plummet as clients receive friendly reminders." }
    ],
    quickStats: [
      { label: "No-Show Reduction", value: "85%" },
      { label: "Staff Time Saved", value: "2 hrs/day" },
      { label: "Delivery Rate", value: "99.8%" },
      { label: "Client Satisfaction", value: "High" }
    ],
    targetAudience: "Doctors, clinics, salons, fitness coaches, consultants, lawyers, and any appointment-driven business."
  },

  // Everyday Operations
  "ai-automation": {
    tagline: "Replace repetitive manual business steps with fast, intelligent automated workflows.",
    simpleSummary:
      "Connects the tools you already use (email, spreadsheets, CRM, accounting, messaging) so routine data entry and handoffs happen automatically without any human copying and pasting.",
    whatItDoesForYou: [
      { title: "Eliminates Data Entry", description: "Invoices, lead details, and orders transfer between tools automatically with zero errors." },
      { title: "Instant Task Handoffs", description: "When a customer signs or pays, contracts, tasks, and notifications trigger in seconds." },
      { title: "Custom Smart Rules", description: "Filters, routes, and processes documents based on your specific business logic." },
      { title: "Scales Without Hiring", description: "Handle 10x more transactions without needing to hire a small army of administrators." }
    ],
    before: [
      { problem: "Copy-Paste Slavery", detail: "Employees waste 15-20 hours a week re-typing numbers from emails into spreadsheets." },
      { problem: "Human Errors", detail: "Missed commas, wrong emails, and lost invoices create customer disputes." }
    ],
    after: [
      { solution: "Instant Data Flow", detail: "Everything is synced in real-time across your platforms with 100% precision." },
      { solution: "High Team Morale", detail: "Your team focuses on creative, high-value work instead of robotic clerical tasks." }
    ],
    howItWorks: [
      { step: "01", title: "Map Workflow Bottlenecks", description: "We pinpoint which manual steps take up the most repetitive employee hours." },
      { step: "02", title: "Engineer Secure Automations", description: "We build reliable integrations using robust APIs and custom logic." },
      { step: "03", title: "Deploy & Monitor", description: "We run stress tests, deploy into production, and monitor 24/7 uptime." }
    ],
    quickStats: [
      { label: "Error Reduction", value: "99.9%" },
      { label: "Processing Speed", value: "Instant" },
      { label: "Cost Savings", value: "40-60%" },
      { label: "ROI Period", value: "< 30 days" }
    ],
    targetAudience: "Businesses whose teams spend hours shuffling information between spreadsheets, emails, and different software tools."
  },

  "ai-agents": {
    tagline: "Autonomous AI workers that carry out multi-step business tasks from start to finish.",
    simpleSummary:
      "Unlike simple bots that only reply with text, an AI Agent can browse data, read documents, calculate quotes, send emails, and complete entire multi-step assignments just like a trained junior team member.",
    whatItDoesForYou: [
      { title: "Multi-Step Task Execution", description: "Can search data, summarize information, create a draft, and send it for approval." },
      { title: "Document & PDF Analysis", description: "Reads contracts, invoices, or resumes and extracts the exact numbers you need." },
      { title: "Continuous Learning", description: "Improves its output based on feedback and guidelines you establish." },
      { title: "Human in the Loop", description: "Can seek your one-click approval before executing high-stakes decisions." }
    ],
    before: [
      { problem: "Manual Research & Review", detail: "Skilled staff spending half their day reviewing forms, invoices, and standard requests." }
    ],
    after: [
      { solution: "Autonomous Execution", detail: "AI Agent performs the preparatory 90% of the work in seconds, leaving humans to simply approve." }
    ],
    howItWorks: [
      { step: "01", title: "Define Agent Persona & Role", description: "Establish the exact scope, tools, and permissions the agent operates under." },
      { step: "02", title: "Integrate Business Data", description: "Provide secure access to necessary documents, databases, and APIs." },
      { step: "03", title: "Deploy with Oversight", description: "Launch with full visibility logs and approval checkpoints." }
    ],
    quickStats: [
      { label: "Task Speed", value: "10x faster" },
      { label: "Autonomy Level", value: "High" },
      { label: "Availability", value: "24/7" },
      { label: "Scalability", value: "Infinite" }
    ],
    targetAudience: "Forward-thinking companies looking to multiply team productivity with specialized autonomous AI helpers."
  },

  "crm-automation": {
    tagline: "Keep your sales pipeline updated automatically so deals never stall.",
    simpleSummary:
      "Automatically updates customer records, creates follow-up tasks, logs call notes, and moves deals through your sales stages as customers take action—meaning your sales reps never have to spend hours doing CRM data entry.",
    whatItDoesForYou: [
      { title: "Automatic Contact Creation", description: "New website leads, WhatsApp chats, and ad respondents are logged immediately." },
      { title: "Stage Progression Triggers", description: "Moves deals forward automatically when a contract is viewed or an invoice is paid." },
      { title: "Task Alerts for Reps", description: "Reminds salespeople exactly when to call a hot prospect who just opened a proposal." },
      { title: "Clean, Organized History", description: "Keeps every message, email, and note in one searchable timeline." }
    ],
    before: [
      { problem: "Outdated CRM", detail: "Sales reps hate updating CRM fields, leaving managers blind to pipeline health." }
    ],
    after: [
      { solution: "Self-Updating Pipeline", detail: "Every interaction is logged automatically, giving you 100% accurate sales visibility." }
    ],
    howItWorks: [
      { step: "01", title: "Audit Pipeline Stages", description: "Define your customer journey from first touch to closed sale." },
      { step: "02", title: "Configure Triggers", description: "Connect email, calendar, payment gateways, and forms." },
      { step: "03", title: "Train & Roll Out", description: "Give your team a smooth, zero-maintenance CRM experience." }
    ],
    quickStats: [
      { label: "Admin Time Saved", value: "5+ hrs/rep" },
      { label: "Pipeline Accuracy", value: "99%" },
      { label: "Close Rate Gain", value: "+22%" },
      { label: "Setup Time", value: "1 week" }
    ],
    targetAudience: "Sales teams and business owners wanting a clean, accurate pipeline without endless manual data entry."
  },

  "workflow-automation": {
    tagline: "Clear, reliable workflow automation designed to save you time and grow your business.",
    simpleSummary:
      "Connect your daily business apps and repetitive tasks into automated, self-driving workflows. From capturing leads and dispatching notifications to updating databases and syncing tools, your team stays focused on high-value work.",
    whatItDoesForYou: [
      {
        title: "Automated Multi-App Hand-offs",
        description: "Seamlessly links your forms, spreadsheets, emails, and CRM so data moves automatically without manual copying."
      },
      {
        title: "Zero-Error Task Execution",
        description: "Standardizes everyday operational steps to ensure nothing falls through the cracks, even during peak rush."
      },
      {
        title: "Real-Time Team Notifications",
        description: "Sends instant WhatsApp, Slack, or email alerts when critical client events, payments, or actions occur."
      },
      {
        title: "Built Around How You Work",
        description: "Tailored directly to your team's existing software stack and processes—no complicated overhauls required."
      }
    ],
    before: [
      { problem: "Manual Busywork", detail: "Hours wasted each day copying information across apps, emails, and spreadsheets." },
      { problem: "Missed Steps", detail: "When team members are busy or away, important customer updates get delayed or forgotten." }
    ],
    after: [
      { solution: "Hands-Free Operations", detail: "Every repetitive task runs automatically in the background with clockwork precision." },
      { solution: "100% Reliable Hand-offs", detail: "Data is synced instantly across your systems so everyone has accurate, real-time context." }
    ],
    howItWorks: [
      { step: "01", title: "Map Everyday Steps", description: "We review the repetitive tasks and tool hand-offs that slow your team down." },
      { step: "02", title: "Build & Integrate", description: "We configure robust, secure automation flows connecting your existing applications." },
      { step: "03", title: "Test & Autopilot", description: "We thoroughly validate edge cases, go live, and deliver seamless hands-off operations." }
    ],
    quickStats: [
      { label: "Hours Saved Weekly", value: "15+ hrs" },
      { label: "Execution Speed", value: "Real-time" },
      { label: "Error Rate", value: "0%" },
      { label: "Setup Complexity", value: "Zero for you" }
    ],
    targetAudience: "Growing businesses and operational teams tired of manual copy-paste routines and fragmented software hand-offs."
  },

  // Content & Custom Work
  "social-media-automation": {
    tagline: "Schedule, publish, and distribute your content across all channels on auto-pilot.",
    simpleSummary:
      "Create your content once and have it automatically scheduled, formatted, and published across Instagram, Facebook, LinkedIn, X, and YouTube without manually uploading to each platform one by one.",
    whatItDoesForYou: [
      { title: "Multi-Platform Publishing", description: "One-click distribution to all your social profiles simultaneously." },
      { title: "Consistent Schedule", description: "Queue up weeks of posts so your brand never goes silent when you are busy." },
      { title: "Auto-Format for Channels", description: "Adapts captions, aspect ratios, and tags for each respective network." },
      { title: "Centralized Content Calendar", description: "Visual overview of everything going live this month." }
    ],
    before: [
      { problem: "Inconsistent Posting", detail: "Posting in bursts when free, then disappearing for 3 weeks when busy." },
      { problem: "Tedious Uploads", detail: "Uploading the same video 5 times across 5 different apps is exhausting." }
    ],
    after: [
      { solution: "Rock-Solid Consistency", detail: "Content goes live at peak engagement hours every single week automatically." },
      { solution: "Batch Once, Relax All Month", detail: "Plan your content in 2 hours and let the automation handle the rest." }
    ],
    howItWorks: [
      { step: "01", title: "Connect Social Accounts", description: "Securely link your brand profiles through official APIs." },
      { step: "02", title: "Establish Posting Calendar", description: "Determine the best posting times and content types for your audience." },
      { step: "03", title: "Queue & Automate", description: "Drop in your posts, review once, and watch them publish seamlessly." }
    ],
    quickStats: [
      { label: "Time Saved", value: "10 hrs/mo" },
      { label: "Posting Consistency", value: "100%" },
      { label: "Supported Platforms", value: "All major" },
      { label: "Setup Time", value: "2 days" }
    ],
    targetAudience: "Brands, creators, and business owners who want an active, reliable social presence without the daily hassle."
  },

  // Website Development
  "custom-website-development": {
    tagline: "A fast, modern website built specifically to convert your visitors into paying customers.",
    simpleSummary:
      "A bespoke, mobile-optimized website engineered around your business goals. It loads in milliseconds, explains what you do with total clarity, and gives customers a clear, easy way to contact or buy from you.",
    whatItDoesForYou: [
      { title: "Custom Tailored Design", description: "No generic clunky templates; designed to elevate your unique brand identity." },
      { title: "Blazing Fast Speed", description: "Loads in under 1 second, keeping Google and mobile visitors happy." },
      { title: "Conversion Engineered", description: "Strategic layout and clear calls-to-action that guide visitors to take action." },
      { title: "Full Mobile Optimization", description: "Flawless experience whether viewed on iPhone, Android, tablet, or desktop." }
    ],
    before: [
      { problem: "Outdated, Slow Site", detail: "Clunky design that looks amateur and loses 60% of visitors due to slow loading." }
    ],
    after: [
      { solution: "Modern & Prestigious", detail: "A site that inspires immediate trust and converts curious browsers into inquiries." }
    ],
    howItWorks: [
      { step: "01", title: "Strategy & Wireframes", description: "We plan the layout, structure, and messaging for maximum clarity." },
      { step: "02", title: "Design & Development", description: "We craft custom visuals and build high-performance code." },
      { step: "03", title: "Testing & Launch", description: "We test responsiveness, speed, and SEO before taking your site live." }
    ],
    quickStats: [
      { label: "Page Load Speed", value: "< 1.2s" },
      { label: "Mobile Score", value: "98/100" },
      { label: "SEO Optimized", value: "Yes" },
      { label: "Delivery Time", value: "2-3 weeks" }
    ],
    targetAudience: "Any business wanting a professional online home that commands respect and drives consistent sales."
  },

  // Custom Software Development
  "billing-software": {
    tagline: "Generate professional invoices, track payments, and get paid faster with zero hassle.",
    simpleSummary:
      "A clean billing system custom-built for your business workflow. Create GST or custom invoices in 15 seconds, send automated WhatsApp/email payment links, and track who owes you money without messy spreadsheets.",
    whatItDoesForYou: [
      { title: "15-Second Invoicing", description: "Pick a client, add items, and generate a branded PDF invoice instantly." },
      { title: "One-Click WhatsApp Sending", description: "Send invoices with payment QR codes directly to your client's WhatsApp." },
      { title: "Automated Payment Chasing", description: "Polite automated payment reminders before and after due dates." },
      { title: "Real-time Revenue Reports", description: "See daily, monthly, and yearly cash collected and outstanding dues at a glance." }
    ],
    before: [
      { problem: "Messy Excel Invoices", detail: "Manual formulas breaking, forgotten invoices, and lost track of unpaid balances." }
    ],
    after: [
      { solution: "Crystal Clear Cashflow", detail: "Know exactly who owes what, send invoices in seconds, and collect payments on time." }
    ],
    howItWorks: [
      { step: "01", title: "Define Invoice Template", description: "Add your logo, tax rules, payment methods, and branding." },
      { step: "02", title: "Setup Database & Clients", description: "Import existing customer list and product/service catalogs." },
      { step: "03", title: "Start Invoicing", description: "Issue invoices from phone or computer in a few clicks." }
    ],
    quickStats: [
      { label: "Invoicing Speed", value: "15 sec" },
      { label: "Overdue Reduction", value: "45%" },
      { label: "GST Compliant", value: "100%" },
      { label: "Platform Access", value: "Web & Mobile" }
    ],
    targetAudience: "Wholesalers, agencies, contractors, retail stores, and service providers who want clean, fast billing."
  },

  // Video Editing & Production Capabilities
  "product-and-explainer-videos": {
    tagline: "Turn complex products and services into clear, compelling videos that convert.",
    simpleSummary:
      "We create clean, engaging product and explainer videos that walk customers through your offering in 60 to 90 seconds. Whether it is a physical product, SaaS platform, or professional service, we make your value proposition immediately obvious.",
    whatItDoesForYou: [
      { title: "Clarifies Complex Offerings", description: "Break down features into simple, digestible visual steps that anyone understands immediately." },
      { title: "Increases Landing Page Conversions", description: "Adding an explainer video typically boosts page conversion rates by 20% to 80%." },
      { title: "Showcases Real Value", description: "Highlights benefits over dry specs so potential buyers understand why to choose you." },
      { title: "Versatile Asset", description: "Use across your website, sales pitches, email campaigns, and client proposals." }
    ],
    before: [
      { problem: "Confusing Text Pages", detail: "Visitors read two sentences of technical text, get overwhelmed, and leave." },
      { problem: "Repeated Demo Calls", detail: "Sales reps spend hours giving basic walkthroughs instead of closing ready buyers." }
    ],
    after: [
      { solution: "Instant Clarity", detail: "A 60-second video answers questions and builds trust before the first conversation." },
      { solution: "Higher Conversion", detail: "Visitors understand what makes your solution special and take action faster." }
    ],
    howItWorks: [
      { step: "01", title: "Script & Storyboard", description: "We outline the customer problem, solution, and clear call-to-action." },
      { step: "02", title: "Visual Production", description: "We record, illustrate, or assemble footage, UI screen captures, and sound." },
      { step: "03", title: "Polish & Deliver", description: "We edit pacing, sound effects, voiceover, and captions for multiple screen formats." }
    ],
    quickStats: [
      { label: "Conversion Lift", value: "+35%" },
      { label: "Ideal Length", value: "60-90 sec" },
      { label: "Audio", value: "Voiceover + SFX" },
      { label: "Turnaround", value: "5-7 days" }
    ],
    targetAudience: "Businesses with digital platforms, innovative hardware, or B2B services looking to explain their value clearly."
  },

  "instagram-reels": {
    tagline: "Hook-driven, high-retention vertical videos crafted to grow your audience on Instagram.",
    simpleSummary:
      "We edit your raw footage into scroll-stopping Instagram Reels with dynamic pacing, on-brand sound design, animated captions, and clear call-to-actions tailored for algorithm reach and customer engagement.",
    whatItDoesForYou: [
      { title: "First 3-Second Hooks", description: "Engineered openings that stop thumbs from scrolling past your brand." },
      { title: "Dynamic Kinetic Captions", description: "High-contrast animated subtitles so viewers watch even with sound muted." },
      { title: "Pacing & Sound Design", description: "Tight edits, sound effects, and trending audio cues that maximize watch time." },
      { title: "Consistent Brand Look", description: "Cohesive color palettes and typography that build long-term brand recall." }
    ],
    before: [
      { problem: "Low Watch Time", detail: "Long boring pauses cause viewers to swipe away after just 2 seconds." },
      { problem: "Silent Swipers Lost", detail: "80% of users browse muted; without dynamic captions, the message is completely lost." }
    ],
    after: [
      { solution: "Algorithm-Friendly Retention", detail: "High completion rates signal Instagram to push your video to non-followers." },
      { solution: "Effortless Social Pipeline", detail: "You record quick clips; we turn them into high-performing, polished reels." }
    ],
    howItWorks: [
      { step: "01", title: "Footage Review", description: "We select the strongest moments, key hooks, and memorable takeaways." },
      { step: "02", title: "Fast-Paced Editing", description: "We trim dead air, insert zooms, b-roll, sound effects, and animated text." },
      { step: "03", title: "Export & Optimization", description: "Rendered in crisp 9:16 vertical resolution ready for immediate publishing." }
    ],
    quickStats: [
      { label: "Hook Retention", value: "85%+" },
      { label: "Format", value: "9:16 Vertical" },
      { label: "Captions", value: "100% Subtitled" },
      { label: "Pacing", value: "High Energy" }
    ],
    targetAudience: "Brands, founders, creators, and local businesses wanting to grow an active, engaged following on Instagram."
  },

  "youtube-intro-and-outro-design": {
    tagline: "Professional, signature intros and end-screens that elevate your YouTube channel brand.",
    simpleSummary:
      "Custom 3-5 second YouTube intros and interactive outros that establish channel authority, increase viewer retention, and prompt subscribers to watch your next video.",
    whatItDoesForYou: [
      { title: "Instant Channel Authority", description: "Clean, punchy intros establish professional credibility in the first seconds." },
      { title: "Binge-Watching Outros", description: "End cards designed with playlist layouts and subscribe prompts that keep viewers on your channel." },
      { title: "Brand Consistency", description: "Matches your channel banner, thumbnails, and color identity seamlessly." },
      { title: "Plug-and-Play Templates", description: "Easy to drop into any video editor for every future upload." }
    ],
    before: [
      { problem: "Long Boring Intros", detail: "15-second intro animations that cause viewers to click off before the video even starts." },
      { problem: "Sudden Drop-offs", detail: "Videos ending abruptly with no guidance on what video the viewer should watch next." }
    ],
    after: [
      { solution: "Punchy 3-Second Sting", detail: "A quick signature badge that reinforces branding without interrupting viewer flow." },
      { solution: "Increased Session Duration", detail: "End screens direct traffic into playlists, boosting total YouTube channel watch time." }
    ],
    howItWorks: [
      { step: "01", title: "Brand Alignment", description: "We study your channel niche, logo, and visual style." },
      { step: "02", title: "Motion & Sound Design", description: "We craft custom animation with synchronized sonic branding." },
      { step: "03", title: "Modular Export", description: "Delivered in transparent or alpha channels ready to overlay into any project." }
    ],
    quickStats: [
      { label: "Intro Length", value: "3-5 sec" },
      { label: "Outro Retention", value: "+40%" },
      { label: "Resolution", value: "4K / 1080p" },
      { label: "Reusability", value: "Unlimited" }
    ],
    targetAudience: "YouTube channels, podcasts, corporate video series, and course creators seeking a cohesive visual identity."
  },

  "promotional-ai-video": {
    tagline: "Cutting-edge AI-generated promotional videos that captivate and drive immediate action.",
    simpleSummary:
      "Leverage generative AI tools and motion design to produce visually stunning promotional videos without the massive cost or delays of traditional commercial film crews.",
    whatItDoesForYou: [
      { title: "Cinematic Visuals on Demand", description: "Generate photorealistic or imaginative visual sequences impossible with standard cameras." },
      { title: "Rapid Turnaround", description: "Go from concept to finished commercial video in days instead of weeks." },
      { title: "Cost-Effective Production", description: "Bypasses actor fees, studio rentals, and expensive location permits." },
      { title: "A/B Testing Variations", description: "Easily produce multiple creative angles to test which messaging drives the most sales." }
    ],
    before: [
      { problem: "Expensive Filming", detail: "Commercial video shoots costing tens of thousands of dollars with rigid production cycles." },
      { problem: "Creative Limitations", detail: "Unable to visualize futuristic, abstract, or dynamic scenes on a practical budget." }
    ],
    after: [
      { solution: "Boundless Creative Freedom", detail: "AI synthesis brings any concept, scenery, or visual metaphor to life." },
      { solution: "High ROI Ad Creative", detail: "Engaging commercial content built rapidly for modern digital campaigns." }
    ],
    howItWorks: [
      { step: "01", title: "Concept & Prompt Engineering", description: "We craft precise storyboards and artistic prompts matching your brand." },
      { step: "02", title: "Generative Rendering", description: "We generate high-resolution video clips with seamless frame consistency." },
      { step: "03", title: "Post-Production Polish", description: "We add voiceover, branding, transitions, sound effects, and typography." }
    ],
    quickStats: [
      { label: "Cost Savings", value: "70%" },
      { label: "Production Speed", value: "3x faster" },
      { label: "Resolution", value: "Ultra HD" },
      { label: "Format Flexibility", value: "16:9 & 9:16" }
    ],
    targetAudience: "Startups, brands, e-commerce stores, and digital marketing teams wanting high-concept video ads."
  },

  "animated-social-media-posts": {
    tagline: "Bring static announcements and graphics to life with eye-catching motion design.",
    simpleSummary:
      "Transform flat graphic posts into fluid animated clips that stand out in crowded feeds, boosting reach, comments, and click-through rates across LinkedIn, Instagram, and Twitter.",
    whatItDoesForYou: [
      { title: "Feeds Stop Scrolling", description: "Movement naturally catches human attention in a sea of static photo posts." },
      { title: "Higher Algorithm Weight", description: "Social platforms prioritize video and animation with higher organic distribution." },
      { title: "Packs More Information", description: "Reveal multi-step value, quotes, and stats sequentially within a single 10-second post." },
      { title: "Seamless Looping", description: "Designed to loop perfectly so viewers watch multiple times unconsciously." }
    ],
    before: [
      { problem: "Static Posts Ignored", detail: "Flat images blend into social feeds and receive declining organic engagement." },
      { problem: "Crowded Text Graphics", detail: "Jamming too much text into a single image makes it unreadable." }
    ],
    after: [
      { solution: "Captivating Motion", detail: "Information unfurls dynamically, making your message engaging and effortless to read." },
      { solution: "2x Higher Engagement", detail: "Animated posts consistently generate more shares, saves, and comments." }
    ],
    howItWorks: [
      { step: "01", title: "Identify Key Messages", description: "Select announcements, statistics, testimonials, or offers." },
      { step: "02", title: "Kinetic Animation", description: "Apply smooth transitions, icon movement, and typography pacing." },
      { step: "03", title: "Platform Delivery", description: "Rendered in optimized MP4 and GIF formats for all major networks." }
    ],
    quickStats: [
      { label: "Engagement Boost", value: "+150%" },
      { label: "Ideal Duration", value: "6-15 sec" },
      { label: "Loop Design", value: "Seamless" },
      { label: "Cross-Platform", value: "100%" }
    ],
    targetAudience: "B2B brands, tech companies, agencies, and e-commerce stores wanting vibrant, modern social channels."
  },

  "product-advertisement-animation": {
    tagline: "High-energy 2D and 3D animated ads designed to showcase product benefits and drive sales.",
    simpleSummary:
      "We craft polished commercial animations highlighting your product's key features, materials, and benefits from every angle—perfect for paid Meta ads, Google ads, and hero banners.",
    whatItDoesForYou: [
      { title: "Showcases Invisible Features", description: "Animate internal mechanisms, software workflows, or physical construction with ease." },
      { title: "Flawless Studio Aesthetic", description: "Perfect lighting, reflection, and motion without physical camera imperfections." },
      { title: "Designed for Conversions", description: "Paced specifically to maintain viewer intrigue and drive clicks to your store." },
      { title: "Adaptable for Global Ads", description: "Easily adjust colors, messaging, or languages for localized marketing campaigns." }
    ],
    before: [
      { problem: "Flat Photography", detail: "Standard product photos struggle to communicate how the product actually solves problems." },
      { problem: "Costly Studio Shoots", detail: "Renting studios, lighting rigs, and props adds massive friction to ad production." }
    ],
    after: [
      { solution: "Immersive Demonstration", detail: "3D animation reveals every premium detail and benefit clearly." },
      { solution: "Scalable Ad Creative", detail: "Generate multiple hook variations from one 3D asset library." }
    ],
    howItWorks: [
      { step: "01", title: "Asset Ingestion", description: "We import your product models, photos, or CAD designs." },
      { step: "02", title: "Lighting & Dynamics", description: "We animate realistic camera fly-throughs, lighting, and explosions." },
      { step: "03", title: "Commercial Compositing", description: "Add motion graphics, sound design, and promotional badges." }
    ],
    quickStats: [
      { label: "Click-Through Rate", value: "+45%" },
      { label: "Ad Formats", value: "1:1, 9:16, 16:9" },
      { label: "Visual Fidelity", value: "Photorealistic" },
      { label: "Commercial Rights", value: "Full ownership" }
    ],
    targetAudience: "Consumer brands, hardware makers, e-commerce sellers, and product companies running paid ad campaigns."
  },

  "brand-logo-reveals": {
    tagline: "Memorable logo animation stings that give every video an unmistakable brand identity.",
    simpleSummary:
      "Cinematic, modern logo reveal animations that reinforce your visual identity at the beginning or end of your marketing videos, presentations, and tutorials.",
    whatItDoesForYou: [
      { title: "Professional Polish", description: "Gives your brand the instant look of a top-tier industry leader." },
      { title: "Multi-Purpose Stinger", description: "Use on video podcasts, commercials, website hero headers, and pitch decks." },
      { title: "Custom Sound Design", description: "Includes audio branding (sound logo/swoosh) that creates subconscious brand recall." },
      { title: "Multiple Lengths & Styles", description: "Delivered in both quick 2-second cuts and dramatic 5-second cinematic versions." }
    ],
    before: [
      { problem: "Static Watermarks", detail: "Placing a flat static logo feels dated and fails to excite modern viewers." },
      { problem: "Generic Stock Templates", detail: "Using overused templates looks cheap and confuses your distinctive identity." }
    ],
    after: [
      { solution: "Unique Brand Story", detail: "Custom motion that reflects your brand personality—sleek, playful, or authoritative." },
      { solution: "Lasting Impression", detail: "A signature reveal that leaves a polished, high-value impression after every video." }
    ],
    howItWorks: [
      { step: "01", title: "Logo Breakdown", description: "We dissect your vector logo into layers and geometry." },
      { step: "02", title: "Motion Choreography", description: "We animate lines, particle physics, shapes, and depth." },
      { step: "03", title: "Audio & Delivery", description: "We master synchronized sound design and export in transparent formats." }
    ],
    quickStats: [
      { label: "Duration", value: "2-5 sec" },
      { label: "Audio", value: "Custom SFX included" },
      { label: "Transparency", value: "Alpha Channel (ProRes/WebM)" },
      { label: "Resolution", value: "4K UHD" }
    ],
    targetAudience: "Any company publishing video content, running digital ads, or delivering high-stakes client presentations."
  },

  "promotional-video-effects": {
    tagline: "Stylized VFX, seamless transitions, and visual polish that give videos a high-budget finish.",
    simpleSummary:
      "From cinematic speed ramps and color grading to screen replacements and motion tracking, we add sophisticated visual effects that transform raw footage into premium video content.",
    whatItDoesForYou: [
      { title: "Elevates Raw Footage", description: "Turns everyday phone or camera clips into high-end cinematic commercials." },
      { title: "Seamless Transitions", description: "Keep viewer attention glued with whip pans, zoom transitions, and mask cuts." },
      { title: "Color Grading & Mood", description: "Professional color balance and LUT grading that establish an upscale filmic look." },
      { title: "Screen & Object Tracking", description: "Clean UI overlays and 3D text tracked into real-world video scenes." }
    ],
    before: [
      { problem: "Dull Raw Footage", detail: "Unedited camera clips look flat, amateurish, and easy to scroll past." },
      { problem: "Jarring Cuts", detail: "Abrupt jump cuts distract the viewer from your core promotional message." }
    ],
    after: [
      { solution: "Hollywood-Grade Polish", detail: "Smooth pacing and visual surprises keep viewer curiosity peaked." },
      { solution: "Premium Brand Perception", detail: "High-end visual effects justify premium pricing for your products and services." }
    ],
    howItWorks: [
      { step: "01", title: "Footage Assessment", description: "We inspect your raw media and map key moments for visual enhancement." },
      { step: "02", title: "VFX & Color Grading", description: "We apply tracking, speed ramps, lighting effects, and color grading." },
      { step: "03", title: "Sound Integration", description: "Every visual effect is paired with deep, punchy Foley sound effects." }
    ],
    quickStats: [
      { label: "Retention Impact", value: "+40%" },
      { label: "Color Grading", value: "Cinematic Rec.709" },
      { label: "Transitions", value: "Bespoke & Seamless" },
      { label: "Turnaround", value: "3-5 days" }
    ],
    targetAudience: "Brands, agencies, and businesses with raw video footage who want a commercial studio finish."
  },

  "animated-typography": {
    tagline: "Dynamic kinetic typography that delivers your message loud and clear with or without sound.",
    simpleSummary:
      "Bold, rhythmic text animations synced to audio or designed for silent autoplay. Ensures your core message lands instantly in mobile social feeds.",
    whatItDoesForYou: [
      { title: "100% Message Delivery", description: "Ensures mobile viewers absorb your value proposition even when sound is off." },
      { title: "Rhythmic Cadence", description: "Paces words to mirror spoken voice or music beats for hypnotic readability." },
      { title: "Emphasizes Key Hooks", description: "Exploding keywords, highlights, and color shifts emphasize critical benefits." },
      { title: "Brand Typographic Purity", description: "Utilizes your official brand fonts with fluid easing and physics." }
    ],
    before: [
      { problem: "Overlooked Voiceovers", detail: "Great voiceovers get completely ignored when users browse with muted phones." },
      { problem: "Boring Static Subtitles", detail: "Small, dull bottom captions that fail to hold fast-moving mobile attention." }
    ],
    after: [
      { solution: "Kinetic Readability", detail: "Animated words pop on screen, creating an engaging and addictive viewing experience." },
      { solution: "Maximum Information Retention", detail: "Viewers remember 65% more information when audio is reinforced by kinetic text." }
    ],
    howItWorks: [
      { step: "01", title: "Transcript & Timing", description: "We transcribe audio and identify punchlines, numbers, and key promises." },
      { step: "02", title: "Kinetic Layout", description: "Design responsive font hierarchies and dynamic entrance animations." },
      { step: "03", title: "Audio Sync & Polish", description: "Micro-sync text reveals to every syllable with subtle sound design." }
    ],
    quickStats: [
      { label: "Muted Comprehension", value: "100%" },
      { label: "Font Customization", value: "Full Brand Match" },
      { label: "Sync Precision", value: "Frame-Accurate" },
      { label: "Format", value: "Square, Vertical, Horizontal" }
    ],
    targetAudience: "Marketers, educators, podcasters, and brands wanting punchy text-driven videos for social media."
  }
};

const slugAliases: Record<string, string> = {
  "lead-follow-up": "lead-follow-up-automation",
  "customer-support-chatbots": "customer-support-automation",
  "post-design": "post-designing",
  "captions-and-copy": "caption-and-copy-creation",
  "content-strategy": "brand-content-strategy",
  "product-videos": "product-and-explainer-videos",
  "instagram-reels": "instagram-reels",
  "reels": "instagram-reels",
  "reels-and-shorts": "instagram-reels",
  "reels-and-shorts-editing": "instagram-reels",
  "youtube-intro-and-outro": "youtube-intro-and-outro-design",
  "youtube-intro-and-outro-design": "youtube-intro-and-outro-design",
  "youtube-and-long-form-editing": "youtube-intro-and-outro-design",
  "promotional-ai-video": "promotional-ai-video",
  "animated-social-media-posts": "animated-social-media-posts",
  "product-advertisement-animation": "product-advertisement-animation",
  "brand-logo-reveals": "brand-logo-reveals",
  "logo-reveals": "brand-logo-reveals",
  "promotional-video-effects": "promotional-video-effects",
  "animated-typography": "animated-typography",
  "video-ads": "product-advertisement-animation",
  "video-ads-and-promotions": "promotional-ai-video",
  "long-form-editing": "youtube-intro-and-outro-design",
  "lead-campaigns": "lead-generation-campaigns",
  "ad-creatives": "image-ads",
  "business-websites": "business-websites",
  "landing-pages": "landing-pages",
  "online-stores": "e-commerce-websites",
  "website-redesign": "website-redesign",
  "billing-and-invoices": "billing-software",
  "inventory-systems": "inventory-management-systems",
  "customer-systems": "customer-management-systems",
  "operations-dashboards": "reporting-dashboards",
  "website-design": "website-ui-ux",
  "app-interfaces": "mobile-app-ui-ux",
  "dashboards": "dashboard-design",
  "product-redesign": "existing-product-redesign"
};

// Generates a comprehensive, high-quality, plain-English breakdown for any capability
export function getCapabilityDetails(serviceSlug: string, itemSlug: string): CapabilityDetail | null {
  const service = serviceBySlug(serviceSlug);
  if (!service) return null;

  const targetSlug = slugAliases[itemSlug] || itemSlug;

  // Find which group contains this item
  let foundItemName: string | null = null;
  let foundGroupTitle: string | null = null;

  for (const group of service.groups) {
    for (const item of group.items) {
      const currentItemSlug = toItemSlug(item);
      if (currentItemSlug === targetSlug || currentItemSlug === itemSlug) {
        foundItemName = item;
        foundGroupTitle = group.title;
        break;
      }
    }
    if (foundItemName) break;
  }

  // If exact item wasn't found in this service, return null
  if (!foundItemName || !foundGroupTitle) return null;

  // Related items in the same group
  const currentGroup = service.groups.find(g => g.title === foundGroupTitle);
  const relatedItems = (currentGroup?.items || [])
    .filter(i => i !== foundItemName)
    .map(i => ({ name: i, slug: toItemSlug(i) }));

  // Check if we have a custom curated profile
  const custom = customCapabilityData[targetSlug] || customCapabilityData[itemSlug];

  // Base fallback that provides clear, plain-language explanation
  const fallbackSummary = `What this service does for you in the simplest way: ${foundItemName} handles the heavy lifting of ${foundGroupTitle.toLowerCase()} for your business. Instead of doing this manually or guessing what works, we set up a proven, straightforward system so your business gets predictable results with minimum effort from your team.`;

  return {
    slug: itemSlug,
    name: foundItemName,
    serviceSlug: service.slug,
    serviceTitle: service.title,
    groupTitle: foundGroupTitle,
    tagline: custom?.tagline || `Clear, reliable ${foundItemName.toLowerCase()} designed to save you time and grow your business.`,
    simpleSummary: custom?.simpleSummary || fallbackSummary,
    whatItDoesForYou: custom?.whatItDoesForYou || [
      {
        title: "Saves Valuable Time",
        description: `Takes repetitive ${foundItemName.toLowerCase()} tasks off your plate so you can focus on core business operations.`
      },
      {
        title: "Consistent & Reliable Results",
        description: `Standardizes the process with a structured system that produces dependable output every single time.`
      },
      {
        title: "Built Around How You Work",
        description: `We shape the setup around your specific products, team workflow, and existing tools—never forcing complicated changes.`
      },
      {
        title: "Measurable Business Value",
        description: `Designed to reduce costs, eliminate errors, and improve customer satisfaction from day one.`
      }
    ],
    before: custom?.before || [
      {
        problem: "Manual and Time-Consuming",
        detail: `Handling ${foundItemName.toLowerCase()} manually eats up hours of your team's day with repetitive work.`
      },
      {
        problem: "Inconsistent Execution",
        detail: "When things get busy, quality dips or steps get missed because there is no standardized system."
      }
    ],
    after: custom?.after || [
      {
        solution: "Streamlined & Effortless",
        detail: `A polished, reliable setup that runs smoothly without needing your constant supervision.`
      },
      {
        solution: "High-Quality Consistency",
        detail: "Every customer touchpoint or internal process is handled promptly, professionally, and accurately."
      }
    ],
    howItWorks: custom?.howItWorks || [
      {
        step: "01",
        title: "Understand Your Needs",
        description: `We review your current ${foundItemName.toLowerCase()} challenge and identify the simplest, most effective approach.`
      },
      {
        step: "02",
        title: "Build & Implement",
        description: "We set up and test the solution, ensuring it works seamlessly with your existing tools and processes."
      },
      {
        step: "03",
        title: "Launch & Support",
        description: "We walk you through everything, take it live, and ensure you have full confidence and support moving forward."
      }
    ],
    quickStats: custom?.quickStats || [
      { label: "Efficiency Gain", value: "3x faster" },
      { label: "Setup Guidance", value: "Included" },
      { label: "Support", value: "Direct" },
      { label: "Complexity For You", value: "Zero" }
    ],
    targetAudience: custom?.targetAudience || `Businesses and teams looking to upgrade their ${foundItemName.toLowerCase()} with a practical, no-stress solution.`,
    relatedItems
  };
}

// Returns all capability paths for static params or sitemaps
export function getAllCapabilityParams(): { slug: string; item: string }[] {
  const params: { slug: string; item: string }[] = [];
  const seen = new Set<string>();

  for (const service of services) {
    for (const group of service.groups) {
      for (const item of group.items) {
        const itemSlug = toItemSlug(item);
        const key = `${service.slug}/${itemSlug}`;
        if (!seen.has(key)) {
          seen.add(key);
          params.push({
            slug: service.slug,
            item: itemSlug
          });
        }
      }
    }

    for (const feat of service.featured) {
      const featSlug = feat.slug || toItemSlug(feat.name);
      const key = `${service.slug}/${featSlug}`;
      if (!seen.has(key)) {
        seen.add(key);
        params.push({
          slug: service.slug,
          item: featSlug
        });
      }
    }
  }

  return params;
}
