# Momentum

A production-ready RESTful backend API for **Momentum**, a platform that helps students discover and manage career opportunities such as internships, scholarships, hackathons, jobs, competitions, and more.

Built with scalability, security, and maintainability in mind using Node.js, Express, Prisma, and PostgreSQL.

---

## Live Deployment
 Health Check : https://momentum-oi7v.onrender.com/api/v1/health 
 Swagger Docs : https://momentum-oi7v.onrender.com/api/v1/api-docs 

## Features

- User Registration and Login
- Secure JWT Authentication
- Role-Based Access Control (Student & Admin)
- Browse Career Opportunities
- Search and Filter Opportunities
- Bookmark Opportunities
- Create, Update, and Delete Opportunities (Admin)
- View Detailed Opportunity Information
- Input Validation for All Requests
- Standardized API Responses
- Interactive Swagger API Documentation

---

## Tech Stack

### Backend

- Node.js
- Express.js

### Database

- PostgreSQL
- Prisma ORM

### Authentication

- JSON Web Token (JWT)
- bcrypt

### Validation

- Zod

### Logging

- Winston
- Morgan

### Documentation

- Swagger (OpenAPI)

### Development Tools

- Nodemon
- Postman

---

## Project Structure

```text
Momentum/
│
├── prisma/
│   ├── migrations/
│   ├── schema.prisma
│   └── seed.js
│
├── logs/
│   ├── combined.log
│   └── error.log
│
├── src/
│   │
│   ├── DB/
│   │   └── prismaDb.config.js
│   │
│   ├── docs/
│   │   └── swagger.js
│   │
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   ├── error.middleware.js
│   │   ├── validate.middleware.js
│   │   ├── rateLimit.middleware.js
│   │   └── ...
│   │
│   ├── modules/
│   │   ├── auth/
│	│	│	├── auth.controller.js
│   │   │	├── auth.service.js
│   │   │	├── auth.routes.js
│   │   │	└── auth.validation.js
│	│	│
│   │   ├── users/
│   │   ├── opportunities/
│   │   ├── bookmarks/
│   │   └── ...
│   │
│   ├── utils/
│   │   ├── ApiError.js
│   │   ├── ApiResponse.js
│   │   ├── asyncHandler.js
│   │   ├── logger.js
│   │   └── ...
│   │
│   └── app.js
│
├── .env
├── .env.example
├── .gitignore
├── index.js
├── package.json
├── prisma.config.ts
└── README.md
```

---

## Installation

Clone the repository

```bash
git clone https://github.com/Srijon-paul/Momentum.git
```

Move into the project

```bash
cd Momentum
```

Install dependencies

```bash
npm install
```

Create environment variables

```bash
cp .env.example .env
```

Generate Prisma Client

```bash
npx prisma generate
```

Run database migrations

```bash
npx prisma migrate dev
```

(Optional) Seed the database

```bash
npx prisma db seed
```

Start the development server

```bash
npm run dev
```

---

## Environment Variables

Create a `.env` file in the project root.

```env
DATABASE_URL=
PORT=
CORS_ORIGINS=
NODE_ENV=
LOG_LEVEL=

ACCESS_TOKEN_SECRET=
ACCESS_TOKEN_EXPIRY=
ACCESS_COOKIE_AGE=
REFRESH_TOKEN_SECRET=
REFRESH_TOKEN_EXPIRY=
REFRESH_COOKIE_AGE=
ADMIN_NAME=
ADMIN_EMAIL=
ADMIN_PASSWORD=
```

Never commit your `.env` file.

---

## Available Scripts

```bash
npm run dev          # Development server
npm start            # Production server
```

---

## API Documentation

Swagger documentation is available after starting the server.

```
http://localhost:4600/api-docs
```

_(Update the port if different.)_

---

## Authentication

Momentum uses JWT-based authentication.

### Access Token

- Stored in HTTP-only cookies
- Used for authenticating API requests

### Refresh Token

- Stored securely in the database
- Used to issue new access tokens

---

## API Response Format

### Success Response

```json
{
    "success": true,
    "data": {},
    "message": "Operation completed successfully"
}
```

### Error Response

```json
{
    "success": false,
    "message": "Unauthorized",
    "errors": []
}
```

---

## Logging

The application uses:

- **Morgan** for HTTP request logging
- **Winston** for application logging

Log files are stored inside:

```text
logs/
├── combined.log
└── error.log
```

---

## Security Features

- Helmet
- CORS
- Rate Limiting
- HTTP Parameter Pollution Protection
- Password Hashing
- JWT Authentication
- Centralized Error Handling
- Environment Variable Management
- Graceful Shutdown

---

## Future Roadmap

- Email Verification
- Password Reset
- Opportunity Applications
- Admin Dashboard
- Redis Caching
- Docker Support
- CI/CD Pipeline
- Refresh Token Rotation

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Author

**Srijon Paul**
