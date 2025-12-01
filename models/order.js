// models/order.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema(
  {
    productId: { type: Number, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
  },
  { _id: false }
);

const OrderSchema = new Schema(
  {
    orderId: { type: String, required: true, unique: true },
    value: { type: Number, required: true },
    creationDate: { type: Date, required: true },
    items: { type: [ItemSchema], default: [] }
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.__v;
        delete ret.createdAt;
        delete ret.updatedAt;
        return ret;
      }
    }
  }
);

module.exports = mongoose.model('Order', OrderSchema);
