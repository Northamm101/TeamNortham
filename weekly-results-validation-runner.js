function runWeeklyResultsValidation() {
  if (typeof validateWeeklyResults !== "function") {
    console.error(
      "Weekly results validation could not run because validateWeeklyResults was not found."
    );
    return;
  }

  const validationErrors = validateWeeklyResults();

  if (validationErrors.length === 0) {
    console.info(
      "Weekly results validation passed with no errors."
    );
    return;
  }

  console.group(
    `Weekly results validation found ${validationErrors.length} error(s).`
  );

  validationErrors.forEach((error) => {
    console.error(error);
  });

  console.groupEnd();
}

runWeeklyResultsValidation();
