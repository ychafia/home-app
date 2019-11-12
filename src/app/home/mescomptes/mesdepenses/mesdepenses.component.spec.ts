import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MesdepensesComponent } from './mesdepenses.component';

describe('MesdepensesComponent', () => {
  let component: MesdepensesComponent;
  let fixture: ComponentFixture<MesdepensesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MesdepensesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MesdepensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
