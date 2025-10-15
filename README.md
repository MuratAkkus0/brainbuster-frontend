<div align="center">

# 🧠 BrainBuster Frontend

**An Interactive Quiz Application Built with Modern Web Technologies**

[![React](https://img.shields.io/badge/React-19.1.1-61DAFB?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1.7-646CFF?logo=vite)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.13-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![Jest](https://img.shields.io/badge/Jest-30.2.0-C21325?logo=jest)](https://jestjs.io/)

[Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [Testing](#-testing) • [Project Structure](#-project-structure) • [Contributing](#-contributing)

</div>

---

## 📖 About

BrainBuster is a modern, interactive quiz application that provides an engaging learning experience. Users can test their knowledge across multiple categories, track their progress, and compete with themselves to achieve higher scores. The application features a clean, responsive design with real-time feedback and comprehensive admin management tools.

### 🎯 Key Highlights

- 🎮 **Interactive Quiz System** with real-time feedback
- 👤 **User Authentication & Authorization** with JWT
- 📊 **Progress Tracking** with score history and analytics
- 🎨 **Modern UI/UX** with TailwindCSS and Radix UI
- 🔒 **Role-Based Access Control** (User & Admin)
- 📱 **Fully Responsive** design for all devices
- 🧪 **Comprehensive Testing** with Jest and React Testing Library
- ✨ **GDPR Compliant** with privacy policy acceptance

---

## ✨ Features

### For Users

- **🔐 Authentication System**

  - Secure login/register with JWT tokens
  - Password validation with strong requirements
  - Session management with refresh tokens
  - Privacy policy acceptance (GDPR compliant)

- **🎯 Quiz Experience**

  - Multiple categories (Science, History, Geography, etc.)
  - Customizable quiz settings (number of questions, category)
  - Real-time answer feedback
  - Prevention of answer changes after submission
  - Game over dialog with detailed results

- **📊 Profile Dashboard**
  - View personal statistics
  - Track high scores
  - Edit profile information
  - View quiz history

### For Admins

- **👥 User Management**

  - View all users
  - Create/Edit/Delete users
  - Manage user roles
  - Track user activity

- **📝 Question Management**
  - Create new questions (1 correct + 3 incorrect answers)
  - Edit existing questions
  - Delete questions
  - Organize by category and difficulty
  - Filter and search questions

---

## 🛠 Tech Stack

### Core Technologies

| Technology                                    | Version | Purpose     |
| --------------------------------------------- | ------- | ----------- |
| [React](https://reactjs.org/)                 | 19.1.1  | UI Library  |
| [TypeScript](https://www.typescriptlang.org/) | 5.8.3   | Type Safety |
| [Vite](https://vitejs.dev/)                   | 7.1.7   | Build Tool  |
| [TailwindCSS](https://tailwindcss.com/)       | 4.1.13  | Styling     |

### State Management & Routing

| Technology                                              | Version | Purpose             |
| ------------------------------------------------------- | ------- | ------------------- |
| [Redux Toolkit](https://redux-toolkit.js.org/)          | 2.9.0   | State Management    |
| [Redux Persist](https://github.com/rt2zz/redux-persist) | 6.0.0   | State Persistence   |
| [React Router](https://reactrouter.com/)                | 7.9.3   | Client-side Routing |

### UI Components & Styling

| Technology                              | Version | Purpose               |
| --------------------------------------- | ------- | --------------------- |
| [Radix UI](https://www.radix-ui.com/)   | Various | Accessible Components |
| [Lucide React](https://lucide.dev/)     | 0.544.0 | Icon Library          |
| [Recharts](https://recharts.org/)       | 2.15.4  | Data Visualization    |
| [Sonner](https://sonner.emilkowal.ski/) | 2.0.7   | Toast Notifications   |

### Forms & Validation

| Technology                                                          | Version | Purpose           |
| ------------------------------------------------------------------- | ------- | ----------------- |
| [React Hook Form](https://react-hook-form.com/)                     | 7.64.0  | Form Management   |
| [Zod](https://zod.dev/)                                             | 4.1.12  | Schema Validation |
| [@hookform/resolvers](https://github.com/react-hook-form/resolvers) | 5.2.2   | Form Validation   |

### Testing

| Technology                                                 | Version | Purpose            |
| ---------------------------------------------------------- | ------- | ------------------ |
| [Jest](https://jestjs.io/)                                 | 30.2.0  | Testing Framework  |
| [React Testing Library](https://testing-library.com/react) | 16.3.0  | Component Testing  |
| [ts-jest](https://kulshekhar.github.io/ts-jest/)           | 29.4.5  | TypeScript Support |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 18.0.0
- **npm** or **yarn** or **pnpm**

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/davidzus/brainbuster-frontend.git
cd brainbuster-frontend
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure API endpoint**

Create a proxy configuration in `vite.config.ts` or set up environment variables:

```typescript
// vite.config.ts
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8080", // Your backend URL
        changeOrigin: true,
      },
    },
  },
});
```

4. **Start the development server**

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Available Scripts

| Script                    | Description                       |
| ------------------------- | --------------------------------- |
| `npm run dev`             | Start development server with HMR |
| `npm run build`           | Build for production              |
| `npm run preview`         | Preview production build          |
| `npm run lint`            | Run ESLint                        |
| `npm test`                | Run all tests                     |
| `npm run test:watch`      | Run tests in watch mode           |
| `npm run test:coverage`   | Generate test coverage report     |
| `npm run test:functional` | Run functional tests only         |

---

## 🧪 Testing

The project uses Jest and React Testing Library for comprehensive testing.

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage

# Run functional tests only
npm run test:functional
```

### Test Structure

```
src/
├── __tests__/
│   └── functional/          # End-to-end functional tests
│       ├── LoginFlow.test.tsx
│       ├── HeroNavigation.test.tsx
│       └── UserAuthentication.test.tsx
├── components/
│   ├── atoms/__tests__/     # Atomic component tests
│   ├── molecules/__tests__/ # Molecular component tests
│   └── ui/__tests__/        # UI component tests
└── test-utils/              # Testing utilities and helpers
    ├── mockApi.ts           # API mocking utilities
    ├── mockData.ts          # Mock data fixtures
    ├── testConstants.ts     # Test constants
    └── testHelpers.ts       # Reusable test helpers
```

### Test Coverage Goals

| Metric     | Target |
| ---------- | ------ |
| Statements | 70%    |
| Branches   | 70%    |
| Functions  | 70%    |
| Lines      | 70%    |

---

## 📁 Project Structure

```
brainbuster-frontend/
├── public/                  # Static assets
│   └── data/               # JSON data files
├── src/
│   ├── components/         # React components (Atomic Design)
│   │   ├── atoms/         # Basic building blocks
│   │   ├── molecules/     # Combinations of atoms
│   │   ├── organisms/     # Complex components
│   │   └── ui/            # Shadcn UI components
│   ├── hooks/             # Custom React hooks
│   │   ├── admin/         # Admin-specific hooks
│   │   ├── auth/          # Authentication hooks
│   │   └── game/          # Game logic hooks
│   ├── store/             # Redux store configuration
│   │   └── slices/        # Redux slices
│   ├── types/             # TypeScript type definitions
│   │   ├── enums/         # Enums
│   │   └── models/        # Data models
│   ├── views/             # Page-level components
│   ├── schemas/           # Zod validation schemas
│   ├── utils/             # Utility functions
│   ├── __tests__/         # Test files
│   └── test-utils/        # Testing utilities
├── jest.config.ts         # Jest configuration
├── vite.config.ts         # Vite configuration
├── tailwind.config.js     # TailwindCSS configuration
└── tsconfig.json          # TypeScript configuration
```

### Architecture Patterns

- **Atomic Design Pattern**: Components organized by complexity (atoms → molecules → organisms)
- **Custom Hooks Pattern**: Reusable logic extraction
- **Container/Presentational Pattern**: Separation of concerns
- **Feature-based Structure**: Grouped by functionality

---

## 🎨 Design System

### Component Library

Built with [Shadcn UI](https://ui.shadcn.com/) and [Radix UI](https://www.radix-ui.com/) for:

- ✅ Accessibility (WCAG 2.1 compliant)
- ✅ Keyboard navigation
- ✅ Screen reader support
- ✅ Focus management

### Styling

- **TailwindCSS**: Utility-first CSS framework
- **CSS Variables**: Theme customization
- **Responsive Design**: Mobile-first approach
- **Dark Mode**: Theme support (coming soon)

---

## 🔐 Authentication & Authorization

### Authentication Flow

1. **Login**: User provides credentials → Backend validates → JWT tokens returned
2. **Token Storage**: Access token + Refresh token stored in Redux Persist
3. **Protected Routes**: `RequireAuth` wrapper validates tokens
4. **Token Refresh**: Automatic refresh on expiration
5. **Logout**: Tokens cleared, redirect to login

### Authorization Levels

| Role      | Permissions                                     |
| --------- | ----------------------------------------------- |
| **Guest** | View homepage, register, login                  |
| **User**  | Play quizzes, view profile, edit profile        |
| **Admin** | All user permissions + manage users & questions |

---

## 🌐 API Integration

### Endpoints Used

```typescript
// Authentication
POST / api / auth / login;
POST / api / auth / register;
POST / api / auth / logout;

// Users
GET / api / users;
GET / api / users / { id };
PUT / api / users / { id };
DELETE / api / users / { id };
POST / api / users;

// Questions
GET / api / questions;
GET / api / questions / { id };
PUT / api / questions / { id };
DELETE / api / questions / { id };
POST / api / questions;

// Quiz (Single Player)
POST / api / sp / sessions;
POST / api / sp / sessions / { id } / start;
POST / api / sp / sessions / { id } / answer;
GET / api / sp / sessions / { id };
```

### Request/Response Examples

**Login Request:**

```typescript
POST /api/auth/login
Content-Type: application/json

{
  "username": "user123",
  "password": "SecurePass123!@#"
}
```

**Login Response:**

```typescript
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "username": "user123",
    "role": "user",
    "highScore": 850,
    "createdAt": "2024-01-01T00:00:00.000Z"
  },
  "message": "Login successful"
}
```

---

## 🚢 Deployment

### Build for Production

```bash
npm run build
```

This generates optimized static files in the `dist/` directory.

### Deployment Options

- **Vercel** (Recommended)

  ```bash
  vercel deploy
  ```

- **Netlify**

  ```bash
  netlify deploy --prod
  ```

- **Docker** (see `DOCKER.md` if available)

- **GitHub Pages**
  ```bash
  npm run build
  gh-pages -d dist
  ```

---

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Write tests** for new features
5. **Run tests and linting**
   ```bash
   npm test
   npm run lint
   ```
6. **Commit your changes**
   ```bash
   git commit -m "feat: add amazing feature"
   ```
7. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```
8. **Open a Pull Request**

### Commit Message Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add new feature
fix: fix bug
docs: update documentation
style: format code
refactor: refactor code
test: add tests
chore: update dependencies
```

### Code Style

- **TypeScript**: Strict mode enabled
- **ESLint**: Enforce code quality
- **Prettier**: Code formatting (if configured)
- **Naming Conventions**:
  - Components: PascalCase (`UserProfile.tsx`)
  - Hooks: camelCase with 'use' prefix (`useAuth.ts`)
  - Utils: camelCase (`formatDate.ts`)

---

## 📚 Documentation

- [Testing Guide](TESTING.md) - Comprehensive testing documentation
- [API Documentation](docs/API.md) (if available)
- [Component Documentation](docs/COMPONENTS.md) (if available)

---

## 🐛 Troubleshooting

### Common Issues

**Problem**: `npm install` fails

```bash
# Solution: Clear cache and reinstall
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

**Problem**: TypeScript errors

```bash
# Solution: Rebuild TypeScript
npm run build
```

**Problem**: Tests fail

```bash
# Solution: Clear Jest cache
npm test -- --clearCache
npm test
```

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Authors

- **Development Team** - [GitHub Profile](https://github.com/davidzus)

---

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - UI Library
- [Vite](https://vitejs.dev/) - Build Tool
- [TailwindCSS](https://tailwindcss.com/) - CSS Framework
- [Radix UI](https://www.radix-ui.com/) - Component Primitives
- [Shadcn UI](https://ui.shadcn.com/) - Component Library
- All open-source contributors

---

## 📞 Support

If you have any questions or need help, please:

1. Check the [Issues](https://github.com/davidzus/brainbuster-frontend/issues) page
2. Open a new issue with detailed information
3. Contact the development team

---

<div align="center">

**Made with ❤️ by the BrainBuster Team**

⭐ Star this repository if you find it helpful!

</div>
