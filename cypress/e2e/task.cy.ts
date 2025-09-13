describe("Add New Task", () => {
  it("should add a new task successfully", () => {
    // Visit the dashboard page (adjust URL if needed)
    cy.visit("/dashboard");

    // Open the add task modal
    cy.get(".btn.btn-primary").contains("+ Add New Task").click();

    // Fill in the form fields
    cy.get("#title").type("Test Task");
    cy.get("#description").type("This is a test description.");
    cy.get("#priority").select("High");
    cy.get("#status").select("Pending");

    // Set start and end dates to today and tomorrow
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const formatDate = (date: Date) => date.toISOString().split("T")[0];

    cy.get("#startDate").type(formatDate(today));
    cy.get("#endDate").type(formatDate(tomorrow));

    // Submit the form
    cy.get("form.task-form").find('button[type="submit"]').click();

    // Assert success message appears (SweetAlert2 modal)
    cy.get(".swal2-popup").should("be.visible");
    cy.get(".swal2-title").should("contain", "Success");
    cy.get(".swal2-confirm").click(); // Close the SweetAlert modal
    cy.get(".btn.btn-outline").contains("Close").click();
  });
});
