import { Element } from './../../models/element';
import { ElementService } from './../../services/element.service';
import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-mescourses-dragdrop',
  templateUrl: './mescourses-dragdrop.component.html',
  styleUrls: ['./mescourses-dragdrop.component.css']
})
export class MescoursesDragdropComponent implements OnInit {
  elements : Element[];
  newElement : Element = new Element();

  checkedZones : boolean[] = [true, true, true, true];

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

  preselection1 = [
    {libelle: 'Déo S', url: 'assets/images/deoS.jpg', zone:1},
    {libelle: 'Déo Y', url: 'assets/images/deoY.png', zone:1},
    {libelle: 'Dentifrice', url: 'assets/images/dentifricel.jpg', zone:1},
    {libelle: 'Savons', url: 'assets/images/savons.jpg'},
    {libelle: 'Shampoing', url: 'assets/images/shampoing.jpg', zone:1}
  ];
  preselection2 = [
    {libelle: 'Pâtes', url: 'assets/images/pates.jpg', zone:2},
    {libelle: 'Riz', url: 'assets/images/riz.jpg', zone:2},
    {libelle: 'Sucres', url: 'assets/images/sucres.jpg', zone:2},
    {libelle: 'Coulis de tomates', url: 'assets/images/coulis.png', zone:2},
    {libelle: 'Huile', url: 'assets/images/huiles.jpg', zone:2}
  ];
  preselection3 = [
    {libelle: 'Oeufs', url: 'assets/images/oeufs.jpg', zone:3},
    {libelle: 'Crème fraîche', url: 'assets/images/creme-fraiche.jpg', zone:3},
    {libelle: 'Crème liquide', url: 'assets/images/creme-liquide.jpg', zone:3},
    {libelle: 'Pate feuilletée', url: 'assets/images/feuilletee.png', zone:3},
    {libelle: 'Beurre', url: 'assets/images/beurre.jpg'}
  ];
  preselection4 = [
    {libelle: 'Oignons', url: 'assets/images/oignons.jpg', zone:4},
    {libelle: 'Poivrons', url: 'assets/images/poivrons.jpg', zone:4},
    {libelle: 'Pommes de terre', url: 'assets/images/pommesdeterre.jpg', zone:4},
    {libelle: 'Carottes', url: 'assets/images/carottes.jpg', zone:4},
    {libelle: 'Tomates', url: 'assets/images/tomates.jpg', zone:4}
  ]


  done = [];
  elementsZone1 = [];
  elementsZone2 = [];
  elementsZone3 = [];
  elementsZone4 = [];

  drop(event: CdkDragDrop<Element[]>) {
    let _libelle_element = event.previousContainer.data[event.previousIndex].libelle;
    let _zone_element = event.previousContainer.data[event.previousIndex].zone;
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        this.add(_libelle_element, _zone_element),
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  add(elem, zone): Element[] {
    let element: Element = new Element();
    element.libelle = elem;
    element.done = false;
    element.zone = zone;
    // this.elements.push(element);
    this.elementService.addElement(element).subscribe( resp => {
      console.log(resp);
    })
    return this.elements
  }

  ngOnInit() {
    this.elementService.getElement().subscribe(elem => this.elements = elem);
    this.newElement.zone = 1;
  }

}
