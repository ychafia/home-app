import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeEpargneComponent } from './type-epargne.component';

describe('TypeEpargneComponent', () => {
  let component: TypeEpargneComponent;
  let fixture: ComponentFixture<TypeEpargneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeEpargneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeEpargneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
