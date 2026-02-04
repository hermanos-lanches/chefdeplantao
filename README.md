<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1HRu0ndSXuKm1i068IUrpJaHCWY_i1Rn2

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   `npm install`
2. Configure your environment variables (copy `.env.example` to `.env.local` and fill in the values):
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_GOOGLE_MAPS_API_KEY`
3. Run the app:
   `npm run dev`

## Deploy (Vercel)

1. Push this repo to GitHub.
2. Create a new Vercel project pointing to the repo.
3. Add the same environment variables from `.env.example` to Vercel (Production, Preview, and Development as needed).
4. Deploy. Vercel will run `npm run build` automatically.
