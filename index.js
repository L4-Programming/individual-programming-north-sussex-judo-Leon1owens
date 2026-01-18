/* Refer to the README.md for instructions on what you need to do in this project */
import { calculateCosts } from "./calculateCosts.js";

const MIN_WEIGHT = 50;
const MAX_WEIGHT = 150;

// simple weight class function (adjust ranges/names as needed)
function getWeightClass(weight) {
  if (isNaN(weight)) return "N/A";
  if (weight <= 66) return "Flyweight";
  if (weight <= 73) return "Lightweight";
  if (weight <= 81) return "Light-Middleweight";
  if (weight <= 90) return "Middleweight";
  if (weight <= 100) return "Light-Heavyweight";
  return "Heavyweight";
}

let form = document.querySelector("#form");

if (!form) {
  console.error("Form not found");
} else {
  // Function to handle training plan change
  function handleTrainingPlanChange() {
    let trainingPlan = document.querySelector("#training-plan").value;
    let competitionsInput = document.querySelector("#competitions-entered");
    if (trainingPlan === "beginner") {
      competitionsInput.disabled = true;
      competitionsInput.value = "";
    } else {
      competitionsInput.disabled = false;
    }
  }

  // Add change listener to training plan
  document.querySelector("#training-plan").addEventListener("change", handleTrainingPlanChange);

  // Call on load to set initial state
  handleTrainingPlanChange();

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

    // Validate maximums
    if (competitionsEnteredNum > 10) {
      addError("competitions-entered", "Maximum 10 competitions allowed.");
    }
    if (privateCoachingHoursNum > 20) {
      addError("private-coaching-hours", "Maximum 20 hours of private coaching allowed.");
    }

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

    const data = {
      athleteName,
      currentWeight,
      competitionsEntered: competitionsEnteredNum,
      privateCoachingHours: privateCoachingHoursNum,
      trainingPlan,
    };

    const costs = calculateCosts(data);

    // determine weight class and display separate fields
    const weightClass = getWeightClass(currentWeight);
    data.weightClass = weightClass;

    const nameEl = document.querySelector("#athlete-name-output");
    const weightEl = document.querySelector("#current-weight-output");
    const weightClassEl = document.querySelector("#weight-class-output");
    const trainingCostEl = document.querySelector("#training-cost-output");
    const coachingCostEl = document.querySelector("#coaching-cost-output");
    const competitionsEnteredEl = document.querySelector(
      "#competitions-entered-output"
    );
    const totalCostEl = document.querySelector("#total-cost-output");
    const messageEl = document.querySelector("#output");

    if (nameEl) nameEl.textContent = `Athlete: ${athleteName || "N/A"}`;
    if (weightEl)
      weightEl.textContent = isNaN(currentWeight)
        ? "Current Weight: N/A"
        : `Current Weight: ${currentWeight} kg`;
    if (weightClassEl)
      weightClassEl.textContent = `Weight Class: ${weightClass}`;
    if (trainingCostEl)
      trainingCostEl.textContent = `Training Cost: £${costs.trainingCost}`;
    if (coachingCostEl)
      coachingCostEl.textContent = `Coaching Cost: £${costs.coachingCost}`;
    if (competitionsEnteredEl)
      competitionsEnteredEl.textContent = `Competitions Entered: ${competitionsEnteredNum}`;
    if (totalCostEl)
      totalCostEl.textContent = `Total Cost: £${costs.totalCost}`;
    if (messageEl) messageEl.textContent = "Calculation complete.";

    console.log({ errors });
    console.log(data);
    console.log(costs);
  });
}
