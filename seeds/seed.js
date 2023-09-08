const sequelize = require("../config/connection");
const { Workout } = require("../models");

const workoutData = require("./workoutData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  for (const workout of workoutData) {
    await Workout.create({
      ...workout,
    });
  }

  process.exit(0);
};

seedDatabase();
