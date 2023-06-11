import { Schema, models, model } from "mongoose";

const costumerSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 3,
  },
  lastName: {
    type: String,
    required: true,
    minLength: 3,
  },
  email: {
    type: String,
    required: true,
    minLength: 5,
  },
  phone: String,
  city: String,
  products: {
    type: [Object],
    default: [],
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
});

const Costumer = models.Costumer || model("Costumer", costumerSchema);

export default Costumer;
