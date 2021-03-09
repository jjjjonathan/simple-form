const form = document.querySelector("form");
const inputs = document.querySelectorAll("input");

inputs.forEach((input) => {
  const error = document.querySelector(`#${input.id} + span.error`);

  input.addEventListener("input", () => {
    document.querySelector(".message").textContent = "";

    if (input.validity.valid) {
      error.textContent = "";
    } else if (input.validity.valueMissing) {
      error.textContent = "This field is required";
    } else if (input.validity.typeMismatch && input.id === "email") {
      error.textContent = "Please enter a valid email address";
    } else if (input.validity.patternMismatch && input.id === "zip") {
      error.textContent =
        "Please enter a valid US Zip Code in either of the following formats: 00000 or 00000-0000";
    } else if (input.validity.patternMismatch && input.id === "country") {
      error.textContent = "Please enter a valid country name";
    } else if (
      (input.validity.tooShort || input.validity.tooLong) &&
      input.id === "password"
    ) {
      error.textContent = "Password must be between 8 & 20 characters";
    }
    if (
      (input.id === "password-conf" || input.id === "password") &&
      document.getElementById("password-conf").value !==
        document.getElementById("password").value
    ) {
      document.querySelector("#password-conf + span.error").textContent =
        "Passwords must match";
    } else if (
      (input.id === "password-conf" || input.id === "password") &&
      document.getElementById("password-conf").value ===
        document.getElementById("password").value
    ) {
      document.querySelector("#password-conf + span.error").textContent = "";
    }
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  inputs.forEach((input) => {
    const error = document.querySelector(`#${input.id} + span.error`);
    if (input.validity.valueMissing) {
      error.textContent = "This field is required";
    }
  });
  if (
    form.checkValidity() &&
    document.getElementById("password-conf").value ===
      document.getElementById("password").value
  ) {
    document.querySelector(".message").textContent = "High five!";
  }
});
