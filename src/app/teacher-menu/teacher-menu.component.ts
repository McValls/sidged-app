import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from '../model/course/course.model';
import { CourseService } from '../services/course/course.service';
import { SharingDataService } from '../services/local-storage/sharing-data.service';

@Component({
  selector: 'app-teacher-menu',
  templateUrl: './teacher-menu.component.html',
  styleUrls: ['./teacher-menu.component.css']
})
export class TeacherMenuComponent implements OnInit {

	  coursesVisible: boolean = false;
    courses: Array<Course> = new Array<Course>();

  	constructor(private courseService: CourseService,
      private sharingDataService: SharingDataService,
      private router: Router){} 
      

  	ngOnInit() {
      this.getCourses();
  	}

    private getCourses() {
      this.courseService.getCoursesByTeacher().subscribe(
        (data: Array<Course>) => {
          this.courses = data;
        }, error => {
          console.log(JSON.stringify(error));
        }
      );
    }

  	coursesClicked() {
  		this.coursesVisible = !this.coursesVisible;
  	}

    openCourse(course: Course){
      this.sharingDataService.store("selectedCourse", course);
      this.router.navigate(['/course-teacher']);
    }

}
