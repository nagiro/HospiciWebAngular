import { Component, OnInit, Input } from '@angular/core';
import { PromocioHome } from 'src/app/model/promocio';
import { interval } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
  _Promocions: PromocioHome[] = [];
  _PromocioActual: number = 0;
  _Boletes = [];

  @Input() set InputDades(DA: PromocioHome[]) {
    this._Promocions = DA;
    this._PromocioActual = 0;
    this._Boletes = [];
    for (let i = 0; i < this._Promocions.length; i++) this._Boletes.push(i);

    interval(1003000).subscribe(X => {
      if (this._Promocions.length == this._PromocioActual) {
        this._PromocioActual = 0;
      } else {
        this._PromocioActual++;
      }
    });
  }

  constructor(private R: Router) {}

  ngOnInit() {}

  VesAPromocio($eventId: number) {
    this._PromocioActual = $eventId;
  }

  getClassBola($idBola) {
    return $idBola == this._PromocioActual ? 'PuntBlanc' : 'PuntGris';
  }

  Redirecciona(idPromocio: number) {
    let P = this._Promocions[idPromocio];
    if (P.PROMOCIONS_URL) this.R.navigateByUrl(P.PROMOCIONS_URL);
    else this.R.navigate(P.linkRouter);
  }
}
