import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    if (!token) {
      return res.status(400).json({ err: "Invalid Authentication" });
    }

    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    if (!decoded) return res.status(400).json({ err: "Invalid Authorization" });

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};

export default auth;
