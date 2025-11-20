export const verifyRole = (rolesPermitidos) => {
  return (req, res, next) => {
    if (!rolesPermitidos.includes(req.user.id_rol)) {
      return res.status(403).json({ message: "No autorizado" });
    }
    next();
  };
};
