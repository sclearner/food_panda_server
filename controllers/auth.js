const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const RefreshToken = require("../models/RefreshToken");

// Register a new user
const register = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const user = new User({ username, email, password: password });
    await user.save();
    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    next(error);
  }
};

// Login with an existing user
const login = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const passwordMatch = user.comparePassword(password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const payload = { userId: user._id };

    const accessToken = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: "1 hour",
    });

    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_KEY, {
      expiresIn: "30d",
    });

    new RefreshToken({ userId: user._id, token: refreshToken }).save();

    res.json({ accessToken, refreshToken });
  } catch (error) {
    next(error);
  }
};

const getNewAccessToken = async (req, res) => {
  try {
    const payload = { userId: req.details.userId };
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: "1 hour",
    });
    res.status(200).json({ accessToken });
  } catch (e) {
    res.status(500).json(e.message);
  }
};

const deleteRefreshToken = async (req, res) => {
    try {
        await RefreshToken.deleteOne({token: req.body.token});
    }
    catch (e) {
        res.status(500).json({ ...e });
    }
}

module.exports = { register, login, getNewAccessToken, deleteRefreshToken};
