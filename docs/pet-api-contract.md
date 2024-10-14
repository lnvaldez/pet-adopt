# Pet Service API Contract

**Base URL:** `/pets`

## Endpoints

### Add New Pet

- **Method:** `POST`
- **Endpoint:** `/`
- **Request Body:**
  ```json
  {
    "name": "string",
    "type": "string",
    "age": "number"
  }
  ```
- **Responses:**
  - **201 Created**
    ```json
    {
      "message": "Pet added."
    }
    ```
  - **500 Internal Server Error**
    ```json
    {
      "error": "Failed to add pet."
    }
    ```

### Get Available Pets

- **Method:** `GET`
- **Endpoint:** `/available`
- **Responses:**
  - **200 OK**
    ```json
    [
      {
        "id": "string",
        "name": "string",
        "type": "string",
        "age": "number",
        "status": "string"
      }
    ]
    ```
  - **500 Internal Server Error**
    ```json
    {
      "error": "Failed to get all available pets."
    }
    ```

### Update Pet Name

- **Method:** `PUT`
- **Endpoint:** `/`
- **Request Body:**
  ```json
  {
    "newName": "string",
    "name": "string"
  }
  ```
- **Responses:**
  - **201 Created**
    ```json
    {
      "message": "Updated pet name."
    }
    ```
  - **500 Internal Server Error**
    ```json
    {
      "error": "Failed to update pet name."
    }
    ```

### Delete Pet

- **Method:** `DELETE`
- **Endpoint:** `/`
- **Request Body:**
  ```json
  {
    "name": "string"
  }
  ```
- **Responses:**
  - **204 No Content**
  - **500 Internal Server Error**
    ```json
    {
      "error": "Failed to delete pet from database."
    }
    ```
