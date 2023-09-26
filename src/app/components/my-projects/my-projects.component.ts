import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  eighthProjectData, fifthProjectData, firstProjectData,
  forthProjectData, ninthProjectData, secondProjectData,
  seventhProjectData, sixthProjectData, thirdProjectData
} from '../../data/projects-data';
import { ProjectInfoType } from '../../types/project-info';
import { ProjectComponent } from './project/project.component';

@Component({
  selector: 'my-projects',
  standalone: true,
  imports: [
    CommonModule,
    ProjectComponent
  ],
  templateUrl: `my-projects.component.html`,
  styleUrls: [`my-projects.component.scss`]
})
export class MyProjectsComponent{

  projectsInfo: ProjectInfoType[] = [
    firstProjectData,
    secondProjectData,
    thirdProjectData,
    forthProjectData,
    fifthProjectData,
    sixthProjectData,
    seventhProjectData,
    eighthProjectData,
    ninthProjectData,
  ]

}





/* 

    Project Name.
    Project Date.
    Project Url uf we have it.
    Array of features images.

    we will call the project component in array, each time will will pass to it an object.
    the logic of handle the object's properties in the project component not here.

    [
    {      Project Name.
    Project Date.
    Project Url uf we have it.
    Array of features images. }
    {      Project Name.
    Project Date.
    Project Url uf we have it.
    Array of features images. }
    {      Project Name.
    Project Date.
    Project Url uf we have it.
    Array of features images. }
    ]




        { 
      name: 'HTML & CSS Template One.',
      date: '25/09/2022',
      url: 'https://ahmad-ben.github.io/Template-One-Html-Css/',
      usedTechnologiesImages: [
        `./assets/Images/my skills/Skill 1 HTML.png`,
        `./assets/Images/my skills/Skill 2 CSS.png`,
      ],
    },
    { 
      name: 'HTML & CSS Template Two.',
      date: '27/09/2022',
      url: 'https://ahmad-ben.github.io/Template-Two-Html-Css/',
      usedTechnologiesImages: [
        `./assets/Images/my skills/Skill 1 HTML.png`,
        `./assets/Images/my skills/Skill 2 CSS.png`,
      ],
    },
    { 
      name: 'Weather project -freelance-.',
      date: '10/04/2023',
      url: 'https://www.meteo-rabat.com/fr/meteo',
      usedTechnologiesImages: [
        `./assets/Images/my skills/Skill 1 HTML.png`,
        `./assets/Images/my skills/Skill 4 SASS.webp`,
        `./assets/Images/my skills/Skill 5 BOOTSTRAP.png`,
        `./assets/Images/my skills/Skill 6 TS.png`,
        `./assets/Images/my skills/Skill 7 NG.png`,
      ],
    },


*/