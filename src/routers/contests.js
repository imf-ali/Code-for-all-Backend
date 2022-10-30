const express = require("express");
const auth = require("../middleware/auth");
const Contests = require("../models/contests");
import StatusCodes from "http-status-codes";

const Router = new express.Router();

Router.post("/contest", auth, async (req, res) => {
  const user = new Contests(req.body);
  try {
    await user.save();
    res.status(StatusCodes.OK).send({ user });
  } catch (e) {
    res.status(StatusCodes.BAD_REQUEST).send();
  }
});

Router.get("/contest", async (req, res) => {
  try {
    const constests = await Contests.find().sort({ createdAt: -1 });
    res.status(StatusCodes.OK).send(constests);
  } catch (e) {
    console.log(e);
    res.status(StatusCodes.BAD_REQUEST).send(e);
  }
});

Router.get("/contest/organiser/:organisername", async (req, res) => {
  try {
    const constests = await Contests.find({
      organiser: req.params.organisername,
    }).sort({ createdAt: -1 });
    res.status(StatusCodes.OK).send(constests);
  } catch (e) {
    console.log(e);
    res.status(StatusCodes.BAD_REQUEST).send(e);
  }
});

module.exports = Router;
