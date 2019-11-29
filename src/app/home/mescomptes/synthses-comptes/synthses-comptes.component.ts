import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { MesepargnesService } from 'src/app/services/mesepargnes.service';

@Component({
  selector: 'app-synthses-comptes',
  templateUrl: './synthses-comptes.component.html',
  styleUrls: ['./synthses-comptes.component.css']
})
export class SynthsesComptesComponent implements OnInit {
  years: any = [];
  types_epargnes: any[] = [];
  selectedYear: string;
  totaux: any[] = [];
  constructor(private mesepargnesService: MesepargnesService, private dialog: MatDialog) { }

  edit_epargne(total: any) {
    console.log("editing ...", total);
    const dialogRef = this.dialog.open(EditSynthesesDialog, {
      height: '300px',
      width: '400px',
      data: {total: total, new_solde: ''}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.mesepargnesService.updateTotaux(result.new_solde, total.year, total.id_type).subscribe(resp => {
          total.solde = result.new_solde;
        });
      }
    });
  }

  get_types_epargnes() {
    this.mesepargnesService.get_types_epargnes(this.selectedYear).subscribe(resp => {
      this.types_epargnes = resp;
      console.log(this.types_epargnes);
    })
  }

  ngOnInit() {
    this.mesepargnesService.get_years().subscribe(resp => {
      this.years = resp;
      console.log(this.years);
      for(let year of this.years) {
        if(year.active_year) {
          this.selectedYear = year.value_year;
          this.mesepargnesService.get_totaux_synthese().subscribe( res => {
            // Transform the result to an array of object
            for(let item of res) {
              let obj = {year: null, id_type: null, solde: null};
              for(let year of this.years) {
                if(item[0] == year.value_year) {
                  obj.year = item[0];
                  obj.id_type = item[1];
                  obj.solde = item[2];
                }
              }
              this.totaux.push(obj);
            }
            console.log(this.totaux);
            this.get_types_epargnes();
          });
        }
      }
    });
  }
}

@Component({
  selector: 'edit-syntheses-dialog',
  templateUrl: 'edit-syntheses-dialog.html',
})
export class EditSynthesesDialog {
  constructor(
    public dialogRef: MatDialogRef<EditSynthesesDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  deleteEpargne(id) {
    this.data.deleteEpargne = id;
    //this.dialogRef.close();
  }

  cancelDialog(): void {
    this.dialogRef.close();
  }
}