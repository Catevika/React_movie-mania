/// <reference types="Cypress" />

export function getFirstMovieDetails() {
	cy.findAllByRole('link', { name: /details/i })
		.first()
		.click();
}

export function getNoMovieMessage() {
	cy.findByText(/no movie available yet/i);
}

export function getNotAvailable(length) {
	cy.findAllByText(/not available/i).should('have.length', length);
}

export function openVideoModal() {
	cy.findAllByTestId(/movie video link/i)
		.first()
		.click();
}

export function closeVideoModal() {
	cy.findAllByTestId(/movievideo-modal-container/i)
		.first()
		.click();
}
