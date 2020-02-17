import { PromocioHome } from './promocio';
import { environment } from 'src/environments/environment';
import { HorariDetall, HorariDetallDates, HorariDetallAjax } from './horari';
import { ThrowStmt } from '@angular/compiler';

export class Activitat {}

export class ActivitatSQL {
  Activitats_ActivitatId: number;
  Activitats_CiclesCicleId: number;
  Activitats_TipusActivitatId: number;
  Activitats_Nom: string;
  Activitats_Preu: number;
  Activitats_PreuReduit: number;
  Activitats_Publicable: boolean;
  Activitats_Estat: number;
  Activitats_Descripcio: string;
  Activitats_Imatge: string;
  Activitats_Pdf: string;
  Activitats_PublicableWeb: boolean;
  Activitats_TitolCurt: string;
  Activitats_DescripcioCurt: string;
  Activitats_TitolMig: string;
  Activitats_DescripcioMig: string;
  Activitats_TitolComplet: string;
  Activitats_DescripcioCompleta: string;
  Activitats_TipusEnviament: number;
  Activitats_Organitzador: string;
  Activitats_Categories: string;
  Activitats_Responsable: string;
  Activitats_InformacioPractica: string;
  Activitats_SiteId: number;
  Activitats_Actiu: boolean;
  Activitats_IsEntrada: boolean;
  Activitats_Places: number;
  Activitats_IsImportant: boolean;
  Activitats_DefinicioHoraris: string;
  gTextDates: string = '';
  gDiesHores: DiaHora[] = []; //Aquest camp és temporal i és només per a tractar dates. Un cop tractades passa a gTextDates
  gTextDiesHores: string = '';
  gCategories: string[] = [];
  gURLImatge: string = '';

  constructor(OA?: any) {
    if (OA) {
      for (let key in OA) {
        if (key != 'A_CATEGORIES') this[key] = OA[key];
        else this.gCategories = String(OA['A_CATEGORIES']).split('@');
      }

      const NomURL = this.Activitats_TitolMig.replace(/[^\w\s]/gi, '')
        .replace(/\s/g, '_')
        .trim()
        .replace(/\b\w/g, s => s.toUpperCase());

      this.gURLImatge = 'http://www.casadecultura.cat/images/activitats/A-' + this.Activitats_ActivitatId + '-L.jpg';
    }
  }
}

export class ActivitatDetall {
  ActivitatsRelacionades: ActivitatHome[] = [];
  ActivitatDetall: ActivitatSQL = new ActivitatSQL();
  ActivitatHoraris: HorariDetallDates = new HorariDetallDates();

  constructor(ActivitatDetall?, ActivitatsRelacionades?) {
    if (ActivitatDetall) this.ActivitatDetall = ActivitatDetall;
    if (ActivitatsRelacionades) this.ActivitatsRelacionades = ActivitatsRelacionades;
  }

  fromAjax(OA: { Activitat: ActivitatSQL; Horaris: HorariDetallAjax[]; ActivitatsRelacionades: ActivitatHome[] }) {
    this.ActivitatDetall = new ActivitatSQL(OA.Activitat[0]);
    this.ActivitatsRelacionades = new ActivitatHomeArray(OA['ActivitatsRelacionades']).getArray();
    this.ActivitatHoraris = new HorariDetallDates(OA['Horaris']);
  }
}

export class FiltreActivitat {
  public static readonly DATA_INICIAL = 'DATA_INICIAL';
  public static readonly ID_TIPUS_ACTIVITAT = 'ID_TIPUS_ACTIVITAT';

  type: string = '';
  key: string = '';
  constructor(type, key) {
    this.type = type;
    this.key = key;
  }
}

export class CategoriesType {
  static readonly Activitat_acollida = '50';
  static readonly Activitat_destacada = '49';
  static readonly Activitat_normal = '47';
  static readonly Exposicio = '46';
  static readonly Altres = '51';
  static readonly Música = '56';
  static readonly Fer_fotos = '57';
  static readonly Fer_videos = '58';
}

export class ActivitatHome {
  idActivitat: number = 0;
  idCicle: number = 0;
  NomActivitat: string = '';
  NomActivitatIntern: string = '';
  Categories: string[] = [];
  TipusActivitatId: number = 0;
  Dia: string = '';
  DiaMax: string = '';
  HoraInici: string = '';
  HoraFi: string = '';
  DiaFiCicle: string = '';
  NomEspai: string = '';
  Pagina: number = 0;
  Importancia: number = 0;
  gURLImatge: string = '';
  /*    gTextDates: string = "";
        gTextDies: string = "";
        gTextHores: string = "";
        gTextEspais: string = "";
    */
  gTextEntrada: string = '';
  gTextDiesHores: DatesToText = new DatesToText();
  gDiesHores: DiaHora[] = []; //Aquest camp és temporal i és només per a tractar dates. Un cop tractades passa a gTextDates
  linkDetall = [];
  Descripcio = '';

