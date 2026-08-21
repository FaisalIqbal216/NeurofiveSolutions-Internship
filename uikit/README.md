# Task 8 — Component Thinking: Reusable UI Kit with Vanilla JavaScript

A small reusable UI component library built for the Neurofive Solutions Frontend Web Development internship, Week 5.

The project focuses on understanding component-based architecture without using any framework. Instead of writing repeated UI code, reusable JavaScript functions were created that accept props and generate UI dynamically — similar to how components work in React.

## Features

- Four reusable vanilla JavaScript components: Button, Card, Modal, and Toast notification.

- Component-based structure using ES Modules, with each component separated into its own file inside the `components` folder.

- Button component supporting multiple props including text, variants, sizes, icons, loading state, disabled state, and click handlers.

- Card component supporting dynamic content such as title, description, images, badges, variants, and reusable footer actions using the Button component.

- Fully functional Modal component with open/close methods, Escape key support, overlay click closing, focus trapping, and focus restoration.

- Toast notification system with multiple notification types, auto-dismiss timers, manual closing, progress indicator, hover pause, and stacked notifications.

- Demo page showcasing multiple uses of the same components with different props and configurations.

- Custom design system using CSS variables for consistent spacing, colors, typography, shadows, and component styling.

- Responsive layout with light/dark theme support and accessible interactions using semantic HTML and ARIA attributes.

## Tech

Plain HTML5, CSS3, and vanilla JavaScript using ES Modules — no frameworks or external UI libraries.

## Project Structure

```text
uikit/

├── index.html                 # Component showcase page

├── css/

│   └── style.css              # Design system and component styles

├── js/

│   ├── app.js                 # Demo implementation using reusable components

│   └── components/

│       ├── Button.js          # createButton()

│       ├── Card.js            # createCard()

│       ├── Modal.js            # createModal()

│       └── Toast.js            # toast notification system

└── README.md
```

## Reflection: How "Component Thinking" Changed My Code

Before this task, my approach was mostly page-focused, where UI elements and their behavior were written directly inside the page code. Thinking in components changed my structure by making me focus on what each element needs as input and how it can be reused in different situations.

Instead of creating separate buttons or cards every time, I created reusable functions that accept props and generate the required UI dynamically. This made the code easier to maintain because each component manages its own structure, styling connection, and behavior independently.

This approach helped me understand the same principles used in modern frameworks like React, where components are built once and reused with different data.

## Live Demo

https://neurofive-solutions-internship-vh2e.vercel.app/

## Video

1-2 min walkthrough:
- Demonstrate the Button component with different variants and states.
- Create multiple Cards with different props.
- Show Modal opening and closing behavior.
- Demonstrate Toast notifications including stacking and auto-dismiss functionality.

Built for **Neurofive Solutions Frontend Web Development Internship**