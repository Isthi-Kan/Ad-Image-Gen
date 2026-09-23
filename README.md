# 🚀 AI Ad Image Generator

<p align="center">
  <strong>An AI-powered SaaS platform for generating commercial advertisement images and cinematic marketing videos from product and model photos.</strong>
</p>

<p align="center">
  Built with React, Express, Prisma, PostgreSQL, Google Gemini, FLUX.1, and Google Veo.
</p>

---

## ✨ Overview

AI Ad Image Generator is a modern full-stack SaaS application that enables users to create professional advertising content using Generative AI.

Users simply upload:

- 📦 A product image
- 👤 A model photograph

The platform intelligently analyzes both images, creates a highly detailed commercial prompt, generates a realistic advertising photo, and optionally converts it into a cinematic marketing video.

The application also includes authentication, a credits system, subscription-ready architecture, cloud storage, and a public community gallery.

---

# 🎯 Features

### 👤 Authentication
- Secure authentication using **Clerk**
- User registration & login
- Protected routes
- Session management

### 💳 Credits System
- Free credits for new users
- Automatic credit deduction
  - 🖼️ Image Generation → **5 Credits**
  - 🎥 Video Generation → **10 Credits**
- Automatic refund when generation fails

### 🤖 AI Generation Pipeline

#### Image Analysis
- Google **Gemini 2.5 Flash**
- Understands:
  - Product
  - Human model
  - Lighting
  - Composition
  - Style

#### AI Image Generation
- **FLUX.1-schnell**
- Generates:
  - Studio-quality
  - Commercial-grade
  - Photorealistic advertisements

#### AI Video Generation
- **Google Veo 3.1**
- Converts generated images into:
  - Cinematic advertisements
  - High-quality promotional videos

### ☁️ Cloud Storage
- Cloudinary
- Secure image hosting
- Fast CDN delivery

### 🗄️ Database
- PostgreSQL
- Prisma ORM

### 🌍 Community Gallery
- Publish creations
- Browse public advertisements
- Inspire other creators

### 📈 Monitoring
- Sentry integration
- Error tracking
- Backend monitoring

---

# ⚡ AI Workflow

```text
User Uploads
      │
      ▼
Product Image + Model Image
      │
      ▼
Gemini 2.5 Flash
(Image Analysis)
      │
      ▼
Prompt Engineering
      │
      ▼
FLUX.1-schnell
(Image Generation)
      │
      ▼
Commercial Advertisement Image


 
```

---

# 🛠 Tech Stack

## Frontend

| Technology | Purpose |
|------------|---------|
| React + TypeScript | Frontend Framework |
| Vite | Build Tool |
| Tailwind CSS v4 | Styling |
| React Router v7 | Routing |
| Framer Motion | Animations |
| Lenis | Smooth Scrolling |
| Axios | API Requests |
| React Hot Toast | Notifications |
| Lucide React | Icons |
| Clerk React SDK | Authentication |

---

## Backend

| Technology | Purpose |
|------------|---------|
| Node.js | Runtime |
| Express.js | API Server |
| TypeScript | Development |
| Prisma ORM | Database ORM |
| PostgreSQL | Database |
| Multer | File Upload |
| Cloudinary | Media Storage |
| Google GenAI SDK | Gemini & Veo APIs |
| Hugging Face API | FLUX.1 Integration |
| Sentry | Monitoring |

---

# 🧠 AI Models Used

| Model | Purpose |
|--------|---------|
| Gemini 2.5 Flash | Image Analysis & Prompt Generation |
| FLUX.1-schnell | Advertisement Image Generation |

---

# 📁 Project Structure

```text
AI-Ad-Image-Generator
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── configs/
│   │   ├── context/
│   │   ├── pages/
│   │   └── App.tsx
│   │
│   └── package.json
│
├── server/
│   ├── configs/
│   ├── controllers/
│   ├── middlewares/
│   ├── prisma/
│   ├── routes/
│   ├── server.ts
│   └── package.json
│
└── README.md
```

---

# 📸 Core Features

- ✅ AI Advertisement Image Generation
- ✅ AI Cinematic Video Generation
- ✅ Authentication
- ✅ Credit-Based System
- ✅ Community Gallery
- ✅ Cloud Storage
- ✅ Prisma ORM
- ✅ PostgreSQL Database
- ✅ Error Monitoring with Sentry

---

# 🔒 Security

- Clerk Authentication
- Protected API Routes
- Secure File Uploads
- Environment Variable Protection
- Credit Validation
- Error Logging

---

# 📜 License

This project uses the template license located at:

```
client/LICENSE.txt
```

---

# 👨‍💻 Developed With

- React
- TypeScript
- Express
- Prisma
- PostgreSQL
- Google Gemini
- FLUX.1
- Google Veo
- Cloudinary
- Clerk
- Tailwind CSS
- Sentry


