import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskFormRoutingModule } from './task-form-routing.module';
import { TaskFormComponent } from './task-form.component';
import { UsersSelectorComponent } from './users-selector/users-selector.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskTableComponent } from './task-table/task-table.component';
import { DateRangeComponent } from './date-range/date-range.component';


@NgModule({
  declarations: [TaskFormComponent, UsersSelectorComponent, TaskTableComponent, DateRangeComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TaskFormRoutingModule
  ]
})
export class TaskFormModule { }
