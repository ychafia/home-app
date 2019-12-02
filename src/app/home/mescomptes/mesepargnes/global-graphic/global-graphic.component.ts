import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label, Color, BaseChartDirective } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { MesepargnesService } from 'src/app/services/mesepargnes.service';

@Component({
  selector: 'app-global-graphic',
  templateUrl: './global-graphic.component.html',
  styleUrls: ['./global-graphic.component.css']
})
export class GlobalGraphicComponent implements OnInit {
  array_month: string[] = ["01", "02","03", "04","05", "06", "07","08", "09","10", "11", "12"];
  years : any[];
  selectedYear: any;
  types_epargnes: any;
  mesepargnes: any;
  activeTab: number = 1;
  totaux_by_type: any[] = [];
  //montant_by_month: any = [];
  sous_solde: any = {"01": "", "02": "", "03": "", "04": "", "05": "", "06": "", "07": "", "08": "", "09": "", "10": "", "11": "", "12": "", };
  public lineChartData: ChartDataSets[] = [
    { data: [], label: 'Totaux des épargnes' },
    { data: [], label: 'Totaux des épargnes + Solde année précédente' }
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
  public lineChartType = 'line';
  public lineChartPlugins = [pluginAnnotations];

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  constructor(private mesepargnesService: MesepargnesService) { }

  ngOnInit() {
    let _date : Date = new Date();
    this.mesepargnesService.get_totaux_synthese().subscribe( totaux => {
      let _totaux_previous_year: number = 0;
      for(let item of totaux) {
        _totaux_previous_year += item[2];
      }
      // _totaux_previous_year = Number(_totaux_previous_year.toFixed(2));
      // console.log(_totaux_previous_year);
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
              let _solde = 0;
              let _solde_previous_year = _totaux_previous_year;
              for(let month of this.array_month) {
                if(Number(month) <= _date.getMonth() +1) { // Graphe : Limiter l'affichage jusqu'au mois actuel ( _date.get(month()+1) )
                  for(let type of this.totaux_by_type) {
                    _solde += type.totaux[month];
                    _solde_previous_year += type.totaux[month];
                  }
                  this.lineChartData[0].data.push(_solde);
                  this.lineChartData[1].data.push(_solde_previous_year);;
                  this.lineChartData[1].label = 'Totaux des épargnes + Solde année précédente ('+_totaux_previous_year+' euros)';
                }
              }
            });
          }
        }
        this.get_types_epargnes();
      });

      console.log(totaux);
    });
      
    
  }

  get_types_epargnes() {
    this.mesepargnesService.get_types_epargnes(this.selectedYear).subscribe(resp => {
      this.types_epargnes = resp;
    })
  }

}
