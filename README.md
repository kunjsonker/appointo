

<!-- <div align="center">
  <img src="./frontend/src/assets/logo.svg" alt="Appointo Logo" width="200" /> -->

  # 🩺 Appointo
  **The Complete MERN Stack Doctor Appointment Ecosystem**

  [![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
  ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
  ![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
  ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
  ![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

  ---

  [Explore App](#-key-features) •
  [Tech Stack](#-tech-stack) •
  [Installation](#-quick-start) •
  [Project Structure](#-project-structure)

</div>

## 📖 Overview
Appointo is a robust healthcare management platform designed to connect patients with medical specialists seamlessly. It handles everything from real-time scheduling and medical profiles to administrative oversight and secure payments.

---

## ✨ Key Features

### 🏥 For Patients
- **Smart Search**: Filter doctors by specialty like *General Physician, Dermatologist, Pediatrician*, and more.
- **Instant Booking**: Real-time availability slots with automated confirmation.
- **Secure Payments**: Integration with **Stripe** and **Razorpay** for hassle-free billing.
- **Medical Dashboard**: Track upcoming appointments and manage your health profile.

### 💼 For Administrators
- **Onboarding**: Add new doctors, verify credentials, and manage specialty lists.
- **Analytics**: High-level overview of total clinic appointments and earnings.
- **Access Control**: Secure login to manage the entire platform's database.

### 🩺 For Doctors
- **Personalized Panel**: View daily schedules and mark appointments as completed.
- **Earnings Report**: Transparent view of consultation fees and historical data.
- **Profile Customization**: Update bio, availability, and consultation charges.

---

## 🛠 Tech Stack

| Frontend | Backend | Database/Tools |
| :--- | :--- | :--- |
| **React 18** (Vite) | **Node.js** | **MongoDB Atlas** |
| **Tailwind CSS** | **Express.js** | **Cloudinary** (Images) |
| **Context API** | **JWT Auth** | **Bcrypt** (Security) |
| **React Router** | **Multer** | **Axios** |

---

## 🚀 Quick Start

### 1. Clone the repository
```bash
git clone [https://github.com/kunjsonker/appointo.git](https://github.com/kunjsonker/appointo.git)
cd appointo

2. Configure Environment Variables

Create a .env file in the /backend folder:

Code snippet
MONGODB_URI=your_mongodb_uri
CLOUDINARY_NAME=your_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_SECRET_KEY=your_secret
JWT_SECRET=super_secret_key
ADMIN_EMAIL=admin@appointo.com
ADMIN_PASSWORD=admin_password
STRIPE_SECRET_KEY=your_stripe_key
RAZORPAY_KEY_ID=your_razorpay_id
RAZORPAY_KEY_SECRET=your_razorpay_secret
3. Run the Application

You will need 3 terminal windows to run the full ecosystem:

Terminal 1: Server

Bash
cd backend && npm install && npm run server
Terminal 2: User Frontend

Bash
cd frontend && npm install && npm run dev
Terminal 3: Admin Dashboard

Bash
cd admin && npm install && npm run dev
📂 Project Structure
Plaintext
appointo/
├── admin/          # Admin & Doctor Dashboard (React)
├── backend/        # Express API, Models, and Middlewares
│   ├── config/     # Database & Cloudinary setup
│   ├── controllers/# Route handlers
│   └── routes/     # API Endpoints
├── frontend/       # Patient-facing web application
└── README.md
🤝 Contributing
Contributions make the open-source community an amazing place to learn and create.

Fork the Project

Create your Feature Branch (git checkout -b feature/AmazingFeature)

Commit your Changes (git commit -m 'Add some AmazingFeature')

Push to the Branch (git push origin feature/AmazingFeature)

Open a Pull Request

📄 License
Distributed under the MIT License. See LICENSE for more information.

<div align="center"> <br /> Made with ❤️ by <a href="https://www.google.com/search?q=https://github.com/kunjsonker">Kunj Sonker</a> </div>
