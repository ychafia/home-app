import { Component, OnInit } from '@angular/core';
import { Epargne } from 'src/app/models/epargne';
import { MesepargnesService } from 'src/app/services/mesepargnes.service';

@Component({
  selector: 'app-mesepargnes',
  templateUrl: './mesepargnes.component.html',
  styleUrls: ['./mesepargnes.component.css']
})
export class MesepargnesComponent implements OnInit {
  mesepargnes = [];
  total_credit: number;
  total_debit: number;

  constructor(private mesepargnesService: MesepargnesService) { }

  

  ngOnInit() {
    this.mesepargnesService.getEpargnes().subscribe(resp => {
      this.mesepargnes = resp;
    })
    this.mesepargnesService.getTotaux().subscribe(resp => {
      console.log(resp);
      this.total_credit = resp[0].total_credit;
      this.total_debit = resp[0].total_debit;
    })
    
  }

}
