# Flare

Eco-friendly trip planning app that compares transport options and shows how many calories you can burn on your journey.
Project submission for [Vercel x Equinox v0 Workshop](https://cerebralvalley.ai/e/vercel-x-equinox-v0-workshop)

## Features

- Google Places Autocomplete for origin and destination selection
- Real distance calculation using Google Distance Matrix API
- Calorie burn estimates for different transport modes (walking, biking, driving, etc.)
- Personalized calculations based on user weight
- Responsive design with dark mode support

## Getting Started

### Prerequisites

- Node.js 18+
- Google Cloud Platform account with the following APIs enabled:
  - Maps JavaScript API
  - Places API
  - Distance Matrix API

### Setup

1. Clone the repository

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file with your Google Maps API key:
   ```
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000)

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- @vis.gl/react-google-maps
- Radix UI components
- Sonner (toast notifications)

## License

MIT
