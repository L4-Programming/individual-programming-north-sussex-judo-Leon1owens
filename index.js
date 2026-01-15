/* Refer to the README.md for instructions on what you need to do in this project */
import { calculateCosts } from "./calculateCosts.js";

const MIN_WEIGHT = 50;
const MAX_WEIGHT = 150;

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

    let currentWeightInput = document.querySelector("#current-weight");
    let currentWeight = parseFloat(currentWeightInput.value);

    if (athleteName === "") {
      addError("athlete-name", "Please enter your name.");
    }
    if (isNaN(currentWeight)) {
      addError("current-weight", "Please enter a valid weight.");
    } else if (currentWeight < MIN_WEIGHT || currentWeight > MAX_WEIGHT) {
      addError(
        "current-weight",
        `Please enter a weight between ${MIN_WEIGHT} kg and ${MAX_WEIGHT} kg.`
      );
    }

    // Clear previous errors
    document
      .querySelectorAll(".error-input")
      .forEach((el) => el.classList.remove("error-input"));
    document
      .querySelectorAll(".error-label")
      .forEach((el) => el.classList.remove("error-label"));

    if (Object.keys(errors).length > 0) {
      // Display errors
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
      document.querySelector("#output").textContent =
        "Please correct the errors highlighted in red.";
      return;
    }

    // Parse numbers
    let competitionsEnteredNum = parseFloat(competitionsEntered) || 0;
    let privateCoachingHoursNum = parseFloat(privateCoachingHours) || 0;

    const data = {
      athleteName,
      currentWeight,
      competitionsEntered: competitionsEnteredNum,
      privateCoachingHours: privateCoachingHoursNum,
      trainingPlan,
    };

    const costs = calculateCosts(data);

    const outputText = `Athlete: ${athleteName}\nTraining Cost: £${costs.trainingCost}\nCoaching Cost: £${costs.coachingCost}\nTotal Cost: £${costs.totalCost}`;
    document.querySelector("#output").textContent = outputText;

    console.log({ errors });
    console.log(data);
    console.log(costs);
  });
}
