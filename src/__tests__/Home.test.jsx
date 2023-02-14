import { MemoryRouter } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import { getMovieData } from '../api/api';
import { movieMock } from './__mocks__/movieMock';
import Home from '../pages/Home/Home';

const user = userEvent.setup();

vi.mock('axios');

beforeEach(() => {
	axios.get.mockReset();
});

describe('Home', () => {
	test('Search field should render properly', () => {
		render(
			<MemoryRouter>
				<Home />
			</MemoryRouter>
		);

		expect(screen.getByPlaceholderText('Enter movie name...')).toBeInTheDocument();
	});

	test('Input should change if value is updated', async () => {
		render(
			<MemoryRouter>
				<Home />
			</MemoryRouter>
		);

		const input = screen.getByPlaceholderText('Enter movie name...');
		expect(input.value).toBe('');

		await user.type(input, 'Top Gun');
		expect(input.value).toBe('Top Gun');

		await user.clear(input);

		await user.type(input, 'Avatar');
		expect(input.value).toBe('Avatar');
	});

	test('button Search should launch the search', async () => {
		axios.get.mockResolvedValue({
			data: movieMock
		});

		render(
			<MemoryRouter>
				<Home />
			</MemoryRouter>
		);

		const input = screen.getByPlaceholderText(/enter movie name.../i);
		await user.type(input, 'Top Gun');

		const searchButton = await screen.findByTitle(/search button/i);
		await user.click(searchButton);

		const movies = await waitFor(() => getMovieData(input.value));

		expect(await screen.findByText(movies.data.results[0].title)).toBeInTheDocument();
	});
});

describe('localStorage', () => {
	beforeEach(() => {
		localStorage.clear();
	});

	test('should save search form input value to localStorage', async () => {
		render(
			<MemoryRouter>
				<Home />
			</MemoryRouter>);

		const input = screen.getByPlaceholderText(/Enter movie name.../i);
		await user.type(input, 'Avatar');

		const searchButton = await screen.findByTitle(/search button/i);
		await user.click(searchButton);

		const termValue = localStorage.getItem('term');

		expect(termValue).toBe(JSON.stringify(input.value));
	});
});
