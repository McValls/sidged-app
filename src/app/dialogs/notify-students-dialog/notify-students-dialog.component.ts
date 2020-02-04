import {Component, Inject, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-notify-students-dialog',
  templateUrl: './notify-students-dialog.component.html',
  styleUrls: ['./notify-students-dialog.component.css']
})
export class NotifyStudentsDialogComponent implements OnInit {

  form: FormGroup;

  constructor(public dialogRef: MatDialogRef<NotifyStudentsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {}) { }

  ngOnInit() {
    this.form = new FormGroup({
      subject: new FormControl('', [Validators.required]),
      message: new FormControl('', [Validators.required])
    });
  }

  closeDialog(canceled: boolean) {
    if(canceled) {
      this.dialogRef.close();
    } else {
      this.dialogRef.close({subject: this.subjectValue, message: this.messageValue});
    }
  }

  get formSubject() {
    return this.form.get('subject');
  }

  get subjectValue() {
    return this.formSubject.value;
  }

  get formMessage() {
    return this.form.get('message');
  }

  get messageValue() {
    return this.formMessage.value;
  }

}
