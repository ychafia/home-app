import { Note } from './../../../models/note';
import { NotesService } from './../../../services/notes.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

@Component({
  selector: 'app-details-notes',
  templateUrl: './details-notes.component.html',
  styleUrls: ['./details-notes.component.css', '../mesnotes.component.css']
})
export class DetailsNotesComponent implements OnInit {
  note: Note = new Note();
  id_note: number;
  showCalendar: boolean = false;
  textError: string  = "";
  edit: boolean = false;
  description_note: string = "";
  constructor(private notesService: NotesService, private route: ActivatedRoute, private _snackBar: MatSnackBar, private _adapter: DateAdapter<any>) { }

  saveNote() : void {
    if(this.note.title_note && this.note.description_note) {
      this.description_note = this.note.description_note;
      this.notesService.addNote(this.note).subscribe(data =>{
      this.textError = "";
      this.note.id_note = data;
      this._snackBar.open("Succès", "Fermer", {
          duration: 6000,
        });
      });
    } else {
      this.textError += " informations manquantes !!" 
    }
    
  }

  editNote() {
    this.edit = !this.edit;
    // this.note.description_note = this.note.description_note.replace(new RegExp('<br>', 'g'), "\n");
  }

  ngOnInit() {
    this._adapter.setLocale('fr');
    this.id_note = Number(this.route.snapshot.paramMap.get('id'));
    if(this.id_note && this.id_note != 0) {
      this.notesService.getNoteById(this.id_note).subscribe(data => {
        this.note = data;
        this.description_note = this.note.description_note.replace(new RegExp('\n', 'g'), "<br>")
        if(data.recall_date_note) {
          this.showCalendar = true;
          this.note.recall_date_note = new Date(data.recall_date_note);
        }
      });
    } else {
      
    }
  }

}
