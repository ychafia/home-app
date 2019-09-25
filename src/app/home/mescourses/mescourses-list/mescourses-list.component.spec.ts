import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MescoursesListComponent } from './mescourses-list.component';

describe('MescoursesListComponent', () => {
  let component: MescoursesListComponent;
  let fixture: ComponentFixture<MescoursesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MescoursesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MescoursesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
