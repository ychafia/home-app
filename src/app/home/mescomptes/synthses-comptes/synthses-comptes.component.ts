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

  public addNewEpargne() {
    const dialogRef = this.dialog.open(AddSynthesesDialog, {
      height: '400px',
      width: '600px',
      data: {types: this.types_epargnes, years: this.years}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.mesepargnesService.addTotaux(result.montant_solde, result.value_year, result.id_type).subscribe(resp => {
        console.log(resp);
        if(resp) {
          let obj = {year: resp.year, id_type: resp.total_type, solde: resp.montant};
          this.totaux.push(obj);
        }
      });
    });
  }

  get_types_epargnes() {
    this.mesepargnesService.get_types_epargnes(this.selectedYear).subscribe(resp => {
      this.types_epargnes = resp;
    })
  }

  ngOnInit() {
    this.mesepargnesService.get_years().subscribe(resp => {
      this.years = resp;
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

@Component({
  selector: 'add-synthese-dialog',
  templateUrl: 'add-synthese-dialog.html',
})
export class AddSynthesesDialog {
  constructor(
    public dialogRef: MatDialogRef<AddSynthesesDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  cancelDialog(): void {
    this.dialogRef.close();
  }
}