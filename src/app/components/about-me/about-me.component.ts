import { CommonModule, DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, Inject } from '@angular/core';

@Component({
  selector: 'about-me',
  standalone: true,
  imports: [CommonModule],
  templateUrl: `about-me.component.html`,
  styleUrls: [`about-me.component.scss`]
})
export class AboutMeComponent implements AfterViewInit{
  currentAge!: number;

  constructor(@Inject(DOCUMENT) private _document: Document){
    this.getCurrentYear();
  }

  ngAfterViewInit(){
    this.observer();
  }

  getCurrentYear(){

    const today = new Date();
    const birthDay = new Date("Oct 30, 01");
    const milliSecondDiff: number = today.valueOf() - birthDay.valueOf();
    const myAge: number = Math.trunc(milliSecondDiff/1000/60/60/24/365.75);
    this.currentAge = myAge;

  }

  observer(){

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry =>{
        imageHolder.classList.toggle('show', entry.isIntersecting);
        textInfo.classList.toggle('show', entry.isIntersecting);
        softSkills.classList.toggle('show', entry.isIntersecting);
      })
    }, { threshold: .25 })

    const container = this._document.getElementById('about-me');
    const imageHolder = this._document.getElementsByClassName('image-holder')[0];
    const textInfo = this._document.getElementById('text-info') as HTMLElement;
    const softSkills = this._document.getElementById('soft-skills') as HTMLElement;

    observer.observe(container as HTMLElement);

  }

}
