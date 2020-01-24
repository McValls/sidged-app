import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.css']
})
export class ErrorsComponent implements OnInit {

	@Input() field: any;
	@Input() minLength: string;
	@Input() maxLength: string;
	@Input() customError: string;

  constructor() { }

  ngOnInit() {
  }

}
