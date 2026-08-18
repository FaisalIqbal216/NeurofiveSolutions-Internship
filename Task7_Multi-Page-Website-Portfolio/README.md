# Task 7 — Multi-Page Website: Portfolio with Routing

A personal portfolio with four real pages — Home, About, Projects, Contact — built for the Neurofive Solutions Frontend Web Development internship, Week 4.

## Features
- Four separate HTML files (traditional multi-page structure) with a shared navbar and footer
- Projects page rendered dynamically from a JS data array (`js/projects-data.js`) — every other page is real static HTML
- Contact form with client-side validation (required fields, email format check), inline error messages, and a WhatsApp hand-off on success (no backend required)
- Light/dark theme toggle with an animated icon flip, remembered across visits
- Animated hamburger menu and mobile nav slide, scroll-reveal on content, and a fade-in on every page load
- Fully responsive across mobile, tablet, and desktop

## Tech
Plain HTML5, CSS3, and vanilla JavaScript — no frameworks or libraries.

## Reflection: keeping the navbar/footer consistent
I went with real separate HTML files rather than a JS router, so the navbar and footer markup is genuinely repeated at the top and bottom of each of the four pages — I chose this over a fetch-based include specifically so every page works from a plain file, with no build step or server dependency. What I did centralize is everything that could actually drift out of sync: all four navbars link to `css/style.css` and `js/script.js`, so the look, the theme toggle, the animated hamburger menu, and the active-link styling are controlled from one place each — updating a hover color or the menu animation only ever means editing one file, regardless of how many pages exist. The only page-specific markup difference in each navbar copy is which link carries the `active` class, since that's inherently tied to which page you're on. The one page that's genuinely dynamic is Projects, which pulls from `js/projects-data.js` and loops over the array to build cards, so adding a project means adding one object rather than writing new HTML in four different card blocks.

## Live Demo
https://neurofive-solutions-internship-h4ea.vercel.app
## Video
_1-2 min walkthrough: navigate Home → About → Projects → Contact on desktop, then repeat on a mobile-width view, and show the contact form validation + WhatsApp hand-off._