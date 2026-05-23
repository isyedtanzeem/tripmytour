# TripMyTour

Modern React frontend for a visa, tours, and travel agency. It includes service sections, destination highlights, process flow, testimonials, and an inquiry form that can send leads to email through EmailJS.

## Run Locally

```bash
npm install
npm run dev
```

## Build For Vercel

```bash
npm run build
```

Vercel will detect Vite automatically. The production output folder is `dist`.

## Email Lead Setup

The inquiry form uses EmailJS so leads can be sent from a frontend-only Vercel deployment.

1. Create an EmailJS account.
2. Add an email service.
3. Create an email template with these variables:

```txt
to_email
from_name
reply_to
phone
service
destination
travelers
travel_month
budget
message
lead_summary
```

4. Copy `.env.example` to `.env` for local development.
5. Add the same variables in Vercel Project Settings > Environment Variables:

```txt
VITE_EMAILJS_SERVICE_ID
VITE_EMAILJS_TEMPLATE_ID
VITE_EMAILJS_PUBLIC_KEY
VITE_LEAD_EMAIL
```

If the EmailJS variables are not set, the form shows an email draft fallback instead of pretending the lead was sent.
