# Event Management Website 🎉

A full-stack event management platform built using the **MERN** stack, allowing users to create, register for, and interact with events.

## 🚀 Features

### Users:
- View, like, comment, and register for events after logging in.
- Create, edit, and read their profile page.

### Admin:
- Manage users (delete/block access).
- Separate login for admin access.
- List, create, update, and delete events.
- Track event registrations.
- Send email notifications about event updates.

## 📌 Functional Requirements

### 🔑 Authentication
- Users and admin can log in with their credentials.
- Admin credentials are predefined.

### 📝 Registration
- Users sign up with:
  - Name
  - Email ID
  - Contact number
  - Password
  - Terms and conditions agreement

### 🎟️ Event Management
- Display event lists with details.
- Create, read, update, and delete events.
- Register for events.
- Like and comment on events.

### 📩 Notifications
- Admin can send email notifications to users about event updates.

## 🖥️ Pages Required

### 1️⃣ Login/Sign Up
- **Sign Up Page for Users**: Collects personal details and agreement.
- **Login Page**: Redirects to the home page upon successful login.

### 2️⃣ Home Page
- Displays upcoming and popular events (card or table format).
- Events are clickable and redirect to a single event details page.

### 3️⃣ Event Details Page
- Displays title, date, time, location, description, and organizer.

### 4️⃣ User Profile Page
- Users can update profile details.
- Displays registered events.

### 5️⃣ Event List Page (User View)
- View all listed events.
- Like and comment on events.
- Register for events.
- Logout button.

### 6️⃣ Admin Dashboard
- Lists all events and their registration status.
- Admin can create, update, or delete events.
- View and manage user profiles.
- Logout button.

## 🔧 Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Token)
- **Styling**: CSS/Bootstrap
- **Email Notifications**: Nodemailer

## 📌 Installation and Setup

1. **Clone the repository**
   ```sh
   git clone https://github.com/your-username/event-management-mern.git
   cd event-management-mern
