# Pricing Section - Flexbox vs CSS Grid

Week 1 2nd task for the Frontend Web Development internship at Neurofive Solutions. The same 3-column pricing layout (header, 3 pricing cards, footer) built twice — once with Flexbox and once with CSS Grid — to compare how each one handles the same layout.

## What's inside

- `index.html` - both versions, one after the other
- `style.css` - all the styling, including both layout approaches

## Features

- Header + 3-column pricing cards + footer, built twice
- One version uses `display: flex`, the other uses `display: grid`
- Both stack into a single column below 600px using a media query
- "Pro" plan is highlighted as the featured option in both versions

## Flexbox vs Grid - what I noticed

Flexbox was quicker to set up for this layout since it's a simple row of 3 equal cards — `display: flex` with `flex: 1` on each card did the job right away. But it was really built for one direction (row), so it felt more like I was "convincing" it to act like a grid.

Grid felt more natural for this use case because a pricing section is basically a grid to begin with — rows and columns. `grid-template-columns: repeat(3, 1fr)` gave me equal columns in one line, and I didn't need `flex: 1` on every card since Grid already handles that.

For the responsive part, both were equally easy — Flexbox just needed `flex-direction: column` and Grid needed `grid-template-columns: 1fr` inside the media query.

Overall: Flexbox felt easier for something quick and simple, Grid felt more "correct" for a structured layout like this one. For a real project I'd probably reach for Grid here since it's literally a grid of cards, but Flexbox is great when the layout doesn't need that much structure.

## Author

**Faisal Iqbal**
BSIET Student, Foundation University Islamabad