import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DataServiceService } from '../../services/data-service.service';
import { GlobalDataSummary } from '../../models/global-data';
import { GoogleChartsModule } from 'angular-google-charts';
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
  globalData: GlobalDataSummary[];
  datatable = [];

  loading = true;
  chart = {
    PieChart: "PieChart",
    ColumnChart: "ColumnChart",
    height: 500,
    options: {
      animation: {
        duration: 1000,
        easing: 'out',
      },
  }
  }



  constructor(private dataService: DataServiceService) {}

  initChart(caseType: string) {

    //this.datatable.push(['Country', 'Cases']);
    this.datatable =[];
    this.globalData.forEach((cs) => {
      let value: number;
      if (caseType == 'c') {
        if (cs.confirmed > 2000) {
          value = cs.confirmed;
          this.datatable.push([cs.country, value]);
        }
      }

      if (caseType == 'r') {
        if (cs.recovered > 2000) {
          value = cs.recovered;
          this.datatable.push([cs.country, value]);
        }
      }

      if (caseType == 'a') {
        if (cs.active > 2000) {
          value = cs.active;
          this.datatable.push([cs.country, value]);
        }
      }

      if (caseType == 'd') {
        if (cs.deaths > 1000) {
          value = cs.deaths;
          this.datatable.push([cs.country, value]);
        }
      }

      //console.log(value);

      //datatable.push([cs.country, value]);
    });

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
        });
        this.initChart('d');
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
  updateChart(input: HTMLInputElement) {
    console.log(input.value);
    this.initChart(input.value);
  }
}
