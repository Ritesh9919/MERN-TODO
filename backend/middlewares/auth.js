
import jwt from "jsonwebtoken";
import {CustomAPIError} from '../errors/custom_error.js';
import { User } from "../models/user.model.js";

export const jwtAuth = async(req, res, next)=> {
    const token = req.headers['authorization'];
    if(!token) {
      return next(new CustomAPIError(401, 'Unauthorized'));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);
        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
}