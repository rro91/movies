import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MovieDetailsComponent} from './movie-details.component';
import {moviesMock} from "../../mocks/movies.mock";

describe('MovieDetailsComponent', () => {
  let component: MovieDetailsComponent;
  let fixture: ComponentFixture<MovieDetailsComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieDetailsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieDetailsComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    component.movie = moviesMock[0]
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render movie\'s title', () => {
    expect(compiled.querySelector('.movie__title')?.textContent).toContain('Star Wars');
  })

  it('should render movie\'s original title', () => {
    expect(compiled.querySelector('.movie__title--original')?.textContent).toContain('Star Wars');
  });

  it('should render movie\'s release date', () => {
    expect(compiled.querySelector('.movie__release')?.textContent).toContain('(2022)');
  });

  it('should render movie\'s poster', () => {
    expect(compiled.querySelector('.movie__poster')?.getAttribute('src')).toContain('test-path');
  })
});
