import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { MovieListComponent } from './movielist/movie-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { ArticleManagementComponent } from './article-management/article-management.component';

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
    title: '登入'
  },
  {
    path: 'articleManagement',
    component: ArticleManagementComponent,
    title: '文章管理'
  }
];

export default routeConfig;
