# Verkefni 3

## Project Setup

1. Clone the repository:
    ```sh
    git clone <repository-url>
    cd <repository-directory>
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

## Running the Project

1. Start the development server:
    ```sh
    npm run dev
    ```

2. Open your browser and navigate to:
    ```
    http://localhost:3000
    ```

## Running Tests

Run all tests:
    ```sh
    npm test
    ```

## Environment Variables

Create a `.env` file in the root directory and add the following environment variables:
    ```
    DATABASE_URL=your_database_url
    ```

## Database Setup

1. Apply database migrations:
    ```sh
    npx prisma migrate dev
    ```

2. Generate Prisma client:
    ```sh
    npx prisma generate
    ```

## Additional Information

- This project uses [Prisma](https://www.prisma.io/) as the ORM.
- The API is built using [Hono](https://hono.dev/).
- The project is written in TypeScript.

