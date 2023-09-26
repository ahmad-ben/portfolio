import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { ContactInfoComponent } from './contact-info/contact-info.component';

@Component({
  selector: 'contact',
  standalone: true,
  imports: [
    CommonModule,
    ContactFormComponent,
    ContactInfoComponent
  ],
  templateUrl: "contact.component.html",
  styleUrls: [ "contact.component.scss" ]
})

export class ContactComponent {

}
