const jwt = require("jsonwebtoken");
const User = require("../models/User");
const RefreshToken = require("../models/RefreshToken");
const { MongooseError } = require("mongoose");

const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decodedToken.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

const verifyRefreshToken = async (req, res, next) => {
  try {
    if (!req.body.refreshToken) {
      res.status(400).json({ error: "Refresh token is required" });
      return;
    }
    const privateKey = process.env.REFRESH_TOKEN_KEY;
    const refreshToken = req.body.refreshToken;
    if (privateKey == null) {
      throw new Error("Internal error: Lost key");
    }
    const token = await RefreshToken.findOne({ token: refreshToken });
    jwt.verify(refreshToken, privateKey, (err, tokenDetails) => {
      if (err) throw err;
      req.details = tokenDetails;
      next();
    });
  } catch (err) {
    if (err instanceof MongooseError) {
      res.status(404).json({ message: "Token not found"});
    }
    else if (err instanceof jwt.TokenExpiredError) {
      res.status(403).json({ message: "Token expired" });
    } else {
      res.status(500).json(err.message);
    }
  }
};

module.exports = { authenticate, verifyRefreshToken };