  constructor(OA?: any) {
    for (let key in OA) {
      if (key != 'Categories') this[key] = OA[key];
      else this.Categories = String(OA['Categories']).split('@');
    }

    this.Importancia = 2;
    if (this.Categories.findIndex(X => X == CategoriesType.Activitat_destacada) > -1) this.Importancia = 1;
    if (this.Categories.findIndex(X => X == CategoriesType.Activitat_acollida) > -1) this.Importancia = 3;

    const NomURL = this.NomActivitat.replace(/[^\w\s]/gi, '')
      .replace(/\s/g, '_')
      .trim()
      .replace(/\b\w/g, s => s.toUpperCase());

    if (this.idActivitat > 0) {
      this.gURLImatge = environment.url_activitats_img + this.idActivitat + '-L.jpg';
      this.linkDetall = ['/detall', this.idActivitat, NomURL];
    } else {
      this.gURLImatge = environment.url_cicles_img + this.idCicle + '-L.jpg';
      this.linkDetall = ['/cicles', this.idCicle, NomURL];
    }

    if (this.NomActivitat == '') this.NomActivitat = this.NomActivitatIntern;

    //Tracta dates
    let DiaInicial = new DiaHora(this.Dia, this.HoraInici, this.NomEspai);
    let DiaFinal = new DiaHora(this.DiaMax, this.HoraInici, this.NomEspai);
    this.gDiesHores = [DiaInicial, DiaFinal];
    this.gTextDiesHores = new DatesToText().tractaDates(this.gDiesHores);
  }

  isCicle() {
    return this.idActivitat == 0;
  }
}

/* Aquesta classe només existeix per a convertir dates */
export class DatesToText {
  gTextDates: string = '';
  gTextDies: string = '';
  gTextHores: string = '';
  gTextEspais: string = '';

  tractaDates(gDiesHores: DiaHora[]) {
    // Miro quina és la data inicial i quina la final
    let DataMin: DiaHora = new DiaHora('3000-01-01');
    let DataMax: DiaHora = new DiaHora('1900-01-01');

    for (let D of gDiesHores) {
      if (D.getDataNumber() <= DataMin.getDataNumber()) DataMin = D;
      if (D.getDataNumber() >= DataMin.getDataNumber()) DataMax = D;
    }

    if (DataMin.getDataNumber() == DataMax.getDataNumber()) {
      this.gTextDates = 'El dia ' + DataMin.getDataText() + ' a les ' + DataMin.getHoraText();
      this.gTextDies = 'El dia ' + DataMin.getDataText();
      this.gTextHores = 'A les ' + DataMin.getHoraText();
      this.gTextEspais = DataMin.getEspai();
    } else {
      this.gTextDates = 'Del ' + DataMin.getDataText() + ' al ' + DataMax.getDataText() + ' a les ' + DataMin.getHoraText();
      this.gTextDies = 'Del ' + DataMin.getDataText() + ' al ' + DataMax.getDataText();
      this.gTextHores = 'A les ' + DataMin.getHoraText();
      this.gTextEspais = DataMin.getEspai();
    }

    return this;
  }
}

export class DiaHora {
  Dia: string;
  Hora: string;
  Espai: string;

  constructor(DiaText: string = '2000-00-00', HoraText: string = '00:00:00', EspaiText: string = '') {
    this.Dia = DiaText;
    this.Hora = HoraText;
    this.Espai = EspaiText;
  }

  getDataNumber() {
    return parseInt(this.getAny() + this.getMes() + this.getDia());
  }

  getAny() {
    let A = this.Dia.split('-');
    return A[0];
  }

  getMes() {
    let A = this.Dia.split('-');
    return A[1];
  }

  getDia() {
    let A = this.Dia.split('-');
    return A[2];
  }

  getHora() {
    let H = this.Hora.split(':');
    return H[0];
  }

  getMinuts() {
    let H = this.Hora.split(':');
    return H[1];
  }

  getEspai() {
    return this.Espai;
  }

  getHoraText(): string {
    return this.getHora() + ':' + this.getMinuts();
  }

  getDataText(): string {
    return this.getDia() + '/' + this.getMes();
  }
}

export class ActivitatHomeArray {
  AA: ActivitatHome[] = [];

  constructor(AA?: ActivitatHome[]) {
    this.AA = AA.map((X: ActivitatHome) => {
      let AH = new ActivitatHome(X);
      return AH;
    });
  }

  getArray(): ActivitatHome[] {
    return this.AA;
  }
}

export class ActivitatsCicle {
  Cicle: ActivitatHome = new ActivitatHome();
  Activitats: ActivitatHome[][] = [];
  Promocio: PromocioHome = new PromocioHome();

  constructor(Cicle?: ActivitatHome, Activitats?: ActivitatHome[], Divisor = 100) {
    if (Cicle) this.Cicle = Cicle;

    let TMP: ActivitatHome[] = [];
    Activitats.forEach((Activitat, index) => {
      TMP.push(Activitat);
      if ((index + 1) % Divisor == 0) {
        this.Activitats.push(TMP);
        TMP = [];
      }
    });
    this.Activitats.push(TMP);

    this.Promocio.fromApp(
      0,
      this.Cicle.NomActivitat,
      '',
      environment.url_cicles_img + this.Cicle.idCicle + '-XL.jpg',
      '',
      this.Cicle.linkDetall
    );
  }
}

export class ActivitatsPerTipus {
  Tipus: number = 0;
  TipusNom: String = '';
  Activitats: ActivitatHome[][] = [];

  constructor(Tipus?: number, TipusNom?: String, Activitats?: ActivitatHome[], Divisor = 3) {
    if (Tipus) this.Tipus = Tipus;
    if (TipusNom) this.TipusNom = TipusNom;

    let TMP: ActivitatHome[] = [];
    Activitats.forEach((Activitat, index) => {
      TMP.push(Activitat);
      if ((index + 1) % Divisor == 0) {
        this.Activitats.push(TMP);
        TMP = [];
      }
    });
  }
}
