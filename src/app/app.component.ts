import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { AboutMeComponent } from './about-me/about-me.component';
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
    MySkillsComponent
  ],
  template: `
    <navbar></navbar>
    <about-me></about-me>
    <my-skills></my-skills>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
  title = 'portfolio';
}
