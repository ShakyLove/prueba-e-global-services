import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { FormUserComponent } from '../form-user/form-user.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    public modal: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      user: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  login() {
    console.log(this.loginForm.value)
    this.userService.loginUser(this.loginForm.value).subscribe((result: any) => {
      console.log(result);
      if (result.data.length > 0) {
        localStorage.setItem('token', result.token);
        this.router.navigate(['/', 'dash']);
      } else {
        Swal.fire({
          icon: 'error',
          title: result.error,
          showConfirmButton: false,
          timer: 2500
        })
      }
    }, error => {
      console.log(error);
    })
  }

  register() {
    const modalRef = this.modal.open(FormUserComponent, {
      width: '40%',
      height: 'auto',
      disableClose: false,
      data: { edit: false, },
      panelClass: 'custom-dialog-container'
    })

  }
}
