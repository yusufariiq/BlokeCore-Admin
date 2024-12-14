# BlokeCore Admin Dashboard

The BlokeCore Admin Dashboard is a web application built with React for managing the BlokeCore online store. It enables administrators to oversee and control various aspects of the online store, such as product management, order tracking, and user data.

## Features

- Product Management: Add, edit, delete, view products and manage orders.
- Order Tracking: Monitor and update order statuses.
- Dashboard Analytics: Overview of sales and user activities.

## Tech Stack

### Frontend

- React: Frontend library for building UI components.
- Tailwind CSS: For styling the application.
- Environment Variables: Managed using .env files.

### Backend

- Express.js: REST API for managing data.
- MongoDB: Database for storing product, user, and order data.
- Node.js: Backend runtime.

## Prerequisites

1. Node.js: Install Node.js.
2. Package Manager: Use npm, pnpm, or yarn.
3. API: A running backend API with endpoints for products, orders, and users (this project using Axios).

## Setup Instruction

1. Clone the Repository

```
git clone https://github.com/your-repo/blokecore-admin-dashboard.git
cd blokecore-admin-dashboard
```

2. Install Dependencies

```
npm install
# OR
yarn install
```

3. Create Environment Variables

- Create a .env file in the root of the project

```
touch .env
```

- Add the following variables to the .env file

```
VITE_API_URL=https://api.yourdomain.com
VITE_APP_TITLE=BlokeCore Admin Dashboard
```

4.  Start the Development Server

```
npm run dev
```

## Project Structures

```
src/
├── assets/         # Static assets (e.g., images, logos)
├── components/     # Reusable UI components
│   ├── Layout.jsx
│   ├── Sidebar.jsx
│   └── DashboardCard.jsx
├── pages/          # Page components
│   ├── Products.jsx
│   ├── Orders.jsx
│   ├── Users.jsx
│   |── Dashboard.jsx
│   └── Contact.jsx
├── routes/         # Route definitions
│   └── index.jsx
├── services/       # API services
│   └── api.js
├── styles/         # Tailwind CSS styles
├── utils/          # Utility functions
│   └── helpers.js
└── main.jsx        # Main entry point
```
