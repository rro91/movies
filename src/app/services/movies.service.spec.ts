import {TestBed} from '@angular/core/testing';

import {MoviesService} from './movies.service';
import {HttpClientModule} from "@angular/common/http";
import {MoviesServiceMock} from "../mocks/movies.service.mock";
import {moviesMock} from "../mocks/movies.mock";
import {of} from "rxjs";

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        {
          provide: MoviesService,
          useClass: MoviesServiceMock
        }
      ]
    });
    service = TestBed.inject(MoviesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get movies', () => {
    service.getMovies(1).subscribe(movies => {
      expect(movies).toEqual({
        page: 1,
        total_pages: 1,
        results: moviesMock,
        total_results: 2
      })
    })
  });

  it('should get config', () => {
    service.getConfig().subscribe(config => {
      expect(config).toEqual({
        images: {
          poster_sizes: ['small', 'large'],
          base_url: 'http://text-url/'
        }
      })
    })
  });
});
