import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } 		from './app.component';
import { LoginComponent } 		from './login/login.component';
import { TeacherMenuComponent }	from './teacher-menu/teacher-menu.component';
import { TeacherCourseComponent }	from './teacher-course/teacher-course.component';
import { StudentCourseComponent }	from './student-course/student-course.component';
import { TeacherClassComponent }	from './teacher-class/teacher-class.component';
import { StudentMenuComponent } from './student-menu/student-menu.component';
import { ChatComponent } from './chat/chat.component';
import { AuthGuard } 			from './auth/auth-guard';

const routes: Routes = [
		{path: 'login', component: LoginComponent},
		{path: 'menu-teacher', component: TeacherMenuComponent, canActivate: [AuthGuard], data: {roles: ['TEACHER']}},
		{path: 'course-teacher', component: TeacherCourseComponent, canActivate: [AuthGuard], data: {roles: ['TEACHER']}},
		{path: 'course-teacher/class', component: TeacherClassComponent, canActivate: [AuthGuard], data: {roles: ['TEACHER']}},
		{path: 'course-teacher/class/:classId/date/:classDate', component: TeacherClassComponent, canActivate: [AuthGuard], data: {roles: ['TEACHER']}},

		{path: 'menu-student', component: StudentMenuComponent, canActivate: [AuthGuard], data: {roles: ['STUDENT']}},
		{path: 'course-student', component: StudentCourseComponent, canActivate: [AuthGuard], data: {roles: ['STUDENT']}},

		{path: 'chat', component: ChatComponent, canActivate: [AuthGuard], data: {roles: ['STUDENT', 'TEACHER']}}
];

@NgModule({
	imports: [
    RouterModule.forRoot(routes)
    ],	
  	exports: [ RouterModule ]
})
export class AppRoutingModule {

}