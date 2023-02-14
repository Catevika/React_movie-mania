/// <reference types="Cypress" />

import {
	navigateHome,
	hasMainTitle,
	search,
	clear,
	openMovieModal,
	closeMovieModal
} from '../page-objects/home-page';

describe('Home page spec', () => {
	beforeEach(() => {
		navigateHome();
	});

	it('has an h1', () => {
		hasMainTitle('MovieMania');
	});

	it('search for movies', () => {
		search('Avatar');
	});

	it('clear previous search input and search for other movies', () => {
		search('Avatar');
		clear();
		search('Top Gun');
	});

	it('open & close Movie modal', () => {
		search('Top Gun');
		openMovieModal();
		closeMovieModal();
	});
});
