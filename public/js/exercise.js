const newFormHandler = async (event) => {
    event.preventDefault();

    // Get the current URL
    var url = window.location.href;
    // Use a regular expression to match and extract the number after the last "/"
    var match = url.match(/\/(\d+)\/exercise$/);
    if (match) {
        // Extracted number is in match[1]
        var workoutId = parseInt(match[1], 10);
        console.log(workoutId); // This will log 8 in your case
    } else {
        console.log("Number not found in the URL");
    }

    const exercise_name = document.querySelector("#exercise-name").value.trim();
    const rep_count = document.querySelector("#exercise-rep").value.trim();
    const set_count = document.querySelector("#exercise-set").value.trim();
    const assigned_day = document.querySelector("#assigned-days").value.trim();

    if (exercise_name && rep_count && set_count && assigned_day) {
        const response = await fetch(`/api/workouts/${workoutId}/exercise`, {
            method: "POST",
            body: JSON.stringify({ exercise_name, rep_count, set_count, assigned_day }),
            headers: {
                "Content-Type": "application/json",
            },
        });


        if (!response.ok) {
            alert("Failed to create exercise");
            console.log(response);
        } 
        else {
            alert("Exercise created successfully");
            window.location.reload();
        }
    }
};

document
    .querySelector(".new-exercise-form")
    .addEventListener("submit", newFormHandler);