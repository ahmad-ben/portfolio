import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { AboutMeComponent } from './about-me/about-me.component';
import { ContactComponent } from './contact/contact.component';
import { FooterComponent } from './footer/footer.component';
import { MyProjectsComponent } from './my-projects/my-projects.component';
import { MySkillsComponent } from './my-skills/my-skills.component';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RouterLink,
    NavbarComponent,
    AboutMeComponent,
    MySkillsComponent,
    MyProjectsComponent,
    FooterComponent,
    ContactComponent
  ],
  template: `
    <navbar></navbar>
    <about-me></about-me>
    <my-skills></my-skills>
    <my-projects></my-projects>
    <contact></contact>
    <footer-component></footer-component>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
  title = 'portfolio';
}
