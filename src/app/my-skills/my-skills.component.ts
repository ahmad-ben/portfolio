import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';


@Component({
  selector: 'my-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: `my-skills.component.html`,
  styleUrls: [`my-skills.component.scss`]
})
export class MySkillsComponent implements OnInit, AfterViewInit {
  isVisible: boolean = false;
  skills = [
    {skillName: 'HTML', color: '#04fc43', masteryLevel: '90', imageUrl: './assets/Images/my skills/Skill 1 HTML.png'},
    {skillName: 'CSS', color: '#06ccff', masteryLevel: '90', imageUrl: './assets/Images/my skills/Skill 2 CSS.png'},
    {skillName: 'JS', color: '#ff00be', masteryLevel: '85', imageUrl: './assets/Images/my skills/Skill 3 JS.jpg'},
    {skillName: 'SASS', color: '#fee800', masteryLevel: '85', imageUrl: './assets/Images/my skills/Skill 4 SASS.webp'},
    {skillName: 'BOOTSTRAP', color: '#04fc43', masteryLevel: '75', imageUrl: './assets/Images/my skills/Skill 5 BOOTSTRAP.png'},
    {skillName: 'TS', color: '#06ccff', masteryLevel: '75', imageUrl: './assets/Images/my skills/Skill 6 TS.png'},
    {skillName: 'Angular', color: '#ff00be', masteryLevel: '80', imageUrl: './assets/Images/my skills/Skill 7 NG.png'},
    {skillName: 'Github', color: '#fee800', masteryLevel: '70', imageUrl: './assets/Images/my skills/Skill 8 GH.png'},
    {skillName: 'Firebase', color: '#04fc43', masteryLevel: '70', imageUrl: './assets/Images/my skills/Skill 9 FB.webp'}
  ];

  constructor(private elementRef: ElementRef){}

  ngOnInit(): void {}

  ngAfterViewInit() {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.isVisible = true;
          observer.unobserve(entry.target);
        }
      });
    });
    observer.observe(this.elementRef.nativeElement);
  }
}
