const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#workout-name").value.trim();
  const description = document.querySelector("#workout-desc").value.trim();
  const length_days = document.querySelector("#length-days").value.trim();

  if (title && description && length_days) {
    const response = await fetch(`/api/workouts`, {
      method: "POST",
      body: JSON.stringify({ title, description, length_days }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(title, description, length_days);
    if (response.ok) {
      document.location.replace("/exercise");
    } else {
      alert("Failed to create workout");
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");

    const response = await fetch(`/api/workouts/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      console.log(response)
      alert("Failed to delete workout");
    }
  }
};

document
  .querySelector(".new-workout-form")
  .addEventListener("submit", newFormHandler);

document
  .querySelector(".workout-list")
  .addEventListener("click", delButtonHandler);
