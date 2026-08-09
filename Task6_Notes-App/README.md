# Task 6 — Forms & Local Storage: Notes App ("Inkwell")

A notes app where nothing is lost on refresh. Built for the Neurofive Solutions Frontend Web Development internship, Week 3.

## Features
- Create, edit, delete, and search notes
- Inline form validation — empty title/content is rejected with an error message next to the field, plus a screen-reader announcement
- All notes persist in `localStorage`, so a page refresh never loses your work
- Every note shows a "last edited" timestamp
- Accessible delete confirmation (inline Yes/No, no browser alert)
- Light/dark theme toggle (remembers your choice, respects system preference on first visit)
- Fully responsive, keyboard-navigable, and built with semantic HTML5

## Tech
Plain HTML5, CSS3, and vanilla JavaScript — no frameworks or libraries.

## Reflection: structuring the localStorage data
I store all notes as a single JSON array under one key (`inkwell:notes`), rather than one key per note — this keeps reads and writes to a single `getItem`/`setItem` call, which is simpler than managing a growing list of keys. Each note is an object with `id`, `title`, `content`, `createdAt`, and `updatedAt` fields; the `id` comes from `crypto.randomUUID()` so notes can be found and updated reliably even after reordering. On load I `JSON.parse` the stored array inside a `try/catch` and fall back to an empty array if the value is missing or corrupted, so a bad localStorage entry can't crash the app. Every create, update, or delete mutates the in-memory `notes` array first and then immediately re-serializes the whole array back to storage, which keeps the UI and localStorage from ever drifting out of sync.

## Live Demo
_Add the Vercel link here after deploying this folder as its own project._

## Video
_1-2 min walkthrough: create a note, refresh the page to show it persists, edit a note, search, delete a note, toggle theme._