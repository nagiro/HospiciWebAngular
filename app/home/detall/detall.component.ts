import { Component, OnInit, Input } from '@angular/core';
import { ActivitatDetall } from 'src/app/model/activitat';
import { ObjecteDia } from 'src/app/model/horari';

@Component({
  selector: 'app-detall',
  templateUrl: './detall.component.html',
  styleUrls: ['./detall.component.scss']
})
export class DetallComponent implements OnInit {
  @Input() ActivitatDetall: ActivitatDetall = new ActivitatDetall();
  Horaris_i_llocs: string = '';
  MostraDetall: boolean = false;

  constructor() {}

  ngOnInit() {}

  veureDetall() {
    this.MostraDetall = !this.MostraDetall;
  }

  veureHorariDia(D: ObjecteDia) {
    this.Horaris_i_llocs = D.LlistatEspais.join(',') + ' a les ' + D.LlistatHores.join(',');
  }

  tipusDia(D: ObjecteDia) {
    if (D.DiaOcupat) return 'cal-dia-ocupat';
    if (D.DiaFestiu) return 'cal-dia-festiu';
    return 'cal-dia';
  }
}
