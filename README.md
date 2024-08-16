# thinking-world

My personalized all-in-one calendar web app + a few other functions.
It features authentication and a Supabase database to save users' queries, so that it can be used on any device.
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

<i>I advise using different apps for securing secrets, since it isn't good practice to log everything on one platform.</i>

- Password manager (divided into customizable categories, e.g.: work, gaming, etc.)
- Private notepad for sensitive writings

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
