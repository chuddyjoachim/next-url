/// <reference types="cypress"/>

context("Home page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  //   it checks if the home page contains "h1"
  it("should find our heading inthe home page", () => {
    cy.get("h1").contains("NextUrl Shortner");
  });

  //   it Enters text in the search input and submit the form
  it.only("Enters text in the search input and submits the form", () => {
    cy.get(".linkInput")
    .type("https://google.com")
    .type('{enter}')
  });
});
