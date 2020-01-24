export enum PeriodType {
	QUARTERLY = 'QUARTERLY',
	BIANNUAL = 'BIANNUAL',
	ANNUAL = 'ANNUAL',
	SUMMER = 'SUMMER'
}

export class Period {

	periodType: PeriodType;
	number: number;

}