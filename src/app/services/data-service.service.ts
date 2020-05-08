import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataServiceService {
  private globalDataUrl = `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/05-07-2020.csv`;
  constructor(private http: HttpClient) {}

  getGlobalData() {
    return this.http
      .get(this.globalDataUrl, { responseType: 'text' })
      .pipe(map((result) => {
        let rows = result.split('\n');
        console.log(rows);
        rows.forEach(rows => {
          let cols = rows.split(',');
          console.log(cols);

        })

        return [];
      }));
  }
}
