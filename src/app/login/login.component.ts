import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { LoginService } from '../services/login/login.service';
import { SharingDataService } from '../services/local-storage/sharing-data.service';
import { Router } from '@angular/router';
import { UserData }  from '../model/user-data.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  loading: boolean;
  wrongLogin: boolean = false;

  constructor(private loginService: LoginService, private router: Router,
    private sharingDataService: SharingDataService) { }

  ngOnInit() {
    this.loginService.logout();
    this.form = new FormGroup({
      username : new FormControl('', [
        Validators.required
        ]),
      password : new FormControl('', [
        Validators.required])
    });
  }

  public login() {
    Object.keys(this.form.controls).forEach(field => {
      this.form.get(field).markAsTouched();

    });
    if(this.form.valid){
      this.loading = true;
      this.loginService.login(this.formUsername.value, this.formPassword.value)
        .subscribe((data: HttpResponse<UserData>) => {
            let headers = data.headers;
            this.loginService.setLoggedUser(data.body);
            this.sharingDataService.storeToken(headers.get("Authorization"));  
            this.sharingDataService.storeLoggedUser(data.body);
            this.router.navigate(['/menu-' + data.body.userType.toLowerCase()]);
            this.wrongLogin = false;
            this.loading = false;
        }, (err: any) => {
          console.log(err);
          //this.loginService.logout();
          this.wrongLogin = true;
          this.loading = false;
        });
    }
  }

  get formUsername() { return this.form.get('username'); }
  get formPassword() { return this.form.get('password'); }

}
