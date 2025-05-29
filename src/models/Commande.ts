import mongoose, { Schema, model, models } from "mongoose";

const CommandeSchema = new Schema({
  items: [
    {
      name: String,
      quantity: Number,
      price: Number,
      total: Number,
    },
  ],
  total: Number,
  createdAt: { type: Date, default: Date.now },
});

export const Commande = models.Commande || model("Commande", CommandeSchema);
