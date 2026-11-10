# Classic Rides — Premium Vintage Car Rental Platform

A full-stack MERN application for discovering classic automobiles, creating customer accounts, submitting booking requests, and reviewing booking history.

## Features

- Responsive luxury-inspired React interface (ivory, charcoal, beige and gold).
- Home page, searchable/filterable car collection, car details, login, registration, booking and booking-history pages.
- Express REST API with Mongoose models for users, cars and bookings.
- JWT authentication, bcrypt password hashing and protected booking endpoints.
- Booking request validation, unique reference numbers, calculated rental totals and cancellation for pending/confirmed bookings.
- Sample car seed script, API rate limiting, Helmet security headers, CORS and centralized error handling.

> Booking requests are stored with `Pending` status. This project does not process payments or automatically confirm vehicle availability. A rental operator should review and confirm requests.

## Requirements

- Node.js 18.18+ (Node 20 LTS recommended)
- npm 9+
- MongoDB Community Server locally, or a MongoDB Atlas database

## Project structure

```text
classic-rides-mern/
├── client/                 # React + Vite frontend
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── api.js
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── .env.example
│   └── package.json
├── server/                 # Express API
│   ├── src/
│   │   ├── config/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── seed.js
│   │   └── server.js
│   ├── .env.example
│   └── package.json
├── package.json
└── README.md
```

## 1. Configure MongoDB

### Option A — MongoDB locally

Install and start MongoDB Community Server. The default local connection string in the example environment file is:

```text
mongodb://127.0.0.1:27017/classic_rides
```

### Option B — MongoDB Atlas

1. Create a free cluster at https://www.mongodb.com/atlas.
2. Create a database user with a strong password.
3. In Network Access, allow the IP addresses from which your deployed backend will connect. For local development, add your current IP.
4. Select **Connect → Drivers** and copy the connection string.
5. Replace the username, password and database name in your local `MONGODB_URI`. Do not commit the real URI.

## 2. Configure environment variables

Create `server/.env` from `server/.env.example`:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/classic_rides
JWT_SECRET=replace_with_a_long_random_secret_at_least_32_characters
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```

Use a long, random JWT secret. For example, generate one with:

```bash
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

Create `client/.env` from `client/.env.example`:

```env
VITE_API_URL=http://localhost:5000/api
```

Never commit `.env` files. The `.env.example` files contain placeholders only.

## 3. Install dependencies

From the project root:

```bash
npm run install:all
```

Alternatively, install each folder separately:

```bash
npm install
cd server && npm install
cd ../client && npm install
```

## 4. Add sample cars

From the project root:

```bash
npm run seed
```

This connects to the MongoDB database and inserts six sample vehicles. The seed script clears the existing `cars` collection first, so do not run it against a production database containing real inventory.

## 5. Run the application

From the project root, start both frontend and backend:

```bash
npm run dev
```

- Frontend: http://localhost:5173
- API health check: http://localhost:5000/api/health
- Cars endpoint: http://localhost:5000/api/cars

To run individually:

```bash
npm run dev --prefix server
npm run dev --prefix client
```

Create a user from the Register page, sign in, open a car detail page and submit a booking request. View saved requests under **My Bookings**.

## API reference

All endpoints are prefixed with `/api`.

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| GET | `/health` | Public | API health |
| POST | `/auth/register` | Public | Create account |
| POST | `/auth/login` | Public | Sign in and receive JWT |
| GET | `/auth/me` | JWT | Current user |
| GET | `/cars` | Public | List/search/filter cars |
| GET | `/cars/:id` | Public | Car details |
| POST | `/bookings` | JWT | Create booking request |
| GET | `/bookings/mine` | JWT | Current user's bookings |
| PATCH | `/bookings/:id/cancel` | JWT | Cancel eligible booking |

### Search and filter examples

```text
GET /api/cars?search=jaguar
GET /api/cars?category=Classic
GET /api/cars?featured=true
GET /api/cars?sort=price_asc
```

### Booking request body

```json
{
  "carId": "MONGOOSE_CAR_ID",
  "startDate": "2027-01-15",
  "endDate": "2027-01-17",
  "pickupLocation": "Hyderabad",
  "notes": "Please call before confirming."
}
```

For private routes, send:

```text
Authorization: Bearer YOUR_JWT
```

## Production build

Build the frontend:

```bash
npm run build
```

The production files are generated in `client/dist`.

## Deploy the backend on Render

The root `render.yaml` is a Blueprint for a web service with the requested `server` root directory, `npm install` build command, `npm start` start command, and `/api/health` health check. You can create the service manually instead if preferred:

1. Push this project to GitHub and create a Render **Web Service** from that repository.
2. Set **Root Directory** to `server`, **Build Command** to `npm install`, and **Start Command** to `npm start`.
3. Configure `NODE_ENV=production`, `MONGODB_URI` (your Atlas URI), `JWT_SECRET` (a securely generated random value), `JWT_EXPIRES_IN=7d`, and `CLIENT_URL` (the exact deployed Vercel origin, without a trailing slash).
4. Deploy and verify `https://YOUR-API.onrender.com/api/health` reports both `status: "ok"` and `database: "connected"`.

The Blueprint generates `JWT_SECRET` on Render. Set `MONGODB_URI` and `CLIENT_URL` in the Render dashboard; neither belongs in Git. Render supplies `PORT` automatically.

## Deploy the frontend on Vercel

1. Import the GitHub repository into Vercel.
2. Set **Root Directory** to `client`, **Framework Preset** to **Vite**, **Build Command** to `npm run build`, and **Output Directory** to `dist`.
3. Set the project environment variable `VITE_API_URL` to `https://YOUR-API.onrender.com/api` for Production (and Preview if previews should use the same API).
4. Deploy. The `client/vercel.json` rewrite sends client-side routes to `index.html` so browser refreshes work.
5. Copy the deployed frontend origin into Render's `CLIENT_URL` and redeploy the backend. Then test registration, login, car search, booking, and cancellation on the deployed site.

Anything prefixed with `VITE_` is bundled into public browser code and must never contain secrets. Never upload `.env` files. The committed `.env.example` files contain local-development examples only.

## Important production notes

- Add real vehicle availability/overlap checks before accepting live bookings.
- Add an admin role and protected admin endpoints before enabling staff booking-status management.
- Add payment processing only through a trusted payment provider and verify payment events server-side.
- Replace sample images and contact details with licensed assets and your business information.
- Configure Atlas network access and backups appropriately.
- Use HTTPS in production and rotate any secret that may have been exposed.
