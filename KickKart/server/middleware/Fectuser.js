const Jwt = require("jsonwebtoken");
const path = require("path");

require("dotenv").config({ path: path.resolve("../../../.env") });
const fetchUser = async (req, res, next) => {
  try {
    const token = req.headers.authtoken;
    const data = await Jwt.verify(token, process.env.Jwt_String);
    if (!data) {
      return res.status(400).send("AuthToken did not get verified");
    }
    req.id = data.id;

    next();
  } catch (error) {
    res.status(500).send(error);
  }
};
module.exports = fetchUser;
