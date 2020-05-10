import { Component, OnInit, Input, ViewChild, OnChanges } from '@angular/core';
import { DataServiceService } from '../../services/data-service.service';
import { GlobalDataSummary } from '../../models/global-data';
import { GoogleChartInterface } from 'ng2-google-charts';
import { from } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  totalConfirmed = 0;
  totalActive = 0;
  totalDeaths = 0;
  totalRecovered = 0;
  pieChart: GoogleChartInterface = {
    chartType: 'PieChart',
  };
  columnChart: GoogleChartInterface = {
    chartType: 'ColumnChart',
  };
  globalData: GlobalDataSummary[];

  @ViewChild('googleChart') googleChart: GoogleChartInterface;

  constructor(private dataService: DataServiceService) {}



  initChart(caseType: string) {
    let datatable = [];
    datatable.push(['Country', 'Cases'])
    this.globalData.forEach((cs) => {
      let value: number;
      if (caseType == 'c')
      {
        if (cs.confirmed > 2000){
          value = cs.confirmed;
          datatable.push([cs.country, value]);
        }
      }

      if (caseType == 'r'){
        if (cs.recovered > 2000){
          value = cs.recovered;
          datatable.push([cs.country, value]);
        }
      }


      if (caseType == 'a'){
        if (cs.active > 2000){
          value = cs.active;
          datatable.push([cs.country, value]);
        }
      }

      if (caseType == 'd'){
        if (cs.deaths > 1000){
          value = cs.deaths;
          datatable.push([cs.country, value]);
        }
      }

      //console.log(value);

      //datatable.push([cs.country, value]);

    });
    this.pieChart = ({
      chartType: 'PieChart',
      dataTable: datatable,
      //firstRowIsData: true,
      options: { height: 500 },
    });
    this.columnChart = ({
      chartType: 'ColumnChart',
      dataTable: datatable,
      //firstRowIsData: true,
      options: { height: 500,},
    });


    this.cd.detectChanges();

  }




  ngOnInit(): void {
    this.dataService.getGlobalData().subscribe({
      next: (result) => {
        console.log(result);
        this.globalData = result;
        result.forEach((cs) => {
          if (!Number.isNaN(cs.confirmed)) {
            this.totalActive += cs.active;
            this.totalConfirmed += cs.confirmed;
            this.totalDeaths += cs.deaths;
            this.totalRecovered += cs.recovered;
          }
        })
        this.initChart('c');
      }
    })
  }
  updateChart(input: HTMLInputElement) {
    console.log(input.value);
    this.initChart(input.value);

  }
}
