const router = require("express").Router();
const { Workout, Exercise, User } = require("../../models");
const withAuth = require("../../utils/auth");

router.delete("/:id", async (req, res) => {
  try {
    const exerciseData = await Exercise.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!exerciseData) {
      res.status(404).json({ message: "No exercise found with this id!" });
      return;
    }

    res.status(200).json(exerciseData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
