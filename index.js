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

    let privateCoachingHours = document.querySelector(
      "#private-coaching-hours"
    ).value;

    let currentWeight = document.querySelector("#current-weight").value;
    console.log(
      athleteName,
      currentWeight,
      competitionsEntered,
      privateCoachingHours
    );
  });
}
