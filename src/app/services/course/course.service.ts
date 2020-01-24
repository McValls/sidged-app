import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Course } from '../../model/course/course.model';
import { UserType } from '../../model/user-type';


@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) { }

  public getCoursesByTeacher(){
  	return this.getCourses(UserType.TEACHER);
  }

  public getCoursesByStudent(){
    return this.getCourses(UserType.STUDENT);
  }

  private getCourses(userType: UserType){
    return this.http.get<Array<Course>>("http://localhost:8080/course/by-"+userType.toLowerCase());
  }

}
