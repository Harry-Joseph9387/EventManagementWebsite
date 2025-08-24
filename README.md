# Event Management System (MERN)

A full‑stack Event Management System built with **MongoDB, Express, React, and Node.js** that supports **user** and **admin** roles. Users can discover, like, comment on, and register for events; admins can create/manage events, manage users, and send email notifications.

<p align="center">
  <img src="./docs/demo-hero.png" alt="Event Management System" width="780"/>
</p>

---

## Table of Contents

* [Features](#features)
* [Screens & Pages](#screens--pages)
* [Tech Stack](#tech-stack)
* [Architecture](#architecture)
* [Data Models](#data-models)
* [API Overview](#api-overview)
* [Getting Started](#getting-started)
* [Environment Variables](#environment-variables)
* [Scripts](#scripts)
* [Seeding & Demo Data](#seeding--demo-data)
* [Security](#security)
* [Testing](#testing)
* [Deployment](#deployment)
* [Roadmap](#roadmap)
* [Contributing](#contributing)
* [License](#license)

---

## Features

### User

* **Auth**: Sign up, login, logout (JWT based).
* **Profile**: Create, edit, and view profile.
* **Browse Events**: View upcoming & popular events.
* **Event Interactions**: Like, comment, and **register** for events.
* **Event Detail**: Title, date/time, location, description, organizer.

### Admin

* **Separate login** (predefined credentials possible via seed/env).
* **User Management**: View, edit, block/unblock, or delete users.
* **Event Management**: Create, update, delete, list events; track registrations.
* **Notifications**: Send **email updates** to registered users.

### Global

* **Navbar** on every page with logo and conditional Sign In/Sign Out.
* **Protected routes** based on role.
* **Responsive UI** with accessible components.

---

## Screens & Pages

* **Login / Sign Up**: User registration (name, email, contact, password, T\&C).
* **Home**: Cards/tables for Upcoming & Popular events.
* **Event Details**: Full event info + like, comment, register actions.
* **User Profile**: Edit details; see registrations count.
* **Event List (User View)**: All events with like/comment/register; logout.
* **Admin Dashboard**: Events + registration status, CRUD actions, user management, add event, logout.

---

## Tech Stack

**Frontend**: React, React Router, Context/Redux (choose), Axios, Tailwind/Material UI (choose)

**Backend**: Node.js, Express.js, MongoDB (Mongoose), JSON Web Tokens, Bcrypt

**Email**: Nodemailer (SMTP), or a provider (e.g., SendGrid/Mailgun)

**Tooling**: ESLint, Prettier, Concurrently, Dotenv

> You can swap UI libs or state managers as you prefer.

---

## Architecture

```
root
├── client/              # React app (Vite or CRA)
│   ├── src/
│   │   ├── api/        # Axios clients
│   │   ├── components/ # UI components
│   │   ├── pages/      # Route pages
│   │   ├── hooks/      # Custom hooks
│   │   ├── store/      # Context/Redux
│   │   └── utils/
│   └── ...
├── server/              # Node/Express API
│   ├── src/
│   │   ├── config/     # env, db, mail
│   │   ├── controllers/# route handlers
│   │   ├── middleware/ # auth, error, rate-limit
│   │   ├── models/     # Mongoose schemas
│   │   ├── routes/     # /auth, /users, /events, /admin
│   │   └── utils/      # helpers
│   └── ...
├── .env                 # root (optional)
├── package.json         # workspace root (optional)
└── README.md
```

---

## Data Models

### User

```js
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  contactNumber: String,
  passwordHash: String,
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  isBlocked: { type: Boolean, default: false },
  createdAt: Date,
  updatedAt: Date
}
```

### Event

```js
{
  _id: ObjectId,
  title: String,
  description: String,
  date: Date,     // event date and time
  location: String,
  organizer: String,
  coverImageUrl: String,
  likes: [ObjectId(User)],
  commentsCount: Number,     // denormalized for performance
  registrationsCount: Number,// denormalized
  createdBy: ObjectId(User),
  createdAt: Date,
  updatedAt: Date
}
```

### Comment

```js
{
  _id: ObjectId,
  eventId: ObjectId(Event),
  userId: ObjectId(User),
  text: String,
  createdAt: Date
}
```

### Registration

```js
{
  _id: ObjectId,
  eventId: ObjectId(Event),
  userId: ObjectId(User),
  status: { type: String, enum: ['registered', 'cancelled'], default: 'registered' },
  createdAt: Date
}
```

> You can embed likes array in Event or have a separate Like model if preferred.

---

## API Overview

> Base URL: `http://localhost:5000/api`

### Auth

* `POST /auth/register` — user signup (name, email, contactNumber, password, acceptTerms)
* `POST /auth/login` — login (email, password) → JWT token
* `POST /auth/logout` — (optional, client-side token drop)

### Users

* `GET /users/me` — get current user profile
* `PATCH /users/me` — update profile
* `GET /admin/users` — **admin** list users
* `PATCH /admin/users/:id/block` — **admin** block/unblock user
* `DELETE /admin/users/:id` — **admin** delete user

### Events

* `GET /events` — list events (query: `popular`, `upcoming`)
* `POST /admin/events` — **admin** create event
* `GET /events/:id` — event details
* `PATCH /admin/events/:id` — **admin** update event
* `DELETE /admin/events/:id` — **admin** delete event

### Likes & Comments

* `POST /events/:id/like` — toggle like (auth)
* `GET /events/:id/comments` — list comments
* `POST /events/:id/comments` — add comment (auth)

### Registrations

* `POST /events/:id/register` — register for event (auth)
* `DELETE /events/:id/register` — cancel registration (auth)
* `GET /admin/events/:id/registrations` — **admin** list registrations

### Notifications

* `POST /admin/events/:id/notify` — **admin** send email to registered users

---

## Getting Started

### Prerequisites

* **Node.js** >= 18
* **MongoDB** (local or Atlas)
* SMTP credentials (for email notifications) — optional during dev

### Installation

```bash
# 1) Clone
git clone https://github.com/your-username/event-management-mern.git
cd event-management-mern

# 2) Install dependencies
cd server && npm i && cd ..
cd client && npm i && cd ..

# 3) Configure env (see below)

# 4) Run (two terminals)
cd server && npm run dev
cd client && npm run dev

# or run both from root if using concurrently (see Scripts)
```

---

## Environment Variables

Create a **server/.env**:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/eventms
JWT_SECRET=supersecretjwt
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:5173

# Email (choose one)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your@email.com
SMTP_PASS=app_password
EMAIL_FROM="EventMS <no-reply@eventms.com>"

# Admin seed (optional)
ADMIN_NAME=Admin
ADMIN_EMAIL=admin@eventms.com
ADMIN_PASSWORD=Admin@123
ADMIN_CONTACT=9999999999
```

Create a **client/.env** (Vite example):

```env
VITE_API_BASE=http://localhost:5000/api
```

> For CRA, prefix with `REACT_APP_` instead of `VITE_`.

---

## Scripts

### Server (`server/package.json`)

```json
{
  "scripts": {
    "dev": "nodemon src/index.js",
    "start": "node src/index.js",
    "lint": "eslint .",
    "seed": "node src/scripts/seed.js",
    "test": "jest"
  }
}
```

### Client (`client/package.json`)

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint .",
    "test": "vitest"
  }
}
```

### Optional Root (`package.json`)

```json
{
  "private": true,
  "workspaces": ["server", "client"],
  "scripts": {
    "dev": "concurrently \"npm:dev:*\"",
    "dev:server": "npm --workspace server run dev",
    "dev:client": "npm --workspace client run dev",
    "build": "npm --workspace client run build",
    "start": "npm --workspace server run start"
  },
  "devDependencies": {
    "concurrently": "^9.0.0"
  }
}
```

---

## Seeding & Demo Data

* Configure **server/.env** admin variables.
* Run `npm run seed` inside **server/** to create an admin user and sample events.

---

## Security

* **Passwords** hashed with **bcrypt**.
* **JWT** auth with httpOnly cookies or Authorization header.
* **Input validation** (e.g., Zod/Joi) and centralized **error handling**.
* **Rate limiting** + **helmet** for basic hardening.
* **CORS** restricted to known origins.

---

## Testing

* **Unit** tests for controllers/services.
* **Integration** tests for critical flows (auth, event CRUD, registration).
* Example stack: **Jest** (server) & **Vitest/RTL** (client).

---

## Deployment

### Backend (Render/ Railway/ Heroku-like)

* Set env vars from **server/.env**.
* Deploy `server` folder; make sure to allow incoming from client origin.

### Frontend (Vercel/ Netlify)

* Set `VITE_API_BASE` to deployed API URL.
* Build and deploy `client` folder.

### MongoDB Atlas

* Create a cluster and use `MONGO_URI` connection string.

---

## Roadmap

* [ ] Password reset via email
* [ ] Pagination & search for events
* [ ] Image uploads (S3/Cloudinary)
* [ ] iCal/Google Calendar integration
* [ ] Admin analytics (charts)
* [ ] Real-time updates (WebSockets)

---

## Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit: `git commit -m "feat: add your feature"`
4. Push: `git push origin feat/your-feature`
5. Open a Pull Request

---

## License

This project is licensed under the **MIT License**. See [LICENSE](./LICENSE) for details.

---

### Badges (optional)

<p>
  <img alt="MERN" src="https://img.shields.io/badge/stack-MERN-green" />
  <img alt="License" src="https://img.shields.io/badge/license-MIT-blue" />
  <img alt="Build" src="https://img.shields.io/badge/build-passing-brightgreen" />
</p>

> *Pro tip*: Add screenshots in `/docs` and update the image paths above.
