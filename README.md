# Desktop App Backend Server

This is the backend server for the Desktop App project. The server is built using Express and TypeScript, and it uses a JSON file (`db.json`) as a database to store submissions. The frontend interacts with this server to save and retrieve submissions.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14 or later)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

## Installation

1. **Clone the Repository**

    ```sh
    git clone https://github.com/sujay-deshpande/slidelyai-backend.git
    cd desktop-app-backend
    ```

2. **Install Dependencies**

    ```sh
    npm install
    ```

## Configuration

1. **Create `db.json` File**

    In the root directory of the project, create a `db.json` file to store the submissions. The file should have the following initial structure:

    ```json
    {
        "submissions": []
    }
    ```

## Running the Server

1. **Compile TypeScript**

    ```sh
    npm run build
    ```

2. **Start the Server**

    ```sh
    npm start
    ```

    The server will start on `http://localhost:3000`.

## API Endpoints

### Ping

- **URL:** `/ping`
- **Method:** `GET`
- **Description:** Check if the server is running.
- **Response:** `true`

### Submit

- **URL:** `/submit`
- **Method:** `POST`
- **Description:** Submit a new form entry.
- **Parameters:**
    - `name` (string)
    - `email` (string)
    - `phone` (string)
    - `github_link` (string)
    - `stopwatch_time` (string)
- **Response:** `Submission successful`

### Read

- **URL:** `/read`
- **Method:** `GET`
- **Description:** Retrieve a form entry by index.
- **Query Parameter:** 
    - `index` (number) - The 0-based index of the form entry to retrieve.
- **Response:** JSON object of the form entry.

### Search

- **URL:** `/search`
- **Method:** `GET`
- **Description:** Search form entries by name.
- **Query Parameters:**
    - `name` (string) - The name to search for.
    - `page` (number, optional) - The page number for pagination (default: 1).
    - `limit` (number, optional) - The number of results per page (default: 5).
- **Response:** JSON object containing paginated results and pagination info.

## Project Structure

```
├── src
│ ├── index.ts # Entry point of the server
├── db.json # JSON file used as the database
├── package.json # Project metadata and dependencies
├── tsconfig.json # TypeScript configuration
└── README.md # This file
```

