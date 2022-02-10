import {BehaviorSubject, map, Observable, of, switchMap, tap} from "rxjs";
import {moviesMock} from "./movies.mock";
import {Movie, MovieConfig, MovieSearchResult} from "../interfaces/movie.interface";

export class MoviesServiceMock {
  page: BehaviorSubject<number> = new BehaviorSubject<number>(1)

  getMovies(): Observable<MovieSearchResult>  {
    const data = {
      page: 1,
      total_pages: 1,
      results: moviesMock,
      total_results: 2
    }
    return this.getConfig().pipe(
      switchMap(config =>
        of(data)
          .pipe(
            map(data => ({
                ...data,
                results: data.results.map(movie => ({
                  ...movie,
                  poster_path: `${config.images.base_url}${config.images.poster_sizes[1]}${movie.poster_path}`
                }))
              })
            ))
      )
    )
  }

  getMovie(): Observable<Movie> {
    return this.getConfig().pipe(
      switchMap(config => of(moviesMock[0])
        .pipe(
          map(movie => ({
            ...movie,
            poster_path: `${config.images.base_url}${config.images.poster_sizes[3]}${movie.poster_path}`
          }))
        ))
    )
  }

  getConfig(): Observable<MovieConfig> {
    const localConfig = localStorage.getItem('MoviesConfig')
    if (localConfig) {
      return of(JSON.parse(localConfig))
    }
    return of({
      images: {
        poster_sizes: ['small', 'large', 'x-large', 'xx-large'],
        base_url: 'http://text-url/'
      }
    }).pipe(
      tap(config => localStorage.setItem('MoviesConfig', JSON.stringify(config)))
    )
  }

  setPage(currentPage: number) {
    this.page.next(currentPage)
  }

  getPage() {
    return of(1)
  }
}
