/// <reference types="Cypress" />

export function navigateContact() {
	cy.visit('/contact');
}

export function enterTextInput(name, text) {
	cy.findByRole('textbox', { name: name }).type(text);
}

export function send() {
	cy.findByRole('button', { name: /send/i }).click();
}
