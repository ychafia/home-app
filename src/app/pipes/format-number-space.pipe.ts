import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatNumberSpace'
})
export class FormatNumberSpacePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if(value != undefined && !isNaN(value)) {
      value = value.toFixed(2);
      let parts = value.toString().split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
      return parts.join(".");
    }
  }

}
