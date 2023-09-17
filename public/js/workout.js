const addButtonHandler = async (event) => {
  const currentURL = window.location.href;
  const urlSegments = currentURL.split("/");
  // Get the last segment (which should be the workout ID)
  const id = urlSegments[urlSegments.length - 1];
  console.log(window.sessionStorage);
  document.location.replace(`/workout/${id}/exercise`);
};

document
  .querySelector(".add-exercise")
  .addEventListener("click", addButtonHandler);
