const mongoose = require("mongoose");

export default function checkId(id: string) {
  return mongoose.Types.ObjectId.isValid(id)
  // return isValid
}
