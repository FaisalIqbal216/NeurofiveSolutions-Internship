/* ==========================================================================
   Project data — only projects.html reads this (task requirement: Projects
   page must render from a JS array, not hardcoded HTML per project).
   Every other page's content is real static HTML, not JS-generated.

   liveUrl / githubUrl: leave as null until you have the real link — the
   card only shows a button when a URL is actually set, so nothing fake
   gets shown.
   ========================================================================== */

const PROJECTS = [
  {
    title: 'MindVault AI',
    description:
      'Full-stack AI knowledge assistant built with React, Node.js, Express, MongoDB, and Groq LLM. Features persistent AI conversations, JWT-based authentication, user chat management, file upload foundation, and a role-based admin dashboard for user monitoring and system management. Designed with a scalable architecture for future RAG-based document intelligence and knowledge retrieval.',
    tags: ['React', 'Node.js', 'MongoDB', 'Groq LLM'],
    categories: ['Web', 'AI'],
    liveUrl: null,
    githubUrl: 'https://github.com/FaisalIqbal216/mindvault-ai',
  },
  {
    title: 'FYP Management System',
    description:
      'Full-stack role-based platform (Admin/Supervisor/Student) with secure JWT + bcrypt authentication and dedicated dashboards per role. Backend built with Express & Mongoose with a seeded admin system and a React/Vite frontend with protected routing.',
    tags: ['MERN', 'MongoDB Atlas', 'JWT', 'RBAC'],
    categories: ['Web'],
    liveUrl: null,
    githubUrl: 'https://github.com/FaisalIqbal216/FYP-Management-System',
  },
  {
    title: 'AI Voice Ordering Agent',
    description:
      'Voice-based ordering assistant powered by a web-scraping pipeline feeding a Supabase vector database with Gemini embeddings. Connected an MCP Server Trigger with a Vapi.ai inbound voice assistant for real-time conversational order handling.',
    tags: ['n8n', 'Vapi.ai', 'Supabase', 'Groq'],
    categories: ['AI'],
    liveUrl: null,
    githubUrl: null,
  },
  {
    title: 'Smart Email Responder',
    description:
      'Automated email classification and reply drafting using dual Gmail triggers and an LLM-based text classifier. Configured Google OAuth2 integration for secure, automated auto-reply and draft-generation workflows.',
    tags: ['n8n', 'Llama 3.3 70B', 'Gmail API', 'OAuth2'],
    categories: ['AI'],
    liveUrl: null,
    githubUrl: 'https://github.com/FaisalIqbal216/Smart-Email-Responder-Agent',
  },
  {
    title: 'Student Task Manager',
    description:
      'Cross-platform (mobile & web) academic workload tracker with centralized Redux state, offline persistence, and a Vercel-hosted web build. Features a minimalist Soft UI with custom color tokens and priority-tag based task classification.',
    tags: ['React Native', 'Expo', 'Redux Toolkit', 'Vercel'],
    categories: ['Mobile', 'Web'],
    liveUrl: null,
    githubUrl: 'https://github.com/FaisalIqbal216/Student_Task_Manager_App',
  },
];