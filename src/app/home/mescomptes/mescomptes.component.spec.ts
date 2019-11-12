import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MescomptesComponent } from './mescomptes.component';

describe('MescomptesComponent', () => {
  let component: MescomptesComponent;
  let fixture: ComponentFixture<MescomptesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MescomptesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MescomptesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
