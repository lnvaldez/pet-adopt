# User Service API Contract

**Base URL:** `/user`

## Endpoints

### Create New User

- **Method:** `POST`
- **Endpoint:** `/new`
- **Request Body:**
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string"
  }
  ```
- **Responses:**
  - **201 Created**
    ```json
    {
      "message": "User added."
    }
    ```
  - **500 Internal Server Error**
    ```json
    {
      "error": "Failed to add user."
    }
    ```

### Verify User

- **Method:** `POST`
- **Endpoint:** `/verify`
- **Request Body:**
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Responses:**
  - **200 OK**
    ```json
    {
      "success": true,
      "token": "string",
      "user": {
        "id": "string",
        "email": "string"
      }
    }
    ```
  - **401 Unauthorized**
    ```json
    {
      "success": false,
      "message": "Invalid credentials."
    }
    ```
  - **500 Internal Server Error**
    ```json
    {
      "success": false,
      "message": "Login failed",
      "error": "error message"
    }
    ```
