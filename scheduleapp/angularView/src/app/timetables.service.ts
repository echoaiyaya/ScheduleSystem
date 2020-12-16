import { Injectable } from '@angular/core';
import { Timetables, Times, Categories, inputTimetables } from './timetables';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { inputComments } from './workers';
import { Time } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TimetablesService {

  constructor(private http:HttpClient) { }

  private timeTablesUrl = 'http://localhost:3000/api/timeTables';
  private timesUrl = 'http://localhost:3000/api/timeTable/times';
  private getCategoriesUrl = 'http://localhost:3000/api/categories';
  private timeTableUrl = 'http://localhost:3000/api/timeTable';

  public createTimeTables(newTimeTable: inputTimetables): Promise<void | inputTimetables> {
    return this.http.post(this.timeTablesUrl, newTimeTable)
        .toPromise()
        .then(response => response as inputTimetables)
        .catch(this.handleError);
  }

  public createTime(timeTableId: string, newTime: Times): Promise<void | Timetables> {
    return this.http.post(this.timesUrl + '/' + timeTableId, newTime)
        .toPromise()
        .then(response => response as Timetables)
        .catch(this.handleError);
  }

  public deleteTimeTables(timeTableId:string) : Promise<void | string> {
    return this.http.delete(this.timeTableUrl + '/' + timeTableId)
        .toPromise()
        .then(response => response as string)
        .catch(this.handleError);
  }

  getTimeTables() : Promise<void | Timetables[]> {
    return this.http.get(this.timeTablesUrl)
        .toPromise()
        .then(response => response as Timetables[])
        .catch(this.handleError);
  }

  getTimeTableById(workerId:string) : Promise<void | Timetables[]> {
    return this.http.get(this.timeTablesUrl + '/worker/' + workerId )
        .toPromise()
        .then(response => response as Timetables[])
        .catch(this.handleError);
  }

  getCategories() : Promise<void | Categories[]> {
    return this.http.get(this.getCategoriesUrl)
      .toPromise()
      .then(response => response as Categories[])
      .catch(this.handleError);
  }

  getCidTimeTable(cid:string) : Promise<void | Timetables[]> {
    return this.http.get(this.timeTablesUrl + '/' + cid)
        .toPromise()
        .then(response => response as Timetables[])
        .catch(this.handleError);
  }  

  getSingleTimeTable(tid:string) : Promise<void | Timetables> {
    console.log(this.timeTableUrl + '/' + tid);
    return this.http.get(this.timeTableUrl + '/' + tid)
        .toPromise()
        .then(response => response as Timetables)
        .catch(this.handleError);
  }  



  private handleError(error: any) {
    console.log(error);
    
  }
}
