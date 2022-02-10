import {ComponentFixture, fakeAsync, inject, TestBed, tick} from '@angular/core/testing';
import {MoviesListComponent} from './movies-list.component';
import {MoviesService} from "../../services/movies.service";
import {MoviesServiceMock} from "../../mocks/movies.service.mock";
import {moviesMock} from "../../mocks/movies.mock";
import {RouterTestingModule} from "@angular/router/testing";
import {MovieDetailsComponent} from "../movie-details/movie-details.component";
import {Location} from "@angular/common";

describe('MoviesListComponent', () => {
  let component: MoviesListComponent;
  let fixture: ComponentFixture<MoviesListComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MoviesListComponent],
      imports: [RouterTestingModule.withRoutes([{path: 'movies', children: [{path: ':id', component: MovieDetailsComponent}]}])],
      providers: [
        {
          provide: MoviesService,
          useClass: MoviesServiceMock
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesListComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement
    fixture.detectChanges();
  });

  describe('Movies logic', () => {
    it('should get movies on init', () => {
      component.ngOnInit();
      component.movies$.subscribe(movies => {
        expect(movies).toEqual(moviesMock.map(movie => ({...movie, poster_path: 'http://text-url/large/test-path'})))
      })
    });

    it('should set totalMovies', () => {
      component.ngOnInit();
      expect(component.totalMovies).toEqual(2)
    });

    it('should emit current page on page change', () => {
      component.page = 2;
      component['moviesService'].setPage = jasmine.createSpy();
      component.onPageChange();
      expect(component['moviesService'].setPage).toHaveBeenCalledWith(2)
    });

    it('should get movies on page change', () => {
      component['getMovies'] = jasmine.createSpy();
      component.onPageChange();
      expect(component['getMovies']).toHaveBeenCalled()
    })
  })

  describe('Rendering', () => {
    it('should render movies', () => {
      expect(compiled.querySelectorAll('h3')?.length).toEqual(2);
    });

    it('should render movie\'s title', () => {
      expect(compiled.querySelector('h3')?.textContent).toEqual('Star Wars');
    });

    it('should render movie\'s poster', () => {
      expect(compiled.querySelector('.movie__poster')?.getAttribute('src')).toContain('test-path');
    })

    it('should render more link', () => {
      expect(compiled.querySelector('a.movie__link')?.textContent).toEqual('More');
    });
  })

  describe('Interactions', () => {
    it('should redirect user to the movie details page', fakeAsync(inject([Location], (location: Location) => {
      const link = compiled.querySelector('a.movie__link') as HTMLAnchorElement;
      link?.click();
      tick();
      fixture.whenStable().then(() => {
        const url = location.path()
        expect(url).toEqual('/movies/1')
      })
    })));
  })
});
