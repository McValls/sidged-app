import {UserType} from './user-type';

export class UserData {
  username: string;
  password: string;
  fullName: string;
  lastLoginTime: Date;
  enabled: boolean;
  userType: UserType;

  constructor(username: string, password: string){
  	this.username = username;
  	this.password = password;
  }

}