import { Injectable } from '@angular/core';
import { Workers, Comments } from './workers';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WorkersService {

  constructor(private http:HttpClient) { }


  private booksUrl = 'http://localhost:3000/api/workers';

  getSingleWorker(workerId: string): Promise<void | Workers> {
    return this.http.get(this.booksUrl + '/' + workerId)
        .toPromise()
        .then(response => response as Workers)
        .catch(this.handleError);
  }

  private handleError(error: any) {
    console.log("error");
  }
}
