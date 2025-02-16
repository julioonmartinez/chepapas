import { Injectable } from '@angular/core';
import { Papas } from '../../shared/interfaces/papas';

@Injectable({
  providedIn: 'root'
})
export class PapasService {

  private coffees: Papas[] = [
    { id: 1, name: "Espresso Intenso", image: "https://pinaenlacocina.com/wp-content/uploads/2019/11/IMG_0742-680x907.jpg" },
    { id: 2, name: "Cappuccino Cremoso", image: "https://www.cardamomo.news/__export/1683742761077/sites/debate/img/2023/05/10/papas_zamoranas.png_172596871.png" },
    { id: 3, name: "Latte Artístico", image: "https://th.bing.com/th/id/OIP.dhHGIIs0MzJcT7V9y5kyMQHaEc?rs=1&pid=ImgDetMain" },
    { id: 4, name: "Cold Brew Suave", image: "https://th.bing.com/th/id/OIP.hlFMcrLiUaPhxwUeeWg_UgHaJ4?w=1500&h=2000&rs=1&pid=ImgDetMain" }
  ];

  private currentIndex = 0;

  

  getFirstPapas(): Papas {
    return this.coffees[0];
  }

  getNextPapas(): Papas {
    this.currentIndex = (this.currentIndex + 1) % this.coffees.length;
    return this.coffees[this.currentIndex];
  }

}
