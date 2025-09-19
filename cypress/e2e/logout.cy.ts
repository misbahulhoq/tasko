describe("Logout", () => {
  it("Should logout", () => {
    cy.visit(`/dashboard`);
    cy.get("#user-menu-button").click();
    cy.get("#logout").click();
  });
});
