import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { AllmovieComponent } from './allmovie/allmovie.component';

const routeConfig: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home Page'
  },
  {
    path: 'details/:id',
    component: DetailsComponent,
    title: 'Details Page'
  },
  {
    path: 'allmovie',
    component: AllmovieComponent,
    title: 'All Movie'
  }
];

export default routeConfig;
