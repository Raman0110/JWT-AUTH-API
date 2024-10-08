import User from "../model/userModel.js";
import jwt from "jsonwebtoken";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    if (!users) return res.status(400).json({ error: "no user found" });
    res.status(200).json(users);
  } catch (error) {
    console.log(error.message);
  }


}
export const signupUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    if (!user) return res.status(400).json({ error: "user creation failed" });
    res.status(201).json({ message: 'user creation success' });
  } catch (error) {
    console.log(error.message);
  }
}

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Usernot found" });
    if (user.password !== password) res.status(400).json({ error: "Password didn't matched" });
    const token = jwt.sign({ user }, 'secret', {
      expiresIn: '30d'
    });
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: false
    }).status(200).json({ message: "Login successful" });
  } catch (error) {
    console.log(error.message);
  }
}


export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) return res.status(400).json({ error: "cannot find user" });
    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);

  }

}
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userUpdated = await User.findByIdAndUpdate(id, req.body);
    if (!userUpdated) return res.status(400).json({ error: "Unable to update user" });
    res.status(200).json({ message: "User updated" });
  } catch (error) {
    console.log(error.message);

  }
}
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userDeleted = await User.findByIdAndDelete(id);
    if (!userDeleted) return res.status(400).json({ error: "Cannot delete user" });
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    console.log(error.message);

  }
}

export const logoutUser = async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  }).status(200).json({ message: "Logout Successful" });
}