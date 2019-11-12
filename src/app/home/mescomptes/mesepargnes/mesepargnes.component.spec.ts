import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MesepargnesComponent } from './mesepargnes.component';

describe('MesepargnesComponent', () => {
  let component: MesepargnesComponent;
  let fixture: ComponentFixture<MesepargnesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MesepargnesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MesepargnesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
