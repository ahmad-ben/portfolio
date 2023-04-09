import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'about-me',
  standalone: true,
  imports: [CommonModule],
  templateUrl: `about-me.component.html`,
  styleUrls: [`about-me.component.scss`]
})
export class AboutMeComponent implements OnInit {
  ngOnInit(): void {
    const today = new Date();
    const birthDay = new Date("Oct 30, 01");
    const milliSecondDiff: number = today.valueOf() - birthDay.valueOf();
    const myAge: number = Math.round(milliSecondDiff/1000/60/60/24/365);
    let ageSpan = document.getElementById('my-age') as HTMLSpanElement ;
    ageSpan.innerHTML = `${myAge.toString()} Years Old`;
  }
}
