import { MemoryRouter } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import { getMovieData } from '../api/api';
import { movieMock } from './__mocks__/movieMock';
import Movie from '../components/Movie/Movie';

const user = userEvent.setup();

let term = 'Top Gun';

vi.mock('axios');

beforeEach(() => {
	axios.get.mockReset();
});

describe('Movie', () => {
	test('Makes a GET request to fetch movies', async () => {
		axios.get.mockResolvedValue({
			data: movieMock
		});

		const movies = await waitFor(() => getMovieData(term));
		const movie = movies.data.results[0];

		render(
			<MemoryRouter>
				<Movie movie={movie} />
			</MemoryRouter>
		);

		expect(movie).toStrictEqual(movieMock.results[0]);
	});

	test('Movie details are well displayed', async () => {
		axios.get.mockResolvedValue({
			data: movieMock
		});

		const movies = await waitFor(() => getMovieData(term));
		const movie = movies.data.results[0];

		render(
			<MemoryRouter>
				<Movie movie={movie} />
			</MemoryRouter>
		);

		expect(screen.getByText(movie.title)).toBeInTheDocument();

		expect(screen.getByText('Release Date:')).toBeInTheDocument();
		expect(screen.getByText(movie.release_date)).toBeInTheDocument();
		expect(screen.getByText('Original language:')).toBeInTheDocument();
		expect(screen.getByText(movie.original_language)).toBeInTheDocument();
		expect(screen.getByText('Overview:')).toBeInTheDocument();
		expect(screen.getByText(movie.overview)).toBeInTheDocument();
		expect(screen.getByText('Vote average:')).toBeInTheDocument();
		expect(screen.getByText('Vote count:')).toBeInTheDocument();
		expect(document.body.style.length).toBe(0);
	});

	test('Rendered poster image is the correct one', async () => {
		axios.get.mockResolvedValue({
			data: movieMock
		});

		const movies = await waitFor(() => getMovieData(term));
		const movie = movies.data.results[0];

		render(
			<MemoryRouter>
				<Movie movie={movie} />
			</MemoryRouter>
		);

		expect(screen.getByRole('img', { src: 'https://image.tmdb.org/t/p/w500' + movie.poster_path })).toBeInTheDocument();
	});

	test('Button details', async () => {
		axios.get.mockResolvedValue({
			data: movieMock
		});

		const movies = await waitFor(() => getMovieData(term));
		const movie = movies.data.results[0];
		let movieId = movie.id;

		render(
			<MemoryRouter>
				<Movie movie={movie} />
			</MemoryRouter>
		);

		const detailsLink = screen.getByText('Details');
		expect(detailsLink).toHaveAttribute('href', '/movie/' + movieId);
	});
});

describe('MovieModal', () => {
	test('MovieModal should be closed after click out of the modal', async () => {
		axios.get.mockResolvedValue({
			data: movieMock
		});

		const movies = await waitFor(() => getMovieData(term));
		const movieData = movies.data.results;
		const movie = movieData[0];

		render(
			<MemoryRouter>
				<Movie movie={movie} />
			</MemoryRouter>
		);

		const poster = screen.getByAltText('Movie poster');

		await waitFor(() => user.click(poster));

		const posterModal = screen.getByAltText('Big Movie poster');
		expect(posterModal.src).toBe('https://image.tmdb.org/t/p/w500' + movie.poster_path);
		expect(document.body).toHaveStyle('overflow: hidden;');

		const posterWrapper = screen.getByTestId('movie-wrapper');
		await waitFor(() => user.click(posterWrapper));
		expect(poster).toBeInTheDocument();
		expect(document.body).toHaveStyle('overflow: auto;');
	});

	test('display message if posterpath undefined', async () => {
		axios.get.mockResolvedValue({
			data: movieMock
		});

		const movies = await waitFor(() => getMovieData(term));
		const movieData = movies.data.results;
		const movie = movieData[9];

		render(
			<MemoryRouter>
				<Movie movie={movie} />
			</MemoryRouter>
		);

		const message = screen.getByText('No poster available');
		expect(message).toBeInTheDocument();

		const paragraph = screen.getByTestId('image-replacement-p');
		expect(paragraph.firstChild.nodeName).toBe('svg');
	});
});
