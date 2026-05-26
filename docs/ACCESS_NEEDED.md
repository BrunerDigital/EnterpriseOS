# Access Needed To Finish Production Launch

These items require external credentials or DNS/provider access. The app is deployed and functional without them, but these are the remaining go-live connections.

## Supabase Auth Email

- BrunerDigital SMTP host
- SMTP port
- SMTP username
- SMTP password
- Sender email, such as `support@brunerdigital.com`
- Sender name, such as `Digital360 by BrunerDigital`

Use this to send invites and password resets from the BrunerDigital domain.

## Domain And DNS

- Cloudflare access for `brunerdigital.com`
- Ability to add the Vercel DNS record for `digital360.brunerdigital.com`
- Supabase Auth redirects are configured for:
  - `https://digital360.brunerdigital.com/auth/callback`
  - `https://digital360.brunerdigital.com/**`

## Stripe

- Stripe secret key
- Stripe publishable key
- Stripe webhook signing secret
- Product and pricing decisions for Digital360 plans
- `BILLING_API_TOKEN` for protected checkout session creation. Production token has been generated in Vercel.

## Messaging And Email Integrations

- Twilio account SID
- Twilio auth token
- Twilio messaging service SID or phone number
- `MESSAGING_API_TOKEN` for protected outbound message calls. Production token has been generated in Vercel.
- SendGrid or Mailgun API key
- Verified sending domain
- Lead alert destination email for `LEADS_NOTIFICATION_EMAIL`
- Sender email for `SENDGRID_FROM_EMAIL` or `MAILGUN_FROM_EMAIL`

## Calendar, Social, Reviews, And AI

- Google OAuth client ID and secret
- Google Calendar OAuth consent configuration
- Meta app ID and secret
- Google Business Profile OAuth client ID and secret
- OpenAI API key
- `AI_ASSISTANT_API_TOKEN` for protected live AI calls. Production token has been generated in Vercel.

## Analytics And Launch Routing

- Demo booking URL for `NEXT_PUBLIC_DEMO_BOOKING_URL`
- Sales owner name and email
- Google Analytics measurement ID
- Google Ads conversion ID and label, if using paid search
- Meta Pixel ID, if using Meta ads
- LinkedIn Partner ID and conversion ID, if using LinkedIn ads
- CRM, Slack, Make, Zapier, or webhook destination for `LEADS_WEBHOOK_URL`

## Security Follow-Up

- Rotate the Supabase personal access token that was pasted into the chat.
- Rotate any temporary launch passwords after handoff.
- Enable production error monitoring before paid users are onboarded.

