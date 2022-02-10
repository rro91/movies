import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, map, Observable, of, switchMap, tap} from "rxjs";
import {Movie, MovieConfig, MovieSearchResult} from "../interfaces/movie.interface";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  page: BehaviorSubject<number> = new BehaviorSubject<number>(1)

  constructor(private http: HttpClient) { }

  getMovies(page: number): Observable<MovieSearchResult> {
    return this.getConfig().pipe(
      switchMap(config =>
        this.http.get<MovieSearchResult>(`${environment.apiUrl}/discover/movie`, {params: {page}})
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

  getMovie(id: string): Observable<Movie> {
    return this.getConfig().pipe(
      switchMap(config => this.http.get<Movie>(`${environment.apiUrl}/movie/${id}`)
        .pipe(
          map(movie => ({
            ...movie,
            poster_path: `${config.images.base_url}${config.images.poster_sizes[3]}${movie.poster_path}`
          }))
        ))
    )
  }

  getConfig() : Observable<MovieConfig> {
    const localConfig = localStorage.getItem('MoviesConfig')
    if (localConfig) {
      return of(JSON.parse(localConfig))
    }
    return this.http.get<MovieConfig>(`${environment.apiUrl}/configuration`).pipe(
      tap(config => localStorage.setItem('MoviesConfig', JSON.stringify(config)))
    )
  }

  getPage(): Observable<number> {
    return this.page.asObservable()
  }

  setPage(page:number) {
    this.page.next(page)
  }
}
