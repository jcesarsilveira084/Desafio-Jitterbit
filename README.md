# Jitterbit Order API
API created to satisfy the Jitterbit test challenge: CRUD for orders with mapping logic.

## Tech stack
- Node.js
- Express
- MongoDB (Mongoose)

## Project structure
- `app.js` - entry point
- `routes/` - route definitions
- `controllers/` - request handlers and mapping logic
- `models/` - Mongoose models
- `utils/` - error handlers

## How it works (mapping)
Incoming JSON example:
```json
{
  "numeroPedido": "v10089015vdb-01",
  "valorTotal": 10000,
  "dataCriacao": "2023-07-19T12:24:11.5299601+00:00",
  "items": [
    { "idItem": "2434", "quantidadeItem": 1, "valorItem": 1000 }
  ]
}
```

The server maps it to:
```json
{
  "orderId": "v10089015vdb-01",
  "value": 10000,
  "creationDate": "2023-07-19T12:24:11.529Z",
  "items": [
    { "productId": 2434, "quantity": 1, "price": 1000 }
  ]
}
```

## Endpoints
- `POST /order` - create new order
- `GET /order/:orderId` - get order by id
- `GET /order/list` - list orders
- `PUT /order/:orderId` - update order
- `DELETE /order/:orderId` - delete order

## Example curl (create)
```bash
curl --location 'http://localhost:3000/order' \
--header 'Content-Type: application/json' \
--data '{
  "numeroPedido": "v10089015vdb-01",
  "valorTotal": 10000,
  "dataCriacao": "2023-07-19T12:24:11.5299601+00:00",
  "items": [
    {
      "idItem": "2434",
      "quantidadeItem": 1,
      "valorItem": 1000
    }
  ]
}'
```

## Running locally
1. Install dependencies:
   ```bash
   npm install
   ```
2. Provide MongoDB connection string in `.env` (see `.env.example`) or run local MongoDB
3. Start server:
   ```bash
   npm start
   ```
4. Server will run on `http://localhost:3000` by default.
