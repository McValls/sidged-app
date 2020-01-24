import { Injectable } from '@angular/core';
import { UserData }	from '../../model/user-data.model';
import { Course }  from '../../model/course/course.model';

@Injectable({
  providedIn: 'root'
})
export class SharingDataService {

  constructor() { }

  public storeLoggedUser(loggedUser: UserData) {
  	localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
  }

  public getLoggedUser(): UserData {
  	return <UserData> JSON.parse(localStorage.getItem('loggedUser'));
  }

  public storeCurrentCourse(course: Course) {
    localStorage.setItem('selectedCourse', JSON.stringify(course));
  }

  public getCurrentCourse(): Course {
    return <Course> JSON.parse(localStorage.getItem('selectedCourse'));
  }

  public cleanLoggedUser() {
  	localStorage.removeItem('loggedUser');
  }

  public storeToken(token: string) {
    localStorage.setItem('jwtToken', token);
  }

  public getJwtToken() {
    return localStorage.getItem('jwtToken');
  }

  public store(key: string, obj: Object){
    localStorage.setItem(key, JSON.stringify(obj));
  }

  public get(key: string) {
    return JSON.parse(localStorage.getItem(key));
  }
}
