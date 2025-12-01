## 📦 Jitterbit Order API

API criada para o desafio técnico da Jitterbit, permitindo criar, listar, atualizar e deletar pedidos, com transformação de dados conforme especificação.

## 🚀 Tecnologias utilizadas

- Node.js

- Express

- MongoDB (via Mongoose)

- Docker + Docker Compose

- JavaScript (ES6)

## 🧩 Descrição do desafio

Criar uma API responsável por gerenciar pedidos.
A API deve:

-  Criar pedidos
-  Listar pedidos
-  Buscar pedido por ID
-  Atualizar pedido
-  Excluir pedido
-  Salvar no banco de dados
-  Transformar o JSON de entrada no formato exigido

## 🔁 Mapeamento de campos (transformação)
Entrando na API
```bash
{
  "numeroPedido": "v10089015vdb-01",
  "valorTotal": 10000,
  "dataCriacao": "2023-07-19T12:24:11.5299601+00:00",
  "items": [
    { "idItem": "2434", "quantidadeItem": 1, "valorItem": 1000 }
  ]
}
```
Salvo no banco
```bash
{
  "orderId": "v10089015vdb-01",
  "value": 10000,
  "creationDate": "2023-07-19T12:24:11.529Z",
  "items": [
    { "productId": 2434, "quantity": 1, "price": 1000 }
  ]
}
```

## 🐳 Rodando com Docker (recomendado)

### 1️⃣ Clonar o repositório
  - `git clone https://github.com/SEU_USUARIO/jitterbit-order-api.git`
  - `cd jitterbit-order-api`

### 2️⃣ Subir a aplicação
  - `docker compose up --build`

A API estará rodando em:

👉 http://localhost:3000

## 🔌 Endpoints
- `POST /order` - create new order
- `GET /order/:orderId` - get order by id
- `GET /order/list` - list orders
- `PUT /order/:orderId` - update order
- `DELETE /order/:orderId` - delete order

## 🧪 Exemplos de CURL
Criar
```bash
curl -X POST http://localhost:3000/order \
  -H "Content-Type: application/json" \
  -d "{\"numeroPedido\":\"v10089015vdb-01\",\"valorTotal\":10000,\"dataCriacao\":\"2023-07-19T12:24:11.5299601+00:00\",\"items\":[{\"idItem\":\"2434\",\"quantidadeItem\":1,\"valorItem\":1000}]}"
```
Listar
curl http://localhost:3000/order/list

## 🧱 Estrutura do banco (MongoDB)
```bash
{
  "orderId": "string",
  "value": "number",
  "creationDate": "date",
  "items": [
    {
      "productId": "number",
      "quantity": "number",
      "price": "number"
    }
  ]
}
```

## 📌 Como rodar sem Docker (alternativa)

Requer Node 18+.
- `npm install`
- `npm start`

O banco deve estar rodando localmente:
- `mongodb://localhost:27017/jitterbit_orders`

## 🚀 Autor
  - Julio Cesar Silveira
  - LinkedIn: https://www.linkedin.com/in/jcs084