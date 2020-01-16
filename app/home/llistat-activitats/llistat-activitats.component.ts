import { Component, OnInit, Input } from '@angular/core';
import { ActivitatsPerTipus } from 'src/app/model/activitat';

@Component({
  selector: 'app-llistat-activitats',
  templateUrl: './llistat-activitats.component.html',
  styleUrls: ['./llistat-activitats.component.scss']
})
export class LlistatActivitatsComponent implements OnInit {

  _DadesActivitatsPerTipus: ActivitatsPerTipus[] = [];

  @Input() set InputDades(DA: ActivitatsPerTipus[]) {
    this._DadesActivitatsPerTipus = DA;
    console.log(this._DadesActivitatsPerTipus);
  }


  constructor() { }

  ngOnInit() {
  }

}

