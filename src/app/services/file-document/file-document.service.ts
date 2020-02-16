import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClassFileDocument } from '../../model/file-documents/file-documents.model';
import { Course } from '../../model/course/course.model';

@Injectable({
  providedIn: 'root'
})
export class FileDocumentService {

	files: Array<ClassFileDocument> = [];

  	constructor(private http: HttpClient) { }

  	public saveFileLink(classId: number, name: string, link: string){
  		let params = {classId: classId, name: name, link: link};
  		return this.http.post("https://sidged-be.herokuapp.com/file-documents/link", params)
  	}

  	public searchFiles(classId: number): Observable<Array<ClassFileDocument>>{
  		return this.http.get<Array<ClassFileDocument>>("https://sidged-be.herokuapp.com/file-documents/class/" + classId);
  	}

    public searchFilesByCourse(course: Course): Observable<Array<ClassFileDocument>> {
      return this.http.get<Array<ClassFileDocument>>("https://sidged-be.herokuapp.com/file-documents/course/" + course.id);
    }

  	public downloadFile(file: ClassFileDocument) {
  		return this.http.get(file.linkContent, 
  			{responseType: 'blob' as 'json'});
  	}

}
