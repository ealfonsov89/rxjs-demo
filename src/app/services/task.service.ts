
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Task, TaskData } from '../models/Task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private readonly http: HttpClient) { }
  getTasks(userId: string, from?: Date, to?: Date): Observable<Array<Task>> {
    const params = new HttpParams()
      .append('from', from.toISOString())
      .append('to', to.toISOString());
    return this.http.get<{data: Array<TaskData>}>(`http://localhost:3000/user-tasks/${userId}`, { params })
      .pipe(map(({data}) => data.map(task => this.map2Task(task))));
  }
  getTask(taskId): Observable<Task> {
    return this.http.get<{data: TaskData}>(`http://localhost:3000/user-task/${taskId}`)
      .pipe(map(({data}) => this.map2Task(data)));
  }

  private map2Task(data: any): any {
    return {
      ...data,
      date: new Date(data.date)
    };
  }
}
