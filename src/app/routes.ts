import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { AllmovieComponent } from './allmovie/allmovie.component';

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
  }
];

export default routeConfig;
