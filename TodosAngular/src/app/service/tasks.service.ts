import { Task } from '../shared/task';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  ListTask!:Task[];

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private http: HttpClient) { }
  GetTasks(){
  return   this.http.get(environment.Url+"/Tasks")
  }
  PostTask(obj:Task){
  return  this.http.post(environment.Url+"/Tasks",obj);
  }
  updateTask(Id:any, obj:any){
  return  this.http.put(environment.Url+`/Tasks/${Id}`,obj)
  }
  getTaskById(_id:any){
    return  this.http.get(environment.Url+`/Tasks/${_id}`)
    }
  deleteTask(id:any){
  return  this.http.delete(environment.Url+"/Tasks/"+id)
  }

}
