const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
      type: String,
      required: true
    },
    dob: Date,
    avatarUrl: String,
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    }
  },
  { timestamps: true }
);

// Hash the password before saving it to the database
userSchema.pre('save', function (next) {
  const user = this;
  if (!user.isModified('password')) return next();

  try {
    user.password = bcrypt.hashSync(user.password, 12);
    next();
  } catch (error) {
    return next(error);
  }
});

// Compare the given password with the hashed password in the database
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;