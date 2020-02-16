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
  	return this.http.post<CourseClass>("https://sidged-be.herokuapp.com/class", body);
  }

  public getClass(classId: number) {
    return this.http.get<CourseClass>("https://sidged-be.herokuapp.com/class/" + classId);
  }

  public getClasses(courseId: number) {
  	return this.http.get<Array<CourseClass>>("https://sidged-be.herokuapp.com/class/course/" + courseId);
  }

  public getStudentsByCourse(courseId: number, classId: number) {
    return this.http.get<Array<ClassStudent>>("https://sidged-be.herokuapp.com/class/"+classId+"/course/"+courseId+"/students");
  }

  public updatePresent(classId: number, studentId: number, studentPresent: StudentPresent) {
	  return this.http.put<Array<ClassStudent>>("https://sidged-be.herokuapp.com/student-present/class/"+classId+
      	"/student/"+studentId,
      	{present: studentPresent});
  }

  public finishClass(courseId: number, classId: number) {
    return this.http.put("https://sidged-be.herokuapp.com/class/finish/"+classId+"/course/"+courseId, {});
  }

  public reopenClass(courseId: number, classId: number) {
    return this.http.put("https://sidged-be.herokuapp.com/class/reopen/"+classId+"/course/"+courseId, {});
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
