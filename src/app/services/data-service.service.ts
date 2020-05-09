import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { GlobalDataSummary } from '../models/global-data';

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
        let data : GlobalDataSummary[] = [];
        let raw = {};
        let rows = result.split('\n');
        rows.splice(0,1);
        rows.forEach(rows => {
          let cols = rows.split(/,(?=\S)/);
          let cs = {
            country : cols[3],
            confirmed : +cols[7],
            deaths : +cols[8],
            recovered : +cols[9],
            active : +cols[10],
          };
          raw[cs.country] = cs;
          console.log(data);

        })

        return [];
      }));
  }
}
