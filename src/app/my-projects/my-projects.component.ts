import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { myProjectInfo } from 'src/Common/my-project-Info';
import { GithubApiService } from '../services/github/github-api.service';

@Component({
  selector: 'my-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: `my-projects.component.html`,
  styleUrls: [`my-projects.component.scss`]
})
export class MyProjectsComponent implements OnInit{
  arrayOfHandledReposInfo!: myProjectInfo[];
  arrayImageNames: string[] = [
    'Skill 1 HTML.png',
    'Skill 2 CSS.png',
    'Skill 3 JS.jpg',
    'Skill 4 SASS.webp',
    'Skill 5 BS.png',
    'Skill 6 TS.png',
    'Skill 7 NG.png',
    'Skill 8 GH.png',
    'Skill 9 FB.webp',
  ];
  featuresFirstRealWebsite: string[] = [
    `./assets/Images/my skills/Skill 1 HTML.png`,
    `./assets/Images/my skills/Skill 4 SASS.webp`,
    `./assets/Images/my skills/Skill 5 BS.png`,
    `./assets/Images/my skills/Skill 6 TS.png`,
    `./assets/Images/my skills/Skill 7 NG.png`,
  ];
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
