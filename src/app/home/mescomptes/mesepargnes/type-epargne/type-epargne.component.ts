import { Component, OnInit, Input } from '@angular/core';
import { Epargne } from 'src/app/models/epargne';

@Component({
  selector: 'app-type-epargne',
  templateUrl: './type-epargne.component.html',
  styleUrls: ['./type-epargne.component.css']
})
export class TypeEpargneComponent implements OnInit {
  @Input() epargnes: Epargne[];
  total_debit: number = 0;
  total_credit: number = 0;
  constructor() { }

  calculate_totaux() :  void {
    for(let item of this.epargnes) {
      if(item.montant_epargne > 0) {
        this.total_credit += item.montant_epargne;
      } else {
        this.total_debit += item.montant_epargne;
      }
    }
  }

  ngOnInit() {
    this.calculate_totaux();
  }

}
