import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { UserData }	from '../../model/user-data.model';
import { Observable } from 'rxjs';
import { SharingDataService } from '../local-storage/sharing-data.service';
import { Globals } from '../Globals';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url = Globals.BACKEND_HOST + "/login";
  private loggedUser: UserData;

  constructor(private http: HttpClient, private sharingDataService: SharingDataService) {
  }

  public login(username: string, password: string) {
    let userData: UserData = new UserData(username, password);
    let postResult: Observable<HttpResponse<UserData>> = this.http.post<UserData>(this.url, userData, {observe: 'response'});
    return postResult;
  }

  public changePassword(oldPassword: string, newPassword: string) {
    let username = this.getLoggedUser().username;

    return this.http.put(this.url + "/change-password", {
      username: username,
      oldPassword : oldPassword,
      newPassword : newPassword
    });

  }

  public recoveryPassword(username: string, email: string) {
    return this.http.get(this.url + "/recovery-password?username=" + username + "&email=" + email);
  }

  public setLoggedUser(loggedUser: UserData) : void {
    this.loggedUser = loggedUser;
  }

  public getLoggedUser(): UserData {
    if(!this.loggedUser) {
      this.loggedUser = this.sharingDataService.getLoggedUser();
    }
    return this.loggedUser;
  }

  public logout() {
    this.loggedUser = null;
    this.sharingDataService.cleanLoggedUser();
  }
}
