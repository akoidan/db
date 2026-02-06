# Messaging API

A Koa.js application with MongoDB integration for managing users and messages.

## Features

- User management with CRUD operations
- Message entity linked to users
- MongoDB integration with Mongoose ODM
- Docker containerization for both app and database
- RESTful API endpoints

## API Endpoints

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get a specific user
- `POST /api/users` - Create a new user
- `PUT /api/users/:id` - Update a user
- `DELETE /api/users/:id` - Delete a user and their messages
- `GET /api/users/:id/messages` - Get all messages for a user

## Setup with Docker

1. Build and run the containers:
```bash
docker-compose up --build
```

2. The API will be available at `http://localhost:3000`
3. MongoDB will be available at `mongodb://localhost:27017`

## Manual Setup

1. Install dependencies:
```bash
yarn install
```

2. Set up environment variables in `.env`:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/messaging-app
NODE_ENV=development
```

3. Start the application:
```bash
yarn start
```

## Database Schema

### User
- username (String, unique, required)
- email (String, unique, required)
- firstName (String, required)
- lastName (String, required)
- createdAt (Date)
- updatedAt (Date)

### Message
- content (String, required)
- user (ObjectId, ref: User, required)
- createdAt (Date)
- updatedAt (Date)

## Example Usage

### Create a user
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "email": "john@example.com",
    "firstName": "John",
    "lastName": "Doe"
  }'
```

### Get all users
```bash
curl http://localhost:3000/api/users
```

### Get user's messages
```bash
curl http://localhost:3000/api/users/{userId}/messages
```
