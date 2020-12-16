import { Component, OnInit } from '@angular/core';
import { Categories, Timetables } from '../timetables';
import { TimetablesService } from '../timetables.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
  providers: [TimetablesService]
})
export class ScheduleComponent implements OnInit {

  constructor(private timeTablesService : TimetablesService) { }

  timeTables: Timetables[];

  ngOnInit(): void {
    this.getTimeTables();
  }

  public getTimeTables() {
    let workerId = sessionStorage.getItem("userId");
    this.timeTablesService
    .getTimeTableById(workerId)
    .then((timeTables: Timetables[]) => {
      this.timeTables = timeTables.map(timeTable => {
        return timeTable;
      });
    });
  }

  public deleteFunc(timeTableId) {
    this.timeTablesService.deleteTimeTables(timeTableId).then(v => {
      this.getTimeTables();
    })
  }


}
