import { Injectable } from '@angular/core';
import { Timetables, Times, Categories } from './timetables';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TimetablesService {

  constructor(private http:HttpClient) { }

  private timeTablesUrl = 'http://localhost:3000/api/timeTables';
  private timesUrl = 'http://localhost:3000/api/timeTable/times';
  private getCategoriesUrl = 'http://localhost:3000/api/categories';
  private timeTableUrl = 'http://localhost:3000/api/timeTable';


  getTimeTables() : Promise<void | Timetables[]> {
    return this.http.get(this.timeTablesUrl)
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
