import { FormGroup, ValidatorFn, ValidationErrors } from '@angular/forms';

export const matchPasswordValidator: ValidatorFn = (control: FormGroup):
	ValidationErrors | null => {
		let notSamePasswd = false;
		if(control.get('password').value !== control.get('confirmPassword').value){
			notSamePasswd = true;
		}

		let notSameEmail = false;
		if(control.get('email').value !== control.get('confirmEmail').value){
			notSameEmail = true;
		}

		if(notSamePasswd || notSameEmail){
			return {notSamePasswd: notSamePasswd, notSameEmail: notSameEmail};
		}

  		return null;	
	}
	
