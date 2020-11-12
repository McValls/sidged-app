import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CourseClass } from '../../model/course/course-class.model';
import { ClassStudent } from '../../model/student/class-student.model';
import { StudentPresent } from '../../model/student/class-student.model';
import { Globals } from '../Globals';

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  constructor(private http: HttpClient) { }

  public createClass(courseCode: string, classDate: Date) {
    const body = {date: classDate, courseCode};
  	return this.http.post<CourseClass>(Globals.BACKEND_HOST + '/class', body);
  }

  public getClass(courseCode: string, classNumber: number) {
    return this.http.get<CourseClass>(Globals.BACKEND_HOST + '/class/' + classNumber + '/course/' + courseCode);
  }

  public getClasses(courseCode: string) {
  	return this.http.get<Array<CourseClass>>(Globals.BACKEND_HOST + '/class/course/' + courseCode);
  }

  public getStudentsByCourse(courseCode: string, classNumber: number) {
    return this.http.get<Array<ClassStudent>>(Globals.BACKEND_HOST + '/class/'+classNumber+'/course/'+courseCode+'/students');
  }

  public updatePresent(courseCode: string, classNumber: number, studentId: number, studentPresent: StudentPresent) {
	  return this.http.put<Array<ClassStudent>>(Globals.BACKEND_HOST + '/student-present/course/'+courseCode+'/class/'+classNumber+
      	'/student/'+studentId,
      	{present: studentPresent});
  }

  public finishClass(courseCode: string, classNumber: number) {
    return this.http.put(Globals.BACKEND_HOST + '/class/finish/'+classNumber+'/course/'+courseCode, {});
  }

  public reopenClass(courseCode: string, classNumber: number) {
    return this.http.put(Globals.BACKEND_HOST + '/class/reopen/'+classNumber+'/course/'+courseCode, {});
  }

  public getPresent(present: StudentPresent) {
    switch (present) {
      case StudentPresent.PRESENT:
        return 'PRESENTE';
      case StudentPresent.ABSENT:
        return 'AUSENTE';
      case StudentPresent.LATE:
        return 'TARDE';
    }
  }

}
