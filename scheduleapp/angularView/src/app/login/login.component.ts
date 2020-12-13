import { Component, OnInit } from '@angular/core';
import { Customers, CustomerLogin, checkLogin} from '../customers';
import { CustomersService } from '../customers.service';
import { Workers } from '../workers';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private customerService : CustomersService) { }
  
  account: string;
  password: string;
  type: number;

  ngOnInit(): void {
  }

  public checkLogin(account: string, password: string, type: number) {
    if (type == 3) {
      this.customerService.login(account, password).then((v:checkLogin) => {
        alert(v.message);
      });
    }
  }

  pageContent = {
  	title: "Please log in"
  };

}
