# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a post-conference website for the Global Digital Collaboration Conference (GDC25), which took place July 1-2, 2025 in Geneva, Switzerland. The site provides access to conference materials, speaker profiles, session videos, and resources for attendees.

Built by Trust Square Ecosystem AG on behalf of the Swiss Confederation.

## Development Commands

### Essential Commands
```bash
npm install              # Install dependencies
npm run dev             # Start development server (Vite)
npm run build           # Build for production (runs TypeScript compiler + Vite build)
npm run preview         # Preview production build locally
npm run lint            # Run ESLint on TypeScript files
```

### Environment Setup
Copy `.env.example` to `.env` and configure:
- `VITE_SUPABASE_URL` - Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Supabase anonymous key

The application validates these environment variables on startup and will throw clear errors if they're missing or malformed.

## Architecture Overview

### Tech Stack
- **Frontend**: React 18.3 + TypeScript 5.5
- **Build Tool**: Vite 5.4 with HMR (overlay disabled)
- **Routing**: React Router 6.22
- **Styling**: Tailwind CSS 3.4 with custom color palette (primary/secondary/accent)
- **Data Fetching**: React Query 5.24 with Supabase backend
- **Icons**: Lucide React
- **Maps**: Leaflet + React Leaflet

### Project Structure

```
src/
├── components/      # Reusable UI components
├── pages/          # Route-level page components
├── hooks/          # Custom React hooks (data fetching, filters)
├── lib/            # Third-party integrations (Supabase client, database types)
├── utils/          # Utility functions (receipt generator, time slots)
├── App.tsx         # Root component with routing setup
└── main.tsx        # Entry point with QueryClientProvider
```

### Key Architectural Patterns

**Data Fetching with React Query**
- All Supabase queries use React Query hooks located in `src/hooks/`
- Standard pattern: `useQuery` with queryKey, queryFn, and caching config
- Common hooks: `useAgenda()`, `useSpeakers()`, `useHotels()`, `useMeetingRooms()`
- Queries include retry logic (3 attempts) and exponential backoff
- Data freshness: 5 minutes stale time, 30 minutes cache time

**Routing Architecture**
- Client-side routing with React Router v6
- Hash-based scrolling support via `useHashScroll()` hook
- Global modals managed in `App.tsx`: RegistrationModal, AgendaIdeaModal
- 404 handling with catch-all route redirecting to `/404`
- Route resets scroll position to top (unless hash present)

**Supabase Integration**
- Client initialization: `src/lib/supabase.ts`
- Type-safe queries using generated database types (`src/lib/database.types.ts`)
- Row Level Security (RLS) enabled on all tables with public read policies
- Database schema uses junction tables for many-to-many relationships

### Database Schema

**Main Tables:**
- `speakers` - Speaker profiles with social links (JSONB), organization, bio
- `agenda` - Session schedule with day, time, title, format, labels (array)
- `companies` - Organization directory with logos and descriptions
- `hotels` - Accommodation recommendations
- `newsletter_subscriptions` - Email subscriptions with confirmation/unsubscribe tokens
- `meeting_rooms` - Bookable meeting spaces (if enabled)

**Junction Tables:**
- `agenda_speakers` - Links agenda items to speakers (with role: speaker/organizer)
- `agenda_companies` - Links agenda items to companies

**Publishing Pattern:**
All content tables include a `ready_to_publish` boolean flag. Queries filter by `eq('ready_to_publish', true)` to show only published content.

### Component Patterns

**Page Components**
Located in `src/pages/`, these are route-level components:
- `Home.tsx` - Landing page with hero section
- `AgendaPage.tsx` - Full conference schedule with filtering
- `SpeakersPage.tsx` - Speaker directory
- `SessionSlidesPage.tsx` - Links to session materials and videos
- `SessionsOverviewPage.tsx` - Conference session overview
- `FAQPage.tsx` - Frequently asked questions
- Legal pages: `ImprintPage`, `PrivacyPage`, `EventRegistrationTermsPage`

**Filter Hooks**
Complex filtering logic is extracted into custom hooks:
- `useAgendaFilters.ts` - Multi-dimensional filtering for agenda (day, format, labels, search)
- `useMeetingRoomFilters.ts` - Meeting room availability and feature filtering

**Modal Pattern**
Modals use controlled state from parent components (typically `App.tsx`):
- Props: `isOpen`, `onClose`
- Portals for rendering outside main DOM tree
- Overlay click handlers for dismissal

### Styling Conventions

**Custom Tailwind Palette:**
- `primary-500` - Main black (#18181b) - used for text and headers
- `secondary` - Green palette (#10b060) - used for CTAs and accents
- `accent` - Orange palette (#ff8010) - used for highlights

**Typography:**
- Font families: Inter (sans), Montserrat (display)
- Defined in `tailwind.config.js` and applied via font-sans/font-display classes

## Common Development Workflows

### Adding a New Page
1. Create component in `src/pages/[PageName].tsx`
2. Add route in `src/App.tsx` Routes section
3. Update navigation in `src/components/Header.tsx` if needed
4. Import and use existing data fetching hooks from `src/hooks/`

### Working with Supabase Data
1. Update database schema via migrations in `supabase/migrations/`
2. Regenerate types (if using Supabase CLI): `npx supabase gen types typescript --local > src/lib/database.types.ts`
3. Create or update hook in `src/hooks/` using React Query pattern
4. Handle loading/error states in component

### Adding Filters
Follow the pattern in `useAgendaFilters.ts`:
1. Define filter state with useState
2. Implement filter logic in useMemo
3. Return filtered data + filter controls
4. Create filter UI component using returned controls

## Database Migrations

Migrations are stored in `supabase/migrations/` with timestamp-based naming.
Each migration includes:
- Table creation with RLS enabled
- Public read policies (for published content)
- Indexes for performance
- Triggers for `updated_at` timestamp management

Apply migrations automatically when deploying to Supabase or run manually via Supabase CLI.

## Deployment

Automatic deployment to Netlify on push to `main` branch.
Build command: `npm run build`
Publish directory: `dist`

Ensure environment variables are configured in Netlify dashboard.
