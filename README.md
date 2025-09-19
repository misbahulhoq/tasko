# Task Management App

The front-end part of a task management application built with Next.js, TypeScript, and Tailwind CSS. It allows users to sign up, log in, and manage their tasks. The application uses Redux Toolkit for state management and RTK Query for data fetching. End-to-end testing is done with Cypress, and unit testing with Jest and React Testing Library.

⚠️ **Note:** This is only the **front-end** part of the project.  
The **back-end server must be set up and running first** in order for the front-end to work properly. You can find the backend repository and setup instructions [here](https://github.com/misbahulhoq/api-tasko).

---

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
- **Backend**: Node.js, Express.js, Mongodb, Mongoose
- **Testing**: Cypress, Jest, React Testing Library
- **Linting/Formatting**: ESLint, Prettier

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm
- Backend server running (see [backend setup](https://github.com/misbahulhoq/api-tasko))

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/misbahulhoq/tasko
    ```
2.  Navigate to the project directory:
    ```bash
    cd tasko
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
  pnpm cy:open
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

## Contributing

Contributions are welcome! Please feel free to open an issue or submit a pull request.
