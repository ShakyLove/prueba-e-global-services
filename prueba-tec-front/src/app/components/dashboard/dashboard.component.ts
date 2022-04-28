import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { FormUserComponent } from '../form-user/form-user.component';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  cities;
  displayedColumns: string[] = ['actions', 'name', 'lastname', 'identificationType', 'identification', 'city', 'birth_date'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private userService: UserService,
    public modal: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadUsers();
    this.getSelects();
  }

  loadUsers() {
    this.userService.getUsers().subscribe((res: any) => {
      res.map(item => {
        if (item.City == null) {
          item = Object.assign(item, { city: '' })
        } else {
          item = Object.assign(item, { city: item.City.name })
        }

        if (item.IdentificationType == null) {
          item = Object.assign(item, { IdentificationType: '' })
        }
      })

      console.log(res)
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
    })
  }

  getSelects() {
    this.userService.getCities().subscribe(res => {
      this.cities = res;
    })
  }

  applyFilter(value) {
    this.dataSource.filter = value.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  createUser() {
    const modalRef = this.modal.open(FormUserComponent, {
      width: '40%',
      height: 'auto',
      disableClose: false,
      data: { edit: false },
      panelClass: 'custom-dialog-container'
    })
    modalRef.afterClosed().subscribe(result => {
      this.loadUsers();
    });
  }

  updateUser(element) {
    const modalRef = this.modal.open(FormUserComponent, {
      width: '40%',
      height: 'auto',
      disableClose: false,
      data: { edit: true, data: element },
      panelClass: 'custom-dialog-container'
    })
    modalRef.afterClosed().subscribe(result => {
      this.loadUsers();
    });
  }

  deleteUser(element) {
    Swal.fire({
      title: '¿Deseas eliminar este usuario?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
    }).then((res) => {
      if (res.isConfirmed) {
        this.userService.deleteUser(element.id).subscribe(res => {
          console.log(res)
          this.ngOnInit();
        },
          error => {
            console.log(error);
          }
        )
      }
    })
  }

}
