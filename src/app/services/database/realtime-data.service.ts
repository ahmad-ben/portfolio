import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class RealtimeDataService {

  constructor(private fireDatabase: AngularFireDatabase) { }

  saveMessage(message: any){
    this.fireDatabase.object(`/messages/${message.firstName} ${message.lastName}`).update({
      firstName: message.firstName, 
      lastName: message.lastName,
      email: message.email,
      subject: message.subject,
      message: message.message,
    })
  }
}

