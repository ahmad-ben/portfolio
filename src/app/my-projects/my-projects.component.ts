import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { myProjectInfo } from 'src/Common/my-project-Info';
import { GithubApiService } from '../services/github-api.service';

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
  constructor(private httpSer: GithubApiService){}
  ngOnInit(): void {
    this.httpSer.getReposInfo()
    .pipe(
      map((arrayOfHandledReposInfo: any) => {
        return arrayOfHandledReposInfo
          .filter((HandledRepoInfo: any) => HandledRepoInfo)
      })
    )
    .subscribe({
      next: (nextPara : any) =>{ 
        this.arrayOfHandledReposInfo = nextPara;
      }
    })
  }
}
