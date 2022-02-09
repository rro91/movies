import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MoviesListComponent} from './movies-list.component';
import {MoviesService} from "../../services/movies.service";
import {MoviesServiceMock} from "../../mocks/movies.service.mock";

describe('MoviesListComponent', () => {
  let component: MoviesListComponent;
  let fixture: ComponentFixture<MoviesListComponent>;
  let localStore: { [key: string]: string }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MoviesListComponent],
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
    localStore = {};
    spyOn(window.localStorage, 'getItem').and.callFake((key) =>
      key in localStore ? localStore[key] : null
    );
    spyOn(window.localStorage, 'setItem').and.callFake(
      (key, value) => (localStore[key] = value + '')
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get data on init', () => {
    component['getData'] = jasmine.createSpy();
    component.ngOnInit();
    expect(component['getData']).toHaveBeenCalled()
  });

  it('should set totalMovies', () => {
    component.ngOnInit();
    expect(component.totalMovies).toEqual(2)
  });

  it('should map movie poster path', () => {
    component.ngOnInit();
    component.movies$.subscribe(movies => {
      expect(movies[0].poster_path).toEqual('http://text-url/small/test-path')
    })
  });

  it('should get config from storage if exists', () => {
    localStore = {'MoviesConfig': '{"images":{"base_url":"http://fromStorage/","poster_sizes":["small","large"]}}'}
    component.ngOnInit();
    component.movies$.subscribe(movies => {
      expect(movies[0].poster_path).toEqual('http://fromStorage/small/test-path')
    })
  })

  it('should set config in storage', function () {
    component.ngOnInit();
    expect(localStore['MoviesConfig']).toEqual(JSON.stringify({
      images: {
        poster_sizes: ['small', 'large'],
        base_url: 'http://text-url/'
      }
    }))
  });
});
