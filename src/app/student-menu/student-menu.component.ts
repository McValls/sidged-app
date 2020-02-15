import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from '../model/course/course.model';

import { CourseService } from '../services/course/course.service';
import { StudentLinkService } from '../services/student-links/student-link.service';
import { SharingDataService } from '../services/local-storage/sharing-data.service';
import { StudentLink } from '../model/student/student-link.model';

@Component({
  selector: 'app-student-menu',
  templateUrl: './student-menu.component.html',
  styleUrls: ['./student-menu.component.css']
})
export class StudentMenuComponent implements OnInit {

	courses: Array<Course>;
	coursesVisible: boolean = false;

	links: Array<StudentLink>;
	usefulLinkVisible: boolean = false;

  	constructor(private courseService: CourseService,
	  private router: Router,
	  private studentLinksService: StudentLinkService,
      private sharingDataService: SharingDataService) { }

  	ngOnInit() {
		  this.getCourses();
		  this.getLinks();
  	}

  	private getCourses() {
  		this.courseService.getCoursesByStudent().subscribe(
  			(data: Array<Course>) => {
  				this.courses = data;
  			});
	  }
	  
	private getLinks() {
		this.studentLinksService.getStudentLinks().subscribe((res: Array<StudentLink>) => {
			this.links = res;
		});
	}

  	coursesClicked() {
  		this.coursesVisible = !this.coursesVisible;
  	}

    openCourse(course: Course){
      this.sharingDataService.store("selectedCourse", course);
      this.router.navigate(['/course-student']);
	}
	
	usefulLinkClicked() {
		this.usefulLinkVisible = !this.usefulLinkVisible;
	}

}
