import { Injectable } from '@angular/core';
import { Customers, CustomerLogin, checkLogin } from './customers';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(private http:HttpClient) { }

  private loginUrl = 'http://localhost:3000/api/customer/login';

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

  private handleError(error: any) {
    console.log(error);
  }
}
