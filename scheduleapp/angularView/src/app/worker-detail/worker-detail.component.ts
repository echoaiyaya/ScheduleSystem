import { Component, OnInit } from '@angular/core';
import { Workers, Comments } from '../workers';
import { WorkersService } from '../workers.service';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-worker-detail',
  templateUrl: './worker-detail.component.html',
  styleUrls: ['./worker-detail.component.css']
})
export class WorkerDetailComponent implements OnInit {

  constructor(private workersService: WorkersService, private route: ActivatedRoute, private jump: Router) { }

  newComment: Comments = new Comments();
  workerDetail: Workers;
  pageContent = {
    _id: '',
    firstName: '',
    lastName: '',
    groupId: '',
    description: '',
    avaliable: false,
    category: null,
    phone: '',
    email: '',
    comments: [],
  }

  getDate() {
    this.route.params.pipe(switchMap((params: Params) => {
      return this.workersService.getSingleWorker(params.workerId);
    }))
      .subscribe((workerDetail: Workers) => {

          this.workerDetail = workerDetail;
          this.pageContent._id = workerDetail._id;
          this.pageContent.firstName = workerDetail.firstName;
          this.pageContent.lastName = workerDetail.lastName;
          this.pageContent.description = workerDetail.description;
          this.pageContent.phone = workerDetail.phone;
          this.pageContent.email = workerDetail.email;
          this.pageContent.avaliable = workerDetail.avaliable;
          this.pageContent.category = workerDetail.category;
          this.pageContent.comments = workerDetail.comments;
          this.pageContent.groupId = workerDetail.gourpId;
          console.log(this.pageContent);
      });
  }

  ngOnInit(): void {
    this.getDate();
  }

}
