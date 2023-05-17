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
  private primitiveURL: string = 'https://api.github.com';
  private owner: string  = 'ahmad-ben';
  fullURL: string = `${this.primitiveURL}/users/${this.owner}/repos`;
  normalHeaders = new HttpHeaders({
    'Authorization': `token ${environment.authToken}`
  })

  getReposInfo(): Observable<(myProjectInfo | "")[]> {    

    return this.httpClientIns.get(this.fullURL, { headers: this.normalHeaders }).pipe(
      switchMap((fullArrayOfReposInfo: any) => {
          const arrayResponseObs = fullArrayOfReposInfo.map((OneFullRepoInfo: any) => {

          //* Repo Name
          const repoName: string = OneFullRepoInfo.name;

          //* Repo Publish Date
          const formattedDate: string = this.getPublishDate(OneFullRepoInfo.created_at);;

          //* Repo Github URL
          const GithubURLRepo: string = OneFullRepoInfo.html_url;

          //* URL For Get The Languages Those I Used In Each Repo
          const URLForEachRepoLanguages: string = `${this.primitiveURL}/repos/${this.owner}/${repoName}/languages`;

          //* Obs For Get The Languages Those I Used In Each Repo
          const getLanguages$ = this.GetLanguagesOfRepo(URLForEachRepoLanguages);

          //* Make Sure That The Repo Has Github Pages URL
          const RepoHasGithubURL: Boolean = OneFullRepoInfo.has_pages;

          //* Condition And Extract The Pages URL From The Repos Those Have Them
          let githubPagesURL$: Observable<string> = this.getGithubPagesURL(RepoHasGithubURL, repoName);

          //* Obs For Subscribe Automatically With The Two Previous Observables
          let ResponseObs$ = combineLatest([getLanguages$, githubPagesURL$]).pipe(
            map<[string[], string] ,'' | myProjectInfo>((ArrayFeaturesURLPages: [string[], string]) => {

              //:: Get The Array Of Usage Languages And Turn Them To The URL For The Correspondent Image 
              const ArrayOfFeatures: string[] = ArrayFeaturesURLPages[0];
              const GithubPagesURL: string = ArrayFeaturesURLPages[1];    

              const arrayOfURLFeatures: string[]= this.handleFeaturesToImageURL(GithubPagesURL, ArrayOfFeatures);

              //:: Check If The Array Of Usage Languages Empty Or Not
              const finalInfoArray: any[] =  [repoName, GithubURLRepo, GithubPagesURL, formattedDate, arrayOfURLFeatures];
              return (!(arrayOfURLFeatures.length > 0)) ? '' 
                : this.getFinalRepoInfoObj( finalInfoArray );
            })
          )
          return ResponseObs$ as Observable<"" | myProjectInfo>;
        });
        return (forkJoin<(myProjectInfo | "")[]>(arrayResponseObs)) as Observable<(myProjectInfo | "")[]>
      }) 
    )
  }

  private getPublishDate(PrimitiveDate: string){
    const created_date = new Date(PrimitiveDate);
    return  created_date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });
  }

  
  private GetLanguagesOfRepo(url: string){
    //* Obs For Get The Languages Those I Used In Each Repo
    return this.httpClientIns.get<Observable<string[]>>(url,  { headers: this.normalHeaders } )
    .pipe(map((resp) => Object.keys(resp)))
  }


  private getGithubPagesURL(hasGithubPages: Boolean, repoName: string){
    if(hasGithubPages){
      //* URL For Get The URL Github Pages For Each Repo Or Return Empty String
      const url = `${this.primitiveURL}/repos/${this.owner}/${repoName}/pages`;

      //* Specific Header For Get The URL Github Pages For Each Repo Or Return Empty String
      const authHeaders = new HttpHeaders({'Authorization': `Bearer ${environment.authToken}`});

      //* Obs For Get The URL Github Pages For Each Repo Or Return Empty String
      return this.httpClientIns.get<Observable<string>>(url, { headers: authHeaders }).pipe(
        map((response: any) => response.html_url as string),
        catchError((error) => {throw new Error('noURL')}))
    }
    else return of('noURL') 
  }


  private handleFeaturesToImageURL(PagesURL : string, features : string[]){

    if(
      PagesURL == 'https://ahmad-ben.github.io/Angular-Bootstrap-Firebase/' ||
      PagesURL == 'https://ahmad-ben.github.io/portfolio/' ||
      PagesURL == 'https://ahmad-ben.github.io/organic-shop/'
    ){ features.push('NG') }

    return features.map((feature: string) => {
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

  }

  private getFinalRepoInfoObj( finalInfoArray: any[] ){
    return {
      repoName: finalInfoArray[0],
      RepoGithubURL: finalInfoArray[1],
      RepoGithubPagesURL: finalInfoArray[2],
      PublishDate: finalInfoArray[3],
      arrayFeaturesURL: finalInfoArray[4],
    }
  }


}





