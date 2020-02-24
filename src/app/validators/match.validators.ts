import { FormGroup, ValidatorFn, ValidationErrors } from '@angular/forms';

export const matchPasswordValidator: ValidatorFn = (control: FormGroup):
	ValidationErrors | null => {
		let notSamePasswd = false;
		if(control.get('newPassword').value !== control.get('confirmNewPassword').value){
			notSamePasswd = true;
		}

		if(notSamePasswd){
			return {notSamePasswd: notSamePasswd};
		}

  		return null;	
	}
	
