import { Component, OnInit } from '@angular/core';
import { CustomersService } from '../customers.service';
import { checkLogin, CustomerLogin } from '../customers';

@Component({
  selector: 'app-framework',
  templateUrl: './framework.component.html',
  styleUrls: ['./framework.component.css']
})
export class FrameworkComponent implements OnInit {

  constructor(private CustomersService:CustomersService) { }

  public login:boolean = false;

  public checkLogin() {
    this.CustomersService.checkLogin()
    .then((v:checkLogin) => {
      if (v.code == "200") {
        this.login = true;
      } else {
        this.login = false;
      }
    });
  }

  ngOnInit(): void {
    this.checkLogin();
    console.log(this.login)
  }



}
