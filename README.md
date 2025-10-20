# Clientbase

A lightweight CRM application for freelancers and small businesses to manage clients, projects, and invoices. Built with React and Supabase.

## Features

- Secure authentication with email/password
- Client management (create, read, update, delete)
- Project tracking with deadlines and status
- Invoice management and payment tracking
- Dashboard with overview of recent activity
- Responsive design with Tailwind CSS

## Tech Stack

### Frontend
- React 18.3.1
- React Router DOM 7.9.4
- Tailwind CSS 4.1.14
- Vite 7.1.7

### Backend
- Supabase (PostgreSQL database, authentication, and API)

### Developer Tools
- ESLint

## Prerequisites

- Node.js (version 16.x or higher)
- npm or yarn
- Supabase account (free tier available at [supabase.com](https://supabase.com))

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/COPA100/Clientbase.git
cd Clientbase/clientbase
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Supabase

1. Create a new project on [Supabase](https://supabase.com)
2. Create a `.env.local` file in the `clientbase` directory:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

3. Set up your database tables in Supabase:
   - **clients** - Store client information
   - **projects** - Manage project details
   - **invoices** - Track invoices and payments

### 4. Run the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

## Project Structure

```
clientbase/
├── src/
│   ├── api/                # API service functions
│   │   ├── clients.js      # Client CRUD operations
│   │   ├── invoices.js     # Invoice CRUD operations
│   │   └── projects.js     # Project CRUD operations
│   ├── components/         # React components
│   │   ├── ClientForm.jsx
│   │   ├── ClientList.jsx
│   │   ├── DashboardCards.jsx
│   │   ├── InvoiceForm.jsx
│   │   ├── InvoiceList.jsx
│   │   ├── Navbar.jsx
│   │   ├── ProjectForm.jsx
│   │   └── ProjectList.jsx
│   ├── data/              # Static data
│   │   └── navLinks.js    # Navigation configuration
│   ├── pages/             # Page components
│   │   ├── Clients.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Invoices.jsx
│   │   ├── Projects.jsx
│   │   └── NotFoundPage.jsx
│   ├── App.jsx            # Main app component with routing
│   ├── main.jsx           # Application entry point
│   ├── supabaseClient.js  # Supabase configuration
│   └── index.css          # Global styles
├── index.html             # HTML template
├── package.json           # Dependencies and scripts
├── vite.config.js         # Vite configuration
└── eslint.config.js       # ESLint configuration
```