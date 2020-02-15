import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StudentLink } from '../../model/student/student-link.model';


@Injectable({
  providedIn: 'root'
})
export class StudentLinkService {

  constructor(private httpClient: HttpClient) { }

  getStudentLinks() : Observable<Array<StudentLink>> {
    return this.httpClient.get<Array<StudentLink>>("http://localhost:8080/student-link/");
  }
}
