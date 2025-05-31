import { User, hashPassword } from "../models/User.js";

export const getUserList = async (req, res) => {
  const UserList = await User.findAll();
  res.json(UserList);
};

export const DeleteUser = async (req, res) => {
  const { id } = req.params;
  await User.destroy({ where: { id } });
  res.json({ message: `[BACKEND] Usuario con id ${id} borrado exitosamente` });
};

export const EditExistingUser = async (req, res) => {
  const { id } = req.params;
  await hashPassword(req.body);
  await User.update(req.body, { where: { id } });
  res.json({ message: `[BACKEND] Usuario con id ${id} editado exitosamente` });
};
