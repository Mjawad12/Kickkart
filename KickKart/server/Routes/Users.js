const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Users = require("../Schema/UserSchema");
const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");
const path = require("path");
const fetchUser = require("../middleware/Fectuser");

require("dotenv").config({ path: path.resolve("../../../.env") });

router.post(
  "/sign-up",
  [
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
    body("name").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = await validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ error: errors.array() });
    }
    const salts = await bcrypt.genSalt(10);
    const securedPassword = await bcrypt.hash(req.body.password, salts);
    const userS = await Users.findOne({ name: req.body.name });
    const nameS = await Users.findOne({ email: req.body.email });
    if (userS) {
      return res
        .status(400)
        .send({ error: "A user Already Exsists with this name." });
    }
    if (nameS) {
      return res
        .status(400)
        .send({ error: "A user Already Exsists with this email." });
    }

    const user = await Users.create({
      name: req.body.name,
      password: securedPassword,
      email: req.body.email,
    });
    if (user.verification === "false") {
      let r = Math.random();
      r = Math.round(r * 1000 + 1000);

      return res.status(200).send({ otp: r });
    }

    const userid = {
      id: user.id,
    };
    const authtoken = await Jwt.sign(userid, process.env.Jwt_String);
    return res.send({ authToken: authtoken });
  }
);
router.post(
  "/sign-in",
  [body("email").isEmail(), body("password").isLength({ min: 5 })],
  async (req, res) => {
    const errors = await validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ error: errors.array() });
    }
    const user = await Users.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send({ error: "Enter a valid Email." });
    }
    const securedPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!securedPassword) {
      return res.status(400).send({ error: "Enter a valid Password." });
    }
    if (user.verification === "false") {
      let r = Math.random();
      r = Math.round(r * 1000 + 1000);

      return res.status(200).send({ otp: r });
    }
    const userid = {
      id: user.id,
    };
    const authtoken = await Jwt.sign(userid, process.env.Jwt_String);
    return res.send({ authToken: authtoken });
  }
);

router.post("/otpVerifier", async (req, res) => {
  const user = await Users.findOneAndUpdate(
    { email: req.body.email },
    { $set: { verification: "true" } }
  );
  const userid = {
    id: user.id,
  };
  const authtoken = await Jwt.sign(userid, process.env.Jwt_String);
  return res.send({ authToken: authtoken });
});

router.get("/userData", fetchUser, async (req, res) => {
  try {
    console.log(req.id);
    const user = await Users.findById(req.id);
    console.log(user);
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get(
  "/userData",
  body("name").isLength({ min: 5 }),
  fetchUser,
  async (req, res) => {
    try {
      const error = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).send({ error: errors.array() });
      }
      const Sname = await Users.findOne({ name: req.body.name });
      if (!Sname) {
        return res.status(400).send({ error: "Enter a valid Name." });
      }
      console.log(req.id);
      const user = await Users.findByIdAndUpdate(req.id, {
        $set: { name: req.body.name },
      });
      console.log(user);
      res.send(user);
    } catch (error) {
      res.status(500).send(error);
    }
  }
);

module.exports = router;
