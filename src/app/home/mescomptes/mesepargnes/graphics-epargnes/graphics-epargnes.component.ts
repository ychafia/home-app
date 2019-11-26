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
  array_month: string[] = ["01", "02","03", "04","05", "06", "07","08", "09","10", "11", "12"];
  years : any[];
  selectedYear: any;
  types_epargnes: any;
  mesepargnes: any;
  activeTab: number = 1;
  totaux_by_type: any[] = [];
  public lineChartData: ChartDataSets[] = [
    { data: [], label: '' }
  ];
  public lineChartLabels: Label[] = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Sptembre', 'Octobre', 'Novembre', 'Décembre'];
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
    { 
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'bar';
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
          this.mesepargnesService.get_totaux_by_type(this.selectedYear).subscribe(resp => {
            this.totaux_by_type = resp;
            let _preview_total: any;
            for(let type of this.totaux_by_type) {
              if(type.type == 1){
                for(let month of this.array_month) {
                  // if(month != "01" && type.totaux[month] == 0.0) {
                  //   this.lineChartData[0].data.push(_preview_total);
                  // } else {
                  //   this.lineChartData[0].data.push(type.totaux[month]);
                  //   _preview_total = type.totaux[month];
                  // }
                  this.lineChartData[0].data.push(type.totaux[month]);
                }
              }
            }
            console.log(this.lineChartData);
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
    if(this.activeTab != id) {
      this.activeTab = id;
      this.lineChartData[0].data = [];
      for(let type of this.totaux_by_type) {
        if(type.type == id){
          for(let month of this.array_month) {
            this.lineChartData[0].data.push(type.totaux[month]);
          }
        }
      }
    }
  }

}
