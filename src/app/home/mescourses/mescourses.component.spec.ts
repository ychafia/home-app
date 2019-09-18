import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MescoursesComponent } from './mescourses.component';

describe('MescoursesComponent', () => {
  let component: MescoursesComponent;
  let fixture: ComponentFixture<MescoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MescoursesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MescoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
