import {Component, OnInit} from '@angular/core';
import {MoviesService} from "../../services/movies.service";
import {map, Observable, of, pluck, switchMap, tap} from "rxjs";
import {Movie, MovieConfig, MovieSearchResult} from "../../interfaces/movie.interface";

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit {
  movies$: Observable<Movie[]>;
  page = 1;
  totalMovies: number;

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.getData();
  }

  onPageChange() {
    this.getData();
  }

  private getData() {
    this.movies$ = this.getConfig().pipe(
      switchMap(config => this.getMovies()
        .pipe(
          tap(data => {
            this.totalMovies = data.total_results;
          }),
          pluck('results'),
          map(movies => movies.map(movie => ({
            ...movie,
            poster_path: `${config.images.base_url}${config.images.poster_sizes[0]}${movie.poster_path}`
          })))
        ))
    )
  }

  private getConfig(): Observable<MovieConfig> {
    const localConfig = localStorage.getItem('MoviesConfig')
    if (localConfig) {
      return of(JSON.parse(localConfig))
    }
    return this.moviesService.getConfig()
      .pipe(
        tap(config => localStorage.setItem('MoviesConfig', JSON.stringify(config)))
      )
  }

  private getMovies(): Observable<MovieSearchResult> {
    return this.moviesService.getMovies(this.page)
  }
}
