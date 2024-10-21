import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BannerComponent } from './banner/banner.component';
import { HomeComponent } from "./home/home.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BannerComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'homes';
}
