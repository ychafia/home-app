import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MescoursesDragdropComponent } from './mescourses-dragdrop.component';

describe('MescoursesDragdropComponent', () => {
  let component: MescoursesDragdropComponent;
  let fixture: ComponentFixture<MescoursesDragdropComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MescoursesDragdropComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MescoursesDragdropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
