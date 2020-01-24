import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SharingDataService } from '../services/local-storage/sharing-data.service';
import { ClassService } from '../services/class/class.service';
import { Course } from '../model/course/course.model';
import { CourseClass } from '../model/course/course-class.model';
import { ClassStudent, StudentPresent } from '../model/student/class-student.model';


@Component({
  selector: 'app-teacher-class',
  templateUrl: './teacher-class.component.html',
  styleUrls: ['./teacher-class.component.css']
})
export class TeacherClassComponent implements OnInit {

    courseId: number;
	  classId: number;
    classDate: Date;
    isTakePresentsOpened: boolean = false;
    isFilesOpened: boolean = false;

  	constructor(
      private router: Router,
  		private route: ActivatedRoute,
  		private classService: ClassService,
  		private sharingDataService: SharingDataService) { }

  	ngOnInit() {
      this.courseId = this.sharingDataService.get("selectedCourse").id;
  		this.classId = this.route.snapshot.params.classId;
      this.classDate = this.route.snapshot.params.classDate;
  	}

    public onTakePresentsClick(value: boolean) {
      this.isTakePresentsOpened = value;
    }

    public finishClass() {
      this.classService.finishClass(this.courseId, this.classId).subscribe(() => {
        this.router.navigate(['/course-teacher']);
      });
    }

    public onSeeFilesClick(value: boolean){
      this.isFilesOpened = value;
    }

}
