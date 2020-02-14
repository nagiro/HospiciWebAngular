import { Component, OnInit, Input } from '@angular/core';
import { ActivitatHome, ActivitatsCicle } from 'src/app/model/activitat';

@Component({
  selector: 'app-llistat-cicles',
  templateUrl: './llistat-cicles.component.html',
  styleUrls: ['./llistat-cicles.component.scss']
})
export class LlistatCiclesComponent implements OnInit {
  _DadesActivitatsCicle: ActivitatsCicle[] = [];
  QuantsCiclesHiHa: number = 0;

  @Input() set InputDades(DA: ActivitatsCicle[]) {
    this._DadesActivitatsCicle = DA;
    this.QuantsCiclesHiHa = this._DadesActivitatsCicle.length;
  }

  constructor() {}

  ngOnInit() {}

  getActivitats(cicle: ActivitatHome) {}
}
