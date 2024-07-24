import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ExploreComponent } from "./components/explore/explore.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, ExploreComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'fylefit-studio';
}
