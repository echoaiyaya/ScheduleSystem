import { Component, OnInit } from '@angular/core';
import { Timetables } from '../timetables';
import { TimetablesService } from '../timetables.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  providers: [TimetablesService]
})
export class HomepageComponent implements OnInit {

  timeTables: Timetables[];

  constructor(private timeTablesService : TimetablesService) { }

  ngOnInit(): void {
    this.getTimeTables();
  }

  public getTimeTables() {
    this.timeTablesService
    .getTimeTables()
    .then((timeTables: Timetables[]) => {
      this.timeTables = timeTables.map(timeTable => {
        return timeTable;
      });
    });
  }

  pageContent = {
    title: 'Here is avaible workers list'
  }

}
