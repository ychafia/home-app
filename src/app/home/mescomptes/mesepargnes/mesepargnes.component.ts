import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { Epargne } from 'src/app/models/epargne';
import { MesepargnesService } from 'src/app/services/mesepargnes.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mesepargnes',
  templateUrl: './mesepargnes.component.html',
  styleUrls: ['./mesepargnes.component.css']
})
export class MesepargnesComponent implements OnInit {
  mesepargnes = [];
  total_credit: number;
  total_debit: number;
  sub_total_debit: number[] = [];
  sub_total_credit: number[] = [];
  selectedYear: string;
  years: any;
  types_epargnes: any;

  constructor(private mesepargnesService: MesepargnesService, private dialog: MatDialog, private _snackBar: MatSnackBar, private router: Router) { }

  public addNewEpargne() {
    const dialogRef = this.dialog.open(AddTypeEpargneDialog, {
      height: '500px',
      width: '600px',
      data: {"types": this.types_epargnes}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result && result.date_epargne && result.montant_epargne && result.motif_epargne && result.type_epargne) {
        let _epargne = new Epargne(result.id_epargne, this.format_date_utilities(new Date(result.date_epargne)), Number(result.montant_epargne), result.motif_epargne);
        this.mesepargnesService.addUpdateEpargne(_epargne, result.type_epargne).subscribe(resp => {
          _epargne.id_epargne = resp.id_epargne;
          this.push_epargne_to_array(_epargne, result.type_epargne);
        })
      } else {
        this._snackBar.open("Informations manquantes : Aucune données à sauvegarder !!", "Fermer", {
          duration: 6000,
        });
      }
    });
  }

  editDeleteEpargne(epargne: Epargne, type: string) : void {
    const dialogRef = this.dialog.open(AddTypeEpargneDialog, {
      height: '500px',
      width: '600px',
      data: {type_epargne: type, id_epargne: epargne.id_epargne, date_epargne: this.reverse_format_date_utilities(epargne.date_epargne), 
            montant_epargne: epargne.montant_epargne, motif_epargne: epargne.motif_epargne, 
            deleteEpargne: '', "types": this.types_epargnes}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result) {
        if(result.deleteEpargne != '') {
          console.log("do delete", result);
          this.mesepargnesService.deleteEpargne(result.id_epargne).subscribe(resp => {
            this.delete_epargne_from_array(result.id_epargne, result.type_epargne);
            this._snackBar.open("Supprimé", "Fermer", {
              duration: 6000,
            });
          });
        } else {
          console.log("do edit", result.id_epargne);
          if(result && result.date_epargne && result.montant_epargne && result.motif_epargne && result.type_epargne) {
            let _epargne = new Epargne(result.id_epargne, this.format_date_utilities(result.date_epargne), Number(result.montant_epargne), result.motif_epargne);
            this.mesepargnesService.addUpdateEpargne(_epargne, result.type_epargne).subscribe(resp => {
            this.delete_epargne_from_array(result.id_epargne, result.type_epargne);
            this.push_epargne_to_array(_epargne, result.type_epargne);
          })
          } else {
            this._snackBar.open("Informations manquantes : Aucune données à sauvegarder !!", "Fermer", {
              duration: 6000,
            });
          }
          
        }
        
      } else {
        this._snackBar.open("Annulé", "Fermer", {
          duration: 4000,
        });
      }
    });
  }
  
  calculate_totaux() :  void {
    this.total_credit = 0;
    this.total_debit = 0;
    this.sub_total_credit = [];
    this.sub_total_debit = [];
    
    for(let epargnes of this.mesepargnes) {
      let _t_credit: number = 0;
      let _t_debit: number = 0;
      let i = 0;
      for(let item of epargnes.epargnes) {
        if(item.montant_epargne > 0) {
          _t_credit += item.montant_epargne;
        } else {
          _t_debit += item.montant_epargne;
        }
      }
      this.total_credit += _t_credit;
      this.total_debit += Math.abs(_t_debit);
      this.sub_total_credit.push(_t_credit);
      this.sub_total_debit.push(_t_debit);
      i++;
    }

  }

  push_epargne_to_array(_epargne: Epargne, type: string) :  void {
    for(let item of this.mesepargnes) {
      if(item.type.toLocaleLowerCase() == type.toLocaleLowerCase() ) {
        item.epargnes.push(_epargne);
        this.calculate_totaux();
        this._snackBar.open("Succès", "Fermer", {
          duration: 6000,
        });
      }
    }
  }

  delete_epargne_from_array(id: number, type: string) {
    for(let epargnes of this.mesepargnes) {
      if(type.toLocaleLowerCase() == epargnes.type.toLocaleLowerCase() ) {
        for(var i = 0; i < epargnes.epargnes.length; i++) {
          if(epargnes.epargnes[i].id_epargne == id) {
            epargnes.epargnes.splice(i, 1);
            this.calculate_totaux();
              break;
          }
        }
      }
    }
  }

  changeDate() {
    console.log("changeDate called");
    this.mesepargnesService.getEpargnes(this.selectedYear).subscribe(resp => {
      this.mesepargnes = resp;
      this.calculate_totaux();
    })
  }

  get_types_epargnes() {
    this.mesepargnesService.get_types_epargnes(this.selectedYear).subscribe(resp => {
      this.types_epargnes = resp;
    })
  }

  format_date_utilities(date: Date) {
    let _dd: any; let _mm: any; let _yyyy: any; let correct_date: string;
    console.log(date);
    _dd = date.getDate();
    _mm = date.getMonth() + 1;
    _yyyy = date.getFullYear();
    if(_dd >= 0 && _dd <= 9) {
      _dd = "0" + String(_dd);
    }
    if(_mm >= 0 && _mm <= 9) {
      _mm = "0" + String(_mm);
    }
    correct_date = _dd + "/" + _mm + "/" + _yyyy;
    console.log(correct_date);
    return correct_date;
  }

  reverse_format_date_utilities(date_string: string) {
    let _dd: any; let _mm: any; let _yyyy: any; let picker_date: Date;
    let parts = date_string.split("/");
    _dd = parseInt(parts[0]);
    _mm = parseInt(parts[1]);
    _yyyy = parseInt(parts[2]);
    
    picker_date = new Date(_mm + "/" + _dd + "/" + _yyyy)
    
    console.log(picker_date);
    return picker_date;
  }

  sort_by_date(type) {
    console.log("sort me", this.mesepargnes);
    console.log(type);
    let _epargne_to_sort: any = []
    for(let ep of this.mesepargnes) {
      if(ep.type == type) {
        _epargne_to_sort = ep.epargnes;
      }
    }
    console.log(_epargne_to_sort);
    _epargne_to_sort.sort( this.compare );
    console.log(_epargne_to_sort);
  }

  compare(e1: any, e2: any ) {
    let _dd: any; let _mm: any; let _yyyy: any; let e11: Date;
    let parts = e1.date_epargne.split("/");
    _dd = parseInt(parts[0]);
    _mm = parseInt(parts[1]);
    _yyyy = parseInt(parts[2]);
    
    e11 = new Date(_mm + "/" + _dd + "/" + _yyyy)

    let _dd2: any; let _mm2: any; let _yyyy2: any; let e22: Date;
    let parts2 = e2.date_epargne.split("/");
    _dd2 = parseInt(parts2[0]);
    _mm2 = parseInt(parts2[1]);
    _yyyy2 = parseInt(parts2[2]);
    
    e22 = new Date(_mm2 + "/" + _dd2 + "/" + _yyyy2)
    
    if ( e11.getTime() < e22.getTime() ){
      return -1;
    }
    if ( e11.getTime() > e22.getTime() ){
      return 1;
    }
    return 0;
  }

  ngOnInit() {
    this.mesepargnesService.get_years().subscribe(resp => {
      this.years = resp;
      for(let year of this.years) {
        if(year.active_year) {
          this.selectedYear = year.value_year;
          this.mesepargnesService.getEpargnes(this.selectedYear).subscribe(resp => {
            this.mesepargnes = resp;
            this.calculate_totaux();
          });
        }
      }
      this.get_types_epargnes();
    });
    
  }

}

@Component({
  selector: 'add-type-epargne-dialog',
  templateUrl: 'add-type-epargne-dialog.html',
})
export class AddTypeEpargneDialog {
  constructor(
    public dialogRef: MatDialogRef<AddTypeEpargneDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  deleteEpargne(id) {
    this.data.deleteEpargne = id;
    //this.dialogRef.close();
  }

  cancelDialog(): void {
    this.dialogRef.close();
  }
}