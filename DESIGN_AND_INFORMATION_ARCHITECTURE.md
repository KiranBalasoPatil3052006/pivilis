# Pivilis website — information architecture and design notes

## Visitor goal

A business owner should understand what Pivilis does, see a plain-language example relevant to their problem, and send an enquiry without knowing technical terms.

## Page map

| Route | Role | Main content | Next action |
| --- | --- | --- | --- |
| `/` | Explain Pivilis quickly | Offer, seven expandable categories with four examples each, three-step process, origin summary, FAQs | Open a service or contact |
| `/services` | Compare the seven areas | Seven image-led editorial service sections | Open a detail page |
| `/services/[slug]` | Explain each service | Introduction, four common examples, grouped complete capability list | Enquire with service preselected |
| `/about` | Explain purpose | Founding problem and practical way of working | Explore services or contact |
| `/contact` | Receive a real enquiry | Name, email, optional business and service, message | Save enquiry to database |
| `/inbox` | Owner-only review | Latest 100 saved enquiries, with reply-to email | Reply through the owner’s email app |

A Work page is withheld until real projects can be published. No fabricated testimonials, client names, results, fees, response times or contact details appear.

## Seven public service categories

1. AI & Automation
2. Social Media & Content
3. Video Editing & Production
4. Marketing & Advertising
5. Website Development
6. Custom Software Development
7. UI/UX & Product Design

Advertising creative belongs under Marketing & Advertising. Video Editing & Production is its own category. Detailed capabilities live in `lib/services.ts`; the homepage presents only four understandable examples for each category.

## Visual system

- Brand assets: supplied wordmark and icon. Palette uses near-black, warm ivory and vermilion coral from the supplied references. Both themes preserve the same coral and visual hierarchy.
- Responsive content width: 1240px maximum; 24px side inset on larger screens and 20px on phones.
- Main background: warm ivory or near-black. Cards are separated mostly through quiet surface changes and thin rules.
- One primary type family: a clean system sans stack. Display sizes are fluid; body text is at least 16px.
- Original generated images: one tactile abstract hero arrangement and seven distinct service visuals. Each service image appears consistently in its home preview, Services index and detail page.
- Subservice previews use a small index, a name and one plain sentence. The expanded category also includes its own generated image.

## Interaction

- Service categories start closed. Desktop hover or click and mobile tap opens one category at a time. Keyboard buttons expose `aria-expanded`; the closed region is inert. Height animates over 420ms.
- Buttons use a small arrow movement and color response, about 250ms. Cards lift 2–3px on hover.
- The hero eyebrow reveals once in 900ms. A small React Bits inspired typewriter caption sits on the hero image; major information stays static and immediately readable.
- No scroll hijacking, parallax, animated canvas, autoplay motion or content displacement on scroll. Reduced-motion preferences remove transitions and keyframes.
- Mobile menu is a normal navigation region with a visible toggle. Theme choice is saved locally and applies to all routes.

## Enquiries and launch

`POST /api/enquiries` validates required input and persists it in D1. The form reports success only after the database confirms the insert. The source includes a schema migration under `drizzle/`.

The enquiry is stored and can be reviewed at `/inbox`. The inbox requires ChatGPT sign-in and matches the configured owner email on the server; it is not linked in the public navigation. Email alerts are not configured because no verified Pivilis notification address was supplied. Before a public launch, publish a suitable privacy policy and switch access from the initial private review audience.
