import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { myProjectInfo } from 'src/Common/my-project-Info';
import { ProjectComponent } from '../components/project/project.component';
import {
  eighthProjectData, fifthProjectData, firstProjectData,
  forthProjectData, ninthProjectData, secondProjectData,
  seventhProjectData, sixthProjectData, thirdProjectData
} from '../data/projects-data';
import { GithubApiService } from '../services/github/github-api.service';
import { ProjectInfoType } from '../types/project-info';

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
export class MyProjectsComponent implements OnInit{
  arrayOfHandledReposInfo!: myProjectInfo[];
  arrayImageNames: string[] = [ //: TODO Check if i still need t this
    'Skill 1 HTML.png',
    'Skill 2 CSS.png',
    'Skill 3 JS.jpg',
    'Skill 4 SASS.webp',
    'Skill 5 BOOTSTRAP.png',
    'Skill 6 TS.png',
    'Skill 7 NG.png',
    'Skill 8 GH.png',
    'Skill 9 FB.webp',
  ];
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

  // TODO: Remove all any properties, and services for dealing with github...
  // TODO: clean up the github repos...
  // TODO: add the new tech to the tech section 'isolate commit'...
  // TODO: restructure the app 'isolate commit'...


  constructor(private httpSer: GithubApiService){}
  ngOnInit(): void {
    const localArrayOfHandledReposInfo = JSON.parse(localStorage.getItem('ArrayOfHandledReposInfo') as string);
    if(localArrayOfHandledReposInfo){
      this.arrayOfHandledReposInfo = localArrayOfHandledReposInfo;
    }else{
    this.httpSer.getReposInfo()
      .pipe(
        map<(myProjectInfo | "")[], myProjectInfo[]>((arrayOfHandledReposInfo: (myProjectInfo | "")[]) => {
          const filteredArray =  arrayOfHandledReposInfo.filter((HandledRepoInfo: myProjectInfo | "") => HandledRepoInfo);
          return filteredArray as myProjectInfo[];
        })
      )
      .subscribe({
        next: (nextPara : myProjectInfo[]) =>{ 
          this.arrayOfHandledReposInfo = nextPara;
          this.arrayOfHandledReposInfo
            .sort((handledRepoObject1, handledRepoObject2) => {
              const dateOfObject1 : Date = new Date (handledRepoObject1.PublishDate);
              const dateOfObject1ToNumber : number = dateOfObject1.getTime();
              const dateOfObject2 : Date = new Date (handledRepoObject2.PublishDate);
              const dateOfObject2ToNumber : number = dateOfObject2.getTime();
              let ResultOfSubtraction : number = dateOfObject2ToNumber - dateOfObject1ToNumber ;
              return ResultOfSubtraction;
            })
          // localStorage.setItem('ArrayOfHandledReposInfo', JSON.stringify(this.arrayOfHandledReposInfo));
        }
      })
    }
  }
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

    : TODO adding the repo url to the project box
*/