# Server upload

Built: 2026-10-13

Zip: `pranavps-server-upload.zip`

## Where to put the files

- Put everything in `site/` into the website root that serves https://pranavps.com/. Replace the previous site files.
- Put everything in `api/` into the existing `api` folder (https://pranavps.com/api/). Do not replace `config.php` or the images already in `uploads/projects/`.
- If the database already has projects, run `api/content-update.sql` once in phpMyAdmin. A fresh database can use `api/seed.sql` instead. Until that SQL runs, the live API can still show CREOVA and the old role text.

## Included

- Google Tag Manager `GTM-N68C5S4P` is in the page head and at the start of the body.
- The search favicon is a 144×144 PNG of the portrait, linked ahead of the smaller icons.
- `site/` is the built website. Unknown `/blog/...` addresses load the site instead of a hard 404.
- `api/content.php`, `api/posts.php`, and `api/upload.php` publish blog posts. A post can include up to 8 JPEG, PNG, or WebP images under `uploads/posts/`.
- CREOVA is removed from the site and from the seed data.
- Tripzza is a website at https://tripzza.com/.
- Falcon Force Academy is a website at https://falconforceacademy.com/.
- CRM Falcon Force is the academy CRM: clients, staff, salaries, expenses, income, a PDF of income and expenses, and payment orders.
- ULEGENDARY DIGITAL shows Present, with the mobile-team, architecture, sprint, code-review, and roadmap lines.
- SLR SHOPPEE lists the Flutter ecommerce application, using GetX and Provider.
- The public email is pranavputhoor91@gmail.com.
- The education section lists the B.Com and the BCA at Rabindranath Tagore University. The About card shows B.Com only.
- The skills section includes the full toolkit: React Native, WordPress, Firebase, MySQL, AI and MCP, SEO, AEO, GEO, Meta Ads, Google Ads, WhatsApp automation, analytics, Docker, Figma, Anime.js, Motion, and Kokonut UI.

## Not in this upload

- The Flutter app itself. Install a new build of that app on the phone.
- `php-api/config.php` and existing project images. Those stay on the server.
- OIH. It stays off the site until there is a description.
- The contact form still sends through the Hostinger mailbox. Only the address shown on the page changed.

## From the terminal

SSH is on for this hosting account. After the Mac key is added under hPanel → Advanced → SSH Access → Add SSH key, run `npm run deploy` from this project. That builds the site and uploads it. It does not replace `config.php` or the images already in `uploads/`.
