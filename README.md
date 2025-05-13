# OnlyFails Frontend

OnlyFails is a humorous web app that showcases user-submitted failed products. This frontend connects to the OnlyFails API and allows users to register, log in, view failed inventions, vote and more. It also allows admins to perform CRUD operations on the admin dashboard.

## Tech Stack

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- JWT-based Auth

---

## Getting Started

### Prerequisites

- Node.js (v18+)
- The OnlyFails API running locally or on a server

### Installation

```bash
git clone https://github.com/GOULASHSUP/only-fails-frontend.git
cd only-fails-frontend
npm install
```

---

### Environment Variables

Create a `.env.local` file in the project root with:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
```

Replace the URL with your API’s base path if hosted elsewhere.

---

## Project Structure

```
src/
├── app/                # Next.js app router (pages)
│   ├── login/          # Login page
│   ├── register/       # Registration page
│   ├── profile/        # User profile
│   ├── admin/          # Admin dashboard
│   └── ...             # Other route segments
├── components/         # Reusable UI components
│   ├── forms/          # Login, Register, AddProduct, etc.
│   └── layout/         # Navbar, Footer, Cards, etc.
├── lib/                # Hooks and config (e.g. useAuth)
```

---

## Features

- Register & Log in (User & Admin roles)
- View & vote on failed products
- Admin: Add, edit, delete products
- Admin: Ban users, moderate content
- Protected routes based on roles

---

## Scripts

| Command           | Description                         |
|-------------------|-------------------------------------|
| `npm run dev`     | Start local dev server              |
| `npm run build`   | Build for production                |
| `npm run start`   | Start production server             |
| `npm run lint`    | Run linter                          |

---

## Contributing

Pull requests are welcome. For major changes, please open an issue first.

---

## Learn More

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)