# Task Manager App

## Overview
This is a full-stack Task Manager application with authentication and task management functionality. The backend is built using Node.js, Express, and PostgreSQL, while the frontend is built with React and Vite.

## Features
- User authentication (Register & Login)
- JWT-based authentication
- Task management (Create, Read, Update, Delete)
- Protected routes for authenticated users
- PostgreSQL database

## Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)
- [PostgreSQL](https://www.postgresql.org/)

## Environment Variables

### Backend (`.env`)
```env
PG_USER=myuser
DATABASE_URL=postgresql://myuser:mypassword@localhost:5434/mydatabase
PG_PASSWORD=mypassword
PG_DB=mydatabase
PG_HOST=localhost
PG_PORT=5434

JWT_SECRET="random@test1234"
PORT=5000
```

### Frontend (`.env`)
```env
VITE_API_URL=http://localhost:5000
```

## Running PostgreSQL with Docker
To start a PostgreSQL container using Docker, run:
```sh
docker run --name taskmanager-db -e POSTGRES_USER=myuser -e POSTGRES_PASSWORD=mypassword -e POSTGRES_DB=mydatabase -p 5434:5432 -d postgres
```
This will create and run a PostgreSQL container accessible on `localhost:5434`.

## Installation & Setup

### Backend Setup
1. Navigate to the backend folder:
   ```sh
   cd server
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the backend server:
   ```sh
   nodemon
   ```

### Frontend Setup
1. Navigate to the frontend folder:
   ```sh
   cd client
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend server:
   ```sh
   npm run dev
   ```

## API Endpoints

### Authentication
- `POST /api/v1/user/register` - Register a new user
- `POST /api/v1/user/login` - Login user and receive a JWT token
- `GET /api/v1/user/validate-token` - Validate authentication token

### Tasks (Protected Routes, Requires Authentication)
- `GET /api/v1/todo` - Fetch all tasks
- `POST /api/v1/todo` - Create a new task
- `PUT /api/v1/todo/:id` - Update an existing task
- `DELETE /api/v1/todo/:id` - Delete a task

## Frontend Routes
- `/` - Home Page
- `/login` - User Login Page
- `/register` - User Registration Page
- `/tasks` - **Protected Route** (Accessible only after login)

## Notes
- Make sure the PostgreSQL container is running before starting the backend.
- The backend should be running on port `5000`, and the frontend communicates with it via `VITE_API_URL=http://localhost:5000`.
- The `/tasks` route in the frontend is protected, requiring successful authentication.

## License
This project is licensed under the MIT License.

---
🚀 Happy Coding!

