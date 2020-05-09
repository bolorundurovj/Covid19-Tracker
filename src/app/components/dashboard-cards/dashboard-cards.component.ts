import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-cards',
  templateUrl: './dashboard-cards.component.html',
  styleUrls: ['./dashboard-cards.component.css']
})
export class DashboardCardsComponent implements OnInit {

  @Input('totalConfirmed') totalConfirmed;
  @Input('totalRecovered') totalRecovered;
  @Input('totalActive') totalActive;
  @Input('totalDeaths') totalDeaths;

  constructor() { }

  ngOnInit(): void {
  }

}
