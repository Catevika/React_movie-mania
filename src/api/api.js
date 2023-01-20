import axios from 'axios';
const apiKey = import.meta.env.VITE_API_KEY;

export const getMovieData = async (term) => {
	const movieData = await axios.get(
		`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${term}}`
	);
	return movieData;
};
