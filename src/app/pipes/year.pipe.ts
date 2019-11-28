import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'year',
  pure: false //By default is true (stateless)
})
export class YearPipe implements PipeTransform {

  transform(items: any[], year: any): any {
    let filtred_items: any[] = [];
    if(items.length && year) {
      for(let item of items) {
        if(item.year == year) {
          filtred_items.push(item);
        }
      }
    }
    return filtred_items;
  }

}
