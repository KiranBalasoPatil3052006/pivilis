# Pivilis motion and interaction specification

The implementation adapts small ideas from the user's reference libraries while keeping the pages readable and light. It does not import a whole effects bundle.

| Interaction | Reference | Pivilis implementation |
| --- | --- | --- |
| Small text typing cue | [React Bits Text Type](https://reactbits.dev/text-animations/text-type) | An optional caption on the homepage hero cycles through familiar service terms. The actual H1 and explanatory paragraph remain static and readable. Reduced motion keeps one phrase. |
| Refined button feedback | [Magic UI animated buttons](https://magicui.design/docs/components) | One short arrow glide and a translucent sweep on primary hover, both handled with CSS transforms. No continuous button animation. |
| One-line accent movement | [Magic UI Border Beam](https://magicui.design/docs/components/border-beam) | A single thin coral line crosses the top edge of the final contact section at a slow interval. It is disabled for reduced motion. |
| Card emphasis | [21st.dev animated cards](https://21st.dev/community/components/explore/animated-components) | Service images scale only 2.5% on hover; card borders respond without large movement. |
| Accordion behavior | [Motion layout and presence concepts](https://motion.dev/docs/react-animate-presence) | Only one service row opens at a time. CSS grid track interpolation coordinates height and content, avoiding a dependency for this small interaction. Hover works on fine pointers; click, touch and keyboard remain available. |
| Scroll accent | [Motion in-view patterns](https://motion.dev/docs/react-use-in-view) | A single IntersectionObserver draws a coral line over process steps and service imagery when visible. Text does not move or wait to appear. |
| Visual restraint | [Aceternity UI component patterns](https://ui.aceternity.com/components) | The design borrows the idea of controlled emphasis but omits shaders, cursor tracking and full-screen effects. |

Service images are original standalone assets generated for each of the seven categories. The same image is reused within the category's home preview, Services index and detail route for recognition; no fictional clients, projects or results are implied by them.

Timing: hover 200–300ms, service expansion 420ms, media crop/scale 650ms, hero caption typewriter roughly 95ms per character, one contact edge sweep every 8s. Image motion and text animation do not gate content. The scroll accent never moves a section or delays its copy. All CSS motion is removed or made static under `prefers-reduced-motion: reduce`.
