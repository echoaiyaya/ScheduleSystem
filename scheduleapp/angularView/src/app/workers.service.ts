import { Injectable } from '@angular/core';
import { Workers, Comments, inputWorkder } from './workers';
import { HttpClient, HttpResponse } from '@angular/common/http';
import {checkLogin} from './customers'

@Injectable({
  providedIn: 'root'
})
export class WorkersService {

  constructor(private http:HttpClient) { }


  private workersUrl = 'http://localhost:3000/api/workers';
  private workerLoginUrl = 'http://localhost:3000/api/worker/login';
  private workerLogoutUrl = 'http://localhost:3000/api/worker/logout';


  getSingleWorker(workerId: string): Promise<void | Workers> {
    return this.http.get(this.workersUrl + '/' + workerId)
        .toPromise()
        .then(response => response as Workers)
        .catch(this.handleError);
  }

  public logout() {
    return this.http.get(this.workerLogoutUrl)
        .toPromise()
        .then(response => response as checkLogin)
        .catch(this.handleError);
  }

  public createWorker(newWorker: inputWorkder) : Promise<void|inputWorkder> {
    return this.http.post(this.workersUrl, newWorker)
        .toPromise()
        .then(response => response as inputWorkder)
        .catch(this.handleError);

  }

  public login(account:string, password: string): Promise<void | checkLogin> {
    return this.http.post(this.workerLoginUrl, {"phone": account, "password": password})
        .toPromise()
        .then(response => response as checkLogin)
        .catch(this.handleError);
  };

  private handleError(error: any) {
    console.log("error");
  }
}
