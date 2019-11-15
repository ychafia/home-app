import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicsEpargnesComponent } from './graphics-epargnes.component';

describe('GraphicsEpargnesComponent', () => {
  let component: GraphicsEpargnesComponent;
  let fixture: ComponentFixture<GraphicsEpargnesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphicsEpargnesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphicsEpargnesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
