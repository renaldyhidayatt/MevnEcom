const jwt = require("jsonwebtoken");

const Joi = require("joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  last_name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  gender: {
    type: String,
    required: false,
  },
  prith_day: {
    type: String,
    required: false,
  },
  profile_img: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    `${process.env.JWT_SECRET}`,
    { expiresIn: "15m" }
  );

  return token;
};

const User = mongoose.model("User", userSchema);

const validateUser = (user) => {
  const schema = Joi.object({
    first_name: Joi.string().min(5).max(50).required(),
    last_name: Joi.string().min(5).max(50).required(),
    gender: Joi.string(),
    prith_day: Joi.string(),
    profile_img: Joi.string(),
    email: Joi.string().email().min(5).max(500).required(),
    password: Joi.string().min(8).max(1024).required(),
    isAdmin: Joi.boolean(),
  });
  return schema.validate(user);
};

exports.User = User;

exports.validate = validateUser;
