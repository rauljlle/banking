
# Account Management API

This is a simple Node.js API for managing accounts and handling financial operations such as deposits, withdrawals, and transfers. The project follows an MSC architecture with a focus on separation of concerns, organized into controllers, services, models, and utilities.

## Project Structure

```bash
.
├── index.ts
├── app
│   ├── controller.ts
│   ├── model.ts
│   └── service.ts
├── errors
│   └── HttpError.ts
├── interfaces
│   ├── account-info.ts
│   ├── event-request.ts
│   └── event-response.ts
└── utils
    └── DB.ts
```

## Features

- **Deposit**: Add funds to an account.
- **Withdraw**: Remove funds from an account.
- **Transfer**: Transfer funds between accounts.
- **Get Balance**: Check the balance of a specific account.
- **Reset**: Reset the account data in the mock database.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/rauljlle/ebanx
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the application:
   
   If you want to run it using dev mode:
   ```bash
   npm run dev
   ```

   Otherwise:
   ```bash
   npm run build
   npm run start
   ```

The server will run at `http://localhost:3000`.

## API Endpoints

### `GET /`

- **Description**: Returns a welcome message.
- **Response**: 
  - `200 OK`: `'Hire me ;)'`

### `GET /balance`

- **Description**: Get the balance of a specific account.
- **Query Parameters**:
  - `account_id`: ID of the account.
- **Response**: 
  - `200 OK`: Account balance.
  - `404 Not Found`: If the account does not exist.

### `POST /event`

- **Description**: Handle an event such as deposit, withdrawal, or transfer.
- **Body**:
  ```json
  {
    "type": "deposit | withdraw | transfer",
    "origin": "optional for deposit, required for others",
    "destination": "required for deposit and transfer",
    "amount": "number"
  }
  ```
- **Response**:
  - `201 Created`: Event was processed successfully.
  - `404 Not Found`: If required fields are missing or invalid.

### `POST /reset`

- **Description**: Reset the mock database (clear all accounts).
- **Response**: 
  - `200 OK`: Database reset successfully.

## Error Handling

- Custom `HttpError` class is used to handle errors and send appropriate HTTP status codes and messages.

## Technologies

- **Node.js**
- **Express**
- **TypeScript**
