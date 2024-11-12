import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { MovieListComponent } from './allmovie/movie-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LogInComponent } from './log-in/log-in.component';

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
    component: LogInComponent,
    title: '登入'
  }
];

export default routeConfig;
