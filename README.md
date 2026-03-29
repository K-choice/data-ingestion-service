# Data Ingestion Service

## Overview
This project is a TypeScript-based data ingestion service. It gets user data from the JSONPlaceholder API, checks the required fields, calculates the character count of each user name, and stores the result in PostgreSQL.

The project is containerized with Docker Compose so that the application and database can run together with one command.

## Features
- Fetches user data from https://jsonplaceholder.typicode.com/users
- Filters users with valid name and email data
- Stores the data in PostgreSQL
- Prevents duplicate users by using unique email constraint
- Calculates and stores `name_character_count`
- Uses Docker Compose for easier setup and running
- Includes extra documentation for architecture and API notes

## Project Structure
```text
data-ingestion-service
├── src
│   ├── api
│   │   └── externalApiClient.ts
│   ├── db
│   │   ├── index.ts
│   │   └── migrations
│   │       └── init.sql
│   ├── ingestion
│   │   └── ingestData.ts
│   ├── retrieval
│   │   └── getData.ts
│   ├── reliability
│   │   └── retryHandler.ts
│   └── index.ts
├── docker-compose.yml
├── Dockerfile
├── package.json
├── tsconfig.json
├── .env.example
├── .env
├── README.md
└── docs
    ├── architecture.md
    └── api.md
```

## Prerequisites
- Docker and Docker Compose
- Node.js 14 or above for local development
- npm

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <repository-url>
cd data-ingestion-service
```

### 2. Create the Environment File
Please copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Then update `.env` with your own values:

```env
DATABASE_URL=postgres://your_db_user:your_db_password@db:5432/your_db_name
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
API_BASE_URL=https://jsonplaceholder.typicode.com
API_KEY=
RETRY_COUNT=3
RETRY_DELAY=1000
```

Please note that when running with Docker, the database host should be `db` and not `localhost`.

### 3. Start the Services
After the environment file is ready, run:

```bash
docker-compose up --build
```

This command will do the following:
- Build the Node.js application image
- Start the PostgreSQL container
- Run the database initialization script
- Start the ingestion process automatically

### 4. Verify the Data
When the service starts, it will connect to the database, create the table if needed, fetch the users, and insert them.

To check the inserted data, you can run:

```bash
docker-compose exec db psql -U <db_user> -d <db_name> -c "SELECT * FROM users;"
```

You should see the user records with ID, name, email, and name character count.

## How It Works

### Data Ingestion Flow
1. The service fetches users from the JSONPlaceholder API.
2. It filters the records and keeps only users with valid name and email values.
3. It calculates the character count of the user name.
4. It stores the data in PostgreSQL.
5. Duplicate records are prevented by the unique email constraint.

### Database Schema
```sql
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    name_character_count INTEGER NOT NULL
);
```

## Usage

### Start
```bash
docker-compose up --build
```

### Stop
```bash
docker-compose down
```

### Stop and Remove Stored Data
```bash
docker-compose down -v
```

This will also remove the database volume.

### Query the Database
```bash
docker-compose exec db psql -U <db_user> -d <db_name> -c "SELECT * FROM users;"
```

### Open the Database Interactively
```bash
docker-compose exec db psql -U <db_user> -d <db_name>
```

Example SQL queries:

```sql
SELECT * FROM users;
SELECT COUNT(*) FROM users;
SELECT * FROM users WHERE name LIKE '%M%';
```

To exit, type `\q`.

### View Application Logs
```bash
docker-compose logs -f app
```

### View Database Logs
```bash
docker-compose logs -f db
```

## Assumptions
- The external API is available and returns valid user data
- Docker and Docker Compose are installed correctly
- The database credentials are set correctly in `.env`
- The application container can connect to the database container

## Troubleshooting

### Database connection refused
Please check that `DATABASE_URL` is using `db` as the hostname.

### Table does not exist
Please check whether the initialization script ran correctly:

```bash
docker-compose logs db
```

### Docker volume conflict
If there is a volume issue, you can remove the old volume and start again:

```bash
docker-compose down -v
docker-compose up --build
```

### Data is not showing after ingestion
The application container runs the ingestion and then exits. The data should still remain in the database volume. If you want to run it again from clean state, remove the volume and start again.

### Permission denied when connecting to Docker in WSL
You can add your user to the docker group:

```bash
sudo usermod -aG docker $USER
newgrp docker
```

### Check all logs
```bash
docker-compose logs -f
```

### Rebuild without cache
```bash
docker-compose build --no-cache
docker-compose up
```

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| DATABASE_URL | PostgreSQL connection string | `postgres://user:password@db:5432/database_name` |
| DB_USER | PostgreSQL username | `your_db_user` |
| DB_PASSWORD | PostgreSQL password | `your_db_password` |
| DB_NAME | PostgreSQL database name | `your_db_name` |
| API_BASE_URL | Base URL of the external API | `https://jsonplaceholder.typicode.com` |
| API_KEY | API key if required | Leave empty for JSONPlaceholder |
| RETRY_COUNT | Number of retry attempts | `3` |
| RETRY_DELAY | Delay between retries in milliseconds | `1000` |

## Technologies Used
- Node.js 14
- TypeScript
- PostgreSQL
- Docker and Docker Compose
- node-fetch
- pg

## Documentation
For more details, please refer to the following files:
- [Architecture Overview](docs/architecture.md)
- [API Documentation](docs/api.md)

## License
[Add your license here]

## Support
If there is any issue while running the project, please check the troubleshooting section first. If needed, an issue can also be created in the repository.