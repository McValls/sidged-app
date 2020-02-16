import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ClassStudent, StudentPresent } from '../../model/student/class-student.model';
import { ClassService } from '../../services/class/class.service';

@Component({
  selector: 'teacher-class-present-list',
  templateUrl: './teacher-class-present-list.component.html',
  styleUrls: ['./teacher-class-present-list.component.css']
})
export class TeacherClassPresentListComponent implements OnInit{

	  @Input() classId: number;
	  @Input() courseId: number;
	  studentsList: Array<ClassStudent>;
	  currentStudent: ClassStudent;
  	currentIndex: number = 0;
  	loading: boolean = true;

  	@Output() showListListener = new EventEmitter<boolean>();

  	constructor(private classService: ClassService) { }

  	ngOnInit(){
  		this.getStudents();
  	}

  	private getStudents(){
  		this.classService.getStudentsByCourse(this.courseId, this.classId).subscribe(
  			(data: Array<ClassStudent>) => {
  				this.studentsList = data;
  				this.currentStudent = this.studentsList[this.currentIndex];
  				this.loading = false;
  			});
  	}

	  presentClicked(studentId: number) {
      this.loading = true;
      this.classService.updatePresent(this.classId, studentId, StudentPresent.PRESENT).subscribe((data) => {
        this.studentsList[this.currentIndex].present = StudentPresent.PRESENT;
        this.nextIndex();
      }, err => {
        console.log(err);
        this.loading = false;
      });
  	}

    absentClicked(studentId: number) {
      this.loading = true;
      this.classService.updatePresent(this.classId, studentId, StudentPresent.ABSENT).subscribe((data) => {
        this.studentsList[this.currentIndex].present = StudentPresent.ABSENT;
        this.nextIndex();
      }, err => {
        console.log(err);
        this.loading = false;
      });
    }

    lateClicked(studentId: number) {
      this.loading = true;
      this.classService.updatePresent(this.classId, studentId, StudentPresent.LATE).subscribe((data) => {
        this.studentsList[this.currentIndex].present = StudentPresent.LATE;
        this.nextIndex();
      }, err => {
        console.log(err);
        this.loading = false;
      });
    }

    getPresent(present: StudentPresent){
      return this.classService.getPresent(present);
    }

    previousIndex() {
      if(this.currentIndex == 0){
        this.currentIndex = this.studentsList.length - 1;
        this.showListListener.emit(false);
      } else {
        this.currentIndex--;
      }
      this.currentStudent = this.studentsList[this.currentIndex];
      this.loading = false;
    }

    nextIndex() {
      if(this.currentIndex == this.studentsList.length - 1){
        this.currentIndex = 0;
        this.showListListener.emit(false);
      } else {
        this.currentIndex++;
      }
      this.currentStudent = this.studentsList[this.currentIndex];
      this.loading = false;
    }  	

}
