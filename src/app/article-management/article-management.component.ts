import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { AddArticleComponent } from '../add-article/add-article.component';
import { EditArticleComponent } from '../edit-article/edit-article.component';
import { DeleteArticleComponent } from '../delete-article/delete-article.component';

@Component({
  selector: 'app-article-management',
  standalone: true,
  imports: [ReactiveFormsModule, NgbNavModule, CommonModule, AddArticleComponent, EditArticleComponent, DeleteArticleComponent],
  templateUrl: './article-management.component.html',
  styleUrl: './article-management.component.scss'
})
export class ArticleManagementComponent {
  /**
   * @private 只能在該類別的內部被訪問，外部無法直接存取。
   */
  private _active = 1;

  public get active(): number {
    return this._active;
  }

  public set active(value: number) {
    this._active = value;
  }
}
