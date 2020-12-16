import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Customers, CustomerLogin, checkLogin} from '../customers';
import { CustomersService } from '../customers.service';
import { WorkersService } from '../workers.service'
import { Workers } from '../workers';
import {Router} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private workerService:WorkersService, private customerService : CustomersService, private router: Router) { }
  
  account: string;
  password: string;
  type: number;

  //@Output() loginStatus = new EventEmitter<boolean>();
  ngOnInit(): void {
  }

  public checkLogin(account: string, password: string, type: number) {
    if (type == 3) {
      this.customerService.login(account, password).then((v:checkLogin) => {
        if (v.code == "200") {
          sessionStorage.setItem("level", "3");
          sessionStorage.setItem("userId", v.userId);
          //console.log(sessionStorage.getItem("userId"));
          //this.loginStatus.emit(true);
          location.href = '';
        }

        alert(v.message);
      });
    } else if (type == 2) {
      this.workerService.login(account, password).then((v:checkLogin) => {
        if (v.code == "200") {
          sessionStorage.setItem("level", "2");
          sessionStorage.setItem("userId", v.userId);
          //console.log(sessionStorage.getItem("userId"));
          //this.loginStatus.emit(true);
          location.href = '';
        }

        alert(v.message);
      });
    }
  }



  


  pageContent = {
  	title: "Please log in"
  };

}
