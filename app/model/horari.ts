import { THIS_EXPR, ThrowStmt, IfStmt } from '@angular/compiler/src/output/output_ast';
import { stringify } from 'querystring';

export class HorariSQL {
  HorarisID: number;
  Activitats_ActivitatID: number;
  Dia: string;
  HoraInici: string;
  HoraFi: string;
  HoraPre: string;
  HoraPost: string;
  Avis: string;
  Espectadors: number;
  Places: number;
  Titol: string;
  Preu: number;
  PreuR: number;
  Estat: number;
  Responsable: string;
  site_id: number;
  actiu: boolean;
  isEntrada: boolean;
}

export class HorariDetallAjax {
  DIA: string;
  HORA: string;
  ESPAI: string;
}

class Element {
  k: string;
  v: Element[];
}

class NomsMesosDies {
  MesosNom(mes: number) {
    switch (mes) {
      case 1:
        return 'gen.';
      case 2:
        return 'feb.';
      case 3:
        return 'mar.';
      case 4:
        return 'abr.';
      case 5:
        return 'mai.';
      case 6:
        return 'jun.';
      case 7:
        return 'jul.';
      case 8:
        return 'ago.';
      case 9:
        return 'set.';
      case 10:
        return 'oct.';
      case 11:
        return 'nov.';
      case 12:
        return 'des.';
    }
  }

  MesosFrase(mes: number) {
    switch (mes) {
      case 1:
        return ' de gener';
      case 2:
        return ' de febrer';
      case 3:
        return ' de març';
      case 4:
        return " d'abril";
      case 5:
        return ' de maig';
      case 6:
        return ' de juny';
      case 7:
        return ' de juliol';
      case 8:
        return " d'agost";
      case 9:
        return ' de setembre';
      case 10:
        return " d'octubre";
      case 11:
        return ' de novembre';
      case 12:
        return ' de desembre';
    }
  }
}

export class HorariDetallDates {
  Llistat: HorariDetall[] = [];
  LlistatText: string = '';
  LlistatCalendari: CalendariDetallActivitat = new CalendariDetallActivitat();
  TextResum: string = '';

  Busca(T: Element[], Clau: string) {
    let I = T.findIndex(X => {
      return X.k == Clau;
    });
    if (I < 0) T.push({ k: Clau, v: [] });
    I = I > 0 ? I : T.length - 1;
    return { T, I };
  }

  constructor(HA: HorariDetallAjax[] = []) {
    let Espais: Element[] = [];

    let HD: HorariDetall[] = HA.map((H: HorariDetallAjax) => new HorariDetall(H.DIA, H.HORA, H.ESPAI));
    this.LlistatCalendari = new CalendariDetallActivitat(HD);
    this.TextResum = this.LlistatCalendari.getResumDates();
  }
}

export class HorariDetall {
  DIA_TXT: string;
  HORA_TXT: string;
  DIA_NUMERO: number;
  MES_NUMERO: number;
  ANY_NUMERO: number;
  ANY_NUMERO_DOS_XIFRES: number;
  HORA: number;
  MINUTS: number;
  ESPAI: string;
  DATA: Date = new Date();

  constructor(DIA = '', HORA = '', ESPAI = '') {
    // Convertim el format de data al nostre
    let D = DIA.split('-');
    this.DIA_TXT = DIA;
    this.DIA_NUMERO = parseInt(D[2]);
    this.MES_NUMERO = parseInt(D[1]);
    this.ANY_NUMERO = parseInt(D[0]);
    this.ANY_NUMERO_DOS_XIFRES = parseInt(D[0].substr(2, 2));

    let H = HORA.split(':');
    this.HORA_TXT = HORA;
    this.HORA = parseInt(H[0]);
    this.MINUTS = parseInt(H[1]);

    this.ESPAI = ESPAI;
    this.DATA = new Date(this.ANY_NUMERO, this.MES_NUMERO - 1, this.DIA_NUMERO, this.HORA, this.MINUTS);
  }
}

export class ObjecteAny {
  NumeroAny: number = 0;
  NumeroAnyDosXifres: number = 0;
  MesosAny: ObjecteMes[] = [];
  IndexMes: number = -1;

  constructor(Any: number) {
    this.NumeroAny = Any;
    this.NumeroAnyDosXifres = parseInt(this.NumeroAny.toString().substr(2, 2));
  }

