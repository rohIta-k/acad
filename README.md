# BrandForge

**AI-powered creative ad generation platform that automates brand asset creation and video generation using Groq and Runway ML APIs.**

BrandForge helps creators and small businesses generate professional advertising content by automating the creation of mascots, analyzing brand identity, and generating marketing videos.

## Features

- 🎨 **Brand Identity Setup** - Define your brand with name, logo, mascot, color palette, tone, and audience targeting
- 🤖 **AI Mascot Generation** - Automatically generate brand mascots using Runway ML API
- 📸 **Smart Asset Management** - Upload and organize brand logos, mascots, and reference images
- 🎬 **Video Generation** - Create AI-generated marketing videos with Runway ML
- 💾 **Brand Library** - Store and manage multiple brand profiles
- 📊 **Generation History** - Track and view all previously generated content
- 🔐 **User Authentication** - Secure login with Google OAuth via Supabase
- 📱 **Responsive Design** - Beautiful, modern UI with glass morphism effects

## Tech Stack

### Frontend
- **React 18** - UI framework
- **Vite 8** - Build tool and dev server
- **Tailwind CSS 3** - Utility-first styling
- **React Router** - Client-side routing
- **Supabase** - Authentication and storage
- **Lucide React** - Icon library
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express 5** - Web framework
- **Groq SDK** - LLM API for creative prompting
- **Runway ML SDK** - AI model API for mascot/video generation
- **Supabase** - PostgreSQL database and file storage
- **dotenv** - Environment variable management
- **CORS** - Cross-origin request handling

### Database & Storage
- **Supabase PostgreSQL** - User data and brand information
- **Supabase Storage** - Brand asset files (logos, mascots, images)

## Prerequisites

- Node.js 18 or newer
- npm
- Supabase account (for database and auth)
- Runway ML API key
- Groq API key
- Google OAuth credentials (for authentication)

## Setup & Installation

### 1. Clone & Navigate

```bash
git clone <repository-url>
cd Runway-API-Hackathon
```

### 2. Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file in the `Backend/` folder with:
```
PORT=5000
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
RUNWAY_API_KEY=your_runway_api_key
GROQ_API_KEY=your_groq_api_key
```

**Set up the database schema:**
1. Go to your Supabase project dashboard
2. Navigate to the **SQL Editor**
3. Run the SQL files from `Backend/sql/` folder in this order:
   - `brands_schema.sql` - Create brands table
   - `generations_schema.sql` - Create generations table
   - `upload_image.sql` - Create image upload trigger/function (if needed)

Start the backend server:
```bash
npm start
```

### 3. Frontend Setup

```bash
cd ../Frontend
npm install
```

Create a `.env` file in the `Frontend/` folder with:
```
VITE_API_BASE_URL=http://localhost:5000
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_KEY=your_supabase_key
VITE_SUPABASE_BRAND_ASSET_BUCKET=brand-asset
```

Start the frontend dev server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Development Scripts

### Frontend
- `npm run dev` - Start Vite dev server
- `npm run build` - Create production build
- `npm run lint` - Run ESLint

### Backend
- `npm start` - Start Express server
- `npm run dev` - Start with nodemon (auto-reload)

## Project Structure

```
Runway-API-Hackathon/
├── Backend/
│   ├── src/
│   │   ├── server.js              # Express server
│   │   ├── routes/                # API routes
│   │   ├── services/              # Business logic
│   │   └── sql/                   # Database schemas
│   ├── package.json
│   └── .env                       # Environment variables
├── Frontend/
│   ├── src/
│   │   ├── pages/                 # Page components
│   │   ├── components/            # Reusable components
│   │   ├── sections/              # Page sections
│   │   ├── hooks/                 # Custom React hooks
│   │   ├── utils/                 # Utility functions
│   │   └── data/                  # Constants & data
│   ├── package.json
│   ├── vite.config.js
│   └── .env                       # Environment variables
└── README.md
```

## API Endpoints

### Brand Management
- `POST /api/brands` - Create brand
- `GET /api/brands` - List user brands
- `PUT /api/brands/:id` - Update brand
- `DELETE /api/brands/:id` - Delete brand

### Generation
- `POST /api/generate/mascot` - Generate AI mascot
- `POST /api/generate/video` - Generate marketing video
- `GET /api/generations` - List generation history

### Creative Analysis
- `POST /api/analyze/creative` - Analyze creative strategy
- `GET /api/rules/platform` - Get platform-specific rules

## Environment Variables

**Required for Backend:**
- `PORT` - Server port (default: 5000)
- `SUPABASE_URL` - Supabase project URL
- `SUPABASE_KEY` - Supabase API key
- `RUNWAY_API_KEY` - Runway ML API key
- `GROQ_API_KEY` - Groq API key

**Required for Frontend:**
- `VITE_API_BASE_URL` - Backend API URL
- `VITE_SUPABASE_URL` - Supabase project URL
- `VITE_SUPABASE_KEY` - Supabase public key
- `VITE_SUPABASE_BRAND_ASSET_BUCKET` - Storage bucket name

## License

MIT
