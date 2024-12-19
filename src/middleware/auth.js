const config = require("../config/config");

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token || token !== config.authToken) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  next();
};

module.exports = authMiddleware;
