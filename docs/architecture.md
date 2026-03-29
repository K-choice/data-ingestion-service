# Architecture Overview

## Introduction
The Data Ingestion Service is designed to collect user data from an external API, process it, and store it in a relational database (MySQL or PostgreSQL). This document outlines the architecture of the service, including its components, interactions, and data flow.

## Components

### 1. External API Client
- **Location**: `src/api/externalApiClient.ts`
- **Description**: This component is responsible for interacting with the external API to fetch user data. It includes methods to handle API requests and manage errors effectively.

### 2. Database
- **Location**: `src/db/index.ts`
- **Description**: The Database component manages the connection to the MySQL or PostgreSQL database. It handles database initialization, table creation, and data insertion. The schema for the users table is defined in the migration file.

### 3. Data Ingestion
- **Location**: `src/ingestion/ingestData.ts`
- **Description**: This component orchestrates the data retrieval and storage process. It fetches user data from the external API, filters the data as necessary, and inserts the valid records into the database.

### 4. Data Retrieval
- **Location**: `src/retrieval/getData.ts`
- **Description**: The Data Retrieval component is responsible for fetching user data from the database. It includes logic to prevent duplicate entries and ensure data integrity.

### 5. Reliability
- **Location**: `src/reliability/retryHandler.ts`
- **Description**: This component implements retry logic to handle failures such as API unavailability or database connection issues. It logs errors and retries operations based on predefined conditions.

### 6. Application Entry Point
- **Location**: `src/index.ts`
- **Description**: This file serves as the entry point for the application. It initializes the database connection, triggers the data ingestion process, and manages the overall application lifecycle.

## Data Flow
1. The application starts and initializes the database connection.
2. The `ingestData` function is called to fetch user data from the external API.
3. The `ExternalApiClient` retrieves the data and handles any API errors.
4. The retrieved data is filtered and passed to the `Database` component for insertion.
5. The `getData` function can be called to retrieve user data from the database as needed.

## Deployment
The application is containerized using Docker. The `docker-compose.yml` file defines the services for the application and the database, ensuring a consistent environment for development and production.

## Conclusion
This architecture provides a robust framework for ingesting, storing, and retrieving user data while ensuring reliability and maintainability. The modular design allows for easy updates and scalability as the project evolves.