import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

const authServiceSpy = jasmine.createSpyObj('AuthService', ['isAuthenticated']);

describe('AuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
  }));
  

  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });

  it('isAuthenticated should return true when userData is not null', () => {
    sessionStorage.setItem('userData', "{user: 'youness', token: 'Bearer test'}");
    const service: AuthService = TestBed.get(AuthService);
    expect(service.isAuthenticated()).toBe(true);
  })

  it('isAuthenticated should return false when userData is null', () => {
    sessionStorage.setItem('userData', '');
    const service: AuthService = TestBed.get(AuthService);
    expect(service.isAuthenticated()).toBe(false);
  })

  it('login should return true from back-end', () => {
    const httpTestingController = TestBed.get(HttpTestingController);
    const service: AuthService = TestBed.get(AuthService);
    const fakePostData = { username: 'test', password:  'test'};
    const mockReturnedToken = {token: "Bearer test"};
    service.login(fakePostData).subscribe(data => {
      expect(data).toBe(true);
    });

    const req = httpTestingController.expectOne('http://localhost:8080/authenticate');
    console.log(req);
    expect(req.request.method).toBe('POST');
  })

});
