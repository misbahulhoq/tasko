describe("Delete a Task", () => {
  it("should delete a task successfully", () => {
    // Visit the dashboard page
    cy.visit("/dashboard");

    // Open the add task modal
    cy.get("button[aria-label='Delete task']").first().click();

    // Assert success message appears (SweetAlert2 modal)
    cy.get(".swal2-popup").should("be.visible");
    cy.get(".swal2-title").should("contain", "Are you sure?");
    cy.get(".swal2-confirm").click(); // Delete the task
  });
});
