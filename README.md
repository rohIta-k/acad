# Runway API Hackathon

This project is split into two apps:

- `Frontend/` - a React app powered by Vite
- `Backend/` - a Node.js API package with Express, CORS, and dotenv dependencies

## Prerequisites

- Node.js 18 or newer
- npm

## Setup

1. Clone the repository and open the project folder.
2. Set up the backend from scratch:

   ```bash
   cd Backend
   npm init -y
   npm install express cors dotenv
   npm install --save-dev nodemon
   ```

3. Set up the frontend dependencies, including Tailwind:

   ```bash
   cd ../Frontend
   npm install
   npm install tailwindcss @tailwindcss/vite
   ```

4. If Tailwind is not already configured in the app, make sure the Tailwind stylesheet is imported in the frontend entry file.

## Run the Frontend

From the `Frontend/` folder:

```bash
npm run dev
```

## Backend Notes

The backend package currently includes dependencies but does not yet define a start script or server entry file. Once the API entry point is added, you can run it from `Backend/` with the appropriate command for that file or script.

## Helpful Scripts

Frontend:

- `npm run dev` - start the Vite dev server
- `npm run build` - create a production build
- `npm run lint` - run ESLint

## Project Structure

```text
Runway-API-Hackathon/
├── Backend/
└── Frontend/
```