import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Course, Shift } from '../../model/course/course.model';
import { Period, PeriodType } from '../../model/period/period.model';
import { UserType } from '../../model/user-type';


@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) { }

  public getCoursesByTeacher(){
  	return this.getCourses(UserType.TEACHER);
  }

  public getCoursesByStudent(){
    return this.getCourses(UserType.STUDENT);
  }

  private getCourses(userType: UserType){
    return this.http.get<Array<Course>>("http://localhost:8080/course/by-"+userType.toLowerCase());
  }

  public notifyStudents(subject: string, message: string, courseId: number) {
    return this.http.post<void>("http://localhost:8080/course/notify-students", {
      subject: subject,
      message: message,
      courseId: courseId
    });
  }

  public getShift(shift: Shift){
    switch(shift) {
      case Shift.MORNING:
        return "Mañana";
      case Shift.AFTERNOON:
        return "Tarde";
      case Shift.NIGHT:
        return "Noche";
    }
  }

  public getPeriodType(periodType: PeriodType){
    switch(periodType) {
      case PeriodType.QUARTERLY:
        return "Cuatrimestral";
      case PeriodType.BIANNUAL:
        return "Semestral";
      case PeriodType.ANNUAL:
        return "Anual";
      case PeriodType.SUMMER:
        return "De Verano";
    }
  }

  public getPeriod(period: Period){
    let periodString = "";
    switch(period.periodType){
      case PeriodType.QUARTERLY:
        return "Cuatrimestre " + period.number;
      case PeriodType.BIANNUAL:
        return "Semestre " + period.number;
      case PeriodType.ANNUAL:
        return "Anual";
      case PeriodType.SUMMER:
        return "Verano";
    }
  }

}
