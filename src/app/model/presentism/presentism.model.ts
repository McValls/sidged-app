export interface CoursePresentismData {
	presentismByMonth:CoursePresentismByMonthData[];
	totalAveragesPercentages: PercentageByStudentPresent[];		
}

export interface CoursePresentismByMonthData {
	month:number;
	percentagesByMonth: PercentageByStudentPresent[];	
}

export interface PercentageByStudentPresent {
	studentPresent: string;
	percentage: number;
}

export enum PresentType {
	PRESENT = "PRESENT",
	LATE = "LATE",
	ABSENT = "ABSENT"
}