const mongoose = require("mongoose");

const refreshTokenSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, require: true },
  token: { type: String, require: true },
  createdAt: { type: Date, default: Date.now, expires: 30 * 86400 },
});

const RefreshToken = mongoose.model("RefreshToken", refreshTokenSchema);

module.exports = RefreshToken;
