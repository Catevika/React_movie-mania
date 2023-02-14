import { MemoryRouter } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import { getMovieDetailsData, getMovieVideoData } from '../api/api';
import { movieDetailsMock } from './__mocks__/movieDetailsMock';
import { movieVideoMock } from './__mocks__/movieVideoMock';
import MovieDetails from '../pages/MovieDetails/MovieDetails';
import MovieVideos from '../components/MovieVideos/MovieVideos';
import MovieVideo from '../components/MovieVideo/MovieVideo';
import userEvent from '@testing-library/user-event';

const apiKey = import.meta.env.VITE_API_KEY;
const language = 'en-US';

const user = userEvent.setup();

vi.mock('axios');

beforeEach(() => {
	axios.get.mockReset();
});

describe('MovieDetails', () => {
	test('makes a GET request to fetch movie details and display them correctly', async () => {
		const movieId = 361743;

		axios.get.mockResolvedValue({
			data: movieDetailsMock
		});

		const movieDetails = await waitFor(() => getMovieDetailsData(movieId));
		const movieInfos = movieDetails.data;

		render(
			<MemoryRouter initialEntries={[`/movie/${movieId}`]} >
				<MovieDetails />
			</MemoryRouter>
		);

		expect(axios.get).toHaveBeenCalledWith(
			`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=${language}`
		);
		expect(movieInfos).toStrictEqual(movieDetailsMock);

		const title = await screen.findByText(movieInfos.title);
		expect(title).toBeInTheDocument();

		const tagline = await screen.findByText(movieInfos.tagline);
		expect(tagline).toBeInTheDocument();

		const genres = movieInfos.genres;
		expect(genres.length).toBe(2);

		const texts = genres.map(genre => genre.name);
		const movieGenres = await screen.findByText(texts.join(' - '));
		expect(movieGenres).toBeInTheDocument();
	});
});

describe('MovieVideoModal', () => {
	test('MovieVideoModal should be closed after click out of the modal', async () => {
		const movieId = 3617;
		axios.get.mockResolvedValue({
			data: movieVideoMock
		});

		const movieVideoData = await waitFor(() => getMovieVideoData(movieId));
		const movieVideos = movieVideoData.data.results;
		const movieVideo = movieVideos[22];
		const moviekey = movieVideo.key;

		render(
			<MemoryRouter>
				<MovieVideos movieId={movieId} />
			</MemoryRouter>
		);

		render(
			<MemoryRouter>
				<MovieVideo movieVideo={movieVideo} />
			</MemoryRouter>
		);

		const videoLink = screen.getByText(movieVideo.name);

		await user.click(videoLink);

		const videoModal = screen.getByTitle(movieVideo.name);
		expect(videoModal.src).toBe(`https://www.youtube.com/embed/${moviekey}`
		);
		expect(videoModal).toBeInTheDocument();
		expect(document.body).toHaveStyle('overflow: hidden;');

		const modalDiv = screen.getByTestId('movievideo-modal-container');
		await user.click(modalDiv);

		expect(videoLink).toBeInTheDocument();
		expect(document.body).toHaveStyle('overflow: auto;');
	});
});



