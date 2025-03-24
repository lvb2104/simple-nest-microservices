# NestJS Microservices Tutorial

This project demonstrates a simple microservices architecture using NestJS framework. The system consists of three separate services that communicate with each other using TCP transport.

## Architecture Overview

```
                   ┌─────────────────┐
                   │                 │
  HTTP Clients ───►│  sample-backend │
                   │     (3000)      │
                   │                 │
                   └────────┬────────┘
                            │
                            │ TCP Events/Messages
                            │
                ┌───────────┴───────────┐
                │                       │
    ┌───────────▼─────────┐   ┌─────────▼───────────┐
    │                     │   │                     │
    │ sample-communication│   │  sample-analytics   │
    │       (3001)        │   │    (3002/3003)      │
    │                     │   │                     │
    └─────────────────────┘   └─────────────────────┘
```

## Services

### sample-backend (Port 3000)

- Acts as an API gateway for clients
- Communicates with other microservices using TCP
- Endpoints:
  - GET / - Returns a hello message
  - POST / - Creates a user and emits events
  - GET /analytics - Returns analytics data from the analytics service

### sample-communication (Port 3001)

- Microservice dedicated to communication tasks
- Listens for "user_created" events
- Would typically handle email notifications, SMS, etc.

### sample-analytics (Port 3002/3003)

- Tracks user analytics
- TCP service on port 3002 for internal communication
- HTTP service on port 3003 for direct API access
- Stores user creation events for analytics purposes

## Event Flow

1. Client sends a request to create a user to the backend service
2. Backend service stores the user and emits "user_created" events to both microservices
3. Communication service receives the event and would send notifications (currently just logs the event)
4. Analytics service stores the event data for future analysis
5. Analytics data can be retrieved via the backend's GET /analytics endpoint

## Running the Services

Start each service in a separate terminal:

```bash
# Terminal 1: Start the Communication Service
cd sample-communication
npm install
npm run start:dev

# Terminal 2: Start the Analytics Service
cd sample-analytics
npm install
npm run start:dev

# Terminal 3: Start the Backend Service
cd sample-backend
npm install
npm run start:dev
```

## API Documentation

### Create User

```text
POST http://localhost:3000/
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

### Get Analytics

```text
GET http://localhost:3000/analytics
```

### Hello World

```text
GET http://localhost:3000/
```

## Patterns

### Event Patterns

- `user_created` - Emitted when a user is created, payload contains email

### Message Patterns

- `{ cmd: 'get_analytics' }` - Request to get analytics data

## Project Structure

Each service follows the standard NestJS structure:

- `src/main.ts` - Service bootstrap
- `src/app.module.ts` - Module definitions and dependencies
- `src/app.controller.ts` - HTTP controllers and event handlers
- `src/app.service.ts` - Business logic

## Technology Stack

- NestJS - Framework
- TCP Transport - For microservice communication
- TypeScript - Programming language

## Development

To modify or extend this project:

1. Understand the event flow between services
2. Add new endpoints or event handlers as needed
3. Use the existing DTO and event classes for consistency
