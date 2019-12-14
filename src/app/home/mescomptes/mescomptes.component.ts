import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition, group } from '@angular/animations';

@Component({
  selector: 'app-mescomptes',
  templateUrl: './mescomptes.component.html',
  styleUrls: ['./mescomptes.component.css'],
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
export class MescomptesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
