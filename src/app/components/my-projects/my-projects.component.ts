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

};