import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import {MatGridListModule} from '@angular/material/grid-list';
import { RatingComponent } from "../rating/rating.component";
import { TinderCardComponent } from '../../../../shared/components/tinder-card/tinder-card.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
@Component({
  selector: 'app-home',
  imports: [
    MatCardModule,
    CommonModule,
    MatGridListModule,
    MatButtonModule,
    MatIconModule,
    TinderCardComponent,
    MatButtonToggleModule,
    FormsModule,
    MatToolbarModule,
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  
})
export class HomeComponent {
  // Modo de valoración: 'estrillitas' o 'tinder'
  ratingMode: 'star' | 'tinder' = 'star';
  estrillitas = new Array(5);
  currentEstrillitas = 0;
  currentTinder: 'like' | 'dislike' | null = null;

  // Datos de ejemplo para los puestos
  stands = [
    {
      name: 'Papas El Buen Sabor',
      location: 'Centro',
      image: 'https://www.cardamomo.news/__export/1683742761077/sites/debate/img/2023/05/10/papas_zamoranas.png_172596871.png',
      description: 'Las mejores papas cocidas de la ciudad.',
      comments: ['Delicioso', 'Muy recomendables']
    },
    {
      name: 'Papas La Tradición',
      location: 'Barrio Histórico',
      image: 'https://pinaenlacocina.com/wp-content/uploads/2019/11/IMG_0742-680x907.jpg',
      description: 'Receta tradicional con el sazón de siempre.',
      comments: ['Auténtico', 'Sabe a tradición']
    }
    // Agrega más puestos según necesites...
  ];

  // Datos de ejemplo para el Top 10
  top10 = [
    {
      name: 'Papas El Buen Sabor',
      image: 'https://www.cardamomo.news/__export/1683742761077/sites/debate/img/2023/05/10/papas_zamoranas.png_172596871.png',
      rating: 4.8
    },
    {
      name: 'Papas La Tradición',
      image: 'https://www.cardamomo.news/__export/1683742761077/sites/debate/img/2023/05/10/papas_zamoranas.png_172596871.png',
      rating: 4.6
    }
    // Completa con 10 puestos...
  ];

  // Datos de ejemplo para salsas picosas
  salsasPicosas = [
    { name: 'Salsa Infernal', nivelPicante: 'Muy Alto' },
    { name: 'Salsa Fuego', nivelPicante: 'Alto' }
    // Más salsas...
  ];

  // Datos de ejemplo para puestos con variedad de salsas
  standsConVariedad = [
    { name: 'Papas La Diversa', variedad: '5 tipos de salsas' },
    { name: 'Puestos Sabor y Variedad', variedad: '7 tipos de salsas' }
    // Más puestos...
  ];

  constructor() { }

  ngOnInit(): void { }

  setRatingMode(mode: 'star' | 'tinder'): void {
    this.ratingMode = mode;
    // Reinicia la valoración según el modo
    if (mode === 'star') {
      this.currentTinder = null;
    } else if (mode === 'tinder') {
      this.currentEstrillitas = 0;
    }
  }
}
