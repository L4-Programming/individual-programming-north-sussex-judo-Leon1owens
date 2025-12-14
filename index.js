/* Refer to the README.md for instructions on what you need to do in this project */
let form = document.querySelector("#form");
if (!form) {
  console.error("Form not found");
} else {
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    let errors = {};

  // Helper function to add error messages
  function addError(field, message) {
    if (!errors[field]) {
      errors[field] = { messages: [] };
    }
    errors[field].messages.push(message);
  }

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
    addError("athleteName", "Please enter your name address.");
    }
    if (isNaN(currentWeight) || currentWeight <= 1) {
    addError("currentWeight", "Please enter your weight address.");
    }
      for (let field in errors) {
    let inputElement = document.querySelector(`#${field}`);
    let labelElement = document.querySelector(`label[for=${field}]`);
    if (inputElement) {
      inputElement.classList.add("error-input");
    }
    if (labelElement) {
      labelElement.classList.add("error-label");
    }
  }


    console.log({ errors });
    console.log({
      athleteName,
      currentWeight,
      competitionsEntered,
      privateCoachingHours,
      trainingPlan,
    });
  });
}
