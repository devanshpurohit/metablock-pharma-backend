import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  image: {
    type: String
  }
});

const addressSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  country: { type: String, required: true },
  province: { type: String, required: true },
  district: { type: String, required: true },
  neighborhood: { type: String, required: true },
  postCode: { type: String, required: true },
  address: { type: String, required: true }
});

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    items: [orderItemSchema],
    billingAddress: addressSchema,
    shippingAddress: addressSchema,
    shippingAddressSameAsBilling: {
      type: Boolean,
      default: true
    },
    deliveryMethod: {
      name: { type: String, required: true }, // Regular Shipping Cost / Regular Shipping Cost + Insurance
      cost: { type: Number, required: true }
    },
    paymentMethod: {
      type: String, // Zelle, Western Union, RIA, Bitcoin
      required: true
    },
    paymentFeePercent: {
      type: Number,
      default: 0
    },
    discountPercent: {
      type: Number,
      default: 0
    },
    subTotal: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'processing', 'completed', 'cancelled'],
      default: 'pending'
    }
  },
  { timestamps: true }
);

export default mongoose.model('Order', orderSchema);
