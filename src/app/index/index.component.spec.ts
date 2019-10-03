import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexComponent } from './index.component';

describe('IndexComponent', () => {
  let component: IndexComponent;
  let fixture: ComponentFixture<IndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexComponent ],
      imports: [RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('have a nav-bar menu', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#nav-bar-menu')).toBeTruthy();
  });

  it('have a signup menu', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#signup')).toBeTruthy();
  });

  it('have a login menu', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#login')).toBeTruthy();
  });
});
