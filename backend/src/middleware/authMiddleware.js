const jwt = require("jsonwebtoken");

const User = require("../models/User");

const protect = async (req, res, next) => {
  try {

    let token;

    // Check Authorization Header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {

      token =
        req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );


      // Find user
      const userId = decoded.id || decoded.userId;

      const user = await User.findById(
        userId
      ).select("-password");


      if (!user) {

        return res.status(401).json({
          message: "User not found",
        });
      }

      req.user = user;

      next();

    } else {

      return res.status(401).json({
        message: "No token provided",
      });
    }

  } catch (error) {

    console.error(error);

    return res.status(401).json({
      message: "Token failed",
    });
  }
};

module.exports = {
  protect,
};