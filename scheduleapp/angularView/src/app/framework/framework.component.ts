import { Component, OnInit } from '@angular/core';
import { CustomersService } from '../customers.service';
import { checkLogin, CustomerLogin } from '../customers';
import { stringify } from 'querystring';
import {Router} from '@angular/router';

@Component({
  selector: 'app-framework',
  templateUrl: './framework.component.html',
  styleUrls: ['./framework.component.css']
})
export class FrameworkComponent implements OnInit {

  constructor(private CustomersService:CustomersService, private router: Router) { }

  public login:boolean = false;

  public checkLogin() {
    // console.log(sessionStorage.getItem('userId'))
    if(sessionStorage.getItem('userId') != "null") {
      this.login = true;
    } else {
      this.login = false;
    }
  }

  public changeLoginStatus(loginStatus: boolean) {
    this.login == loginStatus;
  }
  

  public logout() {
    
    if (sessionStorage.getItem("level") == "3") {
      this.CustomersService.logout().then((v:checkLogin) => {
        if (v.code == "200") {
          sessionStorage.setItem("level", null);
          sessionStorage.setItem("userId", null);
          this.login = false;
          
        }
        
        alert(v.message);
      });
    }
  }

  

  ngOnInit(): void {
    this.checkLogin();
    console.log(this.login)
  }




}
