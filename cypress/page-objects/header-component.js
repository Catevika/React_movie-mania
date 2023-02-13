/// <reference types="Cypress" />

export function navigate() {
	cy.visit('/');
}

export function clickLink(link) {
	cy.findAllByRole('link', { name: link }).click();
}
