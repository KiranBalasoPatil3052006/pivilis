import Link from "next/link";
import Image from "next/image";

export interface AIAutomationCardItem {
  id: string;
  title: string;
  slug: string;
  image: string;
  alt: string;
}

export const aiAutomationCards: AIAutomationCardItem[] = [
  {
    id: "whatsapp-automation",
    title: "WhatsApp Automation",
    slug: "whatsapp-automation",
    image: "/images/ai-automation/whatsapp-automation.png",
    alt: "3D illustration of phone displaying WhatsApp icon and chat messages",
  },
  {
    id: "business-process-automation",
    title: "Business Process Automation",
    slug: "business-process-automation",
    image: "/images/ai-automation/business-process-automation.png",
    alt: "3D illustration of interconnected business workflow nodes with gear cog",
  },
  {
    id: "customer-support-automation",
    title: "Customer Support Automation",
    slug: "customer-support-automation",
    image: "/images/ai-automation/customer-support-automation.png",
    alt: "3D illustration of customer support headset and speech bubble with dots",
  },
  {
    id: "crm-automation",
    title: "CRM Automation",
    slug: "crm-automation",
    image: "/images/ai-automation/crm-automation.png",
    alt: "3D illustration of CRM user profile dashboard card with ascending bar chart",
  },
  {
    id: "ai-chatbots",
    title: "AI Chatbots",
    slug: "ai-chatbots",
    image: "/images/ai-automation/ai-chatbots.png",
    alt: "3D illustration of friendly white AI robot head with glowing coral eyes",
  },
  {
    id: "workflow-automation",
    title: "Workflow Automation",
    slug: "workflow-automation",
    image: "/images/ai-automation/workflow-automation.png",
    alt: "3D illustration of layered task cards connected with flow arrows",
  },
  {
    id: "website-chatbots",
    title: "Website Chatbots",
    slug: "website-chatbots",
    image: "/images/ai-automation/website-chatbots.png",
    alt: "3D illustration of browser window with circular paper plane chat button",
  },
  {
    id: "email-automation",
    title: "Email Automation",
    slug: "email-automation",
    image: "/images/ai-automation/email-automation.png",
    alt: "3D illustration of open envelope with letter and coral notification badge",
  },
  {
    id: "appointment-and-reminder-automation",
    title: "Appointment & Reminder Automation",
    slug: "appointment-and-reminder-automation",
    image: "/images/ai-automation/appointment-and-reminder-automation.png",
    alt: "3D illustration of desk calendar with orange analog clock reminder",
  },
  {
    id: "youtube-automation",
    title: "YouTube Automation",
    slug: "youtube-automation",
    image: "/images/ai-automation/youtube-automation.png",
    alt: "3D illustration of video player interface with play button and timeline",
  },
  {
    id: "custom-ai-solutions",
    title: "Custom AI Solutions",
    slug: "custom-ai-solutions",
    image: "/images/ai-automation/custom-ai-solutions.png",
    alt: "3D illustration of isometric modular cubes with glowing orange glass cube",
  },
];

function CoralRightArrow({ className = "w-4 h-4 sm:w-5 sm:h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

export function AIAutomationServicesGrid() {
  return (
    <section
      className="ai-services-grid-section relative w-full py-8 sm:py-12 md:py-16 bg-[#fbf9f5]"
      data-nav-theme="light"
      aria-label="AI and Automation Services"
    >
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-4 md:gap-5 lg:gap-6 w-full">
          {aiAutomationCards.map((card) => (
            <Link
              key={card.id}
              href={`/services/ai-automation/${card.slug}`}
              className="group relative flex flex-col justify-between bg-[#fdfbf7] hover:bg-white border border-[#eae5de] hover:border-[#dfd7cc] rounded-2xl sm:rounded-[22px] lg:rounded-3xl p-3 sm:p-5 lg:p-6 transition-all duration-300 hover:shadow-[0_16px_36px_-10px_rgba(0,0,0,0.06)] hover:-translate-y-1 overflow-hidden"
            >
              {/* Top 3D Claymorphic Artwork Area */}
              <div className="relative w-full aspect-[16/11] flex items-center justify-center mb-2.5 sm:mb-4 overflow-hidden rounded-xl bg-transparent">
                <Image
                  src={card.image}
                  alt={card.alt}
                  width={640}
                  height={390}
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  loading="lazy"
                  className="w-full h-full object-contain transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                />
              </div>

              {/* Bottom Title and Coral Arrow */}
              <div className="mt-auto flex items-end justify-between gap-2 pt-1 sm:pt-2">
                <h3 className="text-[13px] sm:text-[15px] lg:text-[16.5px] font-semibold text-[#181818] tracking-tight leading-[1.2] sm:leading-[1.25] group-hover:text-black transition-colors">
                  {card.title}
                </h3>
                <span className="text-[#fa3822] shrink-0 mb-0.5" aria-hidden="true">
                  <CoralRightArrow className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 transition-transform duration-300 ease-out group-hover:translate-x-1.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
