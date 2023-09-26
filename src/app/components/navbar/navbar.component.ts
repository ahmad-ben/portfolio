import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: `navbar.component.html`,
  styleUrls: [`navbar.component.scss`, ]
})
export class NavbarComponent implements OnInit{
  menuIcons = document.getElementById('menu-icon') as HTMLElement;
  ulSmall = document.getElementById('ul-small') as HTMLUListElement;
  
  ngOnInit(): void {}

  menuClicked(menuIcon: HTMLElement, sectionsUl: HTMLUListElement){
    menuIcon.classList.toggle('active');
    sectionsUl.classList.toggle('active');
  }

}
