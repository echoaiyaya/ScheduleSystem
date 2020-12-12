import { Injectable } from '@angular/core';
import { Timetables, Times } from './timetables';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TimetablesService {

  constructor(private http:HttpClient) { }

  private timeTablesUrl = 'http://localhost:3000/api/timeTables';
  private timesUrl = 'http://localhost:3000/api/timeTable/times';

  getTimeTables() : Promise<void | Timetables[]> {
    return this.http.get(this.timeTablesUrl)
        .toPromise()
        .then(response => response as Timetables[])
        .catch(this.handleError);
  }

  private handleError(error: any) {
    console.log("error");
  }
}
