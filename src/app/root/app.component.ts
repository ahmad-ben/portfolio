import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { AboutMeComponent } from '../about-me/about-me.component';
import { ContactComponent } from '../contact/contact.component';
import { FooterComponent } from '../footer/footer.component';
import { MyProjectsComponent } from '../my-projects/my-projects.component';
import { MySkillsComponent } from '../my-skills/my-skills.component';
import { NavbarComponent } from '../navbar/navbar.component';

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
  templateUrl: `app.component.html`,
  styleUrls: ["app.component.scss"]
})
export class AppComponent {
  title = 'Ahmed Ben Chakhter';
  darkMode: boolean= true;
  needScroll: boolean= false;

  constructor() {
    window.addEventListener('scroll', () => {
      if(window.scrollY > 100) this.needScroll = true;
      else this.needScroll = false;
    })
  }

  changeMode(btnElement: HTMLElement){
    this.darkMode = !this.darkMode;
    console.log(this.darkMode);
    if (this.darkMode){
      document.documentElement.style.setProperty('--back-color', '#434750');
      document.documentElement.style.setProperty('--primary-font-color', '#00d4ff');
      document.documentElement.style.setProperty('--secondary-font-color', '#009afa');
      document.documentElement.style.setProperty('--boxes-space', '#434750');
      document.documentElement.style.setProperty('--error-color', '#FF5454');
    } else{
      document.documentElement.style.setProperty('--back-color', '#0ff');
      document.documentElement.style.setProperty('--primary-font-color', '#004666');
      document.documentElement.style.setProperty('--secondary-font-color', '#185395');
      document.documentElement.style.setProperty('--boxes-space', '#0ff');
      document.documentElement.style.setProperty('--error-color', '#a51d1d');
    }  
  }

  goToTop(){
    window.scroll(0, 0);
  }



}
