import axios from 'axios';

const apiKey = import.meta.env.VITE_API_KEY;
const baseUrl = 'https://api.themoviedb.org/3';
const language = 'en-US';

export const getMovieData = async (term) => {
	const movieData = await axios.get(
		`${baseUrl}/search/movie?api_key=${apiKey}&query=${term}}`
	);
	return movieData;
};

export const getMovieDetailsData = async (movieId) => {
	const movieDetailsData = await axios.get(
		`${baseUrl}/movie/${movieId}?api_key=${apiKey}&language=${language}`
	);

	return movieDetailsData;
};

export const getMovieVideoData = async (movieId) => {
	const videoData = await axios.get(
		`${baseUrl}/movie/${movieId}/videos?api_key=${apiKey}&language=${language}`
	);
	return videoData;
};