  addDia(HD: HorariDetall, $ocupat: boolean) {
    this.IndexMes = this.MesosAny.findIndex(x => x.NumeroMes == HD.MES_NUMERO);
    if (this.IndexMes == -1) {
      this.MesosAny.push(new ObjecteMes(HD.MES_NUMERO, this.NumeroAny));
      this.IndexMes = this.MesosAny.length - 1;
    }

    this.MesosAny[this.IndexMes].addDia(HD, $ocupat);
  }
}

export class ObjecteMes {
  NumeroMes: number = 0;
  NumeroAny: number = 0;
  Nom: string = '';
  Dies: ObjecteDia[] = [];

  constructor(NumeroMes: number, NumeroAny: number) {
    this.NumeroAny = NumeroAny;
    this.NumeroMes = NumeroMes;
    let DiesAlMes = new Date(NumeroAny, NumeroMes, 0).getDate();
    for (let i = 1; i <= DiesAlMes; i++) {
      this.Dies.push(new ObjecteDia(i, NumeroMes, NumeroAny, false));
    }

    let NMD = new NomsMesosDies();
    this.Nom = NMD.MesosNom(this.NumeroMes);
  }

  addDia(HD: HorariDetall, $ocupat) {
    this.Dies[HD.DIA_NUMERO - 1].DiaOcupat = $ocupat;
    this.Dies[HD.DIA_NUMERO - 1].addEspai(HD.ESPAI);
    this.Dies[HD.DIA_NUMERO - 1].addHora(HD.HORA_TXT);
  }
}

export class ObjecteDia {
  DiaNumero: number = 0;
  DiaFestiu: boolean = false;
  DiaOcupat: boolean = false;
  LlistatEspais: string[] = [];
  LlistatHores: string[] = [];

  constructor($dia: number, $mes: number, $any: number, $ocupat: boolean) {
    this.DiaNumero = $dia;
    this.DiaFestiu = false;
    this.DiaOcupat = $ocupat;
    let D = new Date($any, $mes - 1, $dia);
    if (D.getDay() == 0 || D.getDay() == 6) this.DiaFestiu = true;
  }

  addEspai(E: string) {
    let IndexEspai = this.LlistatEspais.findIndex(X => E == X);
    if (IndexEspai == -1) this.LlistatEspais.push(E);
  }

  addHora(E: string) {
    let IndexHores = this.LlistatHores.findIndex(X => E == X);
    if (IndexHores == -1) this.LlistatHores.push(E);
  }
}

export class ObjecteCalendari {
  Anys: ObjecteAny[] = [];
  IndexAny: number = -1;

  addDia(HD: HorariDetall) {
    // Si l'any ja existeix, res, sinó, l'afegim
    this.IndexAny = this.Anys.findIndex(X => X.NumeroAny == HD.ANY_NUMERO);
    if (this.IndexAny == -1) {
      this.Anys.push(new ObjecteAny(HD.ANY_NUMERO));
      this.IndexAny = this.Anys.length - 1;
    }

    this.Anys[this.IndexAny].addDia(HD, true);
  }
}

export class CalendariDetallActivitat {
  Calendari: ObjecteCalendari = new ObjecteCalendari();
  FirstDay: HorariDetall;
  LastDay: HorariDetall;

  constructor(HD?: HorariDetall[]) {
    if (HD) {
      HD.forEach(HD => {
        if (!this.FirstDay) this.FirstDay = HD;
        if (!this.LastDay) this.LastDay = HD;

        if (HD.DATA > this.LastDay.DATA) this.LastDay = HD;
        if (HD.DATA < this.FirstDay.DATA) this.FirstDay = HD;

        this.Calendari.addDia(HD);
      });
    }
  }

  getResumDates() {
    let NMD = new NomsMesosDies();

    if (this.FirstDay && this.LastDay) {
      if (this.FirstDay.DIA_TXT == this.LastDay.DIA_TXT) {
        return (
          'El ' +
          this.FirstDay.DIA_NUMERO +
          ' ' +
          NMD.MesosFrase(this.FirstDay.MES_NUMERO) +
          ' de ' +
          this.FirstDay.ANY_NUMERO +
          ' <br /> ' +
          this.FirstDay.HORA_TXT +
          ' - ' +
          this.FirstDay.ESPAI
        );
      } else {
        return (
          'Del ' +
          this.FirstDay.DIA_NUMERO +
          ' ' +
          NMD.MesosFrase(this.FirstDay.MES_NUMERO) +
          ' al ' +
          this.LastDay.DIA_NUMERO +
          ' ' +
          NMD.MesosFrase(this.LastDay.MES_NUMERO) +
          ' <br /> ' +
          this.FirstDay.HORA_TXT +
          ' -  ' +
          this.FirstDay.ESPAI
        );
      }
    }
  }
}
