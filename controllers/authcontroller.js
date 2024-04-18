import userModel from "../models/userModel.js";

export const registercontroller = async (req, res, next) => {
  const { name, email, password, lastName } = req.body;
  //validate
  if (!name) {
    next("name is required");
  }
  if (!email) {
    next("email is required");
  }
  if (!password) {
    next("password is required");
  }
  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    next("Email already registered Please Login");
  }
  const user = await userModel.create({ name, email, password, lastName });
  //token
  const token = user.createJWT();
  res.status(201).send({
    success: true,
    message: "User created Successfully",
    user: {
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      location: user.location,
    },
    token,
  });
};

export const loginController = async (req, res, next) => {
  const { email, password } = req.body;
  //validation
  if (!email || !password) {
    next("Please Provide All Fields");
  }
  //Find user by email
  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    next("Invalid username or password");
  }
  //Compare Password
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    next("Invalid Username or password");
  }
  user.password = undefined;
  const token = user.createJWT();
  res.status(200).json({
    success: true,
    message: "Login Successful",
    user,
    token,
  });
};

//export default registercontroller;
