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

  public createClass(courseId: number, classDate: Date) {
    let body = {date: classDate, courseId: courseId};    
  	return this.http.post<CourseClass>(Globals.BACKEND_HOST + "/class", body);
  }

  public getClass(classId: number) {
    return this.http.get<CourseClass>(Globals.BACKEND_HOST + "/class/" + classId);
  }

  public getClasses(courseId: number) {
  	return this.http.get<Array<CourseClass>>(Globals.BACKEND_HOST + "/class/course/" + courseId);
  }

  public getStudentsByCourse(courseId: number, classId: number) {
    return this.http.get<Array<ClassStudent>>(Globals.BACKEND_HOST + "/class/"+classId+"/course/"+courseId+"/students");
  }

  public updatePresent(classId: number, studentId: number, studentPresent: StudentPresent) {
	  return this.http.put<Array<ClassStudent>>(Globals.BACKEND_HOST + "/student-present/class/"+classId+
      	"/student/"+studentId,
      	{present: studentPresent});
  }

  public finishClass(courseId: number, classId: number) {
    return this.http.put(Globals.BACKEND_HOST + "/class/finish/"+classId+"/course/"+courseId, {});
  }

  public reopenClass(courseId: number, classId: number) {
    return this.http.put(Globals.BACKEND_HOST + "/class/reopen/"+classId+"/course/"+courseId, {});
  }

  public getPresent(present: StudentPresent) {
    switch (present) {
      case StudentPresent.PRESENT:
        return "PRESENTE";
      case StudentPresent.ABSENT:
        return "AUSENTE";
      case StudentPresent.LATE:
        return "TARDE";
    }
  }

}
