<div align="center">
  <br />
    <a href="./public/meet.jpeg" target="_blank">
      <img src="./public/meet.jpeg" alt="MeetAi — AI-Powered Meeting Assistant" />
    </a>
  <br />

  <div>
    <img src="https://img.shields.io/badge/-Next.js_15-black?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js 15" />
    <img src="https://img.shields.io/badge/-TypeScript-black?style=for-the-badge&logo=typescript&logoColor=3178C6" alt="TypeScript" />
    <img src="https://img.shields.io/badge/-tRPC-black?style=for-the-badge&logo=trpc&logoColor=2596BE" alt="tRPC" />
    <img src="https://img.shields.io/badge/-PostgreSQL-black?style=for-the-badge&logo=postgresql&logoColor=336791" alt="PostgreSQL" />
    <img src="https://img.shields.io/badge/-Drizzle_ORM-black?style=for-the-badge&logo=drizzle&logoColor=fff" alt="Drizzle ORM" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logo=tailwindcss&logoColor=06B6D4" alt="Tailwind CSS" />
  </div>

  <h3 align="center">MeetAi — AI-Powered Meeting Assistant Platform</h3>
  <p align="center">
    A modern AI-driven meeting platform built with Next.js 15 for scheduling, automation, and real-time collaboration.
  </p>
</div>

---

## ✨ Overview

**MeetAi** is an AI-powered meeting assistant platform built on **Next.js 15 (App Router)**.  
It helps teams with:

- 📅 Smart meeting scheduling  
- 🤖 AI-driven assistance & automation  
- 🧠 Context-aware workflows using tRPC & Drizzle ORM  
- 🔄 Real-time collaboration (optional Stream integration)

---

## 🚨 Tech Stack

| Category      | Technology                                   |
|--------------|-----------------------------------------------|
| Framework    | **Next.js 15 (App Router)**                  |
| Language     | **TypeScript**                               |
| API Layer    | **tRPC**, TanStack Query                     |
| Database     | **PostgreSQL**, **Drizzle ORM**              |
| UI           | **Radix UI**, **Tailwind CSS**               |
| Charts       | **Recharts**                                 |
| Date Handling| **React Day Picker**                         |
| Realtime     | **Stream API** (optional)                    |

---

## <a name="features">🔋 Core Features</a>

👉 **AI-Powered Meeting Assistance**  
Auto-summarization, agenda support, and context-aware meeting flows (powered by OpenAI API).

👉 **Smart Scheduling & Automation**  
Meeting modules for booking, rescheduling, and handling availability.

👉 **Typed End-to-End**  
tRPC + TypeScript + Drizzle ORM = fully typed stack from DB to UI.

👉 **Modular Architecture**  
Feature-based modules under `src/modules/*` (meetings, agents, auth, etc.).

👉 **Modern UI/UX**  
Radix primitives + Tailwind CSS for accessible, polished components.

👉 **Analytics-Ready**  
Recharts for visualizing meeting metrics, productivity, and usage.

---

## <a name="quick-start">🤸 Quick Start</a>

Follow these steps to run **MeetAi** locally.

### ✅ Prerequisites

Make sure you have:

- [Node.js 18+](https://nodejs.org/)
- Package manager: **npm** / **pnpm** / **yarn**
- [PostgreSQL](https://www.postgresql.org/) (or another Drizzle-supported DB)

### 📥 Clone the Repository

```bash
git clone https://github.com/your-username/meetai.git
cd meetai
````

### 📦 Install Dependencies

```bash
npm install
# or
pnpm install
# or
yarn
```

### 🔐 Environment Variables

Create a `.env` file in the project root:

```ini
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Database connection
DATABASE_URL=postgresql://user:password@host:port/dbname

# AI & Realtime keys (if used)
OPENAI_API_KEY=sk-...
STREAM_API_KEY=...
```

> 💡 Keep secrets **out of version control**. Commit a `.env.example` instead.

### 🚀 Start Dev Server

```bash
npm run dev
```

App will be available at: **[http://localhost:3000](http://localhost:3000)**

---

## 🧰 Available Scripts

| Script       | Description                        |
| ------------ | ---------------------------------- |
| `dev`        | Start Next.js dev server           |
| `build`      | Create production build            |
| `start`      | Run production server              |
| `lint`       | Run ESLint                         |
| `db:push`    | Push Drizzle migrations to DB      |
| `db:studio`  | Open Drizzle Studio                |
| `db:webhook` | Start ngrok for DB/webhook testing |

Run any script like:

```bash
npm run dev
```

---

## 📁 Project Structure

```bash
src/
 ├─ app/              # Next.js routes (App Router)
 ├─ components/       # Shared UI components
 ├─ modules/          # Feature modules (meetings, agents, auth, etc.)
 │   ├─ meetings/
 │   ├─ agents/
 │   └─ auth/
 ├─ trpc/             # tRPC routers & client
 ├─ db/               # Drizzle schema & queries
public/               # Static assets (icons, images, etc.)
```

> 🧩 Place **server-only** logic under: `src/modules/*/server`

---

## 🧠 SSR & Hydration Notes

To avoid hydration mismatches, **don’t** use non-deterministic values during SSR:

❌ Avoid on the server:

* `Math.random()`
* `Date.now()`
* `toLocaleString()`
* Direct `window.*` access

✅ Use instead:

* `useEffect()` for client-only behavior
* `Intl.DateTimeFormat()` for deterministic formatting

Example of a safe client-only check:

```ts
if (typeof window !== 'undefined') {
  // safe to access window, localStorage, etc.
}
```

---

## 🛠️ Developer Tips

* Ensure **`NEXT_PUBLIC_APP_URL`** is correct for both **local** and **production**.
* Keep API keys (`OPENAI_API_KEY`, `STREAM_API_KEY`) **server-side only**.
* Use `npm run db:studio` to visually inspect the database.
* Group business logic inside `src/modules/*` rather than scattering it in pages/components.

---

## 🧩 Troubleshooting

### 🔄 Hydration Mismatch

* Move non-deterministic logic into `useEffect`.
* Ensure that server and client render the same initial markup.

### 🗄 Database Errors

* Check `DATABASE_URL` in `.env`.
* Verify:

  * Host / port
  * Username & password
  * Network / firewall rules

### 📡 tRPC Request Issues

* Confirm base URLs match your environment (`localhost`, Vercel, Railway, etc.).
* Make sure `NEXT_PUBLIC_APP_URL` is set correctly in both dev & prod.

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repo & create a feature branch.
2. Follow existing coding style & folder structure.
3. Use **semantic commits** (`feat:`, `fix:`, `chore:`, `refactor:`).
4. Run:

```bash
npm run lint
```

before submitting a PR.

---

## 📌 Optional Add-ons (Planned / Available)

This repo can be extended with:

* `.env.example` template
* System architecture diagram
* Database schema diagram (Drizzle-based)
* API flow overview (tRPC → service layer → DB)
* Deployment guides for:

  * Vercel
  * Docker
  * Railway / Fly.io

---

> 🧡 If you use **MeetAi** or build on top of it, consider starring the repo and sharing your feedback!

