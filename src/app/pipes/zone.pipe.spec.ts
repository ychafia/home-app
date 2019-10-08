import { ZonePipe } from './zone.pipe';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ZonePipe', () => {
  let elements : any[] = [
    {id_element: 0, libelle: 'a', done: true, zone: 1},
    {id_element: 1, libelle: 'b', done: true, zone: 2},
    {id_element: 2, libelle: 'c', done: true, zone: 2},
    {id_element: 3, libelle: 'd', done: true, zone: 1},
  ]
  let pipe;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
        providers: [ ZonePipe ],
        schemas: [ NO_ERRORS_SCHEMA ]
    });
    pipe = new ZonePipe();
  }));

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return empty array when zone 5', () => {
    const result = pipe.transform(elements, 5);
    
    expect(result).toEqual([]);
  })

  it('should return empty array when imput elements is empty', () => {
    const result = pipe.transform([], 5);
    expect(result).toEqual([]);
  })

  it('should return object element whene zone 1', () => {
    const result = pipe.transform(elements, 1);
    let expected_result = [
      {id_element: 0, libelle: 'a', done: true, zone: 1},
      {id_element: 3, libelle: 'd', done: true, zone: 1}
    ]
    expect(result).toEqual(expected_result);
  })
});
