# thinking-world

Thinking World is a lightweight and minimalistic web calendar application designed to calculate salaries for "marginal part-time"/mini job workers. This project was built with the <b>Remix + Supabase</b> stack. Inspired by [Supershift](https://supershift.app/).

https://thinking-world.vercel.app/

## Features

### Account Management
- User authentication with email and password.
- Password recovery and email address changes.

### Calendar Functionality
- <b>Work Shift Templates</b>: Create, edit, and delete reusable work shift templates. Caution: Deleting templates removes associated records. To avoid data loss, consider renaming unused templates.
- <b>Event Management</b>: Add and manage day-specific events.
- <b>Responsive Calendar Interface</b>:
  - Desktop: Drag-and-drop support for work shifts.
  - Mobile: Limited to manual interactions.

### Insights
- Monthly breakdown of:
  - Total work hours.
  - Total salary.
  - Work shift-specific details displayed in a responsive table.
 
## Technologies
- React
- Remix + Vite
- TypeScript + Zod
- TailwindCSS + Shadcn
- Remix-Hook-Form (Wrapper for React-Hook-Form)
- React-DND
- Remix-Themes
- Supabase SSR
- Vercel
