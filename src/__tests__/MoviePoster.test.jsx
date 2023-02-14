import { MemoryRouter } from "react-router-dom";
import { render, waitFor } from "@testing-library/react";
import axios from "axios";
import { getMovieDetailsData } from "../api/api";
import { movieDetailsMock } from "./__mocks__/movieDetailsMock";
import MoviePoster from "../components/MoviePoster/MoviePoster";

const apiKey = import.meta.env.VITE_API_KEY;
const language = 'en-US';

vi.mock('axios');

beforeEach(() => {
  axios.get.mockReset();
});

describe('MoviePoster', () => {
  test('makes a GET request to fetch movie poster', async () => {
    const movieId = 361743;

    axios.get.mockResolvedValue({
      data: movieDetailsMock
    });

    const movieDetails = await waitFor(() => getMovieDetailsData(movieId));
    const movieInfos = movieDetails.data;
    const posterPath = movieInfos.poster_path;
    const posterUrl = `https://image.tmdb.org/t/p/w500${posterPath}`;

    expect(axios.get).toHaveBeenCalledWith(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=${language}`
    );

    expect(movieInfos).toStrictEqual(movieDetailsMock);

    const { findByAltText } = render(
      <MemoryRouter initialEntries={[`/movie/${movieId}`]}>
        <MoviePoster movieId={movieId} />
      </MemoryRouter>
    );

    const img = await findByAltText('MovieDetails poster');
    expect(img.src).toBe(posterUrl);
  });

  test('message for user when fetching movie poster fails', async () => {
    const posterPathError = 'posterPath is not defined';

    async function getMoviePoster() {
      if (!posterPath) {
        throw new Error(posterPathError);
      }
    }

    await expect(getMoviePoster()).rejects.toThrow(posterPathError);
    expect(posterPathError).toEqual('posterPath is not defined');
  });
});