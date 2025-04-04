import { Component } from '@angular/core';

import { HeaderComponent } from './components/header/header.component';
import { UserInputComponent } from './components/user-input/user-input.component';
import { InvestmentResultsComponent } from "./components/investment-results/investment-results.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    UserInputComponent,
    InvestmentResultsComponent
  ],
  templateUrl: './app.component.html',
})
export class AppComponent { }
