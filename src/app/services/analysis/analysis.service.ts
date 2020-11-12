import { Injectable } from '@angular/core';
import { CoursePresentismData } from 'src/app/model/presentism/presentism.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Globals } from '../Globals';

@Injectable({
  providedIn: 'root'
})
export class AnalysisService {

  constructor(private http: HttpClient) { }
  
  getAnalysisDataByCourse(courseCode: string): Observable<CoursePresentismData> {
    return this.http.get<CoursePresentismData>(Globals.BACKEND_HOST + "/presentism-data/course/"+courseCode);
  }

}
