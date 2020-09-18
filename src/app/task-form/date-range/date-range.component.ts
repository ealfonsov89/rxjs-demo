import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { combineLatest } from 'rxjs';
import { filter, pairwise, map } from 'rxjs/operators';
import { DateRange } from '../../models/date-range';

@Component({
  selector: 'app-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.css']
})
export class DateRangeComponent {
  @Output() dateRange = new EventEmitter<DateRange>();

  form = new FormGroup({
    from: new FormControl(new Date()),
    to: new FormControl(new Date())
  });
  constructor() {
    combineLatest([this.form.controls.from.valueChanges, this.form.controls.to.valueChanges])
      .pipe(filter(([from, to]) => from && to))
      .pipe(map(([from, to]) => [new Date(from), new Date(to)]))
      .subscribe(([from, to]) => {
        this.dateRange.emit({from, to});
        console.log('coso');
      });
  }
}
