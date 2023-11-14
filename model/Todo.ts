import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema(
  {
    todo: {
      type: String,
      required: [true, "Todo is required!"],
      minLength: [3, "{MINLENGTH} letters minimum!"],
      maxLength: [64, "{MAXLENGTH} letters maximum!"],
    },
    isCompleted: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Todo || mongoose.model("Todo", TodoSchema);
