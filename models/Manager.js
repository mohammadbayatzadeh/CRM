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
      firstName_EN: {
        type: String,
        required: true,
      },
      firstName_FA: {
        type: String,
        required: true,
      },
      lastName_EN: {
        type: String,
        required: true,
      },
      lastName_FA: {
        type: String,
        required: true,
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
