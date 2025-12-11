/* Refer to the README.md for instructions on what you need to do in this project */
let form = document.querySelector("#form");
if (!form) {
  console.error("Form not found");
} else {
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    let athleteName = document.querySelector("#athlete-name").value;

    let competitionsEntered = document.querySelector(
      "#competitions-entered"
    ).value;

    let trainingPlan = document.querySelector("#training-plan").value;

    let privateCoachingHours = document.querySelector(
      "#private-coaching-hours"
    ).value;

    let currentWeight = parseInt(
      document.querySelector("#current-weight").value
    );

    if (athleteName === "") {
      alert("Athlete Name is required");
      return;
    }
    if (isNaN(currentWeight) || currentWeight <= 1) {
      alert("Current Weight is required");
      return;
    }

    console.log({
      athleteName,
      currentWeight,
      competitionsEntered,
      privateCoachingHours,
      trainingPlan,
    });
  });
}
