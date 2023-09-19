let url = window.location.href;
const match = url.match(/\/(\d+)\/exercise$/);
const workoutId = parseInt(match[1], 10);

const newFormHandler = async (event) => {
  event.preventDefault();

  // Get the current URL

  const exercise_name = document.querySelector("#exercise-name").value.trim();
  const rep_count = document.querySelector("#exercise-rep").value.trim();
  const set_count = document.querySelector("#exercise-set").value.trim();
  const assigned_day = document.querySelector("#assigned-days").value.trim();

  if (exercise_name && rep_count && set_count && assigned_day) {
    const response = await fetch(`/api/workouts/${workoutId}/exercise`, {
      method: "POST",
      body: JSON.stringify({
        exercise_name,
        rep_count,
        set_count,
        assigned_day,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      alert("Failed to create exercise");
      console.log(response);
    } else {
      alert("Exercise created successfully");
      window.location.reload();
    }
  } else {
    alert("Invalid Entry. Please fill out all fields!");
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");

    const response = await fetch(`/api/exercises/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      alert("Exercise deleted successfully!");
      document.location.reload();
    } else {
      console.log(response);
      alert("Failed to delete workout");
    }
  }
};

const populateDays = async (workoutId) => {
  const select = document.getElementById("assigned-days");
  try {
    // Fetch numDays from the API using the specified workoutId
    const response = await fetch(`/api/workouts/${workoutId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch numDays from the API");
    }

    const data = await response.json();
    console.log("******", data.length_days);
    // Assuming the API response contains numDays

    // Clear any existing options
    select.innerHTML = "";

    // Create and add new options based on the specified number of days
    for (let i = 1; i <= data.length_days; i++) {
      const option = document.createElement("option");
      option.value = i;
      option.textContent = `Day ${i}`;
      select.appendChild(option);
    }
  } catch (error) {
    console.error(error);
    // Handle any errors, such as network issues or API failures
  }
};

// Example usage:
console.log(workoutId);
populateDays(workoutId);
console.log(123);

document
  .querySelector(".new-exercise-form")
  .addEventListener("submit", newFormHandler);

document
  .querySelector(".exercise-list")
  .addEventListener("click", delButtonHandler);
