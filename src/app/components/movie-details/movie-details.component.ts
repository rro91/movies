import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { Observable, switchMap} from "rxjs";
import {MoviesService} from "../../services/movies.service";
import {Movie} from "../../interfaces/movie.interface";

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  movie$: Observable<Movie>

  constructor(private route: ActivatedRoute, private moviesService: MoviesService) {
  }

  ngOnInit() {
    this.getData()
  };

  private getData() {
    this.movie$ =
      this.route.params.pipe(
        switchMap((params) => this.getMovie(params['id']))
      )
  }

  private getMovie(id: string): Observable<Movie> {
    return this.moviesService.getMovie(id)
  }
}
