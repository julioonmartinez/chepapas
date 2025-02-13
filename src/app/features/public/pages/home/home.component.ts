import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatBadgeModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  animations: [
    trigger('cardAnimation', [
      state('normal', style({ transform: 'scale(1)' })),
      state('swiped', style({ transform: 'translateX(150%) rotate(30deg)' })),
      transition('normal => swiped', animate('300ms ease-out')),
      transition('swiped => normal', animate('0ms'))
    ]),
    trigger('buttonPress', [
      state('normal', style({ transform: 'scale(1)' })),
      state('pressed', style({ transform: 'scale(0.9)' })),
      transition('* <=> *', animate('100ms ease-out'))
    ])
  ]
})
export class HomeComponent {
  puestos = [
    {
      id: 1,
      nombre: "Doña Mary",
      ubicacion: "Portal Hidalgo",
      horario: "3pm - 10pm",
      especialidad: "Papas con chorizo",
      imagen: "https://pinaenlacocina.com/wp-content/uploads/2019/11/IMG_0742-680x907.jpg",
      popularidad: 98,
      espera: "5-10 min"
    },
    {
      id: 2,
      nombre: "Las Tradicionales",
      ubicacion: "Plaza Principal",
      horario: "4pm - 11pm",
      especialidad: "Papas con chamoy",
      imagen: "https://www.cardamomo.news/__export/1683742761077/sites/debate/img/2023/05/10/papas_zamoranas.png_172596871.png",
      popularidad: 95,
      espera: "15-20 min"
    }
  ];

  currentIndex = 0;
  superShotsLeft = 3;
  animationState = 'normal';
  buttonStates: { [key: string]: 'normal' | 'pressed' } = {
    like: 'normal',
    dislike: 'normal',
    supershot: 'normal'
  };

  get currentPuesto() {
    return this.puestos[this.currentIndex];
  }

  ratePuesto(rating: 'like' | 'dislike' | 'supershot') {
    if (rating === 'supershot' && this.superShotsLeft === 0) return;

    this.buttonStates[rating] = 'pressed';
    this.animationState = 'swiped';

    if (rating === 'supershot') {
      this.superShotsLeft--;
    }

    setTimeout(() => {
      this.currentIndex = (this.currentIndex + 1) % this.puestos.length;
      this.animationState = 'normal';
      this.buttonStates[rating] = 'normal';
    }, 300);
  }

  getButtonState(button: string): 'normal' | 'pressed' {
    return this.buttonStates[button];
  }

}
