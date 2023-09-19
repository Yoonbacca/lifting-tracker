const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#workout-name").value.trim();
  const description = document.querySelector("#workout-desc").value.trim();
  const lengthDaysSelect = document.querySelector("#length-days");
  const length_days = lengthDaysSelect.options[lengthDaysSelect.selectedIndex].value;

  console.log(length_days);

  if (!title || !description || !length_days) {
    alert('Please enter a title, description, and number of days for your workout')
  }else {const response = await fetch(`/api/workouts`, {
      method: "POST",
      body: JSON.stringify({ title, description, length_days }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const responseData = await response.json();
      const newWorkoutId = responseData.id;
      document.location.href = `/workout/${newWorkoutId}`;
    } else {
      alert("Failed to create workout");
    }
  }
};

document
  .querySelector(".new-workout-form")
  .addEventListener("submit", newFormHandler);

