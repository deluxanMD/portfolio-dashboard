Portfolio Management Dashboard

A full-stack application for tracking investment portfolios, managing assets, and viewing transaction history. Built with a modern React frontend and a robust Node.js backend, fully containerized with Docker.

🚀 Features

Authentication: Secure Login/Register with JWT Access Tokens & Silent Refresh Tokens.

Portfolio Overview: Real-time summary of total balance, asset allocation, and individual holdings.

Asset Management: Add, Edit, and Delete investment assets (Stocks, Bonds, ETFs, etc.).

Transaction History: Record Buy/Sell trades that automatically update asset quantities.

Modern UI: Responsive Material UI design with data tables and summary cards.

Dockerized: One-command setup for the entire stack (Client, Server, Database).

🛠 Tech Stack

Frontend (/client)

Framework: React 18 (Vite) + TypeScript

State Management: Redux Toolkit + RTK Query (Caching & Optimistic Updates)

UI Component Library: Material UI (MUI)

Forms & Validation: React Hook Form + Yup

Testing: Cypress (E2E)

Backend (/server)

Runtime: Node.js + TypeScript

Framework: Express.js

Database: MongoDB (via Mongoose)

Architecture: Controller-Service-Repository Pattern

Testing: Jest + Supertest (Unit & Integration)

Logging: Winston + Morgan

📦 Prerequisites

Docker & Docker Compose (Recommended)

Node.js 18+ (If running locally without Docker)

🏃‍♂️ Quick Start (Docker)

The easiest way to run the application is using Docker Compose. This spins up the MongoDB database, Backend API, and Frontend client automatically.

Clone the repository:

git clone git@github.com:deluxanMD/portfolio-dashboard.git
cd portfolio-dashboard

Start the application:

docker compose up --build

Access the App:

Frontend: http://localhost:5173

Backend API: http://localhost:5001

Database: mongodb://localhost:27017

💻 Local Development Setup

If you prefer to run the services individually for development:

1. Database

Start a local MongoDB instance. You can use the provided dev compose file:

docker compose up -d

2. Backend (/server)

cd server
npm install
npm run dev

Server runs on http://localhost:5001 (to avoid macOS AirPlay conflicts on port 5000)

3. Frontend (/client)

cd client
npm install
npm run dev

Client runs on http://localhost:5173

🧪 Testing

Backend Unit Tests

We use Jest to test Services and Controllers.

cd server
npm test

Frontend E2E Tests

We use Cypress to test critical user flows (Login, Add Asset, etc.).

cd client
npx cypress open

# or

npm run cy:run

📂 Project Structure

portfolio-dashboard/
├── .github/ # CI/CD Pipelines (GitHub Actions)
├── client/ # React Frontend
│ ├── src/
│ │ ├── components/ # Reusable UI components (Layout, Dialogs)
│ │ ├── pages/ # Page views (Dashboard, Login, History)
│ │ ├── store/ # Redux Slices & RTK Query APIs
│ │ └── ...
│ ├── Dockerfile
│ └── ...
├── server/ # Node.js Backend
│ ├── src/
│ │ ├── controllers/ # Request handling
│ │ ├── services/ # Business logic
│ │ ├── repositories/ # Database access
│ │ ├── models/ # Mongoose schemas
│ │ └── ...
│ ├── Dockerfile
│ └── ...
├── docker-compose.yml # Production/Full Stack Compose
└── README.md

🔐 Environment Variables

The project comes with default development environments. For production, ensure you update the secrets.

Server (server/.env.development):

PORT=5001
MONGO_URI=mongodb://localhost:27017/portfolio_db_dev
JWT_SECRET=dev_secret_key_123
REFRESH_TOKEN_SECRET=dev_refresh_secret_key_999

Client (client/.env):

VITE_API_URL=http://localhost:5001/api
