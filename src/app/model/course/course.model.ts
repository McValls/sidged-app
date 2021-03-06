import { Period } from '../period/period.model';

export enum Shift {

	MORNING = 'MORNING',
	AFTERNOON = 'AFTERNOON',
	NIGHT = 'NIGHT'

}

export class Course {

	code: string;
	name: string;
	shift: Shift;
	year: number;
	period: Period;
	timeSince: string;
	timeUntil: string;
	career: string;

}