import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login/login.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { matchPasswordValidator } from '../validators/match.validators'

@Component({
  selector: 'change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  form: FormGroup;  
  loading: boolean = false;

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.form = new FormGroup({
      oldPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required]),
      confirmNewPassword: new FormControl('', [Validators.required])
    }, {validators: matchPasswordValidator});
  }

  confirm(): void {
    this.loading = true;
    this.loginService.changePassword(this.formOldPassword.value, this.formNewPassword.value)
      .subscribe(res => {
        alert("Contraseña actualizada correctamente.")
        this.loading = false;
      }, err => {
        console.log(err);
        alert("Ha ocurrido un error. Intente nuevamente maś tarde");
        this.loading = false;
      });
  }

  get formOldPassword() { return this.form.get('oldPassword'); }
  get formNewPassword() { return this.form.get('newPassword'); }
  get formConfirmNewPassword() { return this.form.get('confirmNewPassword'); }

}
