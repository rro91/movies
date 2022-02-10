import {TestBed} from '@angular/core/testing';

import {MoviesService} from './movies.service';
import {HttpClientModule} from "@angular/common/http";
import {MoviesServiceMock} from "../mocks/movies.service.mock";
import {moviesMock} from "../mocks/movies.mock";
import {config, of} from "rxjs";

describe('MoviesService', () => {
  let service: MoviesService;
  let localStore: { [key: string]: string }

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

    localStore = {};
    spyOn(window.localStorage, 'getItem').and.callFake((key) =>
      key in localStore ? localStore[key] : null
    );
    spyOn(window.localStorage, 'setItem').and.callFake(
      (key, value) => (localStore[key] = value + '')
    );
  });

  it('should get movies', () => {
    service.getMovies(1).subscribe(movies => {
      expect(movies).toEqual({
        page: 1,
        total_pages: 1,
        results: moviesMock.map(movie => ({...movie, poster_path: 'http://text-url/large/test-path'})),
        total_results: 2
      })
    })
  });

  it('should get single movie', () => {
    service.getMovie('1').subscribe(movie => {
      expect(movie).toEqual({...moviesMock[0], poster_path: 'http://text-url/xx-large/test-path'})
    })
  })

  it('should map movies list poster path', () => {
    service.getMovies(1).subscribe(data => {
      expect(data.results[0].poster_path).toEqual('http://text-url/large/test-path')
    })
  });


  it('should map movie poster path', () => {
    service.getMovie('1').subscribe(movie => {
      expect(movie.poster_path).toEqual('http://text-url/xx-large/test-path')
    })
  });

  it('should get config', () => {
    service.getConfig().subscribe(config => {
      expect(config).toEqual({
        images: {
          poster_sizes: ['small', 'large', 'x-large', 'xx-large'],
          base_url: 'http://text-url/'
        }
      })
    })
  });

  it('should get config from storage if exists', () => {
    const storeConfig = {
      "images": {
        "base_url": "http://fromStorage/",
        "poster_sizes": ["small", "large", "x-large", "xx-large"]
      }
    }
    localStore = {'MoviesConfig': JSON.stringify(storeConfig)}
    service.getConfig().subscribe(config => {
      expect(config).toEqual(storeConfig)
    })
  })

  it('should set config in storage', function () {
    service.getConfig().subscribe(config => {
      expect(localStore['MoviesConfig']).toEqual(JSON.stringify({
        images: {
          poster_sizes: ['small', 'large', 'x-large', 'xx-large'],
          base_url: 'http://text-url/'
        }
      }))
    })
  });

  it('should set page', () => {
    service.page.next = jasmine.createSpy();
    service.setPage(3);
    expect(service.page.next).toHaveBeenCalledWith(3)
  });

  it('should get page', () => {
    service.getPage().subscribe(page => {
      expect(page).toEqual(1)
    });
  });
});
