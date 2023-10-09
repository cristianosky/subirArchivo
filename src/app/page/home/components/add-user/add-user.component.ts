import { Component, Inject, inject } from '@angular/core';
import { User } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {

  form: FormGroup;
  private readonly authSvc = inject(AuthService);

  constructor(
    public dialogRef: MatDialogRef<AddUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private fb: FormBuilder
  ){
    this.form = this.fb.group({
      nombre: [this.data.displayName],
      email: [this.data.email,  Validators.required]
    })
  }

  updateUser(){
    const { nombre, email } = this.form.value
    let data: User = {
      ...this.data,
      displayName: nombre,
      email: email
    }

    this.authSvc.uodateUser(data);
  }
  
}
