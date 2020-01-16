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
  _PromocioActual: PromocioHome = new PromocioHome();
  _PaginaActual: number = 1;
  _MaxPaginaActual: number = 1;
  _TotalPromocions: number = 0;

  @Input() set InputDades(DA: PromocioHome[]) {
    this._Promocions = DA;
    this._PromocioActual = this._Promocions[0] ? this._Promocions[0] : new PromocioHome();
    this._MaxPaginaActual = DA.length;
    const source = interval(3000);
    source.subscribe(X => {
      this.CanviPromocio(X % this._MaxPaginaActual);
    });
    this._TotalPromocions = this._Promocions.length;
    console.log(this._Promocions);
  }

  constructor(private R: Router) {}

  ngOnInit() {}

  CanviPromocio(index: number) {
    this._PromocioActual = this._Promocions[index];
    this._PaginaActual = index + 1;
  }

  Redirecciona(P: PromocioHome) {
    if (P.PROMOCIONS_URL) this.R.navigateByUrl(P.PROMOCIONS_URL);
    else this.R.navigate(P.linkRouter);
  }
}
