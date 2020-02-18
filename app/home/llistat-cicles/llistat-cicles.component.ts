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
  InputColor: string = '#FFFFFF';

  @Input() set InputDades(DA: ActivitatsCicle[]) {
    this._DadesActivitatsCicle = DA;
    this.QuantsCiclesHiHa = this._DadesActivitatsCicle.length;
  }

  constructor() {}

  ngOnInit() {}

  getActivitats(cicle: ActivitatHome) {}

  getTagStyle() {
    let R = parseInt(parseInt(this.InputColor.substring(1, 3), 16).toString(10)) - 50;
    let G = parseInt(parseInt(this.InputColor.substring(3, 5), 16).toString(10)) - 50;
    let B = parseInt(parseInt(this.InputColor.substring(5, 7), 16).toString(10)) - 50;
    let NewColor = '#' + R.toString(16) + G.toString(16) + B.toString(16);

    let Style: Object = new Object();
    Style['background-color'] = this.InputColor;
    Style['border-left-color'] = NewColor;
    Style['border-bottom-color'] = NewColor;
    Style['border-top-color'] = this.InputColor;
    Style['border-right-color'] = this.InputColor;

    return Style;
  }
}
