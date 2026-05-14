# Access Needed To Finish Production Launch

These items require external credentials or DNS/provider access. The app is deployed and functional without them, but these are the remaining go-live connections.

## Supabase Auth Email

- BrunerDigital SMTP host
- SMTP port
- SMTP username
- SMTP password
- Sender email, such as `support@brunerdigital.com`
- Sender name, such as `BrunerDigital`

Use this to send invites and password resets from the BrunerDigital domain.

## Domain And DNS

- Final app domain, such as `app.brunerdigital.com`
- DNS provider access
- Ability to add Vercel DNS records
- Ability to add Supabase Auth redirect URLs:
  - `https://app.brunerdigital.com/auth/callback`
  - `https://app.brunerdigital.com/reset-password`

## Stripe

- Stripe secret key
- Stripe publishable key
- Stripe webhook signing secret
- Product and pricing decisions for BrunerDigital plans

## Messaging And Email Integrations

- Twilio account SID
- Twilio auth token
- Twilio messaging service SID or phone number
- SendGrid or Mailgun API key
- Verified sending domain

## Calendar, Social, Reviews, And AI

- Google OAuth client ID and secret
- Google Calendar OAuth consent configuration
- Meta app ID and secret
- Google Business Profile OAuth client ID and secret
- OpenAI API key

## Security Follow-Up

- Rotate the Supabase personal access token that was pasted into the chat.
- Rotate any temporary launch passwords after handoff.
- Enable production error monitoring before paid users are onboarded.
