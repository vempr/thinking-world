# thinking-world

My personalized all-in-one calendar web app and including other services. Supabase Auth + DB => can be used on multiple devices.

Inspired by [Supershift](https://supershift.app/).

## Features

### <u>Calendar</u>

Calendar to track work shifts, appointments, birthdays, misc. events

- All private fixtures are fully customizable
- Includes national holidays
- Calculates earned income for a period of time (Insert income/hour or income/month)

### <u>Personal</u>

- Todo list (set time task should be completed in, daily/weekly/custom/etc. reoccuring tasks)

### <u>Confidential</u>

<i>WARNING: There is no guarantee that thinking-world will stay running forever, so please store sensitive information on stable platforms. I'm only integrating this service because I'm too lazy to switch between multiple apps :)</i>

- Password manager (divided into customizable categories, e.g.: work, gaming, etc.)
- Private notepad for text of your choice

## App Stack

### Frontend

- Remix
- TailwindCSS paired with Preline UI, Flowbite Components
- Remix Hook Form
- Supabase SDK
- Zod

### Backend

- Supabase Auth
- Supabase Database

### Design

- Photopea

### Needing to implement

- Unit testing
- Deployment (CI/CD)
