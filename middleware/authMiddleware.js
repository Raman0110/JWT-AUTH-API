import jwt from "jsonwebtoken"
import User from "../model/userModel.js";

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) return res.status(401).json({ error: "Unauthorized" });
    const decoded = jwt.verify(token, 'secret');
    if (!decoded) return res.status(401).json({ error: "Invalid token" });
    const { user } = decoded;
    req.user = await User.findById(user._id);
    next();
  } catch (error) {
    console.log(error.message);
  }
}

export default authMiddleware