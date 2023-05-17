import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RealtimeDataService } from '../services/database/realtime-data.service';

@Component({
  selector: 'contact',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: "contact.component.html",
  styleUrls: [ "contact.component.scss" ]
})
export class ContactComponent {
  messageInfo!: FormGroup;
  invalidFrom!: boolean;

  constructor(
    private realtimeDataService: RealtimeDataService,
  ) {
    this.messageInfo = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      subject: new FormControl(null),
      message: new FormControl(null, [Validators.required]),
    })
  }

  save(messageInfo: FormGroup){
    if (messageInfo.valid) {
      this.invalidFrom = false; 
      this.realtimeDataService.saveMessage(messageInfo.value);
      this.messageInfo.reset();
    }
    else this.invalidFrom = true;
  }
}
