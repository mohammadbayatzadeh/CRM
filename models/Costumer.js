import { Schema, models, model } from "mongoose";

const costumerSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 5,
  },
  lastName: {
    type: String,
    required: true,
    minLength: 5,
  },
  email: {
    type: String,
    required: true,
    minLength: 5,
  },
  phone: String,
  city: String,
  products: {
    type: [String],
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
