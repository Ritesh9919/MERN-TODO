import { User } from "../models/user.model.js";
import { CustomAPIError } from "../errors/custom_error.js";

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return next(new CustomAPIError(400, "Please provode all fields"));
    }
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      return next(new CustomAPIError(400, "User already exist"));
    }

    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json({ user, msg: "Registration successfull!" });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new CustomAPIError(400, "Please Provode both fields"));
    }
    const user = await User.findOne({ email });
    if (!user) {
      return next(new CustomAPIError(401, "Invalid Credentials"));
    }
    const isPasswordCurrect = await user.isPasswordCurrect(password);
    if (!isPasswordCurrect) {
      return next(new CustomAPIError(401, "Invalid Credentials"));
    }
    const accessToken = user.generateToken();
    res.status(200).json({ accessToken, msg: "Login successfull" });
  } catch (error) {
    next(error);
  }
};

export { register, login };
