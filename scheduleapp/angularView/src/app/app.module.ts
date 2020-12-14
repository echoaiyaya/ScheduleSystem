import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

//import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { FrameworkComponent } from './framework/framework.component';
import { WorkerDetailComponent } from './worker-detail/worker-detail.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TimetableDetailComponent } from './timetable-detail/timetable-detail.component';
import { AppointmentComponent } from './appointment/appointment.component';

@NgModule({
  declarations: [
    //AppComponent,
    HomepageComponent,
    FrameworkComponent,
    WorkerDetailComponent,
    LoginComponent,
    RegisterComponent,
    TimetableDetailComponent,
    AppointmentComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: '',
        component: HomepageComponent
      },
      {
        path: 'workers/:workerId',
        component: WorkerDetailComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'timetable/:timeTableId',
        component: TimetableDetailComponent
      },
      {
        path: 'appointment',
        component: AppointmentComponent
      }
    ])
  ],
  providers: [{provide: APP_BASE_HREF, useValue: '/'}],
  bootstrap: [FrameworkComponent]
})
export class AppModule { }
