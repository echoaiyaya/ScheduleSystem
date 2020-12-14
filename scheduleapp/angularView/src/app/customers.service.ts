import { Injectable } from '@angular/core';
import { Customers, CustomerLogin, checkLogin } from './customers';
import { Workers, Comments, inputComments } from './workers';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(private http:HttpClient) { }

  private loginUrl = 'http://localhost:3000/api/customer/login';
  private logoutUrl = 'http://localhost:3000/api/customer/logout';
  private customersUrl = 'http://localhost:3000/api/customers';
  private commentUrl = 'http://localhost:3000/api/customer/comment';

  public login(account:string, password: string): Promise<void | checkLogin> {
    return this.http.post(this.loginUrl, {"phone": account, "password": password})
        .toPromise()
        .then(response => response as checkLogin)
        .catch(this.handleError);
  };

  public checkLogin() : Promise<void | checkLogin> {
    return this.http.get(this.loginUrl)
        .toPromise()
        .then(response => response as checkLogin)
        .catch(this.handleError);
  }

  public logout() {
    return this.http.get(this.logoutUrl)
        .toPromise()
        .then(response => response as checkLogin)
        .catch(this.handleError);
  }

  public createCustomer(newCustomer: Customers) : Promise<void|Customers> {
    return this.http.post(this.customersUrl, newCustomer)
        .toPromise()
        .then(response => response as Customers)
        .catch(this.handleError);

  }

  public createComment(workerId: string, newComment: inputComments): Promise<void | Workers> {
    return this.http.post(this.commentUrl + '/' + workerId, newComment)
        .toPromise()
        .then(response => response as Workers)
        .catch(this.handleError);
  }

  public deleteComment(workerId: string, commentId: string): Promise<void | string> {
    return this.http.delete(this.commentUrl + '/' + workerId + '/' + commentId)
          .toPromise()
          .then(response => response as string)
          .catch(this.handleError);
  }
  

  private handleError(error: any) {
    console.log(error);
  }
}
