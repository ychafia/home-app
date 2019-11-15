import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Epargne } from 'src/app/models/epargne';

@Component({
  selector: 'app-type-epargne',
  templateUrl: './type-epargne.component.html',
  styleUrls: ['./type-epargne.component.css']
})
export class TypeEpargneComponent implements OnInit, OnChanges{
  /*@Input('epargnes') epargnes: Epargne[];
  sub_total_debit: number = 0;
  sub_total_credit: number = 0;
  constructor() { }

  calculate_totaux() :  void {
    this.sub_total_credit = 0;
    this.sub_total_debit = 0;
    console.log(this.epargnes);
    for(let item of this.epargnes) {
      if(item.montant_epargne > 0) {
        this.sub_total_credit += item.montant_epargne;
      } else {
        this.sub_total_debit += item.montant_epargne;
      }
    }
  }*/

  ngOnInit() {
    //this.calculate_totaux();
  }

  ngOnChanges(){
    //console.log("changes");
  }
}
