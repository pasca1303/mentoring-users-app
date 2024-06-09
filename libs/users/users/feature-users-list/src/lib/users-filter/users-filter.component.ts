import { CommonModule } from '@angular/common'
import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { UsersVM } from '@users/feature-users-create'
import { Observable } from 'rxjs'
import { map, startWith, switchMap } from 'rxjs/operators'
import { UsersListContainerStore } from '../users-list-container/users-list-container.store'

// interface User {
//   id: number;
//   name: string;
//   email: string;
//   username: string;
//   photo: string;
//   isAdmin: boolean;
// }

@Component({
  selector: 'app-users-filter',
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class UsersFilterComponent implements OnInit {
  private readonly componentStore = inject(UsersListContainerStore)
  public users$ = this.componentStore.users$
  public filteredUsers$!: Observable<UsersVM[]>

  @Output() filterChange = new EventEmitter<UsersVM[]>()

  nameFilter: FormControl = new FormControl('');

  ngOnInit() {
    this.filteredUsers$ = this.nameFilter.valueChanges.pipe(
      startWith(''),
      switchMap(name => this.filterUsers(name))
    )
    this.filteredUsers$.subscribe(users => {
      this.filterChange.emit(users)
    })

  }

  filterUsers(name: string): Observable<UsersVM[]> {
    return this.users$.pipe(
      map(users => users.filter(user => user.name.toLowerCase().includes(name.toLowerCase())))
    )
  }
}
