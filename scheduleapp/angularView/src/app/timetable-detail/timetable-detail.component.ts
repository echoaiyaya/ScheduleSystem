import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Categories, Timetables } from '../timetables';
import { TimetablesService } from '../timetables.service';
import { switchMap } from 'rxjs/operators';
import { Appointment, inputAppointment} from '../appointment';
import { AppointmentService } from '../appointment.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-timetable-detail',
  templateUrl: './timetable-detail.component.html',
  styleUrls: ['./timetable-detail.component.css'],
  providers: [TimetablesService]
})
export class TimetableDetailComponent implements OnInit {

  constructor(private timeTableService:TimetablesService,private appointmentService: AppointmentService, private route:ActivatedRoute) { }

  timeTable: Timetables;
  appoinment: inputAppointment;
  

  ngOnInit(): void {
   this.getDate();
   console.log(this.timeTable)
  }

  getDate() {
    this.route.params.pipe(switchMap((params: Params) => {
      return this.timeTableService.getSingleTimeTable(params.timeTableId);
    }))
      .subscribe((timeTableDetail: Timetables) => {
            console.log(1111)
            console.log(timeTableDetail);
            this.timeTable = timeTableDetail;

          
        
      });
  }

  public createAppoint(workerId:string, timeId:string, timeTableId:string) {
    if(sessionStorage.getItem('userId') == "null") {
      alert("please login!");
      return;
    }
    //newComment.customerId = sessionStorage.getItem("userId");
    let newAppointment: inputAppointment = new inputAppointment();
    newAppointment.customerId = sessionStorage.getItem('userId');
    newAppointment.sequenceId = 1;
    newAppointment.timeId = timeId;
    newAppointment.workerId = workerId;
    newAppointment.timetableId = timeTableId;
    this.appointmentService.createAppointment(newAppointment).then((v:inputAppointment)=>{
      alert("book an appointment successfully!");
      
    });
  }



}
