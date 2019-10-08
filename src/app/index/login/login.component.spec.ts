import { AuthService } from './../../services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { validUser, blankUser } from 'src/mocks';
import { LoginComponent } from './login.component';
import { Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';

const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
const authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);
const userDataMocked = { username: 'test', password: 'test'};

describe('LoginComponent : Isolated Test', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ HttpClientTestingModule, FormsModule, RouterTestingModule ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Initialization variables', () => {
    expect(component.errorText).toBeDefined();
    expect(component.postData).toBeDefined();
    expect(component.postData.username).toBe('');
    expect(component.postData.password).toBe('');
  })

});

describe('LoginComponent Integrated Test', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginSpy;
  let mockRouter;
  beforeEach(async(() => {
    mockRouter = { navigate: jasmine.createSpy('navigate') };
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ HttpClientTestingModule, FormsModule, RouterTestingModule ],
      providers: [
        {provide: AuthService, useValue: authServiceSpy},
        // {provide: Router, useClass: class { navigate = jasmine.createSpy("navigate"); } }
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    loginSpy = authServiceSpy.login.and.returnValue(Promise.resolve(userDataMocked));
    fixture.detectChanges();

  }));

  it('authService login() should called ', fakeAsync(() => {
    component.postData.username = 'test';
    component.postData.password = 'test';
    fixture.detectChanges();

    const button = fixture.debugElement.nativeElement.querySelector('#loginBtn');
    button.click();
    fixture.detectChanges();
    expect(authServiceSpy.login).toHaveBeenCalled();
  }));

  it('errorText should be login/password incorrect !', () => {
    component.postData.username = '';
    component.postData.password = '';
    fixture.detectChanges();

    const button = fixture.debugElement.nativeElement.querySelector('#loginBtn');
    button.click();
    fixture.detectChanges();
    // expect(authServiceSpy.login).not.toHaveBeenCalled();
    expect(component.errorText).toBe('login/password incorrect !')

  });

  xit('sould redirect to /mescourses when login successfully', fakeAsync(() => {
    let router = fixture.debugElement.injector.get(Router);
    component.postData.username = 'test';
    component.postData.password = 'test';
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('#loginBtn');
    button.click();

    loginSpy = authServiceSpy.login.and.returnValue(Promise.resolve(userDataMocked));
    tick();
    fixture.detectChanges();

    expect(router.navigate).toHaveBeenCalled();
  }));

});