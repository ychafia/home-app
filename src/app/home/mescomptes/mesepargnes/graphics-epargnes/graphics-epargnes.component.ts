import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { MesepargnesService } from 'src/app/services/mesepargnes.service';

@Component({
  selector: 'app-graphics-epargnes',
  templateUrl: './graphics-epargnes.component.html',
  styleUrls: ['./graphics-epargnes.component.css']
})
export class GraphicsEpargnesComponent implements OnInit {
  years : any[];
  selectedYear: any;
  types_epargnes: any;
  mesepargnes: any;
  activeTab: number = 1;
  public lineChartData: ChartDataSets[] = [
    { data: [0, 65, 59, 80, 81, 56, 55, 40], label: 'Livret A' },
  ];
  public lineChartLabels: Label[] = ['', 'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Sptembre', 'Novembre', 'Décembre'];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        }
      ]
    },
    annotation: {
      annotations: [],
    },
  };
  public lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [pluginAnnotations];

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  constructor(private mesepargnesService: MesepargnesService) { }

  ngOnInit() {
    this.mesepargnesService.get_years().subscribe(resp => {
      this.years = resp;
      for(let year of this.years) {
        if(year.active_year) {
          this.selectedYear = year.value_year;
          this.mesepargnesService.getEpargnes(this.selectedYear).subscribe(resp => {
            this.mesepargnes = resp;
          });
        }
      }
      this.get_types_epargnes();
    });
    
  }

  get_types_epargnes() {
    this.mesepargnesService.get_types_epargnes(this.selectedYear).subscribe(resp => {
      this.types_epargnes = resp;
    })
  }

  showMe(id: number) {
    console.log(id);
    this.activeTab = id;
    this.lineChartData[0].data = [0, 15, 20, 35, 50, 26];
    this.lineChartData[0].label =  'PEL 1'; 
    console.log(this.lineChartData[0].data);
  }

}
