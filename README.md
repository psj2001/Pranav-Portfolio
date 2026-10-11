<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/bdcc5b8e-c7e7-45f1-94d4-8b77c6db0878

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploy to Hostinger

The public site is **https://pranavps.com**. Host it as a Node.js web app on a Hostinger Business or Cloud plan.

1. Push this repo to GitHub.
2. In hPanel: **Websites → Add website → Node.js web app → Import Git repository**.
3. Select this repo and set the domain to `pranavps.com`.
4. Build settings:
   - Node.js **20**
   - Build command: `npm run build`
   - Start command: `npm start`
5. Add the environment variable `SMTP_PASS` with the password for `contact@pranavps.com`. The contact form sends mail through `smtp.hostinger.com`.
6. In Hostinger DNS, delete any `A` record for `@` that points at `75.2.60.5`. Leave the mail records in place. Hostinger sets the website record when the app is attached to the domain.

`npm start` serves the built site with `NODE_ENV=production`. The contact form posts to `/api/contact` on that same server.
