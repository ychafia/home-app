import { element } from 'protractor';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'zone'
})
export class ZonePipe implements PipeTransform {

  transform(elements: any, ...args: any[]): any {
    let arr: any[] = [];
    if(elements && elements.length) {
      for(let elem of elements) {
        if(elem.zone == args[0]) {
          arr.push( elem );
        }
      }
    }
    return arr;
  }

}
