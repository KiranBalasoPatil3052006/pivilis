PIVILIS PRELOADER
=================
index.html is fully self-contained (CSS, JS and images are embedded). Just open it.

Use on your site:
  1. Copy the three marked blocks (PRELOADER · STYLES / MARKUP / SCRIPT) into your page:
     styles in <head>, markup right after <body>, script at the end of <body>.
  2. Delete the demo "Welcome to Pivilis" block.

Timeline (6 s):
  0.0-0.8s  logo fades in        | 0.95-1.6s  orange accent grows in the P
  2.7-3.5s  orange dot flies in and arcs over the text
  3.5-4.2s  dot lands on the 4th letter, bounces and settles (always fully visible)
  5.0-6.0s  logo zooms slightly and fades out, then the page is revealed.
  If the page is still loading at 5.0s, the finished logo holds until "load" fires.
The final state matches assets/originals/target-final-frame.png.

Customise: --pv-bg and --pv-orange (top of the <style>), logo size (.pv-logo width).
JS: PivilisPreloader.replay(); event "pivilis:preloader-done" fires when finished.
