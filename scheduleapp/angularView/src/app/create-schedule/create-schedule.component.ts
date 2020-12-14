import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { inputTimetables, Timetables, Times } from '../timetables';
import { TimetablesService } from '../timetables.service';

@Component({
  selector: 'app-create-schedule',
  templateUrl: './create-schedule.component.html',
  styleUrls: ['./create-schedule.component.css'],
  providers: [TimetablesService]
})
export class CreateScheduleComponent implements OnInit {

  constructor(private timeTableService: TimetablesService) { }

  timeTable:inputTimetables = new inputTimetables();
  timeTableId:string;
  times: Times = new Times();
  showTimes: Times[];
  timeForm = false;


  ngOnInit(): void {
  }

  public createSchedule(timeTable: inputTimetables) {
    if(sessionStorage.getItem('userId') == "null") {
      alert("please login!");
      return;
    }
    //newComment.customerId = sessionStorage.getItem("userId");
    
    timeTable.workerId = sessionStorage.getItem('userId');
    this.timeTableService.createTimeTables(timeTable).then((v:inputTimetables)=>{
      this.timeTableId = v._id;
      this.timeTable = v;
      this.showTimes = v.times;
      alert("Please Continue to add time");
      this.timeForm = true;
    });
  }

  public createTime(times: Times) {
    if(this.timeTableId == null || this.timeTableId == '') {
      alert("please enter year month date fisrt");
    }
    this.timeTableService.createTime(this.timeTableId, times).then((v:Timetables) => {
      this.showTimes = v.times;
    });
  }



}
