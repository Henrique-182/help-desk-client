import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { UserList } from '../../data/user';
import { UserDto } from '../../model/user-dto';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements AfterViewInit {

  tableDataSource = new MatTableDataSource<UserDto>(UserList._embedded.userVOList)
  displayedColumns: string[] = ['key', 'username', 'fullname', 'actions']

  @ViewChild(MatPaginator, { static: false })
  paginator: MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype)

  pageIndex: number = 0
  totalElements: number = 24
  pageSize: number = 5
  pageSizeOptions: number[] = [5, 10, 25, 50]

  username: string = ''

  constructor(
    private _snackBar: MatSnackBar,
    private _router: Router
  ) {
    this.username = localStorage.getItem('username') || 'Usuário'
  }

  ngAfterViewInit(): void {
    this.tableDataSource.paginator = this.paginator
  }

  handlePageEvent(event: any) {
    this.pageIndex = event.pageIndex
    this.pageSize = event.pageSize
  }

  onMenuClick() {
    this.showSnackBar('Click do menu não implementado!!!', 'Ok!', 3000)
  }

  onAddUser() {
    this._router.navigate(['auth/user/add'])
  }

  onUserReport() {
    this.showSnackBar('Relatório de usuários não implementado!!!', 'Ok!', 3000)
  }

  onGetUser() {
    this._router.navigate(['auth/user/info'])
  }

  onEditUser() {
    this._router.navigate(['auth/user/edit'])
  }

  onDeleteUser() {
    this._router.navigate(['auth/user/delete'])
  }

  private showSnackBar(message: string, action: string, snackBarDuration: number) {
    this._snackBar.open(message, action, { duration: snackBarDuration })
  }
}
