import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MovieDetailsComponent} from './movie-details.component';
import {RouterTestingModule} from "@angular/router/testing";
import {MoviesService} from "../../services/movies.service";
import {MoviesServiceMock} from "../../mocks/movies.service.mock";
import {ActivatedRoute} from "@angular/router";
import {of} from "rxjs";
import {moviesMock} from "../../mocks/movies.mock";

describe('MovieDetailsComponent', () => {
  let component: MovieDetailsComponent;
  let fixture: ComponentFixture<MovieDetailsComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieDetailsComponent],
      imports: [RouterTestingModule],
      providers: [
        {
          provide: MoviesService,
          useClass: MoviesServiceMock
        },
        {
          provide: ActivatedRoute,
          useValue: {params: of(1)}
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieDetailsComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    fixture.detectChanges();
  });

  describe('Movie logic', () => {
    it('should get movie', () => {
      component.ngOnInit();
      component.movie$.subscribe(movie => {
        expect(movie).toEqual({...moviesMock[0], poster_path: 'http://text-url/xx-large/test-path'})
      })
    });
  })

  describe('Rendering', () => {
    it('should render movie\'s title', () => {
      expect(compiled.querySelector('.movie__title')?.textContent).toContain('Star Wars');
    })

    it('should render movie\'s original title', () => {
      expect(compiled.querySelector('.movie__title--original')?.textContent).toContain('Star Wars');
    });

    it('should render movie\'s release date', () => {
      expect(compiled.querySelector('.movie__release')?.textContent).toContain('(2022)');
    });

    it('should render movie\'s description', () => {
      expect(compiled.querySelector('.movie__overview')?.textContent).toContain('Test desc');
    });

    it('should render movie\'s poster', () => {
      expect(compiled.querySelector('.movie__poster')?.getAttribute('src')).toContain('test-path');
    })
  })
});
