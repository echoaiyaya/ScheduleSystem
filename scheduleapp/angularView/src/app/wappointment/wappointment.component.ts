import { Component, OnInit } from '@angular/core';
import {AppointmentService} from '../appointment.service';
import {Appointment} from '../appointment';

@Component({
  selector: 'app-wappointment',
  templateUrl: './wappointment.component.html',
  styleUrls: ['./wappointment.component.css'],
  providers: [AppointmentService]
})
export class WappointmentComponent implements OnInit {

  constructor(private appointmentService: AppointmentService) { }

  appointments: Appointment[];

  ngOnInit(): void {
    this.getAppointment();
  }

  public getAppointment() {
    let cid = sessionStorage.getItem('userId');
    if(cid == "null") {
      alert("please login!");
      return;
    }
    this.appointmentService
    .getWAppointment(cid)
    .then((appointments: Appointment[]) => {
        this.appointments = appointments;
      });
    
  }

  public deleteFunc(appointmentId) {
    this.appointmentService.deleteAppointment(appointmentId).then((v) => {
      alert("Delete Success.");
      this.getAppointment();
    });
  }

}
