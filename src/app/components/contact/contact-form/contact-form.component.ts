import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RealtimeDataService } from 'src/app/services/database/realtime-data.service';

@Component({
  selector: 'contact-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: "contact-form.component.html",
  styleUrls: [ "contact-form.component.scss" ]
})

export class ContactFormComponent {
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
