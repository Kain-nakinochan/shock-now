# shock-now

This repository contains a monorepo setup with a React frontend and a Node.js +
Express backend.

- **frontend**: React application
- **backend**: Express server

CI is configured with GitHub Actions in `.github/workflows/main.yml`.

## Development with Docker Compose

Run the application with PostgreSQL using Docker Compose:

```bash
docker-compose up --build
```

After the containers are up, apply Prisma migrations:

```bash
cd backend
npx prisma migrate dev
```

This will initialize the database with the `User` table defined in
`prisma/schema.prisma`.
