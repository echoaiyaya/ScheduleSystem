import { Component, OnInit } from '@angular/core';
import {Customers} from '../customers';
import {Workers, inputWorkder} from '../workers';
import {WorkersService} from '../workers.service'
import {CustomersService} from '../customers.service';
import {Router} from '@angular/router';
import {Categories} from '../timetables';
import { TimetablesService } from '../timetables.service';
import { FrameworkComponent } from '../framework/framework.component';
 
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [CustomersService]
})
export class RegisterComponent implements OnInit {

  constructor(private workerService:WorkersService, private timeTablesService:TimetablesService, private CustomersService: CustomersService, private router:Router) { }

  ngOnInit(): void {
    this.getCategories();
  }

  public switch:boolean = false;
  public categories:Categories[];
  public changeSwitch(value:boolean) {
    this.switch = value;
  }

  newCustomer: Customers = {
    _id: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: ''
  }

  newWorker: inputWorkder = {
    _id: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    description: '',
    category: ''
  }



  public createNewCustomer(newCustomer: Customers): void {
    this.CustomersService.createCustomer(newCustomer).then(() => {
      alert("register Success");
      location.href= '';
    });
  }

  public createNewWorker(newWorker: inputWorkder): void {
    this.workerService.createWorker(newWorker).then(() => {
      alert("register Success");
      location.href= '';
    });
  }

  public getCategories() {
    this.timeTablesService
    .getCategories()
    .then((v:Categories[]) => {
      this.categories = v;
      console.log(v)
    });
  }

}
