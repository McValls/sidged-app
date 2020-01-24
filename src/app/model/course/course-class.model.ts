export enum ClassState {
	PENDIENTE = "PENDIENTE",
	FINALIZADA = "FINALIZADA",
	ANULADA = "ANULADA"
}

export class CourseClass {

	id: number;
	classNumber: number;
	date: Date;
	classState: ClassState;

}