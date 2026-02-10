# Normah Frontend

A production-ready Next.js application for Normah - Responsible AI Governance Infrastructure.

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **UI Library**: Material UI (MUI)
- **State Management**: Redux Toolkit
- **HTTP Client**: Axios with interceptors
- **Form Handling**: React Hook Form
- **Styling**: Emotion (CSS-in-JS)

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/
│   ├── ui/                # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── Modal.tsx
│   ├── layout/            # Layout components
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── sections/          # Page sections
│   │   ├── HeroSection.tsx
│   │   ├── WhyMattersSection.tsx
│   │   ├── GovernanceBrainSection.tsx
│   │   ├── CentralCommandSection.tsx
│   │   ├── OrganizationsTodaySection.tsx
│   │   ├── UsefulResourcesSection.tsx
│   │   ├── FounderMessageSection.tsx
│   │   └── Launching2026Section.tsx
│   ├── modals/            # Modal components
│   │   ├── WaitlistModal.tsx
│   │   └── PartnerModal.tsx
│   └── pages/             # Page components
│       └── HomePage.tsx
├── store/                 # Redux store
│   ├── store.ts          # Store configuration
│   ├── hooks.ts          # Typed hooks
│   ├── ReduxProvider.tsx # Redux provider
│   └── slices/           # Redux slices
│       ├── modalSlice.ts
│       ├── waitlistSlice.ts
│       └── partnerSlice.ts
└── services/             # API services
    └── api.ts            # Axios configuration
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
NEXT_PUBLIC_ENV=development
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features

- ✅ Single-page application with all sections
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Redux state management
- ✅ Axios API service with interceptors
- ✅ Form handling with validation
- ✅ Modal dialogs for waitlist and partner forms
- ✅ Production-ready code structure
- ✅ TypeScript for type safety
- ✅ Material UI components
- ✅ Environment variable support

## Environment Variables

Create a `.env.local` file with the following variables:

- `NEXT_PUBLIC_API_BASE_URL`: Base URL for API requests
- `NEXT_PUBLIC_ENV`: Environment (development/production)

## Build for Production

```bash
npm run build
npm start
```

## Code Standards

- TypeScript strict mode enabled
- ESLint configured
- Consistent file structure
- Reusable components
- Proper error handling
- Responsive design patterns

## License

All Rights Reserved - An Future Shift Labs Product
