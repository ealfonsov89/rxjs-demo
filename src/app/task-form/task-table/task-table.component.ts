import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, forkJoin } from 'rxjs';
import { filter, first, map, mergeMap } from 'rxjs/operators';
import { DateRange } from 'src/app/models/date-range';
import { Task } from 'src/app/models/Task';
import { User } from 'src/app/models/User';
import { TaskService } from '../../services/task.service';
@Component({
  selector: 'app-task-table',
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.css']
})
export class TaskTableComponent implements OnInit {
  tasks$ = new BehaviorSubject<Array<Task>>([]);
  user$ = new BehaviorSubject<User>(undefined);
  dateRange$ = new BehaviorSubject<DateRange>(undefined);
  @Input() set user(value: User) {
    this.user$.next(value);
  }
  @Input() set dateRange(value: DateRange) {
    this.dateRange$.next(value);
  }
  constructor(private readonly taskService: TaskService) {}

  ngOnInit(): void {
    combineLatest([this.user$, this.dateRange$])
      .pipe(filter(([user, dateRange]) => user !== undefined && dateRange !== undefined))
      .pipe(mergeMap(([user, dateRange]) => {
        return this.taskService.getTasks(user.id, dateRange.from, dateRange.to)
          .pipe(mergeMap(tasks => forkJoin(tasks.map(task => this.taskService.getTask(task.id)))));
      }))
      .subscribe(tasks => {
        this.tasks$.next(tasks);
      });
  }

}
