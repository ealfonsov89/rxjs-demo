import { Component, OnInit } from '@angular/core';
import { DateRange } from '../models/date-range';
import { User } from '../models/User';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  user: User;
  dateRange: DateRange;
  constructor() { }

  ngOnInit(): void {
  }

}
