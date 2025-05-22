import bcrypt from "bcryptjs";

// Método para comparar contraseñas (opcional, pero útil para el login)
User.prototype.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};
