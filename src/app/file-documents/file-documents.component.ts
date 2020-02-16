import { Component, OnInit, Input } from '@angular/core';
import { FileDocumentType, ClassFileDocument } from '../model/file-documents/file-documents.model';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { SharingDataService } from '../services/local-storage/sharing-data.service';
import { FileDocumentService  } from '../services/file-document/file-document.service';

@Component({
  selector: 'file-documents',
  templateUrl: './file-documents.component.html',
  styleUrls: ['./file-documents.component.css']
})
export class FileDocumentsComponent implements OnInit {

    /* Inputs */
    @Input() classId: number;

    /* Fields */
    form: FormGroup;
	  fileDocumentTypes: Array<FileDocumentType> = new Array<FileDocumentType>();
    loading: boolean = false;
    fileList: Array<ClassFileDocument>;

	  private afuConfig = {};

  	constructor(private sharingDataService: SharingDataService,
      private fileDocumentService: FileDocumentService) { }

  	ngOnInit() {
      this.form = new FormGroup({
        name : new FormControl('', [
          Validators.required
          ]),
        selectedFileDocumentType: new FormControl('', [Validators.required]),
        link : new FormControl('', [Validators.required])
      });
  		this.fileDocumentTypes.push(FileDocumentType.LINK);
  		this.fileDocumentTypes.push(FileDocumentType.BLOB);
      this.initAfuConfig();
      this.getFiles();
  	}

    private initAfuConfig() {
      this.afuConfig = {
          uploadAPI: {
            url:"https://sidged-be.herokuapp.com/file-documents/class/" + this.classId,
            headers: {
             "Authorization" : this.sharingDataService.getJwtToken()
            }
          },
          multiple: false,
          maxSize: "16",
          hideProgressBar: false,
          hideResetBtn: false,
          hideSelectBtn: false,
          replaceTexts: {
            selectFileBtn: 'Seleccionar archivo',
            resetBtn: 'Reiniciar',
            uploadBtn: 'Guardar',
            attachPinBtn: 'Adjuntar...',
            afterUploadMsg_success: 'Archivo adjuntado !',
            afterUploadMsg_error: 'Falló la carga !'
          }
      }
    }

    private getFiles() {
      if(this.classId != null){
        this.fileDocumentService.searchFiles(this.classId)
        .subscribe(files => {
          this.fileList = files;
        });  
      } else {
        this.fileDocumentService.searchFilesByCourse(this.sharingDataService.getCurrentCourse())
        .subscribe(files => {
          this.fileList = files;
        });  
      }
      
    }

    public onUpload($event: any){
      this.loading = false;
      if($event.status >= 200 && $event.status < 300){
          this.getFiles();
          this.form.get('selectedFileDocumentType').setValue(null);
      }
    }

    saveLink(){
      Object.keys(this.form.controls).forEach(field => {
        this.form.get(field).markAsTouched();

      });

      this.fileDocumentService.saveFileLink(this.classId, this.formName.value, this.formLink.value)
        .subscribe((data: any) => {
          this.getFiles();
          this.form.get('selectedFileDocumentType').setValue(null);
        }, (error) => {
          alert(error);
        });
    }

    download(file: ClassFileDocument) {
      if(file.fileDocumentType.toString() == "BLOB") {
        this.fileDocumentService.downloadFile(file).subscribe(res => {
          this.openDownloadFile(res, file.name);
        });  
      } else {
        this.openLink(file.linkContent);
      }
    }

    private openDownloadFile(response: any, filename: string){
      let dataType = response.type;
      let downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(response);
      if (filename)
          downloadLink.setAttribute('download', filename);
      document.body.appendChild(downloadLink);
      downloadLink.click();
    }

    private openLink(link: string) {
      var win = window.open(link, '_blank');
      win.focus();
    }

  	get blobType() {
  		return FileDocumentType.BLOB;
  	}

    get linkType() {
      return FileDocumentType.LINK;
    }

    get selectedFileDocumentType() {
      return this.form.get('selectedFileDocumentType').value;
    }

    get formName() { 
      return this.form.get('name'); 
    }

    get formLink() {
      return this.form.get('link');
    }

}
