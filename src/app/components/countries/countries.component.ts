import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';
import { GlobalDataSummary } from '../../models/global-data';
import { DateWiseData } from 'src/app/models/date-wise-data';
import { GoogleChartsModule } from 'angular-google-charts';
import { merge } from 'rxjs';
import { map } from 'rxjs/operators';

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
  loading = true;

  chart = {
    LineChart: "LineChart",
    options: {
      height: 500,
      animation: {
        duration: 1000,
        easing: 'out',
      },
  }
  }

  data: GlobalDataSummary[];
  countries: string[] = [];
  constructor(private service: DataServiceService) {}

  ngOnInit(): void {
    merge(
      this.service.getDateWiseData().pipe(
        map((result) => {
          this.dateWiseData = result;
        })
      ),
      this.service.getGlobalData().pipe(
        map((result) => {
          this.data = result;
          this.data.forEach((cs) => {
            this.countries.push(cs.country);
          });
        })
      )
    ).subscribe({
      complete: () => {
        this.updateValues('Nigeria');
        this.selectedCountryData = this.dateWiseData['Nigeria'];
        this.updateChart();
        this.loading = false;
      },
    });
  }

  updateChart() {
    let dataTable = [];
    dataTable.push(['Date', 'Cases']);
    this.selectedCountryData.forEach((cs) => {
      dataTable.push([cs.date, cs.cases]);
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
    this.updateChart();
  }
}
