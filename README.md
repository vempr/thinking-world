# thinking-world

My own personalized all-in-one calendar web app + a few other functions.
It features authentication and a Supabase database to save users' queries, so that it can be used on any device.

## Features
### <ins>Calendar</ins>
Calendar to track work shifts, appointments, birthdays, misc. events
- All private fixtures are fully customizable
- Includes national holidays
- Calculates earned income for a period of time (Insert income/hour or income/month)

### <ins>Confidential</ins>
- Password manager (divided into customizable categories, e.g.: work, gaming, etc.)
- Private question logger

## App Stack
### Frontend
- Remix
- TailwindCSS paired with Preline UI
- Remix Hook Form
- Supabase SDK

### Backend
- Supabase Auth
- Supabase Database

### Shared
- Zod

### Needing to implement
- Unit testing
- Deployment (CI/CD)
