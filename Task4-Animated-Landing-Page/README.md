# Task 4 — Animated Landing Page (faisal.dev)

Week 2 · Frontend Web Development · Neurofive Solutions Internship

A single-page personal/portfolio landing page built to practice CSS transitions,
`@keyframes` animation, and scroll-triggered reveals with the Intersection
Observer API.

**Live demo:** _(https://neurofive-solutions-internship-e649.vercel.app/)_
**Video walkthrough:** _add your LinkedIn video link here_

## What's on the page

- **Hero** — animated entrance (staggered fade/slide-up text), floating
  background shapes, floating info cards, and a cursor-following glow effect
- **Featured Work** — cards for the FYP Management System, AI Voice Ordering &
  Support Agent, and Smart Email Responder Agent
- **Process** — a 3-step "how we'd work together" section
- **Contact** — WhatsApp and LinkedIn CTAs, plus a floating WhatsApp button
- **Light / dark theme toggle** in the navbar

## Animation checklist (task requirements)

| Requirement | Where |
|---|---|
| CSS transitions on hover | Buttons, nav links, feature cards, floating cards, theme toggle |
| `@keyframes` animation | Floating background shapes, floating hero cards, hero ring pulse/spin, WhatsApp button pulse |
| Scroll-triggered reveal (Intersection Observer) | Section headers, feature cards, and steps fade/slide in as you scroll (`initScrollReveal()` in `script.js`) |
| Extra polish | Animated stat counters, cursor-following glow in the hero, light/dark theme toggle, sticky navbar blur-on-scroll |

## When animation helps vs. when it distracts

Animation works best when it explains something — like the scroll reveal
showing the page has more to offer, or a hover state confirming a button is
clickable. It becomes distracting when it moves without a reason, repeats too
fast, or gets in the way of reading the actual content. I kept the background
shapes slow and subtle so they don't compete with the text, and I made sure
`prefers-reduced-motion` turns everything off for people who need that.

## Tech stack

Plain HTML, CSS (custom properties for theming), and vanilla JavaScript — no
frameworks. Fonts: Space Grotesk (headings) + Inter (body). Icons: Font Awesome.

## Contact form

The form at the bottom of the Contact section doesn't send anywhere on its
own — it builds a pre-filled WhatsApp message from the name/email/phone/
message fields and opens `wa.me` with it, so the visitor just has to hit
send. The number lives in one place: `WHATSAPP_NUMBER` at the top of the
contact-form section in `script.js`.

## Before deploying

1. Update the GitHub links on the project cards if you want them pointing to
   the individual project repos instead of your profile.
2. Deploy this folder as its own Vercel project (Root Directory =
   `Task4_Animated-Landing-Page`), same as Task 1–2.

## Files

```
Task4_Animated-Landing-Page/
├── index.html
├── style.css
├── script.js
└── README.md
```
