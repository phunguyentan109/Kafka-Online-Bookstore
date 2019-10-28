const express = require("express");
const router = express.Router({mergeParams: true});
const hdl = require("../handlers");
const mw = require("../middlewares");
const {upload} = require("../utils/uploader");

router.route("/").post(upload.fields([{name: "images"}]), mw.Image.get, hdl.Review.create);

module.exports = router;
