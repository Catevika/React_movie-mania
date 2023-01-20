import { MemoryRouter } from 'react-router-dom';
import { describe, test, expect, afterEach } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import axios from 'axios';
import nock from 'nock';
import Home from './Home';
import Movies from '../../components/Movies/Movies';
import Movie from '../../components/Movie/Movie';
import MoviePoster from '../../components/MoviePoster/MoviePoster';
import MovieModal from '../../components/MovieModal/MovieModal';

const apiKey = import.meta.env.VITE_API_KEY;
let term = 'Top Gun';


const scope = nock('https://api.themoviedb.org/3', { allowUnmocked: true })
	.persist()
	.get(`/search/movie?api_key=${apiKey}&query=${term}`)
	.reply(200, {
		results: [{
			id: 361743,
			title: 'Top Gun: Maverick',
			poster_path: '/62HCnUTziyWcpDaBO2i1DX17ljH.jpg',
			release_date: '2022 - 05 - 24',
			original_language: 'en',
			overview:
				"After more than thirty years of service as one of the Navy's top aviators, and dodging the advancement in rank that would ground him, Pete 'Maverick' Mitchell finds himself training a detachment of TOP GUN graduates for a specialized mission the likes of which no living pilot has ever seen.",
			vote_average: 8.3,
			vote_count: 5638
		}, {
			id: 744,
			original_language: 'en',
			title: 'Top Gun',
			overview: "For Lieutenant Pete 'Maverick' Mitchell and his friend and co-pilot Nick 'Goose' Bradshaw, being accepted into an elite training school for fighter pilots is a dream come true. But a tragedy, as well as personal demons, will threaten Pete's dreams of becoming an ace pilot.",
			poster_path: '/xUuHj3CgmZQ9P2cMaqQs4J0d4Zc.jpg',
			'release_date': '1986-05-16',
			vote_average: 7,
			vote_count: 6976
		}]
	}, {
		'Access-Control-Allow-Origin': '*'
	});

const movieData = await axios.get(
	`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${term}`
);

const movie = movieData.data.results[0];
const movieId = movie.id;

afterEach(() => {
	nock.cleanAll();
});

describe('Home', () => {
	const wrapper = render(
		<MemoryRouter>
			<Home />
		</MemoryRouter>
	);
	const input = document.querySelector('input');

	test('Home renders properly', () => {
		expect(wrapper).toBeTruthy();
	});

	test('Home has an initial text to explain what to do', () => {
		const p = document.querySelector('p');

		if ((term = '')) {
			expect(p).toBe('What movie are you looking for?');
		}
	});

	test('Input field should initially be empty', () => {
		input.value = '';

		expect(input.placeholder).toBe('Enter movie name...');
		expect(input.type).toBe('search');
		expect(input.name).toBe('search');
		expect(input.textContent).toBe('');
	});

	test('Input field should be able to receive an input', () => {
		input.value = '';

		expect(input.placeholder).toBe('Enter movie name...');
		expect(input.type).toBe('search');
		expect(input.textContent).toBe('');

		input.value = 'Top Gun';
		expect(input.value).toBe('Top Gun');
	});

	test('Input field should allow its value to change', () => {
		input.value = 'Top Gun';

		fireEvent.change(input, {
			target: {
				value: 'Avatar'
			}
		});

		expect(input.value).toBe('Avatar');
	});

});

describe('Movies can fetch movies', async () => {
	test('Movies renders properly', () => {
		const wrapper = render(
			<MemoryRouter>
				<Movies term={term} />
			</MemoryRouter>
		);

		term = 'Top Gun';
		expect(wrapper).toBeTruthy();
	});

	test('Movies do not render when input empty', () => {
		const { container } = render(
			<MemoryRouter>
				<Movies term={term} />
			</MemoryRouter>
		);
		const div = container.querySelector('div');

		term = '';
		expect(div.textContent).toBe('No movie available yet.');
	});

	test('Movie, MovieModal & MovieDetails render properly', async () => {
		term = 'Top Gun';

		const wrapper = render(
			<MemoryRouter>
				<Movie movie={movie} />
			</MemoryRouter>
		);

		expect(wrapper).toBeTruthy();

		expect(movie).toEqual({
			id: 361743,
			title: 'Top Gun: Maverick',
			poster_path: '/62HCnUTziyWcpDaBO2i1DX17ljH.jpg',
			release_date: '2022 - 05 - 24',
			original_language: 'en',
			overview:
				"After more than thirty years of service as one of the Navy's top aviators, and dodging the advancement in rank that would ground him, Pete 'Maverick' Mitchell finds himself training a detachment of TOP GUN graduates for a specialized mission the likes of which no living pilot has ever seen.",
			vote_average: 8.3,
			vote_count: 5638
		});

		const movieTitle = movie.title;
		const h3 = wrapper.container.querySelector('h3');
		expect(h3?.textContent).toBe(movieTitle);

		const posterImage = wrapper.container.querySelector('img');
		const posterURL = posterImage.src;
		expect(posterURL).toBe(
			'https://image.tmdb.org/t/p/w500' + movie.poster_path
		);

		const paragraphs = wrapper.container.querySelectorAll('p');

		const texts = Object.values(paragraphs).map(p => p.textContent);

		expect(texts[0]).toBe('Release Date: ' + movie.release_date);
		expect(texts[1]).toBe('Original language: ' + movie.original_language);
		expect(texts[2]).toBe('Overview: ' + movie.overview);
		expect(texts[3]).toBe(
			'Vote average: ' +
			movie.vote_average +
			' Vote count: ' +
			movie.vote_count
		);

		const detailsButton = wrapper.container.querySelector('.movie-btn');
		const link = screen.getByRole('link');
		expect(link).toHaveAttribute('href', '/movie/' + movieId);

		expect(detailsButton?.textContent).toBe('Details');

		const posterWrapper = render(
			<MemoryRouter>
				<MovieModal posterPath={movie.poster_path} />
			</MemoryRouter>
		);
		expect(posterWrapper).toBeTruthy();

		const posterImg = render(
			<MemoryRouter>
				<MoviePoster movieId={movieId} />
			</MemoryRouter>
		);
		expect(posterImg).toBeTruthy();

		scope.done();
	});
});