import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'new-class-dialog',
  templateUrl: './new-class-dialog.component.html',
  styleUrls: ['./new-class-dialog.component.css']
})
export class NewClassDialogComponent implements OnInit {

	form: FormGroup;

    constructor(public dialogRef: MatDialogRef<NewClassDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {}) { }

    ngOnInit() {
    	this.form = new FormGroup({
    		classDate: new FormControl('', [Validators.required])
    	});
    }

    closeDialog() {
    	this.dialogRef.close(this.formClassName.value);
    }

    get formClassName() {return this.form.get('classDate'); }

}
