# 🎯 ContestHub – Contest Creation Platform

🔗 **Live Website:** https://your-live-site-link.com  
🔗 **Client Repository:** https://github.com/your-client-repo  
🔗 **Server Repository:** https://github.com/your-server-repo  

ContestHub is a modern, full-stack contest management platform where users can explore, create, participate in, and manage creative contests such as design, writing, development, gaming, and more.  
The platform supports role-based access (Admin, Contest Creator, Normal User), secure authentication, payment integration, and responsive dashboards.

---

## 🚀 Key Features

- 🔐 Secure authentication with **Firebase Auth (Email/Password & Google Sign-in)**
- 👥 Role-based access control: **Admin, Contest Creator, Normal User**
- 🏠 Beautiful and responsive **Home Page** with search and popular contests
- 🔍 Backend-powered contest search by contest type
- 🏆 **Popular Contests** sorted by highest participation
- 💳 Secure contest registration using **Stripe payment gateway**
- 🧾 Users can submit contest tasks after successful payment
- 🎉 Contest creators can **declare winners** after deadline
- 📊 User dashboard with:
  - Participated contests
  - Winning contests
  - Profile update & win percentage chart
- 🧑‍💼 Creator dashboard to:
  - Add contests
  - Edit/Delete pending contests
  - View submissions & declare winner
- 🛠️ Admin dashboard to:
  - Manage users & roles
  - Approve, reject, or delete contests
- 🏆 Dynamic **Leaderboard** ranked by number of contest wins
- 🌗 **Dark / Light theme toggle** (saved in localStorage)
- ⚡ All data fetching handled by **TanStack Query**
- 🔔 SweetAlert & Toast notifications for all CRUD actions
- 📱 Fully responsive design (Mobile, Tablet & Desktop)
- 🔒 JWT-protected APIs for all private & sensitive routes
- 🚫 No Lorem Ipsum text used anywhere
- ❌ Custom 404 Not Found page

---

## 🧑‍Roles & Permissions

### 👤 Normal User
- Browse and search contests
- Register contests after payment
- Submit contest tasks
- View participated & won contests
- Update profile information

### ✍️ Contest Creator
- Add new contests
- Edit/Delete contests (only before admin approval)
- View participant submissions
- Declare contest winners after deadline

### 🛡️ Admin
- Manage all users
- Change user roles
- Approve, reject, or delete contests
- Maintain overall platform integrity

---

## 🛠️ Technologies Used

### Frontend
- React
- React Router
- TanStack Query
- Axios
- Firebase Authentication
- React Hook Form
- Chart.js / Recharts
- Tailwind CSS / DaisyUI
- SweetAlert2

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Stripe Payment Integration
- Firebase Admin SDK

---

## 🔐 Security & Best Practices

- Environment variables used to hide Firebase & MongoDB secrets
- JWT used on all private APIs
- Role-based route protection
- Clean, modular, and maintainable code structure
- Meaningful Git commits (Client: 20+, Server: 12+)

---

## 📦 Deployment

- **Client:** Firebase Hosting / Vercel
- **Server:** Vercel
- **Database:** MongoDB Atlas

---

## 🔑 Admin Credentials (For Testing)

- Admin Email: admin@email.com
- Admin Password: 1536842

### Creator Account
- Email: creator@email.com  
- Password: 1536842

---

## 🎯 Final Note

This project was built as a complete production-ready full-stack application following real-world best practices.  
ContestHub demonstrates strong skills in React, Node.js, MongoDB, authentication, payments, role-based systems, and deployment.

✨ Thank you for checking out NEXTCHAMP!
