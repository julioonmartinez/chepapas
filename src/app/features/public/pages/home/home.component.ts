import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import {MatGridListModule} from '@angular/material/grid-list';

import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-home',
  imports: [
    MatCardModule,
    CommonModule,
    MatGridListModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    MatButtonToggleModule,
    FormsModule,
    MatToolbarModule,
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  
})
export class HomeComponent {

 
}
