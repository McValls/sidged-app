export enum StudentPresent {
	PRESENT = "PRESENT",
	ABSENT = "ABSENT",
	LATE = "LATE"
}

export class ClassStudent {

	public id: number;
	public names: string;
	public lastname: string;
	public present: StudentPresent;

}