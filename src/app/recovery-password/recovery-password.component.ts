import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login/login.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'recovery-password',
  templateUrl: './recovery-password.component.html',
  styleUrls: ['./recovery-password.component.css']
})
export class RecoveryPasswordComponent implements OnInit {

  form: FormGroup;  
  loading: boolean = false;

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required])
    });
  }

  recovery(): void {
    this.loading = true;
    this.loginService.recoveryPassword(this.formUsername.value, this.formEmail.value)
      .subscribe(res => {
        alert("Revisa tu correo electrónico para recuperar la contraseña.");
        this.loading = false;
      }, err => {
        console.log(err);
        alert("Ha ocurrido un error. Intente nuevamente maś tarde");
        this.loading = false;
      });
  }

  get formUsername() { return this.form.get('username'); }
  get formEmail() { return this.form.get('email'); }

}