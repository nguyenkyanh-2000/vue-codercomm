# CoderComm - Vue 3 Edition

A social media application built with Vue 3, TypeScript, Pinia, and shadcn-vue.

## Tech Stack

- **Framework**: Vue 3 with Composition API
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn-vue (radix-vue)
- **State Management**: Pinia
- **Routing**: Vue Router
- **Form Validation**: VeeValidate + Yup
- **HTTP Client**: Axios
- **Icons**: Lucide Vue Next
- **Build Tool**: Vite

## Features

- User authentication (login/register)
- Create and view posts
- React to posts with emojis
- Comment on posts
- Real-time updates
- Responsive design

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd vue-codercomm
```

2. Install dependencies

```bash
npm install
```

3. Start the development server

```bash
npm run dev
```

4. Start the API server (in a separate terminal)

```bash
cd ../codercomm-server
npm install
npm start
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── ui/             # shadcn-vue UI components
│   ├── layout/         # Layout components
│   ├── posts/          # Post-related components
│   └── comments/       # Comment-related components
├── layouts/            # Page layouts
├── pages/              # Page components
├── stores/             # Pinia stores
├── lib/                # Utilities and configurations
├── types/              # TypeScript type definitions
└── router/             # Vue Router configuration
```

## API

The application uses a mock API server that provides endpoints for:

- Authentication (`/auth/login`, `/auth/register`)
- User management (`/users/me`)
- Posts (`/posts`)
- Comments (`/posts/:id/comments`)
- Reactions (`/reactions`)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request
