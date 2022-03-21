import { TasksComponent } from './../tasks/tasks.component';
import { Task } from '../../shared/task';
import { TasksService } from '../../service/tasks.service';
import { Component, Inject, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
Options=['ToDo','InProgress','Done'];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data:Task,
    public dialogRef: MatDialogRef<AddTaskComponent>,

    public service :TasksService ,
    private currentRoute:ActivatedRoute,
     private router: Router) { }
  TaskModel:Task={
    "name": "", "status":""
  }
   TaskID:any;
 
  ngOnInit(): void {
    console.log(this.data)
    if(this.data){
      this.TaskModel=this.data;
    }
    

  }
  submit(){
    if(this.data){
      this.service.updateTask(this.TaskModel.Id,this.TaskModel).subscribe((res)=>{

     console.log(res ,"update");

      },(error)=>{
        console.log(error)
      }

      );

    }
    else{
     this.service.PostTask(this.TaskModel).subscribe((res)=>{
      console.log(this.TaskModel,"model");
      console.log(res ,"res");
     },
     (error)=>{
       console.log(error)
     }
     
     )
    }
    this.dialogRef.close();


  }

}
