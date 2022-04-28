import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.css']
})
export class FormUserComponent implements OnInit {

  userForm: FormGroup;
  typeIdentification;
  cities;
  date;
  title = "Crear Usuario";
  constructor(
    public modelRef: MatDialogRef<FormUserComponent>,
    @Inject(MAT_DIALOG_DATA) public datos: any,
    private fb: FormBuilder,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.getSelects();
    this.createForm();
    this.activateFrom();
  }

  getSelects() {
    this.userService.getIdentificationType().subscribe(res => {
      this.typeIdentification = res;
    })

    this.userService.getCities().subscribe(res => {
      this.cities = res;
    })
  }

  createForm() {
    this.userForm = this.fb.group({
      name                      : ['', [Validators.required, Validators.minLength(3)]],
      last_name                 : ['', [Validators.required, Validators.minLength(3)]],
      type_identification_id    : ['', [Validators.required]],
      identification            : ['', [Validators.required, Validators.minLength(3)]],
      cities                    : ['', [Validators.required]],
      birth_date                : ['', [Validators.required]],
      email                     : ['', [Validators.required, Validators.email]],
      username                  : ['', [Validators.required, Validators.minLength(3)]],
      password                  : ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  get error(): any { return this.userForm.controls; }

  activateFrom() {
    console.log(this.datos)
    if (this.datos.edit) {
      this.title = "Actualizar Usuario"
      this.userService.getUserId(this.datos.data.id).subscribe((user: any) => {
        this.userForm.setValue({
          name                          : user[0].name,
          last_name                     : user[0].lastname,
          type_identification_id        : user[0].identification_type_id,
          identification                : user[0].identification,
          cities                        : user[0].city_id,
          birth_date                    : user[0].birth,
          email                         : user[0].email,
          username                      : user[0].username,
          password                      : user[0].password
        })
      })
    }
  }

  saveUser() {
    let data = {
      name                    : this.userForm.get('name').value,
      lastname                : this.userForm.get('last_name').value,
      identification          : this.userForm.get('identification').value,
      identification_type_id  : this.userForm.get('type_identification_id').value,
      city_id                 : this.userForm.get('cities').value,
      birth                   : this.userForm.get('birth_date').value,
      email                   : this.userForm.get('email').value,
      password                : this.userForm.get('password').value,
      username                : this.userForm.get('username').value
    }

    console.log(data);
    if (!this.datos.edit) {
      this.userService.saveUser(data).subscribe((res: any) => {
        console.log(res)
        Swal.fire({
          icon: 'success',
          title: 'Correcto! Usuario creado',
          showConfirmButton: false,
          timer: 2500
        })
        this.modelRef.close();
      })
    } else {
      this.userService.updateUser(data, this.datos.data.id).subscribe((res: any) => {
        console.log(JSON.parse(JSON.stringify(res)));
        Swal.fire({
          icon: 'success',
          title: 'Correcto! Usuario actualizado',
          showConfirmButton: false,
          timer: 2500
        })
        this.modelRef.close()
      })
    }

  }
}
