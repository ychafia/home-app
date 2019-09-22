import { ElementService } from './../../services/element.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mescourses',
  templateUrl: './mescourses.component.html',
  styleUrls: ['./mescourses.component.css']
})
export class MescoursesComponent implements OnInit {
  elements;
  checkedZones : boolean[] = [true, true, true, true];

  constructor(private elementService: ElementService) {}

  toggleZone(zone) {
    this.checkedZones[zone] = !this.checkedZones[zone];
  }

  ngOnInit() {
    this.elementService.getElement().subscribe(elem => this.elements = elem);
  }

}
