import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from '../model/course/course.model';
import { SharingDataService } from '../services/local-storage/sharing-data.service';

@Component({
  selector: 'student-course',
  templateUrl: './student-course.component.html',
  styleUrls: ['./student-course.component.css']
})
export class StudentCourseComponent implements OnInit {

	isFilesOpened: boolean = false;
	course: Course;

	constructor(private router: Router,
    private sharingDataService: SharingDataService) {
    this.course = sharingDataService.getCurrentCourse();
	}

  	ngOnInit() {
  	}

  	onSeeFilesClick(value: boolean){
    	this.isFilesOpened = value;
    }

    goToChat() {
		this.router.navigate(['chat']);
	}

}
