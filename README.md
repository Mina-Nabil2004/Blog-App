# Blog App 

A RESTful Blog API built with **TypeScript**, **Node.js**, **Express**, and **Zod** for request validation. Uses in-memory storage.

---

## Project Structure

```
src/
├── controllers/       # Route handler functions
│   ├── postController.ts
│   └── userController.ts
├── errors/            # Custom error classes
│   └── ApiError.ts
├── middlewares/       # Express middleware
│   ├── errorHandler.ts
│   ├── logger.ts
│   └── validator.ts
├── routes/            # Express routers
│   ├── postRoutes.ts
│   └── userRoutes.ts
├── schemas/           # Zod schemas & TypeScript types
│   ├── postSchema.ts
│   └── userSchema.ts
├── services/          # Business logic / in-memory data layer
│   ├── postService.ts
│   └── userService.ts
├── app.ts             # Express app setup
└── server.ts          # Entry point
```

---

## Getting Started

### Prerequisites
- Node.js >= 18
- npm

### Install & Run

```bash
npm install
npm run dev
```

Server runs on `http://localhost:8080`

---

## API Endpoints

### Users

| Method | Endpoint      | Description         | Body                              |
|--------|---------------|---------------------|-----------------------------------|
| GET    | /users        | Get all users       | —                                 |
| GET    | /users/:id    | Get user by ID      | —                                 |
| POST   | /users        | Create a user       | `{ name, email, password }`       |
| PUT    | /users/:id    | Update a user       | `{ name?, email?, password? }`    |
| DELETE | /users/:id    | Delete a user       | —                                 |

> Passwords are never returned in responses.

### Posts

| Method | Endpoint      | Description         | Body                                   |
|--------|---------------|---------------------|----------------------------------------|
| GET    | /posts        | Get all posts       | —                                      |
| GET    | /posts/:id    | Get post by ID      | —                                      |
| POST   | /posts        | Create a post       | `{ title, content, authorId }`         |
| PUT    | /posts/:id    | Update a post       | `{ title?, content?, authorId? }`      |
| DELETE | /posts/:id    | Delete a post       | —                                      |

---

## Validation Rules

**User:**
- `name` — min 3 characters
- `email` — valid email format
- `password` — min 8 characters

**Post:**
- `title` — min 3 characters
- `content` — min 5 characters
- `authorId` — valid UUID

---

## Error Responses

All errors follow this shape:

```json
{
  "errors": {
    "field": "Error message"
  }
}
```

| Status | Meaning              |
|--------|----------------------|
| 400    | Validation error     |
| 404    | Resource not found   |
| 500    | Internal server error|