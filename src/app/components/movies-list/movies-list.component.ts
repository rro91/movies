import {Component,OnInit} from '@angular/core';
import {MoviesService} from "../../services/movies.service";
import {Observable,pluck, switchMap, tap} from "rxjs";
import {Movie} from "../../interfaces/movie.interface";

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit {
  movies$: Observable<Movie[]>;
  page: number;
  pageSize = 20;
  totalMovies: number;

  constructor(private moviesService: MoviesService) {
  }

  ngOnInit(): void {
    this.getMovies();
  }

  onPageChange() {
    this.moviesService.setPage(this.page)
    this.getMovies();
  }

  private getMovies() {
    this.movies$ =
      this.moviesService.getPage().pipe(
        tap(page => this.page = page),
        switchMap(page => this.moviesService.getMovies(page)),
        tap(data => {
          this.totalMovies = Math.min(this.pageSize * 500, data.total_results); // max 500 pages limitation
        }),
        pluck('results')
      )
  }
}
