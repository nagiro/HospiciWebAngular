import { Component, OnInit, Input } from '@angular/core';
import { NoticiaHome } from 'src/app/model/noticies';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-noticies',
  templateUrl: './noticies.component.html',
  styleUrls: ['./noticies.component.scss']
})
export class NoticiesComponent implements OnInit {

  config: SwiperOptions = {
    pagination: { el: '.swiper-pagination', clickable: false, type: 'bullets' },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    spaceBetween: 5,
    initialSlide: 0,
    slidesPerView: 1
  };

  _Noticies: NoticiaHome[] = [];

  @Input() set InputDades(DA: NoticiaHome[]) {
    this._Noticies = DA;
  };

  constructor() { }

  ngOnInit() {
  }

}
