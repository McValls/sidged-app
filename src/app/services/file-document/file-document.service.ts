import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClassFileDocument } from '../../model/file-documents/file-documents.model';
import { Course } from '../../model/course/course.model';
import { Globals } from '../Globals';

@Injectable({
  providedIn: 'root'
})
export class FileDocumentService {

	files: Array<ClassFileDocument> = [];

  	constructor(private http: HttpClient) { }

  	public saveFileLink(classNumber: number, courseCode: string, name: string, link: string){
  		let params = {classNumber, courseCode, name, link};
  		return this.http.post(Globals.BACKEND_HOST + '/file-documents/link', params)
  	}

  	public searchFiles(courseCode: string, classNumber: number): Observable<Array<ClassFileDocument>>{
  		return this.http.get<Array<ClassFileDocument>>(Globals.BACKEND_HOST + '/file-documents/course/'+ courseCode + '/class/' + classNumber);
  	}

    public searchFilesByCourse(course: Course): Observable<Array<ClassFileDocument>> {
      return this.http.get<Array<ClassFileDocument>>(Globals.BACKEND_HOST + '/file-documents/course/' + course.code);
    }

  	public downloadFile(file: ClassFileDocument) {
  		return this.http.get(file.linkContent,
  			{responseType: 'blob' as 'json'});
  	}

}
