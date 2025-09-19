import { generate } from "random-words";
function generateRandomDataForTask() {
  let title = "";
  let description = "";

  const priorityOptions = ["High", "Medium", "Low"];
  const descriptionWords = generate(30);
  const titleWords = generate(6);

  if (Array.isArray(titleWords)) {
    title = titleWords.join(" ");
  }

  if (Array.isArray(descriptionWords)) {
    description = descriptionWords.join(" ");
  }
  return {
    title,
    description,
    priority:
      priorityOptions[Math.floor(Math.random() * priorityOptions.length)],
  };
}

describe("Add New Task", () => {
  it("should add a new task successfully", () => {
    // Visit the dashboard page (adjust URL if needed)
    cy.visit("/dashboard");

    // Open the add task modal
    cy.get(".btn.btn-primary").contains("+ Add New Task").click();

    let taskCount = 0;
    while (taskCount < 10) {
      // Fill in the form fields
      const { title, description, priority } = generateRandomDataForTask();
      cy.get("#title").type(title);
      cy.get("#description").type(description);
      cy.get("#priority").select(priority);
      cy.get("#status").select("Pending");

      // Set start and end dates to today and another day from today.
      const today = new Date();
      const nextDay = new Date(today);
      nextDay.setDate(today.getDate() + Math.floor(Math.random() * 10));

      const formatDate = (date: Date) => date.toISOString().split("T")[0];

      cy.get("#startDate").type(formatDate(today));
      cy.get("#endDate").type(formatDate(nextDay));

      // Submit the form
      cy.get("form.task-form").find('button[type="submit"]').click();

      // Assert success message appears (SweetAlert2 modal)
      cy.get(".swal2-popup").should("be.visible");
      cy.get(".swal2-title").should("contain", "Success");
      cy.get(".swal2-confirm").click(); // Close the SweetAlert modal
      taskCount++;
    }

    if (taskCount == 10) cy.get(".btn.btn-outline").contains("Close").click();
  });
});
