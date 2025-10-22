# Critical Resource Locator - Smart Ambulance & Emergency Response System

**Team Paradox | IOTRIXHACK 2025**

## 🚑 Overview

Critical Resource Locator is an AI-powered emergency response platform that revolutionizes ambulance dispatch and medical emergency management. The system integrates real-time GPS tracking, intelligent ambulance allocation, hospital coordination, and community support features.

## ✨ Features

### Core Features (Implemented)
- ✅ **AI-Based Ambulance Allocation** - Nearest available ambulance assignment
- ✅ **Real-Time GPS Monitoring** - Live tracking with ETA updates
- ✅ **Hospital Integration Dashboard** - Pre-arrival notifications for hospitals
- ✅ **Emergency Contact Notification** - Automatic family alerts
- ✅ **E-Medical Library** - First-aid guides and emergency tips
- ✅ **Community Support Network** - Blood requests and resource sharing
- ✅ **User Authentication** - Secure login with role-based access
- ✅ **Responsive Design** - Works on all devices

### System Architecture
- **Frontend**: React + TypeScript + Vite
- **Backend**: Lovable Cloud (Supabase)
- **Database**: PostgreSQL with Row Level Security
- **Maps**: Leaflet for real-time tracking
- **Styling**: Tailwind CSS with custom design system

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm installed ([install with nvm](https://github.com/nvm-sh/nvm))
- Git for version control

### Installation Steps

1. **Clone the repository**
```bash
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

The application will open at `http://localhost:8080`

## 📖 How to Use

### For Patients
1. **Sign Up**: Create account at `/auth` with email and password
2. **Login**: Access your dashboard
3. **Request Ambulance**: Click "Request Ambulance" for emergency
4. **Track**: Monitor ambulance location in real-time
5. **Medical Library**: Access first-aid guides anytime

### For Drivers
1. Login with driver credentials
2. View assigned emergency requests
3. Follow AI-optimized routes
4. Update ambulance status

### For Hospital Staff
1. Login to hospital dashboard
2. View incoming emergency requests
3. Prepare medical teams based on patient condition
4. Track ambulance ETA

## 🗄️ Database Schema

### Main Tables
- **profiles** - User information and contacts
- **user_roles** - Role-based access control (admin, patient, driver, hospital_staff)
- **hospitals** - Hospital locations and capacities
- **ambulances** - Vehicle tracking and status
- **emergency_requests** - Active emergency cases
- **medical_articles** - First-aid content library
- **community_posts** - User support network posts

## 🔐 Security Features

- Row Level Security (RLS) policies on all tables
- Secure authentication with email verification
- Role-based access control
- Protected API endpoints
- Encrypted sensitive data

## 🎨 Design System

The application uses a custom emergency-themed design system:
- **Primary**: Emergency red (#DC2626)
- **Secondary**: Medical blue (#0EA5E9)
- **Accent**: Success green (#16A34A)
- **Custom gradients** for hero sections
- **Responsive** design for mobile-first approach

## 📱 Pages & Routes

- `/` - Landing page with features
- `/auth` - Login and signup
- `/dashboard` - User dashboard
- `/hospitals` - Hospital directory (coming soon)
- `/medical-library` - Medical guides (coming soon)
- `/community` - Support network (coming soon)

## 🔧 Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run typecheck    # Check TypeScript types
```

### Environment Variables
Environment variables are auto-configured by Lovable Cloud:
- `VITE_SUPABASE_URL` - Backend API endpoint
- `VITE_SUPABASE_PUBLISHABLE_KEY` - Public API key

## 🌐 Deployment

### Deploy with Lovable
1. Open project in [Lovable](https://lovable.dev/projects/8b30e321-0fee-442d-a211-d86acb3a4645)
2. Click **Share → Publish**
3. Your app is live!

### Custom Domain
1. Navigate to Project > Settings > Domains
2. Click "Connect Domain"
3. Follow DNS configuration steps

## 👥 Team Paradox

- **Dikshit** - Team Lead (24315A6902)
- **Akshaya** - Developer
- **Pavani** - Developer
- **Srihitha** - Developer
- **Amarnath** - Developer

## 🏆 IOTRIXHACK 2025

Domain: Healthcare  
Problem Statement: Critical Resource Locator

## 📄 License

This project was created for IOTRIXHACK 2025 competition.

## 🆘 Support

For issues or questions:
- Check the [Lovable documentation](https://docs.lovable.dev/)
- View backend data via the Cloud tab
- Contact team members

---

**Built with ❤️ by Team Paradox**  
*Every Second Saves Lives*
