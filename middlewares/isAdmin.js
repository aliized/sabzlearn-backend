isAdmin = async (req, res, next) => {
  const isAdmin = req.user.role === "ADMIN";

  if (isAdmin) return next();

  return res
    .status(403)
    .json({ message: "this route is accessible only for admins." });
};

isSuperUser = async (req, res, next) => {
  const isSUPER = req.user.role === "SUPER";

  if (isSUPER) return next();

  return res
    .status(403)
    .json({ message: "this route is accessible only for SuperUsers." });
};
module.exports = { isAdmin, isSuperUser };
