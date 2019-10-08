import { HttpClientTestingModule } from '@angular/common/http/testing';
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
});
