import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseClass } from '../model/course/course-class.model';
import { ClassService } from '../services/class/class.service';


@Component({
  selector: 'app-teacher-class',
  templateUrl: './teacher-class.component.html',
  styleUrls: ['./teacher-class.component.css']
})
export class TeacherClassComponent implements OnInit {

    courseCode: string;
	  classNumber: number;
    classDate: Date;
    isTakePresentsOpened: boolean = false;
    isFilesOpened: boolean = false;
    loading: boolean = false;
    class: CourseClass;

  	constructor(
      private router: Router,
  		private route: ActivatedRoute,
  		private classService: ClassService) { }

  	ngOnInit() {
      this.courseCode = this.route.snapshot.params.courseCode;
  		this.classNumber = this.route.snapshot.params.classNumber;
      this.classDate = this.route.snapshot.params.classDate;
      this.getClass();
    }

    private getClass() {
      this.loading = true;
      this.classService.getClass(this.courseCode, this.classNumber).subscribe((res: CourseClass) => {
        this.class = res;
        this.loading = false;
      });
    }

    onTakePresentsClick(value: boolean) {
      this.isTakePresentsOpened = value;
    }

    finishClass() {
      this.loading = true;
      this.classService.finishClass(this.courseCode, this.classNumber).subscribe(() => {
        this.loading = false;
        this.router.navigate(['/course-teacher']);
      });
    }

    reopenClass() {
      this.loading = true;
      this.classService.reopenClass(this.courseCode, this.classNumber).subscribe(() => {
        this.loading = false;
        this.router.navigate(['/course-teacher']);
      })
    }

    onSeeFilesClick(value: boolean){
      this.isFilesOpened = value;
    }

}
