import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Note } from './../../models/note';
import { NotesService } from './../../services/notes.service';
import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition, group } from '@angular/animations';

@Component({
  selector: 'app-mesnotes',
  templateUrl: './mesnotes.component.html',
  styleUrls: ['./mesnotes.component.css'],
  animations: [
    trigger('slide-app', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('void => *', [
        style({ transform: 'translateX(-100%)' }),
        animate(300)
      ]),
      transition('* => void', [
        animate(300, style({ transform: 'translateX(100%)' }))
      ])
    ])
  ]
})
export class MesnotesComponent implements OnInit {
  notes: Note[] = [];
  description_note: string = "";
  constructor(private notesService: NotesService, private _snackBar: MatSnackBar, private router: Router) { }

  getNotes() : void {
    this.notesService.getNotes().subscribe(data => {
      this.notes = data;
      for(let note of this.notes) {
        note.description_note = note.description_note.replace(new RegExp('\n', 'g'), "<br>")
      }
    });
  }

  deleteNote(id) {
    this.notesService.deleteNote(id).subscribe(data => {
      if(data) {
        this.pop_enote_from_array(id);
        this._snackBar.open("Succès", "Fermer", {
          duration: 6000,
        });
      }
    })
  }

  pop_enote_from_array(id) {
    for(var i = 0; i < this.notes.length; i++) {
      if(this.notes[i].id_note == id) {
        this.notes.splice(i, 1);
          break;
      }
    }
  }

  gotoAddNew() {
    this.router.navigate(['mesnotes/details-note/0']);
  }

  ngOnInit() {
    this.getNotes();
  }

}
