let DUMMY_SOUNDS = require("../data/Dummy_Sounds");

const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");

const getSounds = (req, res, next) => {
  const sounds = DUMMY_SOUNDS;
  console.log(sounds);
  if (!sounds || sounds.length === 0) {
    next(new HttpError("Could not get sounds.", 404));
  }
  res.json({ sounds });
};

const getSoundsByType = (req, res, next) => {
  const type = req.params.type;

  const sounds = DUMMY_SOUNDS.filter((s) => {
    return s.type === type;
  });

  if (!sounds || sounds.length === 0) {
    throw new HttpError("Could not find sounds for given type.", 404);
  }

  res.json({ sounds });
};

const addSound = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check data", 422);
  }

  const { type, name, source, price } = req.body;

  // if (
  //   type !== "rain" ||
  //   type !== "light" ||
  //   type !== "fire" ||
  //   type !== "bird" ||
  //   type !== "windy"
  // ) {
  //   throw new HttpError(
  //     "Invalid type passed, please check type.Types can be rain,light,fire,bird,windy. " +
  //       type,
  //     422
  //   );
  // }
  const id = DUMMY_SOUNDS.length + 1;
  const addedSound = {
    id,
    type,
    name,
    source,
    price,
  };

  DUMMY_SOUNDS.push(addedSound);

  res.status(201).json(addedSound);
};

const deleteSound = (req, res, next) => {
  const soundId = req.params.sid;

  if (!DUMMY_SOUNDS.find((s) => s.id === parseInt(soundId))) {
    throw new HttpError("Could not find a sound for that id. " + soundId);
  }
  const deletedDUMMY_SOUNDS = DUMMY_SOUNDS.filter(
    (s) => s.id !== parseInt(soundId)
  );

  for (let index = 0; index < deletedDUMMY_SOUNDS.length; index++) {
    let element = deletedDUMMY_SOUNDS[index];
    element.id = index + 1;
  }

  DUMMY_SOUNDS = deletedDUMMY_SOUNDS;

  res.status(200).json({ message: "Successfuly deleted." });
};

exports.getSounds = getSounds;
exports.getSoundsByType = getSoundsByType;
exports.addSound = addSound;
exports.deleteSound = deleteSound;
