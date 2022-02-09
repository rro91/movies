import {Observable, of} from "rxjs";
import {moviesMock} from "./movies.mock";
import {MovieConfig, MovieSearchResult} from "../interfaces/movie.interface";

export class MoviesServiceMock {
  getMovies(): Observable<MovieSearchResult>  {
    return of({
      page: 1,
      total_pages: 1,
      results: moviesMock,
      total_results: 2
    })
  }

  getConfig(): Observable<MovieConfig> {
    return of({
      images: {
        poster_sizes: ['small', 'large'],
        base_url: 'http://text-url/'
      }
    })
  }
}
