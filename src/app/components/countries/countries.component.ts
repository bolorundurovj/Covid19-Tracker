import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';
import { GlobalDataSummary } from '../../models/global-data';
import { DateWiseData } from 'src/app/models/date-wise-data';
import { GoogleChartInterface } from 'ng2-google-charts';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css'],
})
export class CountriesComponent implements OnInit {
  totalConfirmed = 0;
  totalActive = 0;
  totalDeaths = 0;
  totalRecovered = 0;
  selectedCountryData: DateWiseData[];
  dateWiseData;

  lineChart: GoogleChartInterface = {
    chartType: 'LineChart',
  };

  data: GlobalDataSummary[];
  countries: string[] = [];
  constructor(private service: DataServiceService) {}

  ngOnInit(): void {
    this.service.getGlobalData().subscribe((result) => {
      this.data = result;
      this.data.forEach((cs) => {
        this.countries.push(cs.country);
      });
    });

    this.service.getDateWiseData().subscribe((result) => {
      //console.log(result);
      this.dateWiseData = result;
      this.updateChart();
    })
  }

  updateChart() {
    let dataTable = [];
    dataTable.push(['Cases', 'Date'])
    this.selectedCountryData.forEach(cs => {
      dataTable.push([cs.cases, cs.date])
    })
    this.lineChart = ({
      chartType: 'LineChart',
      dataTable: dataTable,
      //firstRowIsData: true,
      options: { height: 500 },
    });

  }

  updateValues(country: string) {
    this.data.forEach((cs) => {
      if (cs.country == country) {
        this.totalActive += cs.active;
        this.totalConfirmed += cs.confirmed;
        this.totalDeaths += cs.deaths;
        this.totalRecovered += cs.recovered;
      }
    });

    this.selectedCountryData = this.dateWiseData[country];
  }
}
