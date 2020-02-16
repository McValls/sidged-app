import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { UserData }	from '../../model/user-data.model';
import { Observable } from 'rxjs';
import { SharingDataService } from '../local-storage/sharing-data.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url = "https://sidged-be.herokuapp.com/login";
  private loggedUser: UserData;

  constructor(private http: HttpClient, private sharingDataService: SharingDataService) {
  }

  public login(username: string, password: string) {
    let userData: UserData = new UserData(username, password);
    let postResult: Observable<HttpResponse<UserData>> = this.http.post<UserData>(this.url, userData, {observe: 'response'});
    return postResult;
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
