import { Component, OnInit, Input } from '@angular/core';
import { NoticiaHome } from 'src/app/model/noticies';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-noticies',
  templateUrl: './noticies.component.html',
  styleUrls: ['./noticies.component.scss']
})
export class NoticiesComponent implements OnInit {
  _Noticies: NoticiaHome[] = [];
  _NoticiaActual = 0;
  _Boletes = [];

  @Input() set InputDades(DA: NoticiaHome[]) {
    this._Noticies = DA;
    this._Boletes = [];
    this._NoticiaActual = 0;
    for (let i = 0; i < this._Noticies.length; i++) this._Boletes.push(i);
  }

  constructor() {}

  VesAPromocio($eventId: number) {
    this._NoticiaActual = $eventId;
  }

  getClassBola($idBola) {
    return $idBola == this._NoticiaActual ? 'PuntGris' : 'PuntBlanc';
  }

  ngOnInit() {
    interval(45000).subscribe(X => {
      if (this._NoticiaActual >= this._Noticies.length) {
        this._NoticiaActual = 0;
      } else {
        this._NoticiaActual++;
      }
    });
  }
}
