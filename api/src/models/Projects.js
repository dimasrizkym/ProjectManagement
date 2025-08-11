const mongoose = require("mongoose");

const projecrSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },

    completed: {
      type: Boolean,
      default: false,
    },

    dueDate: {
      type: Date,
      required: true,
    },

    tags: {
      type: [String],
      required: true,
    },

    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      required: true,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    collabolators: [
      {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);
