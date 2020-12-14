import { Component, OnInit } from '@angular/core';
import {AppointmentService} from '../appointment.service';
import {Appointment} from '../appointment';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css'],
  providers: [AppointmentService]
})
export class AppointmentComponent implements OnInit {

  constructor(private appointmentService: AppointmentService) { }

  ngOnInit(): void {
    this.getAppointment();
  }

  appointments: Appointment[];

  public getAppointment() {
    let cid = sessionStorage.getItem('userId');
    if(cid == "null") {
      alert("please login!");
      return;
    }
    this.appointmentService
    .getAppointment(cid)
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
