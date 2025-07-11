# Global Digital Collaboration Conference (GDC25)

## About The Project

The Global Digital Collaboration Conference (GDC25) website serves as the primary platform for the conference taking place on July 1-2, 2025, in Geneva, Switzerland. The conference focuses on fostering wallets, credentials, and trusted infrastructure for the benefit of all humans.

Key features:
- Interactive conference agenda with detailed session information
- Speaker profiles and organization directory
- Venue information and hotel recommendations
- Registration system integration
- Co-organizer application process
- Meeting room booking system with Stripe payments

## Built With

- [React 18.3](https://reactjs.org/) - Frontend framework
- [Vite 5.4](https://vitejs.dev/) - Build tool and development server
- [TypeScript 5.5](https://www.typescriptlang.org/) - Type-safe JavaScript
- [Tailwind CSS 3.4](https://tailwindcss.com/) - Utility-first CSS framework
- [Supabase](https://supabase.com/) - Backend and database
- [React Router 6.22](https://reactrouter.com/) - Client-side routing
- [React Query 5.24](https://tanstack.com/query/latest) - Data fetching and caching
- [Lucide React](https://lucide.dev/) - Icon system
- [Leaflet](https://leafletjs.com/) - Interactive maps
- [Stripe](https://stripe.com/) - Payment processing

## Built by

Trust Square Ecosystem AG on behalf of the Swiss Confederation
- Development Team: Trust Square Engineering
- Contact: info@globaldigitalcollaboration.org

## Getting Started

### Requirements

- Node.js 18.x or higher
- npm 9.x or higher
- Supabase account for database access
- Stripe account for payment processing

### Installation

1. Clone the repository
   ```sh
   git clone https://github.com/your-org/gdc25-website.git
   cd gdc25-website
   ```

2. Install dependencies
   ```sh
   npm install
   ```

3. Set up environment variables
   ```sh
   cp .env.example .env
   ```

4. Update the `.env` file with your credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   RESEND_API_KEY=re_...
   ```

5. Start the development server
   ```sh
   npm run dev
   ```

### Variables Reference

Environment variables required for the project:

**Supabase Configuration:**
- `VITE_SUPABASE_URL`: Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Supabase anonymous key for public access

**Stripe Configuration:**
- `VITE_STRIPE_PUBLISHABLE_KEY`: Stripe publishable key (starts with pk_test_ for test mode)
- `STRIPE_SECRET_KEY`: Stripe secret key (starts with sk_test_ for test mode) - Used in Supabase Edge Functions
- `STRIPE_WEBHOOK_SECRET`: Stripe webhook secret for verifying webhook signatures

**Resend Configuration:**
- `RESEND_API_KEY`: Resend API key for sending emails (starts with re_) - Used in Supabase Edge Functions

### Stripe Setup

1. **Create a Stripe Account**: Sign up at [stripe.com](https://stripe.com)

2. **Get API Keys**: 
   - Go to Developers → API keys in your Stripe dashboard
   - Copy the Publishable key and Secret key
   - For testing, use the test keys (they start with `pk_test_` and `sk_test_`)

3. **Create Products in Stripe**:
   - Go to Products in your Stripe dashboard
   - Create a product called "GC25 Meeting Room"
   - Set the price to 50.00 CHF
   - Copy the Price ID and update `src/stripe-config.ts`

4. **Set up Webhooks**:
   - Go to Developers → Webhooks in your Stripe dashboard
   - Add endpoint: `https://your-supabase-project.supabase.co/functions/v1/stripe-webhook`
   - Select events: `checkout.session.completed`, `payment_intent.succeeded`
   - Copy the webhook secret and add it to your environment variables

5. **Configure Supabase Edge Functions**:
   - The Stripe environment variables need to be set in your Supabase project
   - Go to Project Settings → Edge Functions in your Supabase dashboard
   - Add the `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` environment variables

## Usage

### Development

Start the development server:
```sh
npm run dev
```

Build for production:
```sh
npm run build
```

Preview production build:
```sh
npm run preview
```

### Database Migrations

Database migrations are stored in `/supabase/migrations/` and are automatically applied when deploying to Supabase.

### Payment System

The application includes a meeting room booking system with Stripe integration:

- **Meeting Rooms**: Premium rooms available during conference dates
- **Booking System**: Real-time availability checking and booking creation
- **Payment Processing**: Secure payments through Stripe Checkout
- **Webhook Handling**: Automatic booking confirmation upon successful payment

**Test Mode**: When using test API keys, the system automatically uses test mode with test card numbers.

## Deployment

The website is automatically deployed to Netlify when changes are pushed to the main branch. The deployment process includes:

1. Building the React application
2. Optimizing assets
3. Deploying to Netlify's CDN
4. Automatic SSL certificate provisioning

## Supporting Documentation

### Project Documents

- [Conference Website](https://globaldigitalcollaboration.org)
- [Technical Documentation](https://github.com/your-org/gdc25-website/wiki)

### Domain Knowledge

Key contacts for specific areas:

- Conference Organization: info@globaldigitalcollaboration.org
- Technical Support: tech@globaldigitalcollaboration.org
- Media Inquiries: media@globaldigitalcollaboration.org
- Room Bookings: rooms@globaldigitalcollaboration.org

### Roadmap

Planned features and improvements:

- Enhanced speaker profile management
- Real-time session updates and notifications
- Mobile application
- Integration with virtual conference platforms
- Multi-language support
- Advanced room booking features

### Support

For technical issues:
1. Check the [GitHub Issues](https://github.com/your-org/gdc25-website/issues)
2. Contact technical support at tech@globaldigitalcollaboration.org

For conference-related questions:
- Email: info@globaldigitalcollaboration.org
- LinkedIn: [Global Digital Collaboration Conference](https://www.linkedin.com/company/global-digital-collaboration-event/)

For payment or booking issues:
- Email: rooms@globaldigitalcollaboration.org

## License

MIT License

Copyright (c) 2025 Global Digital Collaboration Conference

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.