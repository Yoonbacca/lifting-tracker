const router = require("express").Router();
const { Exercise, User, Workout } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    // Get all workouts and JOIN with user data
    const workoutData = await Workout.findAll({
      include: [
        {
          model: User,
        },
      ],
    });

    // Serialize data so the template can read it
    const workouts = workoutData.map((workout) => workout.get({ plain: true }));
    // Pass serialized data and session flag into template
    console.log(workouts);
    res.render("homepage", {
      workouts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/workout/:id", async (req, res) => {
  try {
    const workoutData = await Workout.findByPk(req.params.id, {
      include: [
        {
          model: User,
        },
        {
          model: Exercise,
        },
      ],
    });

    const workout = workoutData.get({ plain: true });
    console.log(workout);

    res.render("workout", {
      ...workout,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get("/profile", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Workout }],
    });

    const user = userData.get({ plain: true });

    res.render("profile", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/workout/:id/exercise", async (req, res) => {
  try {
    const exerciseData = await Workout.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["first_name", "last_name"],
        },
      ],
      include: [
        {
          model: Exercise,
        },
      ],
    });
    const workout = exerciseData.get({ plain: true });

    res.render("exercise", {
      ...workout,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }

  res.render("login");
});

module.exports = router;
