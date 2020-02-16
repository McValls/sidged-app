import { Injectable } from '@angular/core';
import { CoursePresentismData } from 'src/app/model/presentism/presentism.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnalysisService {

  constructor(private http: HttpClient) { }
  
  getAnalysisDataByCourse(courseId: number): Observable<CoursePresentismData> {
    return this.http.get<CoursePresentismData>("https://sidged-be.herokuapp.com/presentism-data/course/"+courseId);
  }

}
