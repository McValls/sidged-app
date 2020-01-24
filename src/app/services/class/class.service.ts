import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { CourseClass } from '../../model/course/course-class.model';
import { ClassStudent } from '../../model/student/class-student.model';
import { StudentPresent } from '../../model/student/class-student.model';

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  constructor(private http: HttpClient) { }

  public createClass(courseId: number, classDate: Date) {
  	let body = {date: classDate, courseId: courseId};
  	return this.http.post<CourseClass>("http://localhost:8080/class", body);
  }

  public getClasses(courseId: number) {
  	return this.http.get<Array<CourseClass>>("http://localhost:8080/class/course/" + courseId);
  }

  public getStudentsByCourse(courseId: number, classId: number) {
    return this.http.get<Array<ClassStudent>>("http://localhost:8080/class/"+classId+"/course/"+courseId+"/students");
  }

  public updatePresent(classId: number, studentId: number, studentPresent: StudentPresent) {
	  return this.http.put<Array<ClassStudent>>("http://localhost:8080/student-present/class/"+classId+
      	"/student/"+studentId,
      	{present: studentPresent});
  }

  public finishClass(courseId: number, classId: number){
    return this.http.put("http://localhost:8080/class/finish/"+classId+"/course/"+courseId, {});
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
