import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } 		from './login/login.component';
import { TeacherMenuComponent }	from './teacher-menu/teacher-menu.component';
import { TeacherCourseComponent }	from './teacher-course/teacher-course.component';
import { StudentCourseComponent }	from './student-course/student-course.component';
import { TeacherClassComponent }	from './teacher-class/teacher-class.component';
import { StudentMenuComponent } from './student-menu/student-menu.component';
import { ChatComponent } from './chat/chat.component';
import { AuthGuard } 			from './auth/auth-guard';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { RecoveryPasswordComponent } from './recovery-password/recovery-password.component';

const routes: Routes = [
		{path: '', component: LoginComponent},
		{path: 'login', component: LoginComponent},
		{path: 'menu-teacher', component: TeacherMenuComponent, canActivate: [AuthGuard], data: {roles: ['TEACHER']}},
		{path: 'course-teacher', component: TeacherCourseComponent, canActivate: [AuthGuard], data: {roles: ['TEACHER']}},
		{path: 'course-teacher/class', component: TeacherClassComponent, canActivate: [AuthGuard], data: {roles: ['TEACHER']}},
		{path: 'course-teacher/class/:classId/date/:classDate', component: TeacherClassComponent, canActivate: [AuthGuard], data: {roles: ['TEACHER']}},

		{path: 'menu-student', component: StudentMenuComponent, canActivate: [AuthGuard], data: {roles: ['STUDENT']}},
		{path: 'course-student', component: StudentCourseComponent, canActivate: [AuthGuard], data: {roles: ['STUDENT']}},

		{path: 'chat', component: ChatComponent, canActivate: [AuthGuard], data: {roles: ['STUDENT', 'TEACHER']}},
		{path: 'change-password', component: ChangePasswordComponent, canActivate: [AuthGuard], data: {roles: ['STUDENT', 'TEACHER']}},
		{path: 'recovery-password', component: RecoveryPasswordComponent}
];

@NgModule({
	imports: [
    RouterModule.forRoot(routes)
    ],	
  	exports: [ RouterModule ]
})
export class AppRoutingModule {

}