export enum FileDocumentType {
	LINK = "Enlace",
	BLOB = "Archivo"
}

export class ClassFileDocument {

	id: number;
	name: string;
	fileDocumentType: FileDocumentType;
	extension: string;
	linkContent: string;
	contentType: string;
}