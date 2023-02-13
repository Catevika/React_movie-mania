/// <reference types="Cypress" />

export function navigateHome() {
	cy.visit('/');
}

export function hasMainTitle(title) {
	cy.findByRole('heading', { name: title });
}

export function search(term) {
	cy.findByRole('searchbox', { name: /search input/i }).type(term);
	cy.findByTitle(/search button/i).click();
}

export function clear() {
	cy.findByRole('searchbox', { name: /search input/i }).clear();
}

export function openMovieModal() {
	cy.findAllByAltText(/movie poster/i)
		.first()
		.click();
}

export function closeMovieModal() {
	cy.findAllByTestId(/movie-wrapper/i)
		.first()
		.click();
}
