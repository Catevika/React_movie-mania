/// <reference types="Cypress" />
import * as HomePage from '../page-objects/home-page';
import {
	getFirstMovieDetails,
	getNoMovieMessage,
	getNotAvailable,
	openVideoModal,
	closeVideoModal
} from '../page-objects/movies_component';

describe('Movies page spec', () => {
	beforeEach(() => {
		HomePage.navigateHome();
	});

	it('navigate to MovieDetails page', () => {
		HomePage.search('Top Gun');
		getFirstMovieDetails();
	});

	it('show message when no MovieDetails data', () => {
		HomePage.search('sdfg');
		getNoMovieMessage();
		HomePage.clear();
		HomePage.search('redbull');
		getFirstMovieDetails();
		HomePage.hasMainTitle(/atmos redbull f1/i);
		getNotAvailable(10);
	});

	it('open & close Video Modal', () => {
		HomePage.search('Top Gun');
		getFirstMovieDetails();
		openVideoModal();
		closeVideoModal();
	});
});
