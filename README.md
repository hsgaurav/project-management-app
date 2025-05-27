# Project Management App

[![CI/CD Pipeline](https://github.com/hsgaurav/project-management-app/actions/workflows/ci.yml/badge.svg)](https://github.com/hsgaurav/project-management-app/actions/workflows/ci.yml)
[![Deploy to AWS](https://github.com/hsgaurav/project-management-app/actions/workflows/deploy.yml/badge.svg)](https://github.com/hsgaurav/project-management-app/actions/workflows/deploy.yml)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=next.js&logoColor=white)](https://nextjs.org/)
[![tRPC](https://img.shields.io/badge/tRPC-2596BE?style=flat&logo=trpc&logoColor=white)](https://trpc.io/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat&logo=prisma&logoColor=white)](https://prisma.io/)
[![AWS](https://img.shields.io/badge/AWS-232F3E?style=flat&logo=amazon-aws&logoColor=white)](https://aws.amazon.com/)

A comprehensive task management and collaboration platform built with modern web technologies. This application provides teams with powerful tools to organize projects, manage tasks, and collaborate effectively.


## ✨ Features

### 🔐 Authentication & Security
- **Email/Password Authentication** with NextAuth.js
- **Session Management** with secure JWT tokens
- **Protected Routes** with middleware authentication
- **User Profile Management** with preferences

### 📋 Task Management
- **Kanban Board Interface** with drag-and-drop functionality
- **Task Creation & Assignment** with detailed descriptions
- **Priority Levels** (LOW, MEDIUM, HIGH, CRITICAL)
- **Status Tracking** (TODO, IN_PROGRESS, DONE)
- **Due Date Management** with deadline tracking
- **Real-time Updates** with tRPC subscriptions

### 🏢 Project Management
- **Project Creation & Organization** with descriptions
- **Team Member Management** with role-based access (OWNER, ADMIN, MEMBER)
- **Project Statistics** with completion tracking
- **Member Invitations** via email
- **Project Deletion** with confirmation safeguards
- **Project Details View** with comprehensive analytics

### 👥 Team Collaboration
- **Role-Based Permissions** (Owner, Admin, Member)
- **Member Management** (add/remove team members)
- **Project Access Control** with security validation
- **Team Overview** with member statistics

### 🎨 Modern UI/UX
- **Responsive Design** optimized for all devices
- **Clean Interface** with Tailwind CSS styling
- **Interactive Components** with smooth animations
- **Loading States** and error handling
- **Modal System** for seamless user interactions

## 🛠 Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **tRPC** - End-to-end typesafe APIs
- **React Hook Form** - Form management with validation
- **Lucide React** - Modern icon library

### Backend
- **tRPC** - Type-safe API layer
- **Prisma** - Database ORM with type safety
- **NextAuth.js** - Authentication framework
- **Zod** - Schema validation
- **PostgreSQL** - Production database

### Infrastructure & Deployment
- **Vercel** - Frontend deployment and hosting
- **Supabase** - Database hosting and management
- **Docker** - Local development environment
- **GitHub Actions** - CI/CD pipeline

### Development Tools
- **ESLint** - Code linting and quality
- **Prettier** - Code formatting
- **Husky** - Git hooks for code quality
- **TypeScript Strict Mode** - Enhanced type checking

## 🏗 Architecture

```
├── src/
│   ├── components/          # React components
│   │   └── dashboard/       # Dashboard-specific components
│   │
│   ├── pages/              # Next.js pages and API routes
│   │   └── api/            # API endpoints
│   │
│   ├── server/             # Server-side logic
│   │   └── api/            # tRPC routers and procedures
│   │
│   ├── styles/             # Global styles and Tailwind config
│   │
│   └── utils/              # Utility functions and helpers
│
├── prisma/                 # Database schema and migrations
└── public/                 # Static assets
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm/pnpm
- PostgreSQL database (or Supabase account)
- Git

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd project-management-app
```

2. **Install dependencies**
```bash
npm install
# or
pnpm install
```

3. **Environment Setup**
```bash
cp .env.example .env.local
```

Configure your environment variables:
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/project_management_dev"
DIRECT_URL="postgresql://username:password@localhost:5432/project_management_dev"

# NextAuth Configuration
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Optional: Additional configurations
NODE_ENV="development"
```

4. **Database Setup**
```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma db push

# Seed the database with demo data
npx prisma db seed
```

5. **Start Development Server**
```bash
npm run dev
# or
pnpm dev
```

Visit `http://localhost:3000` to see the application.

## 🗄 Database Schema

### Core Tables
- **User** - User accounts and authentication
- **Project** - Project information and metadata
- **ProjectMember** - Project team memberships with roles
- **Task** - Individual tasks with assignments and status
- **Account** - NextAuth account linking

### Key Relationships
- Users can be members of multiple projects
- Projects contain multiple tasks and team members
- Tasks are assigned to users within project context
- Role-based permissions control access levels

## 🧪 Testing

### Running Tests
```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Test Coverage
- Component rendering and interactions
- API endpoint functionality
- Authentication flows
- Database operations
- Form validation

## 🚀 CI/CD Pipeline

The project includes a comprehensive CI/CD pipeline using GitHub Actions with two main workflows:

### 🔄 CI Pipeline (`ci.yml`)
**Triggers:** Push/PR to `main` or `develop` branches

**Pipeline Steps:**
- ✅ **Code Quality Checks**
  - TypeScript type checking
  - ESLint code linting
  - Prettier formatting validation
- 🧪 **Testing**
  - Unit and integration tests
  - Test coverage reporting
- 🏗️ **Build Verification**
  - Production build validation
  - Bundle analysis and optimization

### 🚀 Deployment Pipeline (`deploy.yml`)
**Triggers:** Successful CI pipeline on `main`/`develop` branches

**Infrastructure Deployment:**
- 🏗️ **Terraform Infrastructure**
  - AWS resource provisioning
  - Environment-specific configurations
  - Parameter Store management
- 📦 **Application Deployment**
  - SST (Serverless Stack) deployment
  - Environment variable injection
  - Production optimizations

**Environment Strategy:**
- `main` branch → **Production** environment
- `develop` branch → **Development** environment

## 📦 Deployment

### Production Build
```bash
# Build the application
npm run build

# Start production server
npm run start
```

### Environment Variables (Production)
Ensure all environment variables are configured in your production environment:
- Database connection strings
- NextAuth configuration
- API keys and secrets
- AWS credentials for deployment

## 🔧 Development

### Code Quality
```bash
# Lint code
npm run lint

# Format code
npm run format

# Type checking
npm run type-check
```

### Database Management
```bash
# View database in Prisma Studio
npx prisma studio

# Reset database
npx prisma migrate reset

# Deploy migrations
npx prisma migrate deploy
```

## 📝 API Documentation

The application uses tRPC for type-safe API communication. Key routers include:

### Authentication Router
- User registration and login
- Session management
- Profile updates

### Project Router
- Project CRUD operations
- Team member management
- Project statistics

### Task Router
- Task creation and updates
- Assignment management
- Status tracking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [T3 Stack](https://create.t3.gg/) for the excellent development foundation
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [tRPC](https://trpc.io/) for type-safe API development
- [Prisma](https://prisma.io/) for the powerful database toolkit
- [NextAuth.js](https://next-auth.js.org/) for authentication solutions
