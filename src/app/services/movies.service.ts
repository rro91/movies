import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MovieConfig, MovieSearchResult} from "../interfaces/movie.interface";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient) { }

  getMovies(page: number): Observable<MovieSearchResult> {
    return this.http.get<MovieSearchResult>(`${environment.apiUrl}/discover/movie`, {params: {page}})
  }

  getConfig() : Observable<MovieConfig> {
    return this.http.get<MovieConfig>(`${environment.apiUrl}/configuration`)
  }
}
