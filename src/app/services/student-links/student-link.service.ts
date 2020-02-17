import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StudentLink } from '../../model/student/student-link.model';
import { Globals } from '../Globals';


@Injectable({
  providedIn: 'root'
})
export class StudentLinkService {

  constructor(private httpClient: HttpClient) { }

  getStudentLinks() : Observable<Array<StudentLink>> {
    return this.httpClient.get<Array<StudentLink>>(Globals.BACKEND_HOST + "/student-link/");
  }
}
