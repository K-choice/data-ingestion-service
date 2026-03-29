# API Documentation

## Overview

This document provides details about the API endpoints used in the data ingestion service. The service collects user data from an external API and stores it in a database. 

## Endpoints

### 1. Fetch Users from External API

- **Endpoint:** `GET /api/users`
- **Description:** Retrieves all users from the external API.
- **Response:**
  - **200 OK**
    - Content-Type: application/json
    - Body: 
      ```json
      [
        {
          "id": 1,
          "name": "John Doe",
          "email": "john.doe@example.com"
        },
        {
          "id": 2,
          "name": "Jane Smith",
          "email": "jane.smith@example.com"
        }
      ]
      ```
  - **Error Responses:**
    - **500 Internal Server Error**
      - Description: Indicates an error occurred while fetching data from the external API.

### 2. Store Users in Database

- **Endpoint:** `POST /api/users`
- **Description:** Stores the fetched user data into the database.
- **Request:**
  - Content-Type: application/json
  - Body: 
    ```json
    {
      "users": [
        {
          "name": "John Doe",
          "email": "john.doe@example.com"
        },
        {
          "name": "Jane Smith",
          "email": "jane.smith@example.com"
        }
      ]
    }
    ```
- **Response:**
  - **201 Created**
    - Content-Type: application/json
    - Body: 
      ```json
      {
        "message": "Users successfully stored."
      }
      ```
  - **Error Responses:**
    - **400 Bad Request**
      - Description: Indicates that the request body is invalid.
    - **500 Internal Server Error**
      - Description: Indicates an error occurred while storing data in the database.

### 3. Retrieve Users from Database

- **Endpoint:** `GET /api/users/retrieve`
- **Description:** Retrieves all stored users from the database.
- **Response:**
  - **200 OK**
    - Content-Type: application/json
    - Body: 
      ```json
      [
        {
          "id": 1,
          "name": "John Doe",
          "email": "john.doe@example.com"
        },
        {
          "id": 2,
          "name": "Jane Smith",
          "email": "jane.smith@example.com"
        }
      ]
      ```
  - **Error Responses:**
    - **500 Internal Server Error**
      - Description: Indicates an error occurred while retrieving data from the database.

## Error Handling

The service implements retry logic for handling failures such as API unavailability and database readiness. Errors are logged for troubleshooting purposes.

## Conclusion

This API documentation outlines the endpoints available in the data ingestion service. For further details on the system architecture and setup, please refer to the other documentation files.