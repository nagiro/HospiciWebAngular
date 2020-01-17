import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivitatHome } from 'src/app/model/activitat';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-single-list',
  templateUrl: './single-list.component.html',
  styleUrls: ['./single-list.component.scss']
})
export class SingleListComponent implements OnInit {
  config: SwiperOptions = {
    pagination: { el: '.swiper-pagination', clickable: true, type: 'custom' },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
      hideOnClick: true,
      disabledClass: 'swiper-button-disabled'
    },
    spaceBetween: 0,
    initialSlide: 0,
    slidesPerView: 'auto',
    loop: false
  };

  config_small: SwiperOptions = {
    pagination: { el: '.swiper-pagination', clickable: true, type: 'custom' },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
      hideOnClick: true,
      disabledClass: 'swiper-button-disabled'
    },
    direction: 'vertical',
    spaceBetween: 0,
    initialSlide: 0,
    slidesPerView: 3
  };

  _ElementsPerPagina: number = 3;
  _DadesActivitats: ActivitatHome[] = [];
  _DadesActivitatsFiltrades: ActivitatHome[] = [];
  _PaginaActual: number = 1;
  _MaxPaginaActual: number = 1;
  _NoHiHaElements = false;
  _QuantesActivitatsHaTrobat = 0;

  MostroInfo = false;
  @Input() InputTitol: String;
  @Input() InputColor: String;
  @Input() AmbFiltre: boolean = false;
  @Input() GenLink = []; // Link que es carrega [GenLink]="['/activitats', 0, 'Activitats_de_musica']"
  @Input() set InputDades(DA: ActivitatHome[]) {
    this._DadesActivitats = DA;

    this._DadesActivitats.forEach((item, index) => {
      const i = Math.ceil((index + 1) / this._ElementsPerPagina);
      this._DadesActivitats[index].Pagina = i;
      this._MaxPaginaActual = i;
    });

    this._NoHiHaElements = this._DadesActivitats.length == 0;
    this._QuantesActivitatsHaTrobat = this._DadesActivitats.length;

    this.FiltraDadesActivitats();
  }

  constructor() {}

  ngOnInit() {}

  FiltraDadesActivitats() {
    this._DadesActivitatsFiltrades = [];
    this._DadesActivitats.forEach(X => {
      if (X.Pagina <= this._PaginaActual) this._DadesActivitatsFiltrades.push(X);
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

  ChangeMostroInfo() {
    this.MostroInfo = !this.MostroInfo;
    return this.MostroInfo;
  }
}
