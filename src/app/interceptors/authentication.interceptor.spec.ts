import { TestBed } from '@angular/core/testing';
import { AuthenticationInterceptor } from './authentication.interceptor';
import {HttpHandler, HttpRequest} from "@angular/common/http";
import {environment} from "../../environments/environment";

let interceptor: AuthenticationInterceptor

describe('AuthenticationInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AuthenticationInterceptor
      ]
  }));

  beforeEach(() => {
    interceptor = TestBed.inject(AuthenticationInterceptor);
  })

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should add apiKey to request params', function () {
    const request = new HttpRequest('GET', 'test');
    const next =  {
      handle: (req: HttpRequest<any>) => {}
    }
    const cloneReq = request.clone({
      params: request.params.set(
        'api_key',
        environment.apiKey
      ),
    })
    next.handle = jasmine.createSpy();
    interceptor.intercept(request, next as HttpHandler);
    expect(next.handle).toHaveBeenCalledWith(cloneReq)
  });
});
