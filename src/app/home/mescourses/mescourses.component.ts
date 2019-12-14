//import { element } from 'protractor';
import { Element } from './../../models/element';
import { ElementService } from './../../services/element.service';
import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { trigger, state, style, animate, transition, group } from '@angular/animations';


@Component({
  selector: 'app-mescourses',
  templateUrl: './mescourses.component.html',
  styleUrls: ['./mescourses.component.css'],
  //changeDetection: ChangeDetectionStrategy.OnPush
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
export class MescoursesComponent implements OnInit {
  elements : Element[];
  newElement : Element = new Element();

  checkedZones : boolean[] = [false, false, false, false];

  constructor(private elementService: ElementService) {}

  addNewElement() {
    this.newElement.done = false;
    let zone = Number(this.newElement.zone);
    this.newElement.zone = zone;
    this.elementService.addElement(this.newElement).subscribe(resp => {
      if(resp) {
        this.newElement.id_element = resp;
        this.elements.push(this.newElement);
        this.newElement = new Element();
        this.newElement.zone = zone;
      }
    })
  }

  toggleZone(zone) {
    this.checkedZones[zone] = !this.checkedZones[zone];
  }
  
  makeDone(item): void {
    item.done = !item.done;
    // let element = $event;
    // element.done = !element.done;
    this.elementService.makeDone(item).subscribe(resp => {
      console.log(resp);
      // item.done = !item.done;
    })
  }

  deleteElement(id) : void {
    this.elementService.deleteElement(id).subscribe(resp => {
      if(resp) {
        this.pop_element_from_array(id);
      }
    })
  }

  deleteAll() {
    for(let item of this.elements) {
      if(item.done) {
        this.deleteElement(item.id_element);
      }
    }
  }

  pop_element_from_array(id) {
    for(var i = 0; i < this.elements.length; i++) {
      if(this.elements[i].id_element == id) {
        this.elements.splice(i, 1);
          break;
      }
    }
  }

  ngOnInit() {
    this.elementService.getElement().subscribe(elem => {
      this.elements = elem
      for(let el of elem) {
        if(el.zone == 1) { this.checkedZones[0] = true; }
        if(el.zone == 2) { this.checkedZones[1] = true; }
        if(el.zone == 3) { this.checkedZones[2] = true; }
        if(el.zone == 4) { this.checkedZones[3] = true; }
      }
    });
    this.newElement.zone = 1;
  }

  refresh() {
    this.elementService.getElement().subscribe(elem => this.elements = elem);
  }
}
