document
  .getElementById("json-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const jsonInput = document.getElementById("json-input").value;
    const errorMessage = document.getElementById("error-message");
    const dropdownContainer = document.getElementById("dropdown-container");
    const resultContainer = document.getElementById("result");

    // Clear previous results and errors
    errorMessage.textContent = "";
    resultContainer.innerHTML = "";

    try {
      // Validate JSON input
      const parsedData = JSON.parse(jsonInput);
      if (!parsedData.data || !Array.isArray(parsedData.data)) {
        throw new Error('Invalid JSON format. "data" should be an array.');
      }

      // Show dropdown and fetch data button
      dropdownContainer.style.display = "block";

      // Handle fetch data button click
      document
        .getElementById("fetch-data")
        .addEventListener("click", async function () {
          const selectedOptions = Array.from(
            document.getElementById("options").selectedOptions
          ).map((option) => option.value);

          // Call the backend API
          const response = await fetch(
            "https://apilink-efl800fmw-saiakashs-projects.vercel.app/bfhl",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(parsedData),
            }
          );

          const result = await response.json();

          // Display selected data
          let displayData = "";
          if (selectedOptions.includes("alphabets")) {
            displayData += `<h2>Alphabets:</h2><p>${JSON.stringify(
              result.alphabets
            )}</p>`;
          }
          if (selectedOptions.includes("numbers")) {
            displayData += `<h2>Numbers:</h2><p>${JSON.stringify(
              result.numbers
            )}</p>`;
          }
          if (selectedOptions.includes("highest_alphabet")) {
            displayData += `<h2>Highest Alphabet:</h2><p>${JSON.stringify(
              result.highest_alphabet
            )}</p>`;
          }
          resultContainer.innerHTML = displayData;
        });
    } catch (error) {
      errorMessage.textContent = error.message;
    }
  });
