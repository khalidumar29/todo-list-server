// jwt authentication
const jwt = require("jsonwebtoken");

module.exports.authMiddleware = (req, res, next) => {
  // check if the Authorization header is present
  const authHeader = req.headers["Authorization"];
  if (!authHeader) {
    return res.status(401).json({ error: "Missing Authorization header" });
  }

  // extract the token from the header
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Missing token" });
  }

  try {
    // verify the token and extract the user data
    const decoded = jwt.verify(token, process.env.TOKEN);
    req.user = decoded.user;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};
