/// <reference types="Cypress" />

import {
	enterTextInput,
	navigateContact,
	send
} from '../page-objects/contact-page';

describe('Contact page spec', () => {
	beforeEach(() => {
		navigateContact();
	});

	it('send the form when filled in correctly', () => {
		enterTextInput(/full name/i, 'John Doe');
		enterTextInput(/email/i, 'catevika@gmail.com');
		enterTextInput(/subject/i, 'Hello');
		enterTextInput(/message/i, 'Hello from John');
		send();
	});
});
