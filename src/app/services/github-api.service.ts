import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, combineLatest, forkJoin, map, of, switchMap } from 'rxjs';
import { myProjectInfo } from 'src/Common/my-project-Info';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GithubApiService {
  constructor(private httpClientIns: HttpClient){};
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
  ngOnInit(){

    // console.log('Heree', environment.authToken);
    console.log('Here');
  }
  private primitiveURL: string = 'https://api.github.com';
  private owner: string  = 'ahmad-ben';
  getReposInfo(): Observable<(myProjectInfo | "")[]> {
        console.log('Heree', environment.authToken);
        console.log('Here');
    
    const fullURL: string = `${this.primitiveURL}/users/${this.owner}/repos`;
    const normalHeaders = new HttpHeaders({
      'Authorization': `token ${environment.authToken}`
    })
    return this.httpClientIns.get(fullURL, { headers: normalHeaders }).pipe(
      switchMap((fullArrayOfReposInfo: any) => {
          const arrayResponseObs = fullArrayOfReposInfo.map((OneFullRepoInfo: any) => {
          //* Repo Name
          const repoName: string = OneFullRepoInfo.name;

          //* Repo Publish Date
          const created_date = new Date(OneFullRepoInfo.created_at);
          const formattedDate: string = created_date.toLocaleDateString("en-US", {
            day: "numeric",
            month: "numeric",
            year: "numeric",
          });

          //* Repo Github URL
          const GithubURLRepo: string = OneFullRepoInfo.html_url;

          //* URL For Get The Languages Those I Used In Each Repo
          const URLForEachRepoLanguages: string = `${this.primitiveURL}/repos/${this.owner}/${repoName}/languages`;

          //* Obs For Get The Languages Those I Used In Each Repo
          const getFeatures$ = this.httpClientIns.get<Observable<string[]>>(URLForEachRepoLanguages, {  headers: normalHeaders })
          .pipe(map((resp) => Object.keys(resp)))

          //* Make Sure That The Repo Has Github Pages URL
          const RepoHasGithubURL: Boolean = OneFullRepoInfo.has_pages;

          //* Condition And Extract The Pages URL From The Repos Those Have Them
          let getPagesURL$!: Observable<string>;
          if(RepoHasGithubURL){
            //* URL For Get The URL Github Pages For Each Repo Or Return Empty String
            const url = `${this.primitiveURL}/repos/${this.owner}/${repoName}/pages`;

            //* Specific Header For Get The URL Github Pages For Each Repo Or Return Empty String
            const authHeaders = new HttpHeaders({'Authorization': `Bearer ${environment.authToken}`});

            //* Obs For Get The URL Github Pages For Each Repo Or Return Empty String
            getPagesURL$ = this.httpClientIns.get<Observable<string>>(url, { headers: authHeaders }).pipe(
              map((response: any) => response.html_url as string),
              catchError((error) => {throw new Error('noURL')}))
          }else{ getPagesURL$ = of('noURL') }

          //* Obs For Subscribe Automatically With The Two Previous Observables
          let ResponseObs$ = combineLatest([getFeatures$, getPagesURL$]).pipe(
            map<[string[], string] ,'' | myProjectInfo>((ArrayFeaturesURLPages: [string[], string]) => {

              //? Get The Array Of Usage Languages And Turn Them To The URL For The Correspondent Image 
              const ArrayOfFeatures: string[] = ArrayFeaturesURLPages[0];
              const GithubPagesURL: string = ArrayFeaturesURLPages[1];              
              const arrayOfURLFeatures: string[]= ArrayOfFeatures.map((feature: string) => {
                if(feature == 'TypeScript'){
                  feature = 'TS';
                }else if(feature == 'SCSS'){
                  feature = 'SASS';
                }else if(feature == 'JavaScript'){
                  feature = 'JS';
                }
                this.arrayImageNames.forEach((imageName) => {
                  if(imageName.includes(feature)){
                    feature = `./assets/Images/my skills/${imageName}` ;
                  }
                })
                return feature;
              })

              //? Check If The Array Of Usage Languages Empty Or Not
              if(arrayOfURLFeatures.length > 0 ){
                return {
                  repoName: repoName,
                  RepoGithubURL: GithubURLRepo,
                  RepoGithubPagesURL: GithubPagesURL,
                  PublishDate: formattedDate,
                  arrayFeaturesURL: arrayOfURLFeatures,
                }
              }else{
                return '';
              }
            })
          )
          return ResponseObs$ as Observable<"" | myProjectInfo>;
        });
        return (forkJoin<(myProjectInfo | "")[]>(arrayResponseObs)) as Observable<(myProjectInfo | "")[]>
      }) 
    )
  }
}





