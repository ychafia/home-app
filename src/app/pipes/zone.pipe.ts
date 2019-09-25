import { element } from 'protractor';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'zone',
  //pure: false //By default is true (stateless)
})
export class ZonePipe implements PipeTransform {

  transform(elements: any, ...args: any[]): any {
    let elems: any[] = [];
    if(elements && elements.length) {
      for(let elem of elements) {
        if(Number(elem.zone) == args[0]) {
          elems.push( elem );
        }
      }
    }
    return elems;
  }

}
