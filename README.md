# Task Manager API

Express and Mongoose REST API for managing tasks in MongoDB.

## Run the API

1. Ensure MongoDB is running locally, or set `MONGO_URI` in `.env` to a MongoDB Atlas connection string.
2. Install dependencies:

```bash
npm install
```

3. Start the server:

```bash
npm run server
```

The API runs at `http://localhost:5000`.

Set `JWT_SECRET` in `.env` to a long private value. The included development value is only for local testing.

## Authentication

Register a user:

```http
POST /register
Content-Type: application/json
```

```json
{
  "email": "user@example.com",
  "password": "secret123"
}
```

Log in with the same credentials:

```http
POST /login
Content-Type: application/json
```

The response contains a JWT valid for one hour. Send it with every task request:

```http
Authorization: Bearer <token>
```

## Task schema

- `title`: String, required
- `description`: String, defaults to an empty string
- `completed`: Boolean, defaults to `false`
- `createdAt`: Date, defaults to the current time

## Endpoints

| Method | URL | Success status |
| --- | --- | --- |
| GET | `/tasks` | 200 |
| POST | `/tasks` | 201 |
| PUT | `/tasks/:id` | 200 |
| DELETE | `/tasks/:id` | 200 |

All task routes require a valid JWT. Requests without a token return `401`.

Create a task with `POST /tasks` and this JSON body:

```json
{
  "title": "Complete assignment",
  "description": "Build and test the API",
  "completed": false
}
```

Missing task IDs return `404`. Validation failures return structured JSON with status `400`. Unexpected errors return `{ "error": "Something went wrong." }` with status `500`. Request method, URL, and timestamp are logged globally.
