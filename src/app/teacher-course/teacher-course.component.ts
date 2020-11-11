import { Component, OnInit } from '@angular/core';
import { SharingDataService } from '../services/local-storage/sharing-data.service';
import { ClassService } from '../services/class/class.service';
import { CourseService  } from '../services/course/course.service';
import { Course } from '../model/course/course.model';
import { CourseClass } from '../model/course/course-class.model';
import { NewClassDialogComponent } from '../dialogs/new-class-dialog/new-class-dialog.component';
import { NotifyStudentsDialogComponent  } from '../dialogs/notify-students-dialog/notify-students-dialog.component';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'teacher-course',
  templateUrl: './teacher-course.component.html',
  styleUrls: ['./teacher-course.component.css']
})
export class TeacherCourseComponent implements OnInit {

	course: Course;
  classes: Array<CourseClass>;
  presentismVisible: boolean = false;
  loading: boolean = false;

	constructor(private sharingDataService: SharingDataService,
		private router: Router,
    private classService: ClassService,
    private courseService: CourseService,
    public dialog: MatDialog) { }

	ngOnInit() {
		this.course = this.sharingDataService.get('selectedCourse');
    this.getClasses();
	}


  private getClasses() {
    this.loading = true;
    this.classService.getClasses(this.course.id).subscribe((data: Array<CourseClass>) => {
      this.classes = data;
      this.loading = false;
    }, err => {
      console.log(err);
      this.loading = false;
    });
  }

  newClass() { 
    let dialogRef = this.dialog.open(NewClassDialogComponent, {
      width: '600px',
      data: {},
      disableClose: true,
      hasBackdrop: true
    });

    dialogRef.afterClosed().toPromise().then((data) => {
      this.loading = true;
      this.classService.createClass(this.course.id, data).subscribe(
        (res: CourseClass) => {
        this.router.navigate([`course-teacher/${this.course.id}/class/${res.classNumber}/date/${res.date}`]);
        this.loading = false;
      }, err => {
        console.log(err);
        this.loading = false;
      });
    });
  }

  openNotifyDialog() {
    let dialogRef = this.dialog.open(NotifyStudentsDialogComponent, {
      width: '600px',
      data: {},
      disableClose: true,
      hasBackdrop: true
    });

    dialogRef.afterClosed().toPromise().then((data) => {
      if(data) {
        this.loading = true;
        this.courseService.notifyStudents(data.subject, data.message, this.course.id).subscribe(
          res => {
            alert('Mensaje enviado correctamente.');
            this.loading = false;
          }, err => {
            console.log(err);
            this.loading = false;
          }
        );
      }
    });
  }

  goToChat() {
    this.router.navigate(['chat']);
  }

  goToClass(courseClass: CourseClass){
    this.router.navigate(['course-teacher/class/'+courseClass.id+'/date/'+courseClass.date]);
  }

  seePresentism() {
    this.presentismVisible = !this.presentismVisible;
  }
}
