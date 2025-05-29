import bcrypt from "bcryptjs";

import { User } from "../models/User.js";

export const getUserList = async (req, res) => {
  const UserList = await User.findAll();
  res.json(UserList);
};

export const DeleteUser = async (req, res) => {
  const { id } = req.params;
  await User.destroy({ where: { id } });
  res.send(`Borrando usuario con ${id}`);
};
