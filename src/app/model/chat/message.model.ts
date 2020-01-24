import { UserType } from '../user-type';

export interface Message {
	
	author: string;	
	userType: UserType;
	text: string;
	date: any;

}