import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/models/User';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-users-selector',
  templateUrl: './users-selector.component.html',
  styleUrls: ['./users-selector.component.css']
})
export class UsersSelectorComponent implements OnInit {
  users$ = new BehaviorSubject<Array<User>>([]);
  @Output() userSelected = new EventEmitter<User>();
  form = new FormGroup({
    selector: new FormControl()
  });
  constructor(private readonly userService: UserService) {
    this.form.get('selector').valueChanges.subscribe(value => {
      const user = value as User;
      this.userSelected.emit(user);
    });
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => {
      this.users$.next(users);
      this.form.get('selector').setValue(users[1]);
    });
  }

}
