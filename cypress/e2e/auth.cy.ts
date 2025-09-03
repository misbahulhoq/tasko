const user = {
  name: "Test User Name",
  email: "test@mail.com",
  password: "Veryhard1",
};

const { name: fullName, email, password } = user;

describe("Auth", () => {
  describe("Signup", () => {
    it("Should signup a user if valid data is passed.", () => {
      cy.visit(`/signup`);
      cy.get("#name").type(fullName);
      cy.get("#email").type(email);
      cy.get("#password").type(password);
      cy.get("#confirmPassword").type(password);
      cy.get("button[type=button]").click({ multiple: true });
      cy.get("button[type=submit]").click();
    });
  });

  describe("Login", () => {
    it("Should login a user if valid data is passed.", () => {
      cy.visit(`/login`);
      cy.get("#email").type(email);
      cy.get("#password").type(password);
      cy.get("button[type=button]").click({ multiple: true });
      cy.get("button[type=submit]").click();
    });
  });
});
