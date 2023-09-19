const addButtonHandler = async (event) => {
  try {
    const response = await fetch(`/api/users/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      // Check if the response is not OK (e.g., 500 Internal Server Error)
      console.error(`Server returned status ${response.status}`);
      const errorMessage = await response.text(); // Read the error message
      console.error(`Error message: ${errorMessage}`);
      return;
    }

    const currentURL = window.location.href;
    const urlSegments = currentURL.split("/");
    const id = urlSegments[urlSegments.length - 1];
    const creatorUserId = event.target.getAttribute("data-id");

    const loggedInUserId = await response.json();
    if (loggedInUserId == creatorUserId) {
      document.location.replace(`/workout/${id}/exercise`);
    } else {
      alert("You can only edit workouts you created!");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

document
  .querySelector(".add-exercise")
  .addEventListener("click", addButtonHandler);
