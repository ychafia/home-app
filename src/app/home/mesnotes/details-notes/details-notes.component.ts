import { Note } from './../../../models/note';
import { NotesService } from './../../../services/notes.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details-notes',
  templateUrl: './details-notes.component.html',
  styleUrls: ['./details-notes.component.css', '../mesnotes.component.css']
})
export class DetailsNotesComponent implements OnInit {
  note: Note = new Note();
  id_note: number;
  constructor(private notesService: NotesService, private route: ActivatedRoute) { }

  saveNote() : void {
    console.log(this.note);
    this.notesService.addNote(this.note).subscribe(data =>{
      console.log(data);
    });
  }

  ngOnInit() {
    this.id_note = Number(this.route.snapshot.paramMap.get('id'));
    if(this.id_note && this.id_note != 0) {
      this.notesService.getNoteById(this.id_note).subscribe(data => {
        this.note = data;
      });
    }
    
  }

}
