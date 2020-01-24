import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { UserData }	from '../../model/user-data.model';
import { Observable } from 'rxjs';
import { SharingDataService } from '../local-storage/sharing-data.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url = "http://localhost:8080/login";
  private loggedUser: UserData;

  constructor(private http: HttpClient, private sharingDataService: SharingDataService) {
  }

  public login(username: string, password: string) {
    let userData: UserData = new UserData(username, password);
    let postResult: Observable<HttpResponse<UserData>> = this.http.post<UserData>(this.url, userData, {observe: 'response'});
    postResult.subscribe((res: HttpResponse<UserData>) => {
          let headers = res.headers;
          this.sharingDataService.storeToken(headers.get("Authorization"));  
          this.loggedUser = res.body;
          this.sharingDataService.storeLoggedUser(this.loggedUser);
        },
        err => {
          this.logout();
        }
      );
    return postResult;
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
