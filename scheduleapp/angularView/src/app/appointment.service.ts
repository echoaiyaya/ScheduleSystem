import { Injectable } from '@angular/core';
import { Appointment, inputAppointment } from './appointment';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private http:HttpClient) { }

  private appointmentUrl = 'http://localhost:3000/api/appointment';
  private wappointmentUrl = 'http://localhost:3000/api/appointment/worker';

  public createAppointment(newApp: inputAppointment): Promise<void | inputAppointment> {
    return this.http.post(this.appointmentUrl, newApp)
        .toPromise()
        .then(response => response as inputAppointment)
        .catch(this.handleError);
  }

  public getAppointment(customerId:string) : Promise<void | Appointment[]> {
    return this.http.get(this.appointmentUrl + '/' + customerId)
        .toPromise()
        .then(response => response as Appointment[])
        .catch(this.handleError);
  }
  public getWAppointment(workerId:string) : Promise<void | Appointment[]> {
    return this.http.get(this.wappointmentUrl + '/' + workerId)
        .toPromise()
        .then(response => response as Appointment[])
        .catch(this.handleError);
  }

  public deleteAppointment(appointmentId: string): Promise<void | string> {
    return this.http.delete(this.appointmentUrl + '/' + appointmentId)
          .toPromise()
          .then(response => response as string)
          .catch(this.handleError);
  }

  private handleError(error: any) {
    console.log(error);
  }
}
