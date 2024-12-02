import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { MovieListComponent } from './movielist/movie-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { ArticleManagementComponent } from './article-management/article-management.component';
import { AddArticleComponent } from './add-article/add-article.component';
import { EditArticleComponent } from './edit-article/edit-article.component';
import { DeleteArticleComponent } from './delete-article/delete-article.component';
import { authGuard } from './layout/auth.guard';
import { articleManageGuard } from './layout/login.guard';

const routeConfig: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: '首頁'
  },
  {
    path: 'details/:id',
    component: DetailsComponent,
  },
  {
    path: 'movielist',
    component: MovieListComponent,
    title: '全部電影'
  },
  {
    path: 'pagenotfound',
    component: PageNotFoundComponent,
    title: '頁面不存在'
  },
  {
    path: 'login',
    component: LoginComponent,
    title: '登入',
    canActivate: [authGuard]
  },
  {
    path: 'articleManagement',
    component: ArticleManagementComponent,
    title: '文章管理',
    canActivate: [articleManageGuard]
  },
  {
    path: 'editarticle/:id',
    component: EditArticleComponent,
    title: '修改文章',
    canActivate: [articleManageGuard]
  },
  {
    path: 'editarticle',
    component: EditArticleComponent,
    title: '修改文章',
    canActivate: [articleManageGuard]
  },
  {
    path: 'addarticle',
    component: AddArticleComponent,
    title: '新增文章',
    canActivate: [articleManageGuard]
  },
  {
    path: 'deletearticle',
    component: DeleteArticleComponent,
    title: '刪除文章',
    canActivate: [articleManageGuard]
  }
];

export default routeConfig;
