# Fragranzia

Fragranzia is a full-stack perfume e-commerce application with separate customer and administrator experiences. Customers can browse perfumes, manage a wishlist and cart, maintain delivery addresses, place orders, and complete UPI payments through Razorpay or select cash on delivery. Administrators can manage products and categories, control user account status, review orders, and update delivery statuses.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Local Setup](#local-setup)
- [Environment Variables](#environment-variables)
- [Running the Project](#running-the-project)
- [User Routes](#user-routes)
- [Admin Routes](#admin-routes)
- [API Endpoints](#api-endpoints)
- [Payment Information](#payment-information)
- [Deployment](#deployment)
- [Security Notes](#security-notes)
- [Available Scripts](#available-scripts)

## Features

### Customer

- User registration and login
- JWT-based authentication
- Active and blocked account handling
- Home, about, product, and product-details pages
- Product browsing by category
- Shopping cart with quantity updates
- Wishlist management
- Multiple delivery-address management
- Default delivery address selection
- Profile updates
- Cash-on-delivery and Razorpay UPI checkout
- Order history
- Order cancellation
- Product return requests
- Stock deduction when an order is placed
- Automatic stock rollback when order processing fails

### Administrator

- Role-protected admin area
- Dashboard
- Category creation, editing, and status blocking
- Product creation, editing, image upload, and status blocking
- Customer account status management
- Order review
- Order delivery-status updates
- Active and inactive product visibility controls

## Tech Stack

### Frontend

- React 19
- Vite 8
- React Router DOM 7
- Axios
- React Icons
- Lucide React
- React Toastify

### Backend

- Node.js
- Express 5
- MongoDB
- Mongoose 9
- JSON Web Tokens
- bcryptjs
- Multer
- Cloudinary
- Razorpay

### Deployment

- Vercel configuration for the frontend and serverless backend

## Project Structure

```text
Fragranzia/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── Components/
│   │   │   ├── admin/
│   │   │   ├── layout/
│   │   │   ├── protected-route/
│   │   │   └── user/
│   │   ├── contexts/
│   │   ├── hooks/
│   │   ├── pages/
│   │   │   ├── admin/
│   │   │   └── user/
│   │   ├── services/
│   │   │   ├── admin-api-services/
│   │   │   └── user-api-services/
│   │   ├── App.jsx
│   │   ├── axios.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env
│   ├── package.json
│   └── vite.config.js
├── server/
│   ├── api/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── utils/
│   ├── .env
│   ├── index.js
│   ├── package.json
│   └── vercel.json
├── .gitignore
└── README.md
```

## Prerequisites

Install the following before running the project:

- Node.js 18 or newer
- npm
- MongoDB Atlas or a local MongoDB instance
- A Cloudinary account
- A Razorpay test account

## Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/adeeb-nk/Fragranzia.git
cd Fragranzia
```

### 2. Install frontend dependencies

```bash
cd client
npm install
```

### 3. Install backend dependencies

Open a new terminal from the project root:

```bash
cd server
npm install
```

## Environment Variables

Create `server/.env`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_long_random_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

RAZORPAY_KEY_ID=your_razorpay_test_key_id
RAZORPAY_KEY_SECRET=your_razorpay_test_key_secret
```

Create `client/.env`:

```env
VITE_BACKEND_URL=http://localhost:5000
```

For a production frontend, set `VITE_BACKEND_URL` to the deployed backend URL.

> The frontend currently contains a Razorpay test key in `client/src/pages/user/Payment.jsx`. Configure the same Razorpay key pair in the frontend and backend, and replace the hardcoded test key with an environment variable before deployment.

## Running the Project

Start the backend:

```bash
cd server
npm start
```

The backend will run at:

```text
http://localhost:5000
```

Open another terminal and start the frontend:

```bash
cd client
npm run dev
```

Vite will print the frontend URL, usually:

```text
http://localhost:5173
```

## User Routes

| Route | Description |
|---|---|
| `/` | Home page |
| `/SignUp` | Create an account |
| `/Login` | Sign in |
| `/Product1` | Product listing |
| `/Product2/:id` | Product details |
| `/About` | About page |
| `/Cart` | Shopping cart; login required |
| `/Wishlist` | Wishlist; login required |
| `/Profile` | Profile; login required |
| `/Payment` | Checkout; login required |
| `/Paymentsuccess` | Payment success page |

## Admin Routes

The following routes require a valid login token and an account with the `admin` role:

| Route | Description |
|---|---|
| `/dashboard` | Admin dashboard |
| `/Category` | Category management |
| `/Productadmin1` | Product management |
| `/Productadd` | Add a product |
| `/User` | User management |
| `/Order` | Order management |

## API Endpoints

The backend uses the following route groups:

| Base URL | Purpose |
|---|---|
| `/` | Backend health message |
| `/api/auth` | Registration, login, profile, and user administration |
| `/category` | Category management |
| `/product` | Product listing, creation, editing, and status updates |
| `/cart` | Authenticated cart operations |
| `/whishlist` | Authenticated wishlist operations |
| `/address` | Authenticated address operations |
| `/order` | Order placement, history, cancellation, returns, and admin order management |

### Authentication

Authenticated requests send the stored JWT in the `Authorization` header:

```http
Authorization: <jwt-token>
```

The token and role are stored by the frontend in `localStorage`.

### Main Endpoints

| Method | Endpoint | Access |
|---|---|---|
| `POST` | `/api/auth/register` | Public |
| `POST` | `/api/auth/login` | Public |
| `GET` | `/api/auth/profile` | Authenticated |
| `PUT` | `/api/auth/profile` | Authenticated |
| `GET` | `/product` | Public |
| `GET` | `/product/admin` | Admin-facing |
| `POST` | `/product` | Admin-facing; multipart image upload |
| `PUT` | `/product/:id` | Admin-facing; multipart image upload |
| `GET` | `/cart` | Authenticated |
| `POST` | `/cart` | Authenticated |
| `PUT` | `/cart/:id` | Authenticated |
| `DELETE` | `/cart/:id` | Authenticated |
| `GET` | `/whishlist` | Authenticated |
| `POST` | `/whishlist` | Authenticated |
| `DELETE` | `/whishlist/:id` | Authenticated |
| `GET` | `/address` | Authenticated |
| `POST` | `/address` | Authenticated |
| `PUT` | `/address/primary/:id` | Authenticated |
| `PUT` | `/address/:id` | Authenticated |
| `POST` | `/order` | Authenticated |
| `GET` | `/order` | Authenticated |
| `GET` | `/order/admin` | Admin |
| `PUT` | `/order/:id/status` | Authenticated |
| `PUT` | `/order/:id/cancel` | Authenticated |
| `PUT` | `/order/:id/return` | Authenticated |

## Payment Information

The checkout supports two payment methods:

- `cod` - Cash on delivery
- `UPI` - Razorpay checkout

For UPI checkout:

1. The frontend submits the selected payment method.
2. The backend validates the cart and default address.
3. Stock is deducted and an order is created.
4. The backend creates a Razorpay order.
5. Razorpay Checkout opens in the browser.
6. The frontend navigates to the success page after checkout.

Use Razorpay test credentials during local development. A production deployment requires live credentials and an appropriate server-side payment signature verification flow.

## Deployment

### Frontend

Deploy the `client` directory to Vercel or a similar Vite-compatible host:

```bash
cd client
npm run build
```

Set `VITE_BACKEND_URL` to the deployed backend URL and configure the SPA rewrite in `client/vercel.json`.

### Backend

Deploy the `server` directory as a Node.js or Vercel serverless application. Set all backend environment variables in the hosting provider.

The server automatically connects to MongoDB for both local and serverless execution. If `VERCEL` is not set, it starts the Express server on `PORT`; on Vercel it exports the Express app through `server/api/index.js`.

### Recommended Production Configuration

- Use a production MongoDB database.
- Use a secure random `JWT_SECRET`.
- Use production Cloudinary credentials.
- Use live Razorpay credentials.
- Enable Razorpay payment signature verification.
- Configure CORS for only the deployed frontend origin.
- Store no secrets in frontend source code.

## Security Notes

- JWTs are stored in `localStorage` and sent in the `Authorization` header.
- Passwords are hashed using bcryptjs.
- Environment files are excluded through `.gitignore`.
- If credentials have already been committed or shared, rotate the MongoDB, Cloudinary, JWT, and Razorpay credentials immediately.
- The hardcoded Razorpay key and test credentials should not be reused in a public production repository.
- Admin pages are protected by role checks in the React router, but sensitive backend routes should also enforce authentication and the `admin` role consistently before production use.
- Blocked user accounts are rejected during login and protected API requests.

## Available Scripts

### Frontend

Run from `client/`:

```bash
npm run dev      # Start the Vite development server
npm run build    # Create a production build
npm run preview  # Preview the production build
npm run lint     # Run Oxlint
```

### Backend

Run from `server/`:

```bash
npm start        # Start the server with Nodemon
npm test         # Placeholder; no test suite is currently configured
```
