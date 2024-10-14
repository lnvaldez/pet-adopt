# Adoption Service API Contract

**Base URL:** `/adopt`

## Endpoints

### Adopt a Pet

- **Method:** `POST`
- **Endpoint:** `/`
- **Request Body:**
  ```json
  {
    "petId": "string",
    "adopterId": "string"
  }
  ```
- **Responses:**
  - **201 Created**
    ```json
    {
      "message": "Adoption successful."
    }
    ```
  - **500 Internal Server Error**
    ```json
    {
      "error": "Failed to adopt a pet."
    }
    ```
