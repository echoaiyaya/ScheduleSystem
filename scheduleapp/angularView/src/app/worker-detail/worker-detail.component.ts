import { Component, OnInit } from '@angular/core';
import { Workers, Comments, inputComments } from '../workers';
import { CustomersService } from '../customers.service';
import { WorkersService } from '../workers.service';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-worker-detail',
  templateUrl: './worker-detail.component.html',
  styleUrls: ['./worker-detail.component.css']
})
export class WorkerDetailComponent implements OnInit {

  constructor(private customerService: CustomersService,private workersService: WorkersService, private route: ActivatedRoute, private jump: Router) { }

  newComment: inputComments = new inputComments();
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

  public createComment(newComment:inputComments) {
    if(sessionStorage.getItem('userId') == "null") {
      alert("please login!");
      return;
    }
    //newComment.customerId = sessionStorage.getItem("userId");
    newComment.targetType = 2;
    newComment.customerId = sessionStorage.getItem('userId');
    this.customerService.createComment(this.workerDetail._id, newComment).then((v:Workers)=>{
      alert("add new comment success");
      console.log(v.comments);
      this.pageContent.comments = v.comments;
      this.newComment = new inputComments();
    });
  }

  public deleteComm(workerId, commid, customerId) {
    let userId:string = sessionStorage.getItem('userId');
    if(userId == "null") {
      alert("please login!");
      return;
    }
    console.log(customerId)
    console.log(userId)
    if (customerId != userId) {
      alert("you dont have permit to delete this comment!");
      return;
    }

    this.customerService.deleteComment(this.workerDetail._id, commid).then((v) => {
      alert("comment deleted")
      this.getDate();
      
    })
  }

  ngOnInit(): void {
    this.getDate();
  }

}
