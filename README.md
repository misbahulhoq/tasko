# Task Management App

A full-stack task management application built with Next.js, TypeScript, and Tailwind CSS. It allows users to sign up, log in, and manage their tasks. The application uses Redux Toolkit for state management and RTK Query for data fetching. End-to-end testing is done with Cypress, and unit testing with Jest and React Testing Library.

## Features

- User authentication (signup, login, logout)
- JWT-based authentication
- Create, read, and delete tasks
- Task status management (pending, in-progress, completed)
- Responsive design
- API for task and user management
- End-to-end and unit tests

## Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS, DaisyUI, Redux Toolkit, RTK Query
- **Backend**: Next.js API Routes
- **Testing**: Cypress, Jest, React Testing Library
- **Linting/Formatting**: ESLint, Prettier

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/taskmanagement.git
    ```
2.  Navigate to the project directory:
    ```bash
    cd taskmanagement
    ```
3.  Install the dependencies:
    ```bash
    pnpm install
    ```

### Running the Development Server

To run the application in development mode, use the following command:

```bash
pnpm dev
```

The application will be available at `http://localhost:3000`.

### Running Tests

- **Unit Tests**:
  ```bash
  pnpm test
  ```
- **End-to-End Tests**:
  ```bash
  pnpm cypress:open
  ```

## Environment Variables

Create a `.env.local` file in the root of the project and add the following environment variables:

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
JWT_SECRET=your-jwt-secret
```

## Folder Structure

```
.
├── cypress/              # End-to-end tests
├── public/               # Static assets
├── src/
│   ├── app/              # Application routes and pages
│   ├── components/       # Reusable React components
│   ├── hooks/            # Custom React hooks
│   ├── interfaces/       # TypeScript interfaces
│   ├── redux/            # Redux store and slices
│   ├── tests/            # Unit and integration tests
│   └── utils/            # Utility functions
├── .gitignore
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

## API Endpoints

- `POST /api/auth/signup`: User registration
- `POST /api/auth/login`: User login
- `GET /api/tasks`: Fetch all tasks for the logged-in user
- `POST /api/tasks`: Create a new task
- `DELETE /api/tasks/:id`: Delete a task

## Contributing

Contributions are welcome! Please feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
