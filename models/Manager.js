import { Schema, model, models } from "mongoose";

const managerSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
  costumers: [
    {
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
    },
  ],
});

const Manager = models.Manager || model("Manager", managerSchema);

export default Manager;
