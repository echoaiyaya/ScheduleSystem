import { Component, OnInit } from '@angular/core';
import { Categories, Timetables } from '../timetables';
import { TimetablesService } from '../timetables.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  providers: [TimetablesService]
})
export class HomepageComponent implements OnInit {

  timeTables: Timetables[];
  categories: Categories[];

  constructor(private timeTablesService : TimetablesService) { }

  ngOnInit(): void {
    this.getTimeTables();
    this.getCategories();
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

  public getCategories() {
    this.timeTablesService
    .getCategories()
    .then((v:Categories[]) => {
      this.categories = v.map(category => {
        return category;
      });
    });
  }

  public getCidTimeTable(cid:string) {
    this.timeTablesService
    .getCidTimeTable(cid)
    .then((v:Timetables[]) => {
      this.timeTables = v.map(timeTable => {
        return timeTable;
      });
    });
  }





  pageContent = {
    title: 'Here is avaible workers list'
  }

}
