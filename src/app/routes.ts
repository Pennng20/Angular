import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { AllmovieComponent } from './allmovie/allmovie.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

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
    path: 'allmovie',
    component: AllmovieComponent,
    title: '全部電影'
  },
  {
    path: 'pagenotfind',
    component: PageNotFoundComponent,
    title: '頁面不存在'
  }
];

export default routeConfig;
