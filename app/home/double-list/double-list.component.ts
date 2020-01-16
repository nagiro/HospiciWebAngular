import { Component, OnInit, Input } from '@angular/core';
import { DadesActivitat } from '../shared/dades-activitat';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-double-list',
  templateUrl: './double-list.component.html',
  styleUrls: ['./double-list.component.scss']
})
export class DoubleListComponent implements OnInit {

  config: SwiperOptions = {
    pagination: { el: '.swiper-pagination', clickable: true, type: 'custom' },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    spaceBetween: 5,
    initialSlide: 0,
    slidesPerView: 3
  };


  _DadesActivitats: DadesActivitat[];
  _DadesActivitatsFiltrades1: DadesActivitat[];
  _DadesActivitatsFiltrades2: DadesActivitat[];
  _PaginaActual: number = 1;
  _MaxPaginaActual: number = 1;

  @Input() InputTitol: String;
  @Input() InputColor: String;
  @Input() GenLink = [];  // Link que es carrega [GenLink]="['/activitats', 0, 'Activitats_de_musica']"
  @Input() set InputDades(DA: DadesActivitat[]) {
    this._DadesActivitats = DA;
    this._DadesActivitats.forEach((item, index) => {
      const i = Math.ceil((index + 1) / 3);
      this._DadesActivitats[index].Pagina = i;
      this._MaxPaginaActual = i;
    });
    this.FiltraDadesActivitats();
  };

  constructor() { }

  ngOnInit() {
  }

  FiltraDadesActivitats() {
    this._DadesActivitatsFiltrades1 = [];
    this._DadesActivitatsFiltrades2 = [];
    this._DadesActivitats.forEach(X => {
      if (X.Pagina == this._PaginaActual) this._DadesActivitatsFiltrades1.push(X);
      if (X.Pagina == this._PaginaActual + 1 && this._PaginaActual < this._MaxPaginaActual) this._DadesActivitatsFiltrades2.push(X);
    });
  }

  PaginaEndavant() {
    if (this._PaginaActual < this._MaxPaginaActual) {
      this._PaginaActual++;
      this.FiltraDadesActivitats();
    }
  }
  PaginaEnrrera() {
    if (this._PaginaActual > 1) {
      this._PaginaActual--;
      this.FiltraDadesActivitats();
    }
  }

}
