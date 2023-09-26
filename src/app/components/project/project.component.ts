import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ProjectInfoType } from 'src/app/types/project-info';

@Component({
  selector: 'project',
  standalone: true,
  imports: [CommonModule],
  templateUrl: `project.component.html`,
  styleUrls: [`project.component.scss`]
})
export class ProjectComponent {
  @Input('projectInfo') projectInfo!: ProjectInfoType;
}
