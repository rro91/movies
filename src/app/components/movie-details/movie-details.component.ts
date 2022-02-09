import {Component, Input} from '@angular/core';
import {Movie} from "../../interfaces/movie.interface";

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent {
  @Input() movie: Movie;
}
