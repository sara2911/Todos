import { Task } from './../../shared/task';
import { TasksService } from '../../service/tasks.service';
import { Component, OnInit } from '@angular/core';
import {MatDialog,MatDialogConfig} from '@angular/material/dialog';
import { AddTaskComponent } from '../add-task/add-task.component';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  ListTasks!: any[];
  Options=['ToDo','InProgress','Done'];
  setected!:any;
  data!:Task[];

  constructor(public sevice: TasksService,
    public dialog: MatDialog,
 

    ) { }
  
    displayedColumns: string[]=['name','status',"Edit"];
    dataSource:any;
  ngOnInit(): void {

  this.getTasks();

  this.dataSource=new MatTableDataSource(this.ListTasks);
  console.log(this.dataSource);


  }
  getTasks(){
    this.sevice.GetTasks().subscribe(
      (res) => {
        
        this.ListTasks = res as Task[];
        console.log(res);
        this.dataSource=new MatTableDataSource(this.ListTasks);

      }, (err) => {
        console.log(err);
      }
    )
  }
  
  addTask(){
    const dialogConfig = new MatDialogConfig();
     dialogConfig.autoFocus=true;
     dialogConfig.disableClose =true;
     dialogConfig.width="50%";
     dialogConfig.height="auto";
     dialogConfig.panelClass='bgColor';
     this.dialog.open(AddTaskComponent,dialogConfig
  
    ).afterClosed().subscribe(()=>{this.getTasks();})
      
  }

  
  EditeTask(id:any,obj:Task){
    
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus=true;
    dialogConfig.disableClose =true;
    dialogConfig.width="50%";
    dialogConfig.height="auto";
    dialogConfig.data=obj;
    this.dialog.open(AddTaskComponent,dialogConfig)
    .afterClosed().subscribe(() => {
      this.getTasks();
      })

  }
  deleteTask(id:any){
    this.sevice.deleteTask(id).subscribe(
      (res)=>{
        this.getTasks();
      },(error)=>{
        console.log(error);
      }
      )
    

  }

  filter(Value:any){
    if(Value=="All"){
      this.dataSource=this.ListTasks
    }
    console.log(Value);
    this.dataSource.filter=Value.trim().toLowerCase();
      
  }
  

  
    
}
