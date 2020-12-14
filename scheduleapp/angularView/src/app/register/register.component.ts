import { Component, OnInit } from '@angular/core';
import {Customers} from '../customers';
import {CustomersService} from '../customers.service';
import {Router} from '@angular/router';
import { FrameworkComponent } from '../framework/framework.component';
 
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [CustomersService]
})
export class RegisterComponent implements OnInit {

  constructor(private CustomersService: CustomersService, private router:Router) { }

  ngOnInit(): void {
  }

  newCustomer: Customers = {
    _id: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: ''
  }

  public createNewCustomer(newCustomer: Customers): void {
    this.CustomersService.createCustomer(newCustomer).then(() => {
      alert("register Success");
      location.href= '';
    });
    

  }

}
