const router = require("express").Router();
const { Workout, Exercise } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/", async (req, res) => {
  console.log("TEST");
  try {
    const newWorkout = await Workout.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newWorkout);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const workoutData = await Workout.findByPk(req.params.id);
    if (!workoutData) {
      res.status(404).json({ message: "No workout found with this id!" });
      return;
    }
    res.status(200).json(workoutData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const workoutData = await Workout.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!workoutData) {
      res.status(404).json({ message: "No workout found with this id!" });
      return;
    }

    res.status(200).json(workoutData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/:id/exercise", async (req, res) => {
  console.log("TEST");
  const userId = req.session.user_id;
  const workoutId = req.params.id;
  try {
    const newExercise = await Exercise.create({
      ...req.body,
      user_id: userId,
      workout_id: workoutId,
    });
    res.status(200).json(newExercise);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
