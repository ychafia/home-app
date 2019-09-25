import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-mescourses-list',
  templateUrl: './mescourses-list.component.html',
  styleUrls: ['./mescourses-list.component.css']
})
export class MescoursesListComponent implements OnInit {

  @Input() elements: Element;
  @Input() zone: number;
  @Output() makeDone = new EventEmitter<string>();
  @Output() deleteMe = new EventEmitter<number>();

  constructor() { }

  makeDoneElement(element) {
    this.makeDone.emit(element);
  }

  deleteElement(id) {
    this.deleteMe.emit(id);
  }

  ngOnInit() {
  }

}
