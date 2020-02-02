import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatDialogModule } from "@angular/material/dialog";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AngularFileUploaderModule } from "angular-file-uploader";
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ChartsModule } from 'ng2-charts';

import { RouterModule, Routes } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { NgxLoadingModule } from 'ngx-loading';
import { LoadingComponent } from './loading/loading.component';
import { ErrorsComponent } from './errors/errors.component';

import { AddHeaderInterceptor } from './interceptors/add-header.interceptor';
import { SharingDataService } from './services/local-storage/sharing-data.service';
import { TeacherMenuComponent } from './teacher-menu/teacher-menu.component';
import { TeacherCourseComponent } from './teacher-course/teacher-course.component';
import { TeacherClassComponent } from './teacher-class/teacher-class.component';
import { TeacherClassPresentListComponent } from './teacher-class/teacher-class-present-list/teacher-class-present-list.component';
import { StudentMenuComponent } from './student-menu/student-menu.component';
import { FileDocumentsComponent } from './file-documents/file-documents.component';
import { ChatComponent } from './chat/chat.component';
import { StudentCourseComponent } from './student-course/student-course.component';
import { NewClassDialogComponent } from './dialogs/new-class-dialog/new-class-dialog.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CoursePresentismComponent } from './teacher-course/course-presentism/course-presentism.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoadingComponent,
    ErrorsComponent,
    TeacherMenuComponent,
    TeacherCourseComponent,
    TeacherClassComponent,
    TeacherClassPresentListComponent,
    StudentMenuComponent,
    FileDocumentsComponent,
    ChatComponent,
    StudentCourseComponent,
    NewClassDialogComponent,
    NavbarComponent,
    CoursePresentismComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxLoadingModule.forRoot({}),
    MatDialogModule,
    BrowserAnimationsModule,
    AngularFileUploaderModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    ChartsModule
  ],
  exports: [
  ],
  entryComponents: [
    NewClassDialogComponent
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AddHeaderInterceptor,
    multi: true,
    deps: [SharingDataService]
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }