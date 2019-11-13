import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { Epargne } from 'src/app/models/epargne';
import { MesepargnesService } from 'src/app/services/mesepargnes.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { TypeEpargneComponent } from './type-epargne/type-epargne.component';

@Component({
  selector: 'app-mesepargnes',
  templateUrl: './mesepargnes.component.html',
  styleUrls: ['./mesepargnes.component.css']
})
export class MesepargnesComponent implements OnInit {
  mesepargnes = [];
  total_credit: number;
  total_debit: number;
  @ViewChild(TypeEpargneComponent, {static: false})
  private typeEpargneComponent: TypeEpargneComponent;

  constructor(private mesepargnesService: MesepargnesService, private dialog: MatDialog) { }

  public addNewEpargne() {
    const dialogRef = this.dialog.open(AddTypeEpargneDialog, {
      height: '500px',
      width: '600px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result) {
        let _epargne = new Epargne(result.id_epargne, result.date_epargne, Number(result.montant_epargne), result.motif_epargne);       
        this.mesepargnesService.addUpdateEpargne(_epargne).subscribe(resp => {
          for(let item of this.mesepargnes) {
            if(item.type == result.type_epargne ) {
              item.epargnes.push(_epargne);
              this.typeEpargneComponent.calculate_totaux();
            }
          }
        })
      }
    });
  }
  

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

@Component({
  selector: 'add-type-epargne-dialog',
  templateUrl: 'add-type-epargne-dialog.html',
})
export class AddTypeEpargneDialog {
  constructor(
    public dialogRef: MatDialogRef<AddTypeEpargneDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Epargne) {}

  cancelDialog(): void {
    this.dialogRef.close();
  }
}