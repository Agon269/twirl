const mongoose = require("mongoose");

const solutionSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    video: {
      type: String,
      required: true,
    },
    comments: {
      type: Array,
    },
    category: {
      type: String,
    },
    thumbnail: {
      type: String,
    },
    problem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Problem",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

const Solution = mongoose.model("Solution", solutionSchema);

module.exports = Solution;
