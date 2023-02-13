/// <reference types="Cypress" />

import { clickLink, navigate } from '../page-objects/header-component';

describe('Header component spec', () => {
	beforeEach(() => {
		navigate();
	});

	it('Links goes to respective page', () => {
		clickLink(/about/i);
		clickLink(/contact/i);
		clickLink(/credits/i);
	});
});
