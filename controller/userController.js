const jwt = require("jsonwebtoken");
const User = require("../model/userModel");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");

//Register a new user

const registerUser = asyncHandler(async (req, res, next) => {
  const { firstname, lastname, email, password } = req.body;
  if (!firstname || !lastname || !email || !password) {
    res.status(400);
    throw new Error("Please provide all required fields");
  }
  //Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  //Create user
  const user = await User.create({
    firstname,
    lastname,
    email,
    password: hashedPassword,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User could not be created");
  }
});

//user login

const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error("Please Sign up first");
  }
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(201).json({
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

//generate auth token
const generateToken = (id) => {
  return jwt.sign({ _id: id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

module.exports = {
  registerUser,
  loginUser,
};
