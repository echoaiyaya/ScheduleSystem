import { Component, OnInit } from '@angular/core';
import { CustomersService } from '../customers.service';
import { checkLogin, CustomerLogin } from '../customers';
import { WorkersService } from '../workers.service';
import { stringify } from 'querystring';
import {Router} from '@angular/router';
import { empty } from 'rxjs';

@Component({
  selector: 'app-framework',
  templateUrl: './framework.component.html',
  styleUrls: ['./framework.component.css']
})
export class FrameworkComponent implements OnInit {

  constructor(private workersService:WorkersService, private CustomersService:CustomersService, private router: Router) { }

  public login:boolean = false;
  public switchS:boolean = false;

  public checkLogin() {
    // console.log(sessionStorage.getItem('userId'))
    if(String(sessionStorage.getItem('userId')) != "null") {
      this.login = true;
      if (sessionStorage.getItem('level') == "2") {
        this.switchS = true;
        console.log(this.switchS)
      }
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
    } else if (sessionStorage.getItem("level") == "2") {
      this.workersService.logout().then((v:checkLogin) => {
        if (v.code == "200") {
          sessionStorage.setItem("level", null);
          sessionStorage.setItem("userId", null);
          this.login = false;
          this.switchS = false;
        }
        
        alert(v.message);
      });
    }
  }

  

  ngOnInit(): void {
    this.checkLogin();
    console.log(this.switchS)
  }




}
