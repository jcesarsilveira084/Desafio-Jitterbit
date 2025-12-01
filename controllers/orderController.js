// controllers/orderController.js
const Order = require('../models/order');

/**
 * Helper: map incoming request JSON to internal DB model shape
 * Incoming example:
 * {
 *   "numeroPedido": "v10089015vdb-01",
 *   "valorTotal": 10000,
 *   "dataCriacao": "2023-07-19T12:24:11.5299601+00:00",
 *   "items": [
 *     { "idItem": "2434", "quantidadeItem": 1, "valorItem": 1000 }
 *   ]
 * }
 *
 * Mapped to:
 * {
 *   orderId: "...",
 *   value: ...,
 *   creationDate: Date,
 *   items: [ { productId: Number, quantity, price } ]
 * }
 */
function mapRequestToOrder(body) {
  if (!body) throw new Error('Request body is required');

  const orderId = body.numeroPedido || body.orderId;
  const value = body.valorTotal !== undefined ? body.valorTotal : body.value;
  const creationDateRaw = body.dataCriacao || body.creationDate;
  const creationDate = creationDateRaw ? new Date(creationDateRaw) : new Date();
  const itemsIn = Array.isArray(body.items) ? body.items : [];

  const items = itemsIn.map(it => {
    // Accept string or number product id; convert to number
    const productId = Number(it.idItem ?? it.productId);
    const quantity = Number(it.quantidadeItem ?? it.quantity);
    const price = Number(it.valorItem ?? it.price);

    return { productId, quantity, price };
  });

  return { orderId, value, creationDate, items };
}

// Create a new order
exports.createOrder = async (req, res) => {
  const body = req.body;
  // Basic validation
  if (!body.numeroPedido && !body.orderId) {
    return res.status(400).json({ error: 'numeroPedido (order identifier) is required' });
  }
  try {
    const mapped = mapRequestToOrder(body);

    // More validations
    if (!mapped.orderId) return res.status(400).json({ error: 'orderId mapping failed' });
    if (mapped.value === undefined || Number.isNaN(Number(mapped.value))) {
      return res.status(400).json({ error: 'value (valorTotal) is required and must be a number' });
    }
    if (!Array.isArray(mapped.items) || mapped.items.some(i => Number.isNaN(i.productId) || Number.isNaN(i.quantity) || Number.isNaN(i.price))) {
      return res.status(400).json({ error: 'items must be an array of objects with numeric productId, quantity and price' });
    }

    const existing = await Order.findOne({ orderId: mapped.orderId });
    if (existing) return res.status(409).json({ error: 'Order with this orderId already exists' });

    const created = await Order.create(mapped);
    return res.status(201).json(created);
  } catch (err) {
    console.error('createOrder error', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Get order by orderId (route param)
exports.getOrder = async (req, res) => {
  const orderId = req.params.orderId;
  if (!orderId) return res.status(400).json({ error: 'orderId parameter is required' });

  const order = await Order.findOne({ orderId });
  if (!order) return res.status(404).json({ error: 'Order not found' });

  return res.status(200).json(order);
};

// List all orders
exports.listOrders = async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 }).limit(1000);
  return res.status(200).json(orders);
};

// Update order by orderId
exports.updateOrder = async (req, res) => {
  const orderId = req.params.orderId;
  if (!orderId) return res.status(400).json({ error: 'orderId parameter is required' });

  const existing = await Order.findOne({ orderId });
  if (!existing) return res.status(404).json({ error: 'Order not found' });

  // Accept incoming same JSON shape as create
  const mapped = mapRequestToOrder(req.body);

  // Only update fields that are provided
  if (mapped.value !== undefined) existing.value = mapped.value;
  if (mapped.creationDate) existing.creationDate = mapped.creationDate;
  if (Array.isArray(mapped.items) && mapped.items.length > 0) existing.items = mapped.items;

  await existing.save();
  return res.status(200).json(existing);
};

// Delete order by orderId
exports.deleteOrder = async (req, res) => {
  const orderId = req.params.orderId;
  if (!orderId) return res.status(400).json({ error: 'orderId parameter is required' });

  const existing = await Order.findOne({ orderId });
  if (!existing) return res.status(404).json({ error: 'Order not found' });

  await Order.deleteOne({ orderId });
  // 204 No Content could be used, but we'll return 200 with a message
  return res.status(200).json({ message: 'Order deleted' });
};
