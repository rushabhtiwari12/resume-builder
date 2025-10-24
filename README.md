# 🧠 Resume Builder — AI-Powered Resume Generator

A modern **MERN stack application** that helps users create, edit, and download **AI-enhanced professional resumes**.  
It provides a smooth, interactive interface for managing multiple resumes and offers AI assistance for writing professional summaries.

---

## 🚀 Features

- **AI-powered content generation** for resume sections (e.g., Professional Summary)
- **Dynamic dashboard** to manage, create, and upload resumes
- **Real-time editing and preview**
- **Downloadable resume templates (PDF)**
- **User authentication (Login/Signup with JWT)**
- **Modern UI with React and Tailwind CSS**
- **Fully responsive design**

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-------------|
| Frontend | React.js, Redux Toolkit, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB |
| Authentication | JSON Web Tokens (JWT) |
| API Client | Axios |
| AI Integration | Custom AI Enhancement Endpoint |

---


resume-builder/
├── client/                   # Frontend React app
│   ├── public/
│   ├── src/
│   │   ├── app/              # Redux and configs
│   │   ├── pages/            # Home, Dashboard, Login, Builder, etc.
│   │   ├── components/       # UI components
│   │   ├── assets/           # Images, logos
│   │   └── App.jsx
│   └── package.json
│
├── server/                   # Backend Express API
│   ├── routes/               # API endpoints
│   ├── controllers/          # Route logic
│   ├── models/               # MongoDB models
│   ├── middleware/           # JWT auth
│   ├── index.js              # Entry point
│   └── package.json
│
├── .gitignore
├── README.md
└── package.json
