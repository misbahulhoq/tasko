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

      cy.request("POST", "http://localhost:5000/api/v1/auth/login", {
        ...user,
      }).then(() => {
        cy.visit("/verify-otp");
      });

      cy.request("POST", "http://localhost:5000/api/v1/auth/send-otp/test", {
        email,
      }).then((response) => {
        const code: string = response.body.data.code;
        code.split("").map((char, index) => {
          cy.get(`#otp-${index}`).type(char);
        });
        cy.get("#verify-button").click();
      });
    });
  });
});
