import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FiltreActivitat } from 'src/app/model/activitat';

@Component({
  selector: 'app-calendari',
  templateUrl: './calendari.component.html',
  styleUrls: ['./calendari.component.scss']
})
export class CalendariComponent implements OnInit {
  FiltresOberts = false;
  MesText = '';
  MesNumero = 0;
  AnyText = '';
  AnyNumero = 0;
  QuantsDiesMes = 0;
  TagsDisponibles: [Number, String][] = [];

  _Filtres: FiltreActivitat[] = [];
  @Output() Filtre: EventEmitter<FiltreActivitat[]> = new EventEmitter();

  DiesMes: { DiaText: string; DiaNumero: number; C: any[] }[] = [];
  DiesMesFiles: any[] = [];

  constructor() {
    //Creem un calendari
    let D = new Date();
    this.CarregaMes(D.getMonth(), D.getFullYear());
    this.TagsDisponibles.push([1, 'Artística']);
    this.TagsDisponibles.push([2, 'Curs']);
    this.TagsDisponibles.push([3, 'Familiar']);
    this.TagsDisponibles.push([4, 'Científica']);
    this.TagsDisponibles.push([5, 'Exposició']);
    this.TagsDisponibles.push([6, 'Humanitats']);
    this.TagsDisponibles.push([7, 'Música']);
    this.TagsDisponibles.push([8, 'Conferència']);
    this.TagsDisponibles.push([11, 'Tecnològica']);
  }

  GoMes(Menys = false) {
    let M = this.MesNumero;
    let Y = this.AnyNumero;
    if (Menys && M == 0) {
      Y--;
      M = 11;
    } else if (!Menys && M == 11) {
      Y++;
      M = 0;
    } else if (Menys) {
      M--;
    } else {
      M++;
    }
    this.CarregaMes(M, Y);
  }

  CarregaMes(Mes, Any) {
    this.MesNumero = Mes;
    this.MesText = this.Mesos(this.MesNumero);
    this.AnyNumero = Any;
    this.AnyText = this.AnyNumero.toString();
    this.QuantsDiesMes = this.QuantsDiesTeElMes(this.AnyNumero, this.MesNumero);
    this.DiesMes = [];
    this.DiesMesFiles = [];

    let Fila = 0;
    for (let i = 1; i < this.QuantsDiesMes + 1; i++) {
      let DiaSetmana = new Date(this.AnyNumero, this.MesNumero, i).getDay();
      let DiaText = this.DiaSetmana(DiaSetmana);
      let Classe = [];
      Classe.push('cal-dia');
      if (DiaSetmana == 6 || DiaSetmana == 0) Classe.push('cal-dia-festa');
      else Classe.push('cal-dia-normal');
      let D = { DiaText: DiaText, DiaNumero: i, C: Classe };
      this.DiesMes.push(D);

      // Carrego l'array de Dies per files pel calendari
      if (i == 1) {
        let DiesASumar = DiaSetmana == 0 ? 7 : DiaSetmana;
        for (let i = DiesASumar; i > 1; i--) {
          if (!this.DiesMesFiles[Fila]) this.DiesMesFiles[Fila] = [];
          this.DiesMesFiles[Fila].push({ DiaText: '', DiaNumero: '', C: Classe });
        }
      }

      if (!this.DiesMesFiles[Fila]) this.DiesMesFiles[Fila] = [];
      this.DiesMesFiles[Fila].push(D);
      if (DiaSetmana == 0) Fila++;
    }
  }

  QuantsDiesTeElMes(any, mes) {
    return new Date(any, mes, 0).getDate();
  }

  DiaSetmana(DiaSetmana) {
    switch (DiaSetmana) {
      case 0:
        return 'Dg.';
        break;
      case 1:
        return 'Dl.';
        break;
      case 2:
        return 'Dt.';
        break;
      case 3:
        return 'Dc.';
        break;
      case 4:
        return 'Dj.';
        break;
      case 5:
        return 'Dv.';
        break;
      case 6:
        return 'Ds.';
        break;
    }
  }

  Mesos(Mes) {
    switch (Mes) {
      case 0:
        return 'Gener';
      case 1:
        return 'Febrer';
      case 2:
        return 'Març';
      case 3:
        return 'Abril';
      case 4:
        return 'Maig';
      case 5:
        return 'Juny';
      case 6:
        return 'Juliol';
      case 7:
        return 'Agost';
      case 8:
        return 'Setembre';
      case 9:
        return 'Octubre';
      case 10:
        return 'Novembre';
      case 11:
        return 'Desembre';
    }
  }

  ngOnInit() {}

  executaFiltre(tipus: string, id: string) {
    let F = new FiltreActivitat(tipus, id);

    //Ho tenim com un array, per si algun dia volem afegir-hi més d'un filtre...
    if (F.type == FiltreActivitat.DATA_INICIAL) {
      F.key = this.AnyNumero + '-' + (this.MesNumero + 1) + '-' + F.key;
    }

    this._Filtres = [];
    this._Filtres.push(F);
    this.Filtre.emit(this._Filtres);
  }
}
