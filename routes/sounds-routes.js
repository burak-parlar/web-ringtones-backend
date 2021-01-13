const express = require("express");
const { check } = require("express-validator");

const soundsControllers = require("../controllers/sounds-controllers");

const router = express.Router();

router.get("/", soundsControllers.getSounds);

router.get("/:type", soundsControllers.getSoundsByType);

router.post(
  "/",
  [
    check("type").not().isEmpty(),
    check("name").not().isEmpty(),
    check("source").not().isEmpty(),
    check("price").not().isEmpty(),
  ],
  soundsControllers.addSound
);

router.delete("/:sid", soundsControllers.deleteSound);

module.exports = router;
