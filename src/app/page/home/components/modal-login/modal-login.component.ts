import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.component.html',
  styleUrls: ['./modal-login.component.scss']
})
export class ModalLoginComponent {
  hide: boolean = true
  form: FormGroup;

  constructor(private fb: FormBuilder, private _AuthService: AuthService){
    this.form = this.fb.group({
      email: [null, Validators.required],
      pass: [null, Validators.required]
    })
  }

  chageStatus(){
    this.hide = !this.hide
  }

  login(){
    const { email, pass } = this.form.value

    this._AuthService.signIn(email, pass).then((response) =>{
      console.log(response)
    })
  }
}
