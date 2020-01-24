import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Message } from '../model/chat/message.model';
import { UserType } from '../model/user-type';
import { UserData } from '../model/user-data.model';
import { SharingDataService } from '../services/local-storage/sharing-data.service';

@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

    userData: UserData;
  	userType: UserType;
  	courseId: number;
    messagesCollection: AngularFirestoreCollection<Message>;
  	messages: Observable<Message[]>;
    form: FormGroup;

  	constructor(private db: AngularFirestore,
      private router: Router,
      private sharingDataService: SharingDataService) { 
      this.userData = sharingDataService.getLoggedUser();
  		this.userType = sharingDataService.getLoggedUser().userType;
      this.courseId = sharingDataService.getCurrentCourse().id;
  	}

  	ngOnInit() {
      this.messagesCollection = this.db.collection<Message>("messages-"+this.courseId, ref => ref.orderBy('date'));
  		this.messages = this.messagesCollection.valueChanges();
      this.messages.subscribe(() => {
        this.scrollMessagesContainerToBottom();
      });

      this.form = new FormGroup({
        text : new FormControl('', [Validators.required])
      });
  	}

    isIncomingMessage(userType: UserType): boolean {
      return this.userType != userType;
    }

    sendMessage() {
       this.form.get("text").markAsTouched();
       if(this.form.valid){
         let textValue = this.form.get("text").value;
         let message: Message = {
           author: this.userData.fullName,
           text: textValue,
           date: new Date(),
           userType: this.userType
         }
         this.messagesCollection.add(message);
         this.form.get("text").setValue("");
       }
    }

    private scrollMessagesContainerToBottom() {
      setTimeout(() => {
        var messagesContainer = document.getElementsByClassName("messages-container")[0];
        messagesContainer.scrollTop = messagesContainer.scrollHeight - messagesContainer.clientHeight;
      }, 0);
    }

}
